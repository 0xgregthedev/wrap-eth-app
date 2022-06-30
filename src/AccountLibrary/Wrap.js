import { ethers } from 'ethers';
import GetContract from './GetContract';

const Wrap = async (inputs) => {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
   
    const processTx = async (contract) => {
        if (inputs.inputCoin === 'ETH') {
            let reciept =  await contract.functions.deposit({ value: ethers.utils.parseEther(inputs.inputValue.toString()) });
            let tx =  provider.getTransaction(reciept.hash)
            return tx;
        }
        else if (inputs.inputCoin === 'wETH') {
            let reciept =  await contract.functions.withdraw(ethers.utils.parseEther(inputs.inputValue.toString()));
            let tx =  provider.getTransaction(reciept.hash)
            return tx;
        }
        else return null;
        
    }
    let contract = await GetContract(provider);
    return processTx(contract);


}

export default Wrap