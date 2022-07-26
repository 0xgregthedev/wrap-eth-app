import {ethers} from 'ethers';
const EnsLookup = async (address) => {
    let provider = ethers.providers.getDefaultProvider();
    return provider.lookupAddress(address)
    
}
export default EnsLookup