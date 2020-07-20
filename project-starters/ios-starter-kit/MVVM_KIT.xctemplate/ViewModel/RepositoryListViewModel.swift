//
//  RepositoryListViewModel.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import Foundation
import SwiftyJSON
class RepositoryListViewModel {
    var repositories: [RepositoryViewModel]
    let httpManager: Http
    var observer: onComplete?
    init(httpService: Http = Http.shared, observer: onComplete? = nil) {
        self.httpManager = httpService
        self.repositories = []
        self.observer = observer
    }
    func bind(observer: @escaping onComplete) {
        self.observer = observer
    }
    func fetchRepositories() {
        let url = "https://api.github.com/repositories?since=364&list=10"
        httpManager.fetch(url, success: {(response) in
            self.mapToModel(data: response)
        }) { (error) in
        }
    }
    func mapToModel(data: JSON) {
        self.repositories = data.arrayValue.map { (json) -> RepositoryModel in
                return RepositoryModel(data: json)
            }.map { (repoModel) -> RepositoryViewModel in
                return RepositoryViewModel(repositoryModel: repoModel)
            }
        if let observer = self.observer {
            observer()
        }
    }
}
