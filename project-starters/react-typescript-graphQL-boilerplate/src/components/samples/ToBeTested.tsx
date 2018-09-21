import * as React from 'react';

export interface ToBeTestedProps {
}

export class ToBeTested extends React.Component<ToBeTestedProps, undefined> {
    render() {
        return (
            <div className='toBeTested'>
                <h1>Test component</h1>
                <div className='paragraphSection'>
                    <p>Paragraph1</p>
                    <p>Paragraph2</p>
                    <p>Paragraph3</p>
                </div>
            </div>
        );
    }
}
