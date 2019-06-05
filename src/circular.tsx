import Modal from "./Modal";
import React from "react";
import ReactDOM from "react-dom";
interface MessageOption {
    content: string;
    duration: number;
    onClose: () => void;
}
function message(option: MessageOption = { content: "未定义", duration: 1400, onClose: () => true }) {
    const { content, duration, onClose } = option;
    const tmpDivContainer = document.createElement("div");
    ReactDOM.render(
        <Modal
            visible={true}
            onClose={onClose}
            readonly={true}
            content={content}
            bare={true}
            contentStyle={{ textAlign: "center" }}
        />,
        tmpDivContainer
    );
}

export default message;
