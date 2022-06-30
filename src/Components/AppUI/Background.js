import './Background.css';

function Background(props) {
    return (
        <div className='main-container'>
            <ul className='background'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            {props.children}
        </div>
    )
}

export default Background;