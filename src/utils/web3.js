// import {providers} from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// //  Create WalletConnect Provider
// const web3Provider = new WalletConnectProvider({
//   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
// });
// let provider;
// export async function askForWallet() {
//   //  Enable session (triggers QR Code modal)
//   try {
//     await web3Provider.enable();
//   } catch (error) {
//     console.log(error);
//     return;
//   }

//   //  Wrap with Web3Provider from ethers.js
//   provider = new providers.Web3Provider(web3Provider);
// }

// export function test() {
//   console.log(provider.accounts);
// }
export async function askForWallet() {
  // eslint-disable-next-line no-undef
  return ethereum.request({method: "eth_requestAccounts"});
}

export async function sendTx(to, value, gasPrice, gas, data, account) {
  // eslint-disable-next-line no-undef
  return ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: account,
        to: to,
        value: value,
        gasPrice: gasPrice,
        gas: gas,
        data: data,
      },
    ],
  });
}
