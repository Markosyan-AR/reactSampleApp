import './index.less';
import { Hello } from './components/hello';
import { Excel } from './components/excel';
import { NavBar, MenuItem, MenuItemType } from './components/navbar';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

const headers = ['header1', 'header2'];
const rows = [['data11', 'data12'], ['data21', 'data22']];

ReactDOM.render(
    <Excel data={{ headers, rows }} layout={{ columnWidth: [4, 8] }} />,
    $('.excel')[0]
);

const menuConfig: MenuItem[] = [
    {
        active: true,
        type: MenuItemType.menuItem,
        href: '#',
        title: 'Home'
    }, {
        type: MenuItemType.menuItem,
        href: '#',
        title: 'About'
    }, {
        type: MenuItemType.menuItem,
        href: '#',
        title: 'Contact Us'
    }, {
        type: MenuItemType.separator
    }, {
        type: MenuItemType.menuDropdownItem,
        title: 'Dropdown Menu',
        menuItems: [{
            type: MenuItemType.menuItem,
            href: '#',
            title: 'Dropdown Item 1'
        }, {
            type: MenuItemType.separator
        }, {
            type: MenuItemType.menuItem,
            href: '#',
            title: 'Dropdown Item 2'
        }]
    }
];

const rightMenuConfig: MenuItem[] = [
    {
        type: MenuItemType.menuItem,
        href: '#',
        title: 'Sing In'
    }, {
        type: MenuItemType.menuItem,
        href: '#',
        title: 'Sing Up'
    }
]

ReactDOM.render(
    <NavBar projectName="React Sample" menuItems={menuConfig} rightMenuItems={rightMenuConfig} />,
    $('.nav')[0]
);
