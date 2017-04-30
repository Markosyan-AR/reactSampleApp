import * as React from 'react';

export class Excel extends React.Component<IExcelData, void>{
    public render() {
        return React.DOM.table(
            {
                className: 'table table-bordered table-hover'
            },
            React.DOM.thead(null,
                React.DOM.tr(null,
                    this.props.headers.map(header =>
                        React.DOM.th(null, header)
                    )
                )
            ),
            React.DOM.tbody(null,
                this.props.data.map(row =>
                    React.DOM.tr(
                        null,
                        row.map(cell =>
                            React.DOM.td(null, cell)
                        )
                    )
                )
            )
        )
    }
    public defaultProps: IExcelData = {
        headers: ['a', 'b'],
        data: [['c', 'd'], ['e', 'f']]
    }
}

export interface IExcelData {
    headers: string[],
    data: string[][]
}