import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { koBindingHandlers } from './lib/react-knockout-binding';
declare const ko: any;
import './lib/hello-world-knockout-template';
ko.bindingHandlers.react = koBindingHandlers.react(ko);
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
