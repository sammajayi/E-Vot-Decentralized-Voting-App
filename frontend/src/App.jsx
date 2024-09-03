// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";

const VITE_GELATO_API_KEY = import.meta.env.VITE_GELATO_API_KEY;

const relay = new GelatoRelay();

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [voteCandidate, setVoteCandidate] = useState("");
  const [votingStatus, setVotingStatus] = useState("");
  const contractAddress = "0x028CF524e0D6a8706B1E925E7e163b66f3fa5f60"; // Replace with your deployed contract address

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "trustedForwarder",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "candidateId",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "CandidateAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
      ],
      name: "ElectionCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "voter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "candidateId",
          type: "bytes32",
        },
      ],
      name: "Voted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "voter",
          type: "address",
        },
      ],
      name: "VoterAccredited",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "voterAddress",
          type: "address",
        },
      ],
      name: "accreditVoter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "addCandidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
      ],
      name: "createElection",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "electionCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "elections",
      outputs: [
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
      ],
      name: "getCandidates",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
      ],
      name: "getElectionDetails",
      outputs: [
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "candidateCount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "voterAddress",
          type: "address",
        },
      ],
      name: "hasUserVoted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "forwarder",
          type: "address",
        },
      ],
      name: "isTrustedForwarder",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "electionId",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "candidateId",
          type: "bytes32",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // This should provide both signer and provider functionality.

      // For read operations, use the provider without a signer
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // Fetch candidates (view operation)
      const candidatesData = await contract.getCandidates();
      console.log(candidatesData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const addCandidate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // This is necessary for writing to the blockchain
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const data = await contract.addCandidate.populateTransaction(
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
        VITE_GELATO_API_KEY
      );

      console.log("Candidate added!", relayResponse);
      fetchCandidates(); // Refresh the candidate list after adding a new one
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const registerVoter = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const user = (await signer).address;

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const data = await contract.registerVoter.populateTransaction(
        voterAddress,
        voterName
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
        VITE_GELATO_API_KEY
      );

      console.log("Voter registered!", relayResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const voteForCandidate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const user = (await signer).address;
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const candidateId = ethers.keccak256(ethers.toUtf8Bytes(voteCandidate));
      const data = await contract.vote.populateTransaction(candidateId);

      const request = {
        chainId: (await provider.getNetwork()).chainId,
        target: contractAddress,
        data: data.data,
        user: user,
      };

      const relayResponse = await relay.sponsoredCallERC2771(
        request,
        provider,
        VITE_GELATO_API_KEY
      );

      setVotingStatus("Voted successfully!");
      console.log("Voted!", relayResponse);
    } catch (error) {
      console.error(error);
      setVotingStatus("Voting failed.");
    }
  };

  return (
    <div className="App">
      <h1>Decentralized Voting App</h1>

      <div>
        <h2>Add Candidate</h2>
        <input
          type="text"
          placeholder="Candidate Name"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
        />
        <button onClick={addCandidate}>Add Candidate</button>
      </div>

      <div>
        <h2>Register Voter</h2>
        <input
          type="text"
          placeholder="Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Voter Name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
        />
        <button onClick={registerVoter}>Register Voter</button>
      </div>

      <div>
        <h2>Vote for Candidate</h2>
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
        <h2>Candidate List</h2>
        {candidates.map((candidate, index) => (
          <div key={index}>
            <p>Name: {candidate.name}</p>
            <p>Votes: {candidate.voteCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
