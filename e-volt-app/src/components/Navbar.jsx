"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Web3 from "web3";
// import { connectWallet } from './web3modal';
import {
    useWeb3ModalTheme,
    createWeb3Modal,
    defaultConfig,
  } from 'web3modal-web3js/react';


  const projectId = "a6a91196516cd2b211e9d6bebf8a5c13"
  const chains = [
    {
      chainId: 1,
      name: 'Ethereum',
      currency: 'ETH',
      explorerUrl: 'https://etherscan.io',
      rpcUrl: 'https://cloudflare-eth.com',
    },
    {
      chainId: 42161,
      name: 'Arbitrum',
      currency: 'ETH',
      explorerUrl: 'https://arbiscan.io',
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
    },
  ];
  
  const web3Config = defaultConfig({
    metadata: {
      name: 'Web3Modal',
      description: 'Web3Modal Laboratory',
      url: 'https://web3modal.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
    defaultChainId: 1,
    rpcUrl: 'https://cloudflare-eth.com',
  });
  
  // 3. Create modal
  createWeb3Modal({
    web3Config,
    chains,
    projectId,
    enableAnalytics: true,
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#00DCFF',
      '--w3m-color-mix-strength': 20,
    },
  });

export default function Onboard() {
    const btnRef = useRef(null);

    return (
        <header>
            <navbar className="flex h-[10vh] justify-around items-center fixed top-0 right-0 min-w-[100vw] bg-[#ffffff] border-b-2">
            <div className="logo mr-[-10px]">
                <img src="/assets/Logo.png" alt="logo" />
            </div>

            <div className="flex ml-20">
                <ul className="flex gap-16">
                <li className="px-2 text-[#8F96A1] font-medium target:text-blue-600 hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links" id="dashboard">
                    <Link className="" href="/">Dashboard</Link>
                </li>
                <li className="px-2 text-[#8F96A1] font-medium target:text-blue-600 hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links" id="elections">
                    <Link className="" href="/elections">Vote</Link>
                </li>
                {/* <li className="px-8  nav-linksfont-medium">
                    <Link hre className=""f="/kyc">KYC</Link>
                </li> */}
                <li className="px-2 text-[#8F96A1] font-medium target:text-blue-600 hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links" id="addElection">
                    <Link className="" href="/addElection">Create Election</Link>
                </li>
                </ul>
            </div>

            <div>
                {/* <div className="flex items-center justify-center space-x-4 bg-[#9747FF] text-white rounded-lg w-[9rem] h-[2.5rem] ml-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 z-50"> */}
                    <w3m-button />
                {/* </div> */}
                {/* <button onClick={handleConnect} className="space-x-4 bg-[#9747FF] text-white rounded-lg w-[9rem] h-[2.5rem] ml-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 z-50">
                {/* <w3m-button /> 
                </button> */}
            </div>
            </navbar>
        </header>
    )
}