// MyComponent.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import buyAbi from "../public/locale/buyAbi.json";
import tokenAbi from "../public/locale/tokenAbi.json";
import BigNumber from 'bignumber.js';

const HandleSmartContract = () => {
  const buyContractAddress = "0x8CA19c8B4cB13eC323A1E64A9c1455762255e705";
  const tokenContractAddress = "0x68Ea978Fe22BaBa155De4E3E61Be9e07583a682E";
  const buyContractAbi = buyAbi;
  const tokenContractAbi = tokenAbi;
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [buyPrice, setBuyPrice] = useState([]);
  const [allowancePrice, setAlowancePrice] = useState([]);
  const [buyContract, setBuyContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [packageId, setPackageId] = useState(1);
  const [accountEmail, setAccountEmail] = useState("huhu12123@gmail.com");

  useEffect(() => {
    const initEthers = async () => {
      try {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        await window.ethereum.enable();
        const signer = await ethProvider.getSigner();
        const signerAddress = await signer.getAddress();
        setSigner(signerAddress);

        const ethSignerBuyContract = new ethers.Contract(
          buyContractAddress,
          buyContractAbi,
          ethProvider
        ).connect(ethProvider.getSigner());
        setBuyContract(ethSignerBuyContract);
        const getpackagePrices = await ethSignerBuyContract.packagePrices(
          packageId
        );

        const decimals = await ethSignerBuyContract.getDecimals();
        setBuyPrice(
          parseInt(getpackagePrices?._hex, 16) *
            Math.pow(10, parseInt(decimals?._hex, 16))
        );
        const ethSignerTokenContract = new ethers.Contract(
          tokenContractAddress,
          tokenContractAbi,
          ethProvider
        ).connect(ethProvider.getSigner());
        setTokenContract(ethSignerTokenContract);
        console.log(ethSignerTokenContract);

        const contractOwner = await ethSignerBuyContract.owner();
        setOwner(contractOwner);
      } catch (error) {
        console.error("Lỗi kết nối Ethers:", error.message);
      }
    };

    initEthers();
  }, []);

  const checkAllowance = async () => {
    try {
      const allowance = await tokenContract.allowance(
        signer,
        tokenContractAddress
      );
      setAlowancePrice(allowance?._hex);
      console.log(1, buyPrice);
      console.log(2, allowancePrice);
      console.log(2, new BigNumber(allowancePrice));
      if (buyPrice <= allowancePrice) {
        await buyContract.buyPremium(packageId, accountEmail);

        console.log(444433333333);
        // console.log(rest);
      } else {
        await tokenContract.approve(buyContractAddress, buyPrice.toString());
        // setAlowancePrice(parseInt(allowance?._hex, 16));
        // console.log(3,parseInt(allowance?._hex, 16));
        
        console.log(9999, allowancePrice);
        // setAlowancePrice(parseInt(allowance?._hex, 16));
        // console.log(12312, buyContract);
      }
    } catch (error) {
      console.error("Lỗi kiểm tra allowance:", error.message);
      return false;
    }
  };

  return (
    <div>
      <h1>Next.js Web3 Example</h1>
      <p>Địa chỉ tài khoản: {tokenContractAddress}</p>
      <p>Địa chỉ chủ sở hữu: {owner}</p>
      <p>buyAllowance: {buyPrice}</p>
      <p>currentAlowance: {allowancePrice}</p>

      <button onClick={checkAllowance}>Buy Package</button>
    </div>
  );
};

export default HandleSmartContract;
