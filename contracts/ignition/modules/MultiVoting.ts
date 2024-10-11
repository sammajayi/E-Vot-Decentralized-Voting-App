import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const trustedForwarder = "0x941D860B7f971D5b52b1CDb3793f02C18704FDD2"

const MultiElectionVotingModule = buildModule("MultiElectionVotingModule", (m) => {

  const election = m.contract("MultiElectionVoting", [trustedForwarder]);

  return { election };
});

export default MultiElectionVotingModule;
