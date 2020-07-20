//
//  RepositoryModelTest.swift
//  ___PROJECTNAME___Tests
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//


import XCTest
import SwiftyJSON
@testable import MVVM_KIT
class RepositoryModelTest: XCTestCase {
    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }
    func testModel_init() {
        let json = JSON(["full_name": "testTitle", "description": "testDescription"])
        let repositoryModel = RepositoryModel(data: json)
        XCTAssertEqual(repositoryModel.repoTitle, "testTitle")
        XCTAssertEqual(repositoryModel.repoDiscription, "testDescription")
    }
}
