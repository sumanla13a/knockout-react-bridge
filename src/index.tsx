import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { koBindingHandlers } from './lib/react-knockout-binding';
declare const ko: any;
import './lib/hello-world-knockout-template';
document.addEventListener("DOMContentLoaded", function(){
    //setting up ko binding handler and applying binding for demo purpose
    ko.bindingHandlers.react = koBindingHandlers.react(ko);
    (window as any).ApplyBinding();
});
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
