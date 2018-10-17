//
//  RepoItemViewCell.swift
//  ___PROJECTNAME___
//
//  Created ___FULLUSERNAME___ on ___DATE___.
//  Copyright © ___YEAR___ ___ORGANIZATIONNAME___. All rights reserved.
//

import UIKit

class RepoItemViewCell: UITableViewCell {
    @IBOutlet weak var lblRepoTitle: UILabel!
    @IBOutlet weak var lblRepoDescription: UILabel!
    var repositoryViewModel: RepositoryViewModel! {
        didSet {
            lblRepoTitle.text = repositoryViewModel.repoTitle
            lblRepoDescription.text = repositoryViewModel.repoDescription
        }
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        lblRepoTitle.textColor = .black
        lblRepoTitle.font = UIFont.systemFont(ofSize: 14.0)
        lblRepoDescription.textColor = UIColor.gray
        lblRepoDescription.font = UIFont.systemFont(ofSize: 12.0)
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
