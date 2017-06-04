import * as React from 'react';

export class Excel extends React.Component<IExcelProps, IExcelState>{
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
                })))
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

    private renderCell(cell: string | React.DOMElement<any, any>, cellIndex: number, rowIndex: number) {
        if (this.state.edit && this.state.edit.row === rowIndex && this.state.edit.cell === cellIndex) {
            cell = this.renderEditor(cell as string);
        }

        return React.DOM.td({
            key: cellIndex,
            onDoubleClick: e => this.showEditor(e, cellIndex, rowIndex)
        }, cell);
    }

    private renderEditor(content: string) {
        return React.DOM.form({
            onSubmit: (e) => { this.save(e); }
        },
            React.DOM.input({
                type: 'text',
                defaultValue: content,
                autoFocus: true
            })
        );
    }

    private save(e: React.ChangeEvent<any>) {
        e.preventDefault();
        let value = e.target.firstChild.value;
        let data = this.state.data.rows.slice();
        data[this.state.edit.row][this.state.edit.cell] = value;
        this.closeEditor();
    }

    private showEditor(e: React.MouseEvent<HTMLTableDataCellElement>, cellIndex: number, rowIndex: number) {
        this.setState({
            edit: {
                row: rowIndex,
                cell: cellIndex
            }
        })
    }

    private closeEditor() {
        this.setState({ edit: null });
    }
}

export interface IExcelProps {
    data: IExcelData,
    layout: IExcelLayoutConfig
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