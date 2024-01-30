// MyComponent.js
import React, { useState } from "react";
import Web3 from "web3";
import ABI from "../public/locale/ABI.json";
import { log } from "console";

const HandleSmartContract = () => {
  const [contractAddress, setContractAddress] = useState(
    "0x6f14fB077636e71df457158B1589B5fE4c50f223"
  );

  const [contractAbi, setContractAbi] = useState(ABI);
  const [tokenAddress, setTokenAddress] = useState(
    "0x68Ea978Fe22BaBa155De4E3E61Be9e07583a682E"
  );
  const [ownerAddress, setOwnerAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const checkOwnership = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      console.log(666,contractAbi);

      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      console.log(999,contract);

      const owner = await contract.methods.owner().call();

      console.log(32333,contract);
      const isOwner = owner === window.ethereum.selectedAddress;
      

      setOwnerAddress(owner);
      setIsOwner(isOwner);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const withdrawFunds = async () => {
    try {
      const web3 = new Web3(window.ethereum);

      if (!isOwner) {
        console.error("You are not the owner. Cannot withdraw funds.");
        return;
      }

      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Gọi phương thức trong smart contract để thực hiện rút tiền
      const result = await contract.methods
        .withdrawFunds()
        .send({ from: window.ethereum.selectedAddress });

      console.log("Withdrawal successful:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Smart Contract Interaction</h2>
      <p>Contract Address: {contractAddress}</p>
      <p>Token Address: {tokenAddress}</p>
      <button onClick={checkOwnership}>Check Ownership</button>
      <p>Owner Address: {ownerAddress}</p>
      {isOwner && <button onClick={withdrawFunds}>Withdraw Funds</button>}
    </div>
  );
};

export default HandleSmartContract;
