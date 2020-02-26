ansiColor('xterm') {

    node {

        def mvnwAlias = "export UNIT_TEST_COVERAGE=0.7; chmod u+x $WORKSPACE/mvnw; $WORKSPACE/mvnw"
        def RELEASE_DEV_ECR_REPO_URL = "155086999298.dkr.ecr.us-east-1.amazonaws.com/msa-dev"
        def RELEASE_QA_ECR_REPO_URL = "155086999298.dkr.ecr.us-east-1.amazonaws.com/msa-qa"
        BRANCH_NAME = "${env.BRANCH_NAME}"
        APP_NAME = 'spring-boot-microservice'
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
        IMAGE_VERSION = "v_${BUILD_NUMBER}"
        COMMIT_ID = getShortCommitHash()


        stage("Checkout") {
            checkout scm
        }

        stage("Build") {
            inDocker({
                sh """
                    $mvnwAlias clean install -DskipTests
                """
            })
        }

        if (isMasterBranch() || isPullRequest()) {
            stage("Unit tests") {

                inDocker({
                    sh """
                        $mvnwAlias test
                    """
                    junit '*/target/surefire-reports/*.xml'
                })
            }

            stage("Component tests") {}

            stage("Code quality") {
                withSonarQubeEnv('Running SonarQube analysis') {
                    inDocker({
                        jacoco execPattern: '*/target/*.exec'

                        sh """
                            $mvnwAlias verify | tee verify.log
                            $mvnwAlias checkstyle:checkstyle
                            $mvnwAlias package sonar:sonar
                         """
                    })
                }

                timeout(time: 60, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        if (isMasterBranch()) {
            stage('Create docker image') {
                sh '''
                   scp -r build/libs/*.jar api-module/docker/ 
                   scp -r build/resources/main/run.sh api-module/docker/
                   cd api-module
                   docker build -f docker/Dockerfile -t ${APP_NAME}:${BRANCH_NAME}_${COMMIT_ID}_${BUILD_NUMBER} .
                '''
            }

            stage("Push docker image to MSA-DEV") {
                inDocker({
                    sh '''
                        aws ecr get-login --no-include-email --region us-east-1 
                        docker tag ${APP_NAME}:${BRANCH_NAME}_${COMMIT_ID}_${BUILD_NUMBER} ${RELEASE_DEV_ECR_REPO_URL}/${APP_NAME}:${BRANCH_NAME}_${COMMIT_ID}_${BUILD_NUMBER}
                        docker push ${RELEASE_DEV_ECR_REPO_URL}/${APP_NAME}:${BRANCH_NAME}_${COMMIT_ID}_${BUILD_NUMBER}
                    '''
                })
            }
        }

        //validate stage
        if (isProdBranch() && goToProduction()) {
            stage("Deploy to production") {}

            stage("Generate Release notes") {}
        }
    }
}

/**
 * This will execute the given closure inside a docker image
 * @param closure The commands to execute inside a docker image
 * @param user The user used to run the commands. This defaults to the jenkins user and docker group
 * @param dockerImage The docker image being used
 * @param extraArgs Any extra arguments that should be passed to the docker container
 * @return the result of the execution
 */
def inDocker(Closure closure, String user = "jenkins", String extraArgs = "", String dockerImage = "155086999298.dkr.ecr.us-east-1.amazonaws.com/cicd/alpine3.10-openjdk8u212:latest") {

    if (user.equals("jenkins")) {
        user = "498:495"
    }

    //TODO add label?!
    return docker.image("$dockerImage").inside("-u $user -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/.m2:/var/lib/jenkins/.m2 -v /var/lib/jenkins/jenkinskey.asc:/key.asc $extraArgs", closure)
}

def goToProduction() {
    def userInput = input(id: 'goToProd',
            message: 'Deploy to production?',
            ok: 'YES',
            parameters: [booleanParam(defaultValue: false,
                    description: 'If deploying to production, push the button',
                    name: 'YES')]);
    return 'YES'.equals(userInput)
}

def isMasterBranch() {
    def branchName = env.BRANCH_NAME
    println "branchName is $branchName";
    return "master".equals(branchName)
}

def isProdBranch() {
    def branchName = env.BRANCH_NAME
    println "branchName is $branchName";
    return "prod".equals(branchName)
}

def isPullRequest() {
    def pullRequestId = env.CHANGE_ID
    println "pr id is $pullRequestId";
    if (pullRequestId) {
        return true;
    }
    return false;
}