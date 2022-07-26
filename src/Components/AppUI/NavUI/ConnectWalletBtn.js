
import React, { useState, useEffect } from 'react';
import './ConnectWalletBtn.css';
import ConnectWallet from '../../../AccountLibrary/ConnectWallet';
import EnsLookup from '../../../AccountLibrary/EnsLookup';
const ConnectWalletBtn = (props) => {
    const [ens, setEns] = useState('');

    useEffect(() => {
        const accountsChangedHandler = async (data) => {
            props.onAddressChange(data[0]);
            setEns(await EnsLookup(data[0]));
        }
        const connectHandler = async (data) => {
            let result = await ConnectWallet(data.chainId);
            props.onAddressChange(result.address ?? '');
            if (!!result.error) props.onError(result.error);
            setEns(await EnsLookup(result.address));
        }
        const chainChangedHandler = async () => {
            let result = await ConnectWallet(window.ethereum.chainId);
            props.onAddressChange(result.address ?? '');
            if (!!result.error) props.onError(result.error);
        }

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', accountsChangedHandler);
            window.ethereum.on('chainChanged', chainChangedHandler);
            window.ethereum.on('connect', connectHandler);
        }
        else  props.onAddressChange('');
    }, [props, ens])

    const connectWallet = async () => {
        let result = await ConnectWallet(window.ethereum?.chainId, 'eth_requestAccounts');
        props.onAddressChange(result.address ?? '');
        setEns(await EnsLookup(result.address));
        if (!!result.error) props.onError(result.error);
    };

    if (props.data?.address?.length > 0) 
        return (<button className={'wallet-btn wallet-btn__' + props.theme} >{ens?.length > 0 ? ens : (props.data.address?.substring(0, 5) + '....' + props.data.address?.substring(props.data.address?.length - 5))}</button>);
    else if (props.data?.address === null) 
        return (<button className={'wallet-btn wallet-btn__' + props.theme}>Loading...</button>);    
    else 
        return (<button className={'pointer wallet-btn wallet-btn__' + props.theme} onClick={connectWallet}>Connect Wallet</button>);
    

}
export default ConnectWalletBtn;

