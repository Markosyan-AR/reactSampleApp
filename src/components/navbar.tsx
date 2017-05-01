import * as React from "React";

export class NavBar extends React.Component<INavBarData, {}>{
    public defaultProps: INavBarData = {
        projectName: '',
        menuItems: []
    };

    render() {
        return <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                    {this.navBarToggleButton()}
                    <a className="navbar-brand" href="#">{this.props.projectName}</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        {this.menuItems(this.props.menuItems)}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {this.menuItems(this.props.rightMenuItems)}
                    </ul>
                </div>
            </div>
        </nav>
    }

    private menuItems(props: MenuItem[]) {
        return props.map(item => {
            switch (item.type) {
                case MenuItemType.menuItem:
                    return this.menuItem(item);
                case MenuItemType.separator:
                    return this.separator();
                case MenuItemType.menuDropdownItem:
                    return this.menuDropdownItem(item);
                default:
                    break;
            }
        })

    }

    private navBarToggleButton(): JSX.Element {
        return <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
    }

    private menuItem(props: IMenuItem): JSX.Element {
        return <li className={props.active ? 'active' : ''}><a href={props.href}>{props.title}</a></li>
    }

    private menuDropdownItem(props: IMenuDropdownItem): JSX.Element {
        return (
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{props.title}<span className="caret"></span></a>
                <ul className="dropdown-menu">
                    {this.menuItems(props.menuItems)}
                </ul>
            </li>
        );
    }

    private separator(): JSX.Element {
        return <li role="separator" className="divider"></li>;
    }
}

export interface INavBarData {
    projectName?: string,
    menuItems: MenuItem[],
    rightMenuItems?: MenuItem[]
}

export type MenuItem = IMenuItem | IMenuDropdownItem | IMenuSeparator

export interface IMenuItem {
    type: MenuItemType.menuItem,
    active?: boolean,
    href: string,
    title: string
}
export interface IMenuDropdownItem {
    type: MenuItemType.menuDropdownItem,
    title: string,
    menuItems: MenuItem[]
}
export interface IMenuSeparator {
    type: MenuItemType.separator
}

export enum MenuItemType {
    menuItem,
    separator,
    menuDropdownItem
}