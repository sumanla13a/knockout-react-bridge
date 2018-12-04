import * as React from 'react';
import * as ReactDom from 'react-dom';

declare var ko: any;

export interface KnockoutComponentProps {
    koModel?: any;
    koTemplate?: React.SFC;
    dangerouslyUpdatable?: boolean;
}

export class KnockoutComponent extends React.Component<KnockoutComponentProps> {
    static defaultProps: KnockoutComponentProps = {
        dangerouslyUpdatable: false
    };
    private isBindingApplied: boolean = false;
    private isModelValid(koModel: any): boolean {
        return koModel !== undefined;
    }
    private cleanNode() {
        if (!this.isBindingApplied) {
            return;
        }
        const node = ReactDom.findDOMNode(this);
        if (node !== null) {
            ko.cleanNode(node);
        }
    }
    private applyBinding() {
        const node = ReactDom.findDOMNode(this);
        const koModel = this.props.hasOwnProperty('koModel')
            ? this.props.koModel
            : null;
        if (this.isModelValid(koModel) && node !== null) {
            ko.applyBindings(koModel, node);
            this.isBindingApplied = true;
        }
    }
    componentDidMount() {
        this.applyBinding();
    }
    componentWillUpdate() {
        this.cleanNode();
    }
    componentDidUpdate() {
        this.applyBinding();
    }
    componentWillUnmount() {
        this.cleanNode();
    }
    shouldComponentUpdate(nextProps: KnockoutComponentProps) {
        if (this.props.koTemplate !== nextProps.koTemplate) {
            console.error('Knockout template can\'t be changed during component life cycle.');
            return false;
        }
        if (this.isBindingApplied && this.props.koModel !== nextProps.koModel) {
            if (!this.props.dangerouslyUpdatable) {
                console.error(`
                    Knockout model can\'t be changed after it\'s applied.
                    If you really need it to be reapplied set dangerouslyUpdatable prop to true.
                    Make sure that you know the risks.
                `);
                return false;
            }
            return true;
        }
        return !this.isBindingApplied && this.props.koModel !== nextProps.koModel;
    }
    render() {
        if (this.props.koTemplate) {
            const KoTemplate = this.props.koTemplate;
            return (
                <div 
                    style={
                        this.isModelValid(this.props.koModel)
                        ? {} 
                        : { visibility: 'hidden' } }
                >
                        <KoTemplate />
                </div>
            );
        }
        return null;
    }
}
