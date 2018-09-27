import * as React from 'react';

import ADD_DOCUMENT from '../../mutations/createDocument';
import { graphql, ChildProps} from 'react-apollo';
import { AddDocument, AddDocumentVariables } from '../../schemaTypes';
import GraphQL from './GraphQL';

interface AddDocumentState {
    name: string;
    description: string;
    url: string;
}

class DocumentMutationHoC extends React.Component<ChildProps<{}, AddDocument, AddDocumentVariables>, AddDocumentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            description: '',
            url: ''
        };
    }

    handleFormChange = (event: any) => {
        event.persist();
        this.setState((prevState: any) => {
            return prevState[event.target.name] = event.target.value;
        });
    }

    submitAddDocument = (event: any) => {
        event.preventDefault();
        this.props.mutate({
            variables: {...this.state}
        });
    }
    render() {
        return (
            <div>
                <form>
                    <div className='input-mutation-container'><label className='mutation-label'>Name: </label><input name='name' onChange={this.handleFormChange} value={this.state.name}/></div>
                    <div className='input-mutation-container'><label className='mutation-label'>Description: </label><input name='description' onChange={this.handleFormChange} value={this.state.description}/></div>
                    <div className='input-mutation-container'><label className='mutation-label'>Url: </label><input name='url' onChange={this.handleFormChange} value={this.state.url}/></div>
                    <button className='mutation-submit' type='submit' onClick={this.submitAddDocument}>Add Todo</button>
                </form>
                <GraphQL></GraphQL>
            </div>
        );
    }
}

export default graphql<{}, AddDocument, AddDocumentVariables>(
    ADD_DOCUMENT,
)(DocumentMutationHoC);
