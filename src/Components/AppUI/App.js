import ConnectWalletBtn from './ConnectWalletBtn';
import WrapUI from '../WrapUI/WrapUI';
import Background from './Background';
import Modal from './Modal';
import GetBalances from '../../AccountLibrary/GetBalances';
import { useState } from 'react';

function App() {
  const [accountState, setAccountState] = useState({ ethBalance: 0.0, wethBalance: 0.0, address: null });
  const [modalState, setModalState] = useState({ msg: '', link: '', status: '' })

  const addressChangeHandler = async (newAddress) => {
    if (newAddress.length > 0) {
      setAccountState({ ethBalance: 0.0, wethBalance: 0.0, address: null });
      setAccountState(await GetBalances(newAddress));
    }
    else setAccountState({ ethBalance: 0.0, wethBalance: 0.0, address: '' });
  }
  const transactionHandler = async (transactionData) => {
    let tx = await transactionData;
    let linkBase = window.ethereum.chainId === '0x1' ? 'https://www.etherscan.io/tx/' : window.ethereum.chainId === '0x4' ? 'https://rinkeby.etherscan.io/tx/' : '';
    setModalState(() => {
      return { msg: 'Processing transaction...', status: 'pending', link: linkBase + tx.hash }
    })

    let txRes = await tx.wait(2)
    if (txRes.status === 1) setModalState((prevModalState) => {
      return { ...prevModalState, msg: 'Transaction successful', status: 'success' }
    })
    else setModalState((prevModalState) => {
      return {
        ...prevModalState, msg: 'Transaction failed', status: 'fail',
      }
    })

    setAccountState(await GetBalances(accountState.address));
    setTimeout(() => {
      setModalState(() => {
        return { msg: '', link: '', status: '' }
      })
    }, 5000)
  }

  const errorHandler = (errorMsg) => {
    setModalState(() => {
      return { msg: errorMsg, link: '', status: '' }
    })
    setTimeout(() => {
      setModalState(() => {
        return { msg: '', link: '', status: '' }
      })
    }, 5000)
  }

  return (
    <Background>
      <ConnectWalletBtn data={accountState} onAddressChange={addressChangeHandler} onError={errorHandler}></ConnectWalletBtn>
      <WrapUI accountData={{ ...accountState }} onTransaction={transactionHandler}></WrapUI>
      <Modal msg={modalState.msg} link={modalState.link} status={modalState.status}></Modal>
    </Background>

  );
}

export default App;
