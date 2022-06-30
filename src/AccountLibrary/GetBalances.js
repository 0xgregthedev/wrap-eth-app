import { ethers } from 'ethers';
import GetContract from './GetContract';
const GetBalances = async (address) => {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    let data;
    try {
      let wethContract = await GetContract(provider);
      const ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address?.toString(), 'latest'],
      });
      const wethBalance = await wethContract.balanceOf(address);
      data = {
        ethBalance: ethers.utils.formatEther(ethBalance),
        wethBalance: ethers.utils.formatEther(wethBalance),
        address: address
      };
    } catch (err) {
      console.log('failed to get balances');
    }
    return data;
}

export default GetBalances;