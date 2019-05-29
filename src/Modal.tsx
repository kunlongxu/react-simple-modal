import React from 'react'
import './Modal.css'
import ModalPortal from './ModalPortal'

const enterClasses = 'modal-enter'
const enterActiveClasses = 'modal-enter-active'
const enterEndActiveClasses = 'modal-enter-end'
const leaveClasses = 'modal-leave'
const leaveActiveClasses = 'modal-leave-active'
const leaveEndActiveClasses = 'modal-leave-end'
const enterTimeout = 0
const enterActiveTimeout = 200
const enterEndActiveTimeout = 200
const leaveTimout = 0
const leaveActiveTimeout = 200
const leaveEndActiveTimeout = 200

type Props = {
  visible: boolean
  title: string
  content: string
  onClose?: () => void
  onConfirm?: () => void
}
type State = {
  classes: string
  visible: boolean
}
class Modal extends React.Component<Props, State> {
  node: HTMLElement | null = null

  componentDidMount() {
    this.setState({
      visible: this.props.visible
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible) {
      this.enterAnimate()
    }
  }
  state = {
    visible: false,
    classes: ''
  }

  closeModal = () => {
    const { onClose } = this.props
    onClose && onClose()
    this.leaveAnimate()
  }
  enterAnimate = () => {
    this.setState({ visible: true, classes: enterClasses })

    const enterActiveTimer = setTimeout(() => {
      this.setState({ classes: enterActiveClasses })
      clearTimeout(enterActiveTimer)
    }, enterTimeout)

    const enterEndTimer = setTimeout(() => {
      this.setState({ classes: enterEndActiveClasses })
      clearTimeout(enterEndTimer)
    }, enterEndActiveTimeout + enterActiveTimeout)
    const resetTimer = setTimeout(() => {
      this.setState({ classes: '' })
      clearTimeout(resetTimer)
    }, enterTimeout + enterActiveTimeout + enterEndActiveTimeout)
  }
  leaveAnimate = () => {
    this.setState({ classes: leaveClasses })
    const leaveActiveTimer = setTimeout(() => {
      this.setState({ classes: leaveActiveClasses })
      clearTimeout(leaveActiveTimer)
    }, leaveTimout)
    const leaveEndTimer = setTimeout(() => {
      this.setState({ classes: leaveEndActiveClasses })
      clearTimeout(leaveEndTimer)
    }, leaveEndActiveTimeout + leaveActiveTimeout)
    const resetTimer = setTimeout(() => {
      this.setState({ classes: '', visible: false })
      clearTimeout(resetTimer)
    }, leaveTimout + leaveActiveTimeout + leaveEndActiveTimeout)
  }
  confirm = () => {
    const { onConfirm, onClose } = this.props
    onConfirm && onConfirm()
    onClose && onClose()
    this.leaveAnimate()
  }
  closeMask = () => {
    const { onClose } = this.props
    onClose && onClose()
    this.leaveAnimate()
  }
  render() {
    const { visible, classes } = this.state
    const { title, content } = this.props
    return (
      <ModalPortal visible={visible}>
        <div className="modal-wrapper">
          <div className={`modal ${classes}`}>
            <div className="modal-title">{title}</div>
            <div className="modal-content">{content}</div>
            <div className="modal-operator">
              <button onClick={this.closeModal} className="modal-operator-close">
                取消
              </button>
              <button onClick={this.confirm} className="modal-operator-confirm">
                确认
              </button>
            </div>
          </div>
          <div className="mask" onClick={this.closeMask} />
        </div>
      </ModalPortal>
    )
  }
}
export default Modal
