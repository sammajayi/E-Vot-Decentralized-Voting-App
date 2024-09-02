import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const trustedForwarder = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c";

const VotingERC2771Module = buildModule("VotingERC2771Module", (m) => {

    const stake = m.contract("VotingERC2771", [trustedForwarder]);

    return { stake };
});

export default VotingERC2771Module;

// Deployed VotingERC2771: 0x184a253699B4D3a26A4EE09608Bc9400F965d2Fb
