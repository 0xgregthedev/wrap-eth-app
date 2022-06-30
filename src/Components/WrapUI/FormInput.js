import './FormInput.css';

function FormInput(props) {
    var formattedBalance = parseFloat(parseFloat(props.balance).toFixed(5));
    var balanceString = props.displayBalance ? 'Balance: ' + formattedBalance : '';

    const validationRegex = new RegExp('^[0-9]*[.]?[0-9]{0,18}?$');
    const changeHandler = (event) => {
        if (validationRegex.test(event.target.value)) props.onInputChange({ coin: props.coin, value: event.target.value })
    }

    const maxBtnClick = (event) => {
        event.preventDefault();
        if (props.coin === 'ETH') props.onInputChange({ coin: props.coin, value: parseFloat(props.balance) - .01 })
        else props.onInputChange({ coin: props.coin, value: props.balance })
    }

    const maxBtn = () => {
        if (props.isInput && props.displayBalance && parseFloat(props.balance) > 0) {
            return (<button onClick={maxBtnClick}>MAX</button>);
        }
    }

    return (
        <div className='form-inputs'>
            <input min='.01' onChange={changeHandler} placeholder='0.0' value={props.value ?? ''}
                className={props.value !== '0.0' ? 'changed-input' : ''}></input>
            <div className='coin'>
                <div className={props.coin === 'ETH' ? 'eth-icon' : 'weth-icon'}></div>
                <p>{props.coin === 'ETH' ? 'ETH' : 'wETH'}</p>
            </div>
            <div className='balance'>
                <p>{balanceString}</p>{maxBtn()}
            </div>
        </div>
    );

}

export default FormInput;