import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const trustedForwarder = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c";

const CounterERC2771Module = buildModule("CounterERC2771Module", (m) => {

    const stake = m.contract("CounterERC2771", [trustedForwarder]);

    return { stake };
});

export default CounterERC2771Module;

// Deployed CounterERC2771: 0x184a253699B4D3a26A4EE09608Bc9400F965d2Fb
