import * as React from 'react';

import { GET_PAGINATED_DOCUMENTS } from '@queries/document';
import { graphql, ChildProps} from 'react-apollo';
import { DocumentX } from './DocumentQL';

/**
 * Example of using HoC to wrap the props of a react component.
 */
interface Data {
    documents?: DocumentX[];
}

interface Variables {
    numberOfItems: number;
}

interface DocumentHopProps {
    pageNumber: number;
    numberOfItems: number;
}

interface GraphqlState {
    numberOfItems: number;
}

class DocumentHoC extends React.Component<ChildProps<DocumentHopProps, Data, Variables>, GraphqlState> {
    constructor(props: DocumentHopProps) {
        super(props);
    }
    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        }
        const { loading, documents: d } = data;

        if (loading) {
            return null;
        }

        return (
            data.documents.map(doc => {
                return (<div key={doc.id}>{doc.description}</div>);
            })
        );
    }
}

export default graphql<DocumentHopProps, Data, Variables>(
    GET_PAGINATED_DOCUMENTS,
    { options: ({ numberOfItems = 2, pageNumber = 0}) => ({ variables: { numberOfItems, pageNumber } })
  })(DocumentHoC);
