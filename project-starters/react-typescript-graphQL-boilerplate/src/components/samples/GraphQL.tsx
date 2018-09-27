import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_DOCUMENTS }  from '@queries/document';

/*
    Simple example of using a React Component with grapqhl for rendering a set of documents.
*/
export interface GraphqlProps {
}

export default class GraphQL extends React.Component<GraphqlProps, undefined> {
    render() {
        return (
            <React.Fragment>
                <h1>GraphQL Sample</h1>
                <Query query={ GET_ALL_DOCUMENTS }>
                    {({ data, error, loading, refetch }) => {
                        if (error) return 'The popo is real!';
                        if (loading) return 'Patience young skywalker...';

                        return (
                            <React.Fragment>
                                <button onClick={() => { refetch(); }}>Refresh</button>
                                <ul>
                                    { data.documents.map((doc: any) => {
                                        return (<li key={doc.id}>{doc.name} {doc.description} {doc.url}</li>);
                                    })
                                    }
                                </ul>
                            </React.Fragment>
                            );
                    }}
                </Query>
            </React.Fragment>
        );
    }
}
