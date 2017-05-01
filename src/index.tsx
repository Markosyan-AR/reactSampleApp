import { Hello } from './components/hello';
import { Excel } from './components/excel';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

// ReactDOM.render(
//     <Hello name="123" />,
//     //<Excel data=['1', '2'] headers=['h1', 'h2'] >    ,
//     document.body
// )

ReactDOM.render(
    <Excel headers={['header1', 'header2']} data={[['data11', 'data12'], ['data21', 'data22']]} />,
    $('.excel')[0]
)
