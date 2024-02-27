
export const formatAddress = (addr) => {
    return addr.substring(0, 10) + '......' + addr.substring(addr.length - 9);
    //TODO: Use masking instead of hard coding the mask to enable touch and copy on screen
}

// export const expoloreAddress = (address) =>{
//     useHref(`https://testnet.bscscan.com/address/${address}`)
// }