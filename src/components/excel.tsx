import * as React from 'react';

export class Excel extends React.Component<{ data: IExcelData, layout: IExcelLayoutConfig }, IExcelState>{
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
    public state: IExcelState = {
        data: this.props.data,
        edit: null
    };

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
            this.props.data.rows.map(this.renderRow)
        )
    }
    private renderRow = (row: string[], rowIndex: number) => {
        return React.DOM.tr(
            { key: rowIndex },
            row.map((cell, cellIndex) => this.renderCell(cell, cellIndex, rowIndex))
        )
    }

    private renderCell(cell: string, cellIndex: number, rowIndex: number) {
        if (this.state.edit && this.state.edit.row === rowIndex && this.state.edit.cell === cellIndex) {
            return this.renderEditor();
        }
        return React.DOM.td({
            key: cellIndex,
            onDoubleClick: e => this.showEditor(e, cellIndex, rowIndex)
        }, cell);
    }

    private renderEditor() {

    }

    private showEditor(e: React.MouseEvent<HTMLTableDataCellElement>, cellIndex: number, rowIndex: number) {
        this.setState({
            edit: {
                row: rowIndex,
                cell: cellIndex
            }
        })
    }
}

export interface IExcelState {
    data: IExcelData,
    edit?: {
        row: number,
        cell: number
    }
}

export interface IExcelData {
    headers: string[],
    rows: string[][]
}

export interface IExcelLayoutConfig {
    columnWidth: number[]
}