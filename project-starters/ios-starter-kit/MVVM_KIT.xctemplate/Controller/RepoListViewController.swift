//
//  RepoListViewController.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import UIKit

class RepoListViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    var repoListViewModel: RepositoryListViewModel!
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.rowHeight = UITableView.automaticDimension
        tableView.estimatedRowHeight = 48
        repoListViewModel = RepositoryListViewModel()
        repoListViewModel.bind { [weak self] in
            self?.tableView.reloadData()
        }
        repoListViewModel.fetchRepositories()
        // Do any additional setup after loading the view.
    }
}
extension RepoListViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return repoListViewModel.repositories.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier:"RepoItemViewCell", for: indexPath) as! RepoItemViewCell
        cell.repositoryViewModel = repoListViewModel.repositories[indexPath.row]
        return cell
    }
}
