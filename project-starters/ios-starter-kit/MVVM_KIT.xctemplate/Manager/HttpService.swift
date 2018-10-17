//
//  HttpService.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire
typealias onSuccess = (JSON) -> Void
typealias onFailure = (Error) -> Void
class Http {
    static let shared = Http()
    private init() {}

    //fetch all repositories
    func fetch(_ strURL: String, success: @escaping onSuccess, failure: @escaping onFailure) {
        Alamofire.request(strURL,
                          method: HTTPMethod.get,
                          parameters: nil,
                          encoding: JSONEncoding.default,
                          headers: nil
            ).responseJSON { (response) in
                if response.result.isSuccess {
                    if let value = response.result.value {
                        success(JSON(value))
                    } else {
                        //json failed case
                    }
                } else if response.result.isFailure {
                    if let error = response.result.error {
                        failure(error)
                    } else {
                        // handle error failed case
                    }
                }
        }
    }
}
