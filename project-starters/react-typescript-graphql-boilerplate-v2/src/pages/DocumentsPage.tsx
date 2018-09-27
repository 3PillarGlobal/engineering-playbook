import * as React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Documents from '../components/Documents';
import { Document } from '../graphql/types';

interface GetDocumentsData {
  getDocuments: Document[];
}

interface GetDocumentVariables {
  pageNumber: number;
  numberOfItems: number;
}

class DocumentsQuery extends Query<GetDocumentsData, GetDocumentVariables> {}

const GET_DOCUMENTS_QUERY = gql`
  query DocumentsQuery($pageNumber: Int = 0, $numberOfItems: Int = 10) {
    getDocuments(pageNumber: $pageNumber, numberOfItems: $numberOfItems) {
      id
      name
      description
    }
  }
`;

console.log(GET_DOCUMENTS_QUERY);

interface DocumentsState {
  currentPage: number;
}

class DocumentsPage extends React.Component<any, DocumentsState> {
  constructor(props: any) {
    super(props);
    this.state = { currentPage: 0 };
  }

  loadMoreDocuments(fetchMore: any) {
    fetchMore({
      variables: {
        pageNumber: this.state.currentPage + 1
      },
      updateQuery: (
        alreadyLoadedDocuments: GetDocumentsData,
        { fetchMoreResult }: any
      ) => {
        const { getDocuments } = fetchMoreResult!;
        if (getDocuments.length === 0) {
          console.log('No more documents to load');
          return alreadyLoadedDocuments;
        }

        this.updateCurrentPageState();

        const allDocuments = Object.assign({}, alreadyLoadedDocuments, {
          getDocuments: [
            ...alreadyLoadedDocuments.getDocuments,
            ...getDocuments
          ]
        });

        console.dir(allDocuments);

        return allDocuments;
      }
    });
  }

  updateCurrentPageState() {
    this.setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1
    }));
  }

  render() {
    return (
      <div>
        <DocumentsQuery
          fetchPolicy="cache-and-network"
          query={GET_DOCUMENTS_QUERY}
          variables={{ pageNumber: 0, numberOfItems: 5 }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <p>Loading documents...</p>;
            if (error) return <p>Error loading documents :(</p>;
            const { getDocuments } = data!;
            return (
              <Documents
                pageNumber={this.state.currentPage + 1}
                documents={getDocuments}
                onLoadMore={() => this.loadMoreDocuments(fetchMore)}
              />
            );
          }}
        </DocumentsQuery>
      </div>
    );
  }
}

export default DocumentsPage;
