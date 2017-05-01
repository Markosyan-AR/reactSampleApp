import * as React from 'react';

export class Excel extends React.Component<{ data:IExcelData, layout: IExcelLayoutConfig}, void>{
    public render() {
        return React.DOM.table(
            {
                className: 'table table-bordered table-hover'
            },
            React.DOM.thead(null,
                React.DOM.tr(null,
                    this.props.data.headers.map((header, index) =>{
                        let width = this.props.layout.columnWidth[index];
                        return React.DOM.th({
                            className: width != null? 'col-md-' + width: ''
                        }, header)
                    }
                    )
                )
            ),
            React.DOM.tbody(null,
                this.props.data.rows.map(row =>
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
        rows: [['c', 'd'], ['e', 'f']]
    }
}

export interface IExcelData {
    headers: string[],
    rows: string[][]
}

export interface IExcelLayoutConfig {
    columnWidth: number[]
}