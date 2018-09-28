import * as React from 'react';
import { Mutation } from 'react-apollo';
import ADD_DOCUMENT from '../../mutations/createDocument';
import GraphQL from '@components/samples/GraphQL';

/**
 * Sample of using Mutation form react-apollo, AddDocument will handle the mutation and Graphql
 * will render the results.
 */
interface AddDocumentState {
        id: number;
        name: string;
        description: string;
        url: string;
}

export default class AddDocument extends React.Component<{}, AddDocumentState> {
    constructor(props: any) {
        super(props);

       this.state = {
           id: 0,
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

    submitAddDocument = (event: any, mutation: any) => {
        event.preventDefault();
        mutation({ variables: {...this.state} });
        this.state = {
            id: 0,
            name: '',
            description: '',
            url: ''
        };
    }

  render() {
      return (
          <React.Fragment>
               <Mutation mutation = { ADD_DOCUMENT }>
                {(addDocument) => (
                    <div>
                        <form
                            onSubmit={(e) => this.submitAddDocument(e, addDocument)}>
                            <div className='input-mutation-container'><label className='mutation-label'>Name: </label><input name='name' onChange={this.handleFormChange} value={this.state.name}/></div>
                            <div className='input-mutation-container'><label className='mutation-label'>Description: </label><input name='description' onChange={this.handleFormChange} value={this.state.description}/></div>
                            <div className='input-mutation-container'><label className='mutation-label'>Url: </label><input name='url' onChange={this.handleFormChange} value={this.state.url}/></div>
                            <button className='mutation-submit' type='submit'>Add Todo</button>
                        </form>
                    </div>
                )}
            </Mutation>
            <GraphQL></GraphQL>
          </React.Fragment>
        );
    }
}