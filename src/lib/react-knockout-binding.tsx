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
    }),
    reactControlled: (ko: any) => ({
        init: (el: any) => {
            ko.utils.domNodeDisposal.addDisposeCallback(el, () => {
                ReactDOM.unmountComponentAtNode(el);
            });
            return { controlsDescendantBindings: true }; // important
        },
        update: (el: Element, valueAccessor: any, allBindings: any, viewModel: any) => {
            const component = ko.unwrap(valueAccessor());
            let props = allBindings.get('props');
            props = props ? props :
                viewModel ? viewModel : null;
            ReactDOM.render(React.createElement(component, props), el);
        }
    })
};
