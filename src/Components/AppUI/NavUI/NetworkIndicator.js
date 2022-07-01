import './NetworkIndicator.css'

const NetworkIndicator = (props) => {
    let chainId = window.ethereum?.chainId;
    let network = chainId === '0x1' ? 'Mainnet' : chainId === "0x4" ? 'Rinkeby' : '';

    if (network !== '')
        return (<button className={'network-indicator network-indicator__' + props.theme}>{network}</button>);
    else return null;
}

export default NetworkIndicator