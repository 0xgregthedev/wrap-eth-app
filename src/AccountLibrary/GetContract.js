import { ethers } from "ethers";
import WethAbiMainnet from './ContractABIs/WethAbi.json';
import WethAbiRinkeby from './ContractABIs/WethAbiRinkeby.json';
const GetContract = async (provider) => {
    let contract;
    switch (window.ethereum?.chainId) {
        case '0x1':
            contract = new ethers.Contract('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', WethAbiMainnet, provider.getSigner());
            break;
        case '0x4':
            contract = new ethers.Contract('0xc778417E063141139Fce010982780140Aa0cD5Ab', WethAbiRinkeby, provider.getSigner());
            break;
        case null:
            break;
        default:
            console.log("Network not supported");
            break;
    }
    return contract;
}

export default GetContract;