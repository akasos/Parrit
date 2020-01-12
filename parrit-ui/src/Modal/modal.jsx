import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Modal = (props) => {
    return ReactDOM.createPortal(
        props.children,
        props.domElement
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    domElement: PropTypes.object
};
export default Modal;