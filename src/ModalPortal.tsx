import React from "react";
import ReactDOM from "react-dom";
type Props = {
    visible: boolean;
    children: any;
    duration: number;
};
class ModalPortal extends React.Component<Props> {
    node: HTMLElement | null = null;
    componentDidMount() {
        const { duration } = this.props;
        if (typeof duration === "number") {
            setTimeout(() => {
                if (this.node) {
                    document.body.removeChild(this.node);
                    this.node = null;
                }
            });
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!nextProps.visible && this.node) {
            document.body.removeChild(this.node!);
            this.node = null;
        } else {
            if (!this.node) {
                this.node = document.createElement("div");
                document.body.appendChild(this.node);
            }
        }
    }
    render() {
        const { visible, children } = this.props;
        // 直接通过显隐表示
        return visible && ReactDOM.createPortal(children, this.node!);
    }
}
export default ModalPortal;
