import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const koBindingHandlers = {
    react: (ko: any) => ({
        init:(el: Element, valueAccessor: any) => {
            const component = ko.unwrap(valueAccessor());
            ko.utils.domNodeDisposal.addDisposeCallback(el, () => {
                ReactDOM.unmountComponentAtNode(el);
            });
            ReactDOM.render(React.createElement(component), el);
        }
    })
};
