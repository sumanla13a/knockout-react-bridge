import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface CommentProps {
    text: string;
    isInTable?: boolean;
    parent?: string;
}

export class HtmlComment extends React.Component<CommentProps> {
    private parentNode: Node | null = null;
    private commentNode: Node | null = null;
    private spanNode: Node | null = null;

    componentDidMount() {
        this.spanNode = ReactDOM.findDOMNode(this);
        this.parentNode = this.spanNode && this.spanNode.parentNode;

        if (this.parentNode && this.spanNode) {
            this.commentNode = document.createComment(this.props.text);
            this.parentNode.replaceChild(this.commentNode, this.spanNode);
        }
    }

    componentDidUpdate() {
        if (this.parentNode 
            && this.spanNode 
            && this.commentNode 
            && this.commentNode.textContent !== this.props.text) {
            this.commentNode.textContent = this.props.text;
        }
    }

    componentWillUnmount() {
        if (this.parentNode 
            && this.spanNode 
            && this.commentNode) {
            this.parentNode.replaceChild(this.spanNode, this.commentNode);
        }
    }

    render() {
        if (this.props.isInTable) {
            if ('tr' === this.props.parent) {
                return (
                    <td />
                );
            }
            return (
                <tr />
            );
        }
        return (
            <span />
        );
    }
}
