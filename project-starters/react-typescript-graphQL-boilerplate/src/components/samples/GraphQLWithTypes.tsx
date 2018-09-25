// import * as React from 'react';

// import { GET_PAGINATED_DOCUMENTS } from '@queries/document';
// import { graphql, ChildProps} from 'react-apollo';

// // To be generated
// interface DocumentQuery {

// }
// interface DocumentVariables {

// }

// interface GraphqlProps {
//     numberOfItems: number;
// }

// interface GraphqlState {
//     numberOfItems: number;
// }

// class GraphQLWithTypes extends React.Component<ChildProps<GraphqlProps, DocumentQuery, DocumentVariables>, GraphqlState> {
//     constructor(props: GraphqlProps) {
//         super(props);
//     }
//     render() {
//         console.log(this.props);

//         const { data } = this.props;
//         if (!data) {
//             return null;
//         }
//         const { loading, document: d } = data;

//         if (loading || !d) {
//             return null;
//         }

//         return <div>{d.description}</div>;
//     }
// }

// export default graphql<GraphqlProps, DocumentQuery, DocumentVariables>(GET_PAGINATED_DOCUMENTS, {
//     options: ({ numberOfItems }) => ({ variables: { numberOfItems } })
//   })(GraphQLWithTypes);
