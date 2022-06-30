import './Modal.css';
const Modal = (props) => {
    if (props.msg !== '' && props.link !== '' && props.status !== '') {
        return (
            <div className='modal'>
                <a href={props.link} target="_blank" rel="noreferrer noopener">{props.msg}</a>
                <div className={props.status}></div>
            </div>
        )
    }
    else if (props.msg !== '') {
        return (
            <div className='modal'>
                <p>{props.msg}</p>
            </div>
        )

    }
    else return null;

}

export default Modal;