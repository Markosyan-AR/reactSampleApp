import {Hello} from './components/test';
import * as React from 'react';
import * as ReactDom from 'react-dom';

ReactDom.render(
    <Hello name = "123" />,
    document.body
)