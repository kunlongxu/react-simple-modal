import React from "react";
import "./Modal.css";
import ModalPortal from "./ModalPortal";
import * as CSS from "csstype";
const enterClasses = "modal-enter";
const enterActiveClasses = "modal-enter-active";
const enterEndActiveClasses = "modal-enter-end";
const leaveClasses = "modal-leave";
const leaveActiveClasses = "modal-leave-active";
const leaveEndActiveClasses = "modal-leave-end";
// const maskActiveClasses = 'mask-active'
const enterTimeout = 0;
const enterActiveTimeout = 200;
const enterEndActiveTimeout = 100;
const leaveTimout = 0;
const leaveActiveTimeout = 200;
const leaveEndActiveTimeout = 100;

interface Props {
    visible: boolean;
    title: string;
    content: string | React.ReactNode;
    confirmBtnText: string;
    cancelBtnText: string;
    bare: boolean;
    onClose: () => void;
    onConfirm: () => void;
    contentStyle: CSS.Properties;
    duration: number;
    readonly: boolean;
}
type State = {
    classes: string;
    visible: boolean;
    maskClasses: string;
};

class Modal extends React.Component<Props, State> {
    node: HTMLElement | null = null;
    static defaultProps = {
        visable: false,
        title: "提示",
        content: "文本提示",
        confirmBtnText: "确认",
        cancelBtnText: "取消",
        bare: false,
        onConfirm: () => true,
        contentStyle: {},
        duration: null,
        readonly: false
    };
    componentDidMount() {
        this.setState({
            visible: this.props.visible
        });
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.visible) {
            this.enterAnimate();
        }
    }
    state = {
        visible: false,
        classes: "",
        maskClasses: ""
    };

    closeModal = () => {
        const { onClose, readonly } = this.props;
        onClose && onClose();
        if (readonly) return;
        this.leaveAnimate();
    };
    enterAnimate = () => {
        this.setState({ visible: true, classes: enterClasses });

        const enterActiveTimer = setTimeout(() => {
            this.setState({ classes: enterActiveClasses });
            clearTimeout(enterActiveTimer);
        }, enterTimeout);

        const enterEndTimer = setTimeout(() => {
            this.setState({ classes: enterEndActiveClasses });
            clearTimeout(enterEndTimer);
        }, enterEndActiveTimeout + enterActiveTimeout);
        const resetTimer = setTimeout(() => {
            this.setState({ classes: "" });
            clearTimeout(resetTimer);
        }, enterTimeout + enterActiveTimeout + enterEndActiveTimeout);
    };
    leaveAnimate = () => {
        this.setState({ classes: leaveClasses });
        const leaveActiveTimer = setTimeout(() => {
            this.setState({ classes: leaveActiveClasses });
            clearTimeout(leaveActiveTimer);
        }, leaveTimout);
        const leaveEndTimer = setTimeout(() => {
            this.setState({ classes: leaveEndActiveClasses });
            clearTimeout(leaveEndTimer);
        }, leaveEndActiveTimeout + leaveActiveTimeout);
        const resetTimer = setTimeout(() => {
            this.setState({ classes: "", visible: false, maskClasses: "" });
            clearTimeout(resetTimer);
        }, leaveTimout + leaveActiveTimeout + leaveEndActiveTimeout);
    };
    confirm = () => {
        const { onConfirm, onClose } = this.props;
        onConfirm && onConfirm();
        onClose && onClose();
        this.leaveAnimate();
    };
    closeMask = () => {
        const { onClose, readonly } = this.props;
        if (readonly) return;
        onClose && onClose();
        this.leaveAnimate();
    };
    render() {
        const { visible, classes, maskClasses } = this.state;
        const {
            title,
            content,
            bare,
            cancelBtnText,
            confirmBtnText,
            onClose,
            onConfirm,
            contentStyle,
            duration
        } = this.props;
        return (
            <ModalPortal visible={visible} duration={duration}>
                <div className="modal-wrapper">
                    <div className="modal-layout">
                        <div className={`modal ${classes}`}>
                            <div className="modal-title">{title}</div>

                            <div className="modal-content" style={contentStyle}>
                                {content}
                            </div>
                            {bare ? null : (
                                <ModalAction
                                    confirmAction={onConfirm}
                                    cancelAction={onClose}
                                    cancelText={cancelBtnText}
                                    confirmText={confirmBtnText}
                                />
                            )}
                        </div>
                    </div>
                    <div className={`mask`} onClick={this.closeMask} />
                </div>
            </ModalPortal>
        );
    }
}
interface ModalActionProps {
    cancelAction: () => void;
    confirmAction: () => void;
    cancelText: string;
    confirmText: string;
}

function ModalAction(props: ModalActionProps) {
    const { cancelAction, confirmAction } = props;
    return (
        <>
            <div className="modal-operator">
                <button onClick={cancelAction} className="modal-operator-close">
                    取消
                </button>
                <button onClick={confirmAction} className="modal-operator-confirm">
                    确认
                </button>
            </div>
        </>
    );
}
export default Modal;
