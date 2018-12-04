import * as React from 'react';
import { HtmlComment } from './html-comment';

export const HelloWorldTemplate = () => (
    <React.Fragment>
        <p>First name: <input data-bind="value: firstName" /></p>
        <p>Last name: <input data-bind="value: lastName" /></p>
        <h2>Hello, <span data-bind="text: fullName"></span>!</h2>
        <HtmlComment text="ko if: !hideSecretText" />
          Thanos Did Nothing Wrong.
        <HtmlComment text="/ko" />
    </React.Fragment>
);

(window as any)['helloWorldTemplate'] = HelloWorldTemplate;
