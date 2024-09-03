import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';

// Initialize IPFS client

const projectId = 'a7543292f10440c59c1e069483b05b30';
const projectSecret = 'UCo7JrMV5FmmWyzSUUUjiZcg9CKZuSin0XNs3M1obOSy4vSKoW4uYQ';

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64'),
  },
});

const encryptData = (data, secret) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
};

const decryptData = (encryptedData, secret) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const addCandidate = async (candidateData, secret) => {
    try {
        // Encrypt candidate data
        const encryptedData = encryptData(candidateData, secret);

        // Upload encrypted data to IPFS
        const { cid } = await ipfsClient.add(encryptedData);
        const ipfsHash = cid.toString();

        // Set up Ethereum provider and contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Store IPFS hash on-chain
        const data = await contract.addCandidate.populateTransaction(ipfsHash);
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
            "GELATO_APP_API"
        );

        // console.log("Candidate added with IPFS hash!", relayResponse);
        // fetchCandidates(); // Refresh the candidate list
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
};

// Example for decrypting and fetching candidate data
const fetchCandidateData = async (ipfsHash, secret) => {
    try {
        const stream = ipfsClient.cat(ipfsHash);
        let encryptedData = '';
        for await (const chunk of stream) {
            encryptedData += new TextDecoder().decode(chunk);
        }

        // Decrypt the data
        const candidateData = decryptData(encryptedData, secret);
        console.log("Candidate data:", candidateData);
    } catch (error) {
        console.error("Error fetching candidate data:", error);
    }
};
