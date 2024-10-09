"use client"
import Link from "next/link";
import { useReadContract, useAccount } from 'wagmi'
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { CONTRACT_ABI } from "@/constants/abi";
import { useCallback, useEffect, useState } from "react";
import { ethers, Contract, Interface } from "ethers";
import { toast } from "react-toastify";

const multicallAbi = [
  "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

export default function Elections() {
    const [elections, setElections] = useState(null);
    const [loading, setloading] = useState(null);
	const {  isConnected } = useAccount();
    // const fetchElections = useCallback(() => {
    //     console.log("election now")
    //     try {
    //         const result = useReadContract({
    //             abi: CONTRACT_ABI,
    //             address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    //             functionName: 'elections',
    //             args: [1]
    //           })
    //         //   setElections(result);
    //         if (!result.isLoading) {
    //             console.log("election", result)
    //         }
            
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // })
    const relay = new GelatoRelay();
    const GELATO_API = process.env.NEXT_PUBLIC_GELATO_API_KEY;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const readOnlyProposalContract = new Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
    )
    async function fetchElections() {
		if(isConnected) {
		try {
			setloading(true)
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
	
			const data = await contract.elections.populateTransaction(1);
			console.log("data", data)
	
			const user = await signer.getAddress();
			const request = {
			chainId: (await provider.getNetwork()).chainId,
			target: contractAddress,
			data: data.data,
			user: user,
			};
	
			const relayResponse = await relay.sponsoredCallERC2771(
			request,
			provider,
			GELATO_API
			);
			

			setloading(false)
			setOpen(true)
			// const txHash = await getTransactionHash(relayResponse);
			console.log("Election gotten!", relayResponse);
		} catch (error) {
			setloading(false)
			return toast.error("Error creating election");
			// console.error("Error creating election:", error);
		}
		} else {
		return toast.error("Please connect your wallet");
		}
	}

    // const fetchElections = useCallback(async () => {
    //     if (!readOnlyProposalContract) return;
    
    //     const multicallContract = new Contract(
    //       process.env.NEXT_PUBLIC_MULTICALL_ADDRESS,
    //       multicallAbi,
    //       provider
    //     );
    
    //     const itf = new Interface(CONTRACT_ABI);
    
    //     try {
    //       const proposalCount = Number(
    //         await readOnlyProposalContract.electionCount()
    //       );

    //       console.log({proposalCount})
    
    //       const proposalsIds = Array.from(
    //         { length: proposalCount - 1 },
    //         (_, i) => i + 1
    //       );
    
    //       const calls = proposalsIds.map((id) => ({
    //         target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    //         callData: itf.encodeFunctionData("elections", [id]),
    //       }));
    
    //       const responses = await multicallContract.tryAggregate.staticCall(
    //         true,
    //         calls
    //       );

    //       console.log({responses})
    
    //       const decodedResults = responses.map((res) =>
    //         itf.decodeFunctionResult("elections", res.returnData)
    //       );
    //       console.log({decodedResults})
    //     //   setProposals(data);
    //     } catch (error) {
    //       console.log("error fetching proposals: ", error);
    //     }
    //   }, [readOnlyProposalContract, provider]);

    useEffect(() => {
        fetchElections()
    }, [fetchElections])
  return (
    <div className="py-10 px-20">
        <div>
            <p className="text-[32px] font-medium form-item">Live Elections</p>
            <p className=" form-item">Vote to make your voice heard</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center border rounded-lg p-10 gap-14 mt-10 form-item">
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item">
                <p className="text-[24px] font-medium form-item">Unilag Student Union Representative</p>
                <p className="text-sm font-normal text-[#8F96A1] form-item">Election running from - 1st September to 12th September, 2024</p>
                <Link href="/election-details">
                <button className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-16 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Click To View
                </button>
                </Link>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item">
                <p className="text-[24px] font-medium form-item">LASU Student Union Representative</p>
                <p className="text-sm font-normal text-[#8F96A1] form-item">Election running from - 4th September to 20th September, 2024</p>
                <Link href="/election-details">
                <button className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-16 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Click To View
                </button>
                </Link>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item">
                <p className="text-[24px] font-medium form-item">FUTO Student Union Representative</p>
                <p className="text-sm font-normal text-[#8F96A1] form-item">Election running from - 3rd September to 19th September, 2024</p>
                <Link href="/election-details">
                <button className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-16 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Click To View
                </button>
                </Link>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item">
                <p className="text-[24px] font-medium form-item">Uniben Student Union Representative</p>
                <p className="text-sm font-normal text-[#8F96A1] form-item">Election running from - 3rd September to 15th September, 2024</p>
                <Link href="/election-details">
                <button className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-16 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Click To View
                </button>
                </Link>
            </div>
        </div>
    </div>
  );
}
