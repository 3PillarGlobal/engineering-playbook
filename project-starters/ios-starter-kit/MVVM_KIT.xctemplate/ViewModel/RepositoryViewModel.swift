//
//  RepositoryViewModel.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import Foundation

struct RepositoryViewModel {
    let repoTitle: String
    let repoDescription: String
    init(repositoryModel: RepositoryModel) {
        repoTitle = repositoryModel.repoTitle
        repoDescription = repositoryModel.repoDiscription
    }
}
