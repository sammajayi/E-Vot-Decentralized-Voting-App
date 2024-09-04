"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Web3 } from "web3";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import SuccessModal from "@/components/SuccessModal";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { CONTRACT_ABI } from "@/constants/abi";
import { toast } from "react-toastify";
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "web3modal-web3js/react";
import { ethers } from "ethers";

const contractAddress = "0x5c2fa0a4bA3878028C83127B62e1279FEc3673bc"; // Replace with your deployed contract address

const relay = new GelatoRelay();
const GELATO_API = process.env.NEXT_PUBLIC_GELATO_API_KEY;
const now = new Date();
now.setMinutes(now.getMinutes() + 5); // Add 5 minutes
const minDateTime = now.toISOString().slice(0, 16);

export default function Onboard() {
	const [open, setOpen] = useState(false);
	const [newElection, setNewElection] = useState({
		title: "",
		startDate: "",
		endDate: "",
	});
	const router = useRouter();
	const { address, chainId, isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	async function addElection(e) {
		e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
   
		try {
			if (!isConnected) {
				return toast.error("Please connect your wallet");
			}
			const web3 = new Web3({
				provider: walletProvider,
				config: { defaultNetworkId: chainId },
			});
      

			const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
			const data = contract.methods
				.createElection(
					newElection.title,
					Math.floor(new Date(newElection.startDate).getTime() / 1000),
					Math.floor(new Date(newElection.endDate).getTime() / 1000)
				)
				.encodeABI();
			const request = {
				chainId,
				target: contractAddress,
				data: data.data,
				user: address,
			};

			const relayResponse = await relay.sponsoredCallERC2771(
				request,
				provider,
				GELATO_API
			);

			console.log("Election created!", relayResponse);
		} catch (error) {
			console.log(error)
		}

		// const balance = await contract.methods.balanceOf(address).call();
		// const name = await contract.methods.name().call();
		// setUSDTBalance(Number(balance));
		// setSmartContractName(name);
	}

	const handleClick = () => {
		const image = document.getElementsByClassName("uploadNIN");
		const input = document.querySelector("input[type='file']");
		input.click();
	};

	return (
		<main className=" flex justify-center items-start h-screen py-10">
			<div className="w-[34rem] h-[79vh] border rounded-lg p-6 py-10">
				<div className="flex flex-col justify-start items-center align-middle h-[69vh] overflow-scroll">
					<h2 className="text-xl font-bold non-italic justify-center items-center text-center pb-2 text-wrap form-item">
						Create An Election.
					</h2>
					<p className="font-normal text-slate-400 text-center form-item">
						Fill the input fields below.
					</p>
					<form onSubmit={addElection} className="mt-10">
						<div className=" form-item">
							<label htmlFor="" className="block pb-1.5 font-medium">
								Election Title
							</label>
							<input
								type="text"
								value={newElection.title}
								onChange={(e) =>
									setNewElection({ ...newElection, title: e.target.value })
								}
								placeholder="Input election title"
								id="title"
								className="pt- w-[28rem] pl-5 h-[2.8rem] border-[#8F96A1] border rounded-md"
							/>
						</div>

						<div className="pt-4 form-item">
							<label htmlFor="" className="block pb-1.5 font-medium">
								Start Date
							</label>
							<input
								type="datetime-local"
								min={minDateTime}
								placeholder="Start Date and Time"
								value={newElection.startDate}
								onChange={(e) =>
									setNewElection({ ...newElection, startDate: e.target.value })
								}
								id="startDate"
								required
								className="w-[28rem] h-[2.8rem] border-[#8F96A1] border rounded-md pl-5"
							/>
						</div>

						<div className="pt-4 form-item">
							<label htmlFor="" className="block pb-1.5 font-medium">
								End Date
							</label>
							<input
								type="datetime-local"
								min={minDateTime}
								placeholder="End Date and Time"
								value={newElection.endDate}
								onChange={(e) =>
									setNewElection({ ...newElection, endDate: e.target.value })
								}
								id="endDate"
								required
								className="w-[28rem] h-[2.8rem] border-[#8F96A1] border rounded-md pl-5"
							/>
						</div>

						<div class="flex space-x-4 pt-5 ml-2 form-item">
							<button
								type="button"
								onClick={() => {
									router.back();
								}}
								className="border-[#8F95B1] border text-black w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-[#5773fb] text-white w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
							>
								Proceed
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* voting time */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="relative z-10"
			>
				<SuccessModal onCloseModal={() => setOpen(false)} />
			</Dialog>
		</main>
	);
}
