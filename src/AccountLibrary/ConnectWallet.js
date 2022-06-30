const ConnectWallet = async (chainId, method = 'eth_accounts') => {
    if (window.ethereum && window.ethereum.isConnected()) {
        if (chainId === '0x1' || chainId === '0x4') {
            try {
                const res = await window.ethereum.request({
                    method: method,
                });

                if (res[0]?.length > 0)  return {address: res[0]};
                else return '';

            } catch (err) {
                return {address: '', error: 'Could not find account'};;
            }

        } else  return {address: '', error: 'Network not supported. Please switch to mainnet or rinkeby.'};

    }
    else console.log('ethereum not connected')

};

export default ConnectWallet;