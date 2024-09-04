"use client";
import { useState } from "react";
import Link from "next/link";
import Web3 from "web3";
// import { connectWallet } from './web3modal';

export default function Onboard() {
    const projectId = "a6a91196516cd2b211e9d6bebf8a5c13"
    const [walletAddress, setWalletAddress] = useState(null);
    // const mainnet = {
    //     chainId: 1,
    //     name: 'Ethereum',
    //     currency: 'ETH',
    //     explorerUrl: 'https://etherscan.io',
    //     rpcUrl: 'https://cloudflare-eth.com'
    // }
    // const metadata = {
    //     name: 'Evolt',
    //     description: 'Decentralized voting app',
    //     url: 'http://localhost:3001', // origin must match your domain & subdomain
    //     icons: ['https://avatars.mywebsite.com/']
    // }
    // const web3Config = defaultConfig({
    //     /*Required*/
    //     metadata,
      
    //     /*Optional*/
    //     enableEIP6963: true, // true by default
    //     enableInjected: true, // true by default
    //     enableCoinbase: true, // true by default
    //     rpcUrl: '...', // used for the Coinbase SDK
    //     defaultChainId: 1, // used for the Coinbase SDK
    //   })
    //   createWeb3Modal({
    //     ethersConfig,
    //     chains: [mainnet],
    //     projectId,
    //     enableAnalytics: true // Optional - defaults to your Cloud configuration
    //   })
    const handleConnect = async () => {
        console.log("tryy1", window.ethereum)
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const accounts = await web3.eth.getAccounts();
              console.log('Connected account:', accounts[0]);
            } catch (error) {
              console.error('User denied account access', error);
            }
          } else {
            console.log('MetaMask is not installed');
          }
        // try {
        //     console.log("tryy2")
        //     const web3 = await connectWallet()
        //     console.log("tryy3");
        //     const accounts = await web3.eth.getAccounts();
        //     setWalletAddress(accounts[0]);
        //   } catch (error) {
        //     console.error(error);
        //   }
    }
    return (
        <header>
            <navbar className="flex h-[10vh] justify-around items-center fixed top-0 right-0 min-w-[100vw] bg-[#ffffff] border-b-2">
            <div className="logo mr-[-10px]">
                <img src="/assets/Logo.png" alt="logo" />
            </div>

            <div className="flex ml-20 ">
                <ul className="flex ">
                <li className="px-8 font-medium">
                    <Link href="/">Dashboard</Link>
                </li>
                <li className="px-8 font-medium">
                    <Link href="/">Vote</Link>
                </li>
                <li className="px-8 font-medium">
                    <Link href="/">KYC</Link>
                </li>
                </ul>
            </div>

            <div>
                <button onClick={handleConnect} className="space-x-4 bg-[#9747FF] text-white rounded-lg w-[9rem] h-[2.5rem] ml-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                {!walletAddress ? 'Connect Wallet': {walletAddress}}
                </button>
            </div>
            </navbar>
        </header>
    )
}