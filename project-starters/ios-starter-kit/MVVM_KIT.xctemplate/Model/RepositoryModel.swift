//
//  RepositoryModel.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import Foundation
import SwiftyJSON
struct RepositoryModel {
    let repoTitle: String
    let repoDiscription: String
    init(data: JSON) {
        repoTitle = data["full_name"].stringValue
        repoDiscription = data["description"].stringValue
    }
}
