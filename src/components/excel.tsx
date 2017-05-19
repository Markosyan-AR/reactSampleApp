import * as React from 'react';

export class Excel extends React.Component<{ data: IExcelData, layout: IExcelLayoutConfig }, void>{
    public render() {
        return React.DOM.table(
            {
                className: 'table table-bordered table-hover'
            },
            this.renderHeader(),
            this.renderBody()
        )
    }
    public defaultProps: IExcelData = {
        headers: ['a', 'b'],
        rows: [['c', 'd'], ['e', 'f']]
    }
    public getInitialState() {
        return {};
    }
    private renderHeader() {
        return React.DOM.thead(null,
            React.DOM.tr(null,
                this.props.data.headers.map((header, index) => {
                    let width = this.props.layout.columnWidth[index];
                    return React.DOM.th({
                        className: width != null ? 'col-md-' + width : '',
                        key: index
                    }, header)
                }
                )
            )
        )

    }
    private renderBody() {
        return React.DOM.tbody(null,
            this.props.data.rows.map((row, index) =>
                React.DOM.tr(
                    { key: index },
                    row.map(cell =>
                        React.DOM.td(null, cell)
                    )
                )
            )
        )
    }

}

export interface IExcelData {
    headers: string[],
    rows: string[][]
}

export interface IExcelLayoutConfig {
    columnWidth: number[]
}