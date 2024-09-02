// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC2771Context} from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract VotingERC2771 is ERC2771Context {
    // Define a struct for the candidate
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // Define a struct for the voter
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        string name;
    }

    mapping(address => Voter) public voters;
    mapping(bytes32 => Candidate) public candidates;
    bytes32[] public candidateList;

    event VoterRegistered(address voter, string name);
    event Voted(address voter, bytes32 candidate);

    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    // Function to add a candidate
    function addCandidate(string memory name) public {
        bytes32 candidateId = keccak256(abi.encodePacked(name));
        require(
            bytes(candidates[candidateId].name).length == 0,
            "Candidate already exists."
        );
        candidates[candidateId] = Candidate(name, 0);
        candidateList.push(candidateId);
    }

    // Function to register a voter
    function registerVoter(address voterAddress, string memory name) public {
        require(
            !voters[voterAddress].isRegistered,
            "Voter already registered."
        );
        voters[voterAddress] = Voter(true, false, name);
        emit VoterRegistered(voterAddress, name);
    }

    // Function to vote for a candidate
    function vote(bytes32 candidateId) public {
        address voter = _msgSender();
        require(voters[voter].isRegistered, "Voter is not registered.");
        require(!voters[voter].hasVoted, "Voter has already voted.");
        require(
            bytes(candidates[candidateId].name).length != 0,
            "Candidate does not exist."
        );

        voters[voter].hasVoted = true;
        candidates[candidateId].voteCount += 1;

        emit Voted(voter, candidateId);
    }

    // Function to check if a user has voted
    function hasUserVoted(address voterAddress) public view returns (bool) {
        return voters[voterAddress].hasVoted;
    }

    // Function to get the vote count of a candidate
    function getVoteCount(bytes32 candidateId) public view returns (uint256) {
        return candidates[candidateId].voteCount;
    }

    // Function to get all candidates
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidateList.length);
        for (uint256 i = 0; i < candidateList.length; i++) {
            result[i] = candidates[candidateList[i]];
        }
        return result;
    }
}
