// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { CONTRACT_ABI } from "./abi";
<<<<<<< HEAD
=======

>>>>>>> 28af6c817e93a0d5c6ae10015243ec7f901d1ec3

const relay = new GelatoRelay();
const GELATO_API = import.meta.env.VITE_GELATO_API_KEY;
const now = new Date();
now.setMinutes(now.getMinutes() + 5); // Add 5 minutes
const minDateTime = now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM

console.log(minDateTime)
    

function App() {
	const [newElection, setNewElection] = useState({
		title: "",
		startDate: "",
		endDate: "",
	});
	const [newCandidate, setNewCandidate] = useState("");
	const [electionIdForCandidate, setElectionIdForCandidate] = useState("");
	const [voterAddress, setVoterAddress] = useState("");
	const [electionIdForVoter, setElectionIdForVoter] = useState("");
	const [electionIdToFetch, setElectionIdToFetch] = useState("");
	const [voteCandidate, setVoteCandidate] = useState("");
	const [electionIdForVote, setElectionIdForVote] = useState("");
	const [votingStatus, setVotingStatus] = useState("");
	const [electionData, setElectionData] = useState(null);

	const contractAddress = "0x835022F09805bEEa6CE969e0cc487F7769554e7f"; // Replace with your deployed contract address
	const abi = CONTRACT_ABI;

	const fetchElections = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const contract = new ethers.Contract(contractAddress, abi, provider);

			// Fetch election details
			const [title, startDateBigInt, endDateBigInt, candidateCountBigInt] =
				await contract.getElectionDetails(electionIdToFetch);

			// Convert BigInt to string or number
<<<<<<< HEAD
			const startDate = Number(startDateBigInt);
			const endDate = Number(endDateBigInt);
			const candidateCount = Number(candidateCountBigInt);
=======
			const startDate = Number(startDateBigInt); // Convert BigInt to number if within safe range
			const endDate = Number(endDateBigInt); // Convert BigInt to number if within safe range
			const candidateCount = Number(candidateCountBigInt); // Convert BigInt to number if within safe range
>>>>>>> 28af6c817e93a0d5c6ae10015243ec7f901d1ec3

			// Fetch candidates
			const [candidateIds, names, voteCounts] = await contract.getCandidates(
				electionIdToFetch
			);

			const electionCandidates = candidateIds.map((id, index) => ({
				id: id.toString(), // Convert BigInt to string
				name: names[index],
				voteCount: Number(voteCounts[index]), 
			}));

			// Combine election details with candidates
			const electionData = {
				title,
				startDate: new Date(startDate * 1000).toLocaleDateString(), // Convert UNIX timestamp to date string
				endDate: new Date(endDate * 1000).toLocaleDateString(), // Convert UNIX timestamp to date string
				candidateCount,
				candidates: electionCandidates,
			};

<<<<<<< HEAD
=======
			// Update state with combined data
>>>>>>> 28af6c817e93a0d5c6ae10015243ec7f901d1ec3
			setElectionData(electionData);
		} catch (error) {
			console.error("Error fetching elections:", error);
		}
	};

	const createElection = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);

			const data = await contract.createElection.populateTransaction(
				newElection.title,
				Math.floor(new Date(newElection.startDate).getTime() / 1000),
				Math.floor(new Date(newElection.endDate).getTime() / 1000)
			);

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

			console.log("Election created!", relayResponse);
		} catch (error) {
			console.error("Error creating election:", error);
		}
	};

	const addCandidate = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);

			const data = await contract.addCandidate.populateTransaction(
				electionIdForCandidate,
				newCandidate
			);

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

			console.log("Candidate added!", relayResponse);
		} catch (error) {
			console.error("Error adding candidate:", error);
		}
	};

	const accreditVoter = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);

			const data = await contract.accreditVoter.populateTransaction(
				electionIdForVoter,
				voterAddress
			);

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

			console.log("Voter accredited!", relayResponse);
		} catch (error) {
			console.error("Error accrediting voter:", error);
		}
	};

	const voteForCandidate = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const user = await signer.getAddress();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			const candidateId = ethers.keccak256(ethers.toUtf8Bytes(voteCandidate));
			const data = await contract.vote.populateTransaction(
				electionIdForVote,
				candidateId
			);

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

			setVotingStatus("Voted successfully!");
			console.log("Voted!", relayResponse);
		} catch (error) {
			console.error("Error voting:", error);
			setVotingStatus("Voting failed.");
		}
	};

	return (
		<div className="App">
			<h1>Decentralized Voting App</h1>

			<div>
				<h2>Create Election</h2>
				<input
					type="text"
					placeholder="Election Title"
					value={newElection.title}
					onChange={(e) =>
						setNewElection({ ...newElection, title: e.target.value })
					}
				/>
				<input
					type="datetime-local"
					min={minDateTime}
					placeholder="Start Date and Time"
					value={newElection.startDate}
					onChange={(e) =>
						setNewElection({ ...newElection, startDate: e.target.value })
					}
				/>
				<input
					type="datetime-local"
					min={minDateTime}
					placeholder="End Date and Time"
					value={newElection.endDate}
					onChange={(e) =>
						setNewElection({ ...newElection, endDate: e.target.value })
					}
				/>
				<button onClick={createElection}>Create Election</button>
			</div>

			<div>
				<h2>Add Candidate</h2>
				<input
					type="number"
					placeholder="Election ID"
					value={electionIdForCandidate}
					onChange={(e) => setElectionIdForCandidate(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Candidate Name"
					value={newCandidate}
					onChange={(e) => setNewCandidate(e.target.value)}
				/>
				<button onClick={addCandidate}>Add Candidate</button>
			</div>

			<div>
				<h2>Accredit Voter</h2>
				<input
					type="number"
					placeholder="Election ID"
					value={electionIdForVoter}
					onChange={(e) => setElectionIdForVoter(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Voter Address"
					value={voterAddress}
					onChange={(e) => setVoterAddress(e.target.value)}
				/>
				<button onClick={accreditVoter}>Accredit Voter</button>
			</div>

			<div>
				<h2>Vote for Candidate</h2>
				<input
					type="number"
					placeholder="Election ID"
					value={electionIdForVote}
					onChange={(e) => setElectionIdForVote(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Candidate Name"
					value={voteCandidate}
					onChange={(e) => setVoteCandidate(e.target.value)}
				/>
				<button onClick={voteForCandidate}>Vote</button>
				<p>{votingStatus}</p>
			</div>
			<div>
				<h2>Get election Result</h2>
				<input
					type="number"
					placeholder="Election ID"
					value={electionIdToFetch}
					onChange={(e) => setElectionIdToFetch(e.target.value)}
				/>

				<button onClick={fetchElections}>Fetch Election</button>
				<p>{votingStatus}</p>
			</div>

			{electionData && (
				<div>
					<h1>{electionData.title}</h1>
					<p>Start Date: {electionData.startDate}</p>
					<p>End Date: {electionData.endDate}</p>
					<p>Total Candidates: {electionData.candidateCount}</p>
					<ul>
						{electionData.candidates.map((candidate) => (
							<li key={candidate.id}>
								{candidate.name} - Votes: {candidate.voteCount}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
