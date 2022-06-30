
import React, { useEffect } from 'react';
import ConnectWallet from '../../AccountLibrary/ConnectWallet';
import './ConnectWallet.css';
const ConnectWalletBtn = (props) => {
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', accountsChangedHandler);
            window.ethereum.on('chainChanged', chainChangedHandler);
            window.ethereum.on('connect', connectHandler);
        }
        else  props.onAddressChange('');
    }, [])

    const connectHandler = async (data) => {
        let result = await ConnectWallet(data.chainId);
        props.onAddressChange(result.address ?? '');
        if (!!result.error) props.onError(result.error);
    }

    const accountsChangedHandler = (data) => {
        props.onAddressChange(data[0]);
    }
    const chainChangedHandler = async () => {
        let result = await ConnectWallet(window.ethereum.chainId);
        props.onAddressChange(result.address ?? '');
        if (!!result.error) props.onError(result.error);
    }
    const connectWallet = async () => {
        let result = await ConnectWallet(window.ethereum?.chainId, 'eth_requestAccounts');
        props.onAddressChange(result.address ?? '');
        if (!!result.error) props.onError(result.error);
    };


    if (props.data?.address?.length > 0) {
        return (<div><button className='wallet-btn' >{props.data.address?.substring(0, 5) + '....' + props.data.address?.substring(props.data.address?.length - 5)}</button></div>)
    }
    else if (props.data?.address === null) 
        return (<div><button className='wallet-btn'>Loading...</button></div>);
    
    else 
        return (<div><button className='wallet-btn' onClick={connectWallet}>Connect Wallet</button></div>);
    

}
export default ConnectWalletBtn;

