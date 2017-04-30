import * as React from 'react';

export const hello = (name: string) => <h1>Hello, {name}!</h1>

export class Hello extends React.Component<{name: string}, undefined>{
    render() {
        return <h1>Hello, {this.props.name}!</h1>
    }
}