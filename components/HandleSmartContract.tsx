// MyComponent.js
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../public/locale/ABI.json";
const HandleSmartContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState('');
  const [packageId, setPackageId] = useState(1);
  const [accountEmail, setAccountEmail] = useState('123@example.com');

  useEffect(() => {
    const initEthers = async () => {
      try {
        // Khởi tạo Ethereum provider
        const ethProvider = new ethers.providers.JsonRpcProvider('https://bsc-testnet.blockpi.network/v1/rpc/public');
        setProvider(ethProvider);
        console.log(1231231,ethProvider);

        // Lấy địa chỉ chủ sở hữu và địa chỉ contract từ smart contract
        const contractAddress = '0x1C674CBBAAE98dB354528cD96767C996Eb49d8e5';
        const contractAbi = ABI;
        const ethSigner = new ethers.Contract(contractAddress, contractAbi, ethProvider);
        const contractOwner = await ethSigner.owner();
        setOwner(contractOwner);
        setSigner(ethProvider.getSigner());
        setContract(ethSigner);
        console.log(9999,ethProvider.getSigner());
        console.log(2222,contractOwner);
      } catch (error) {
        console.error('Lỗi kết nối Ethers:', error.message);
      }
    };

    initEthers();
  }, []);

  const checkAllowance = async (spender, amount) => {
    try {
      // Kiểm tra allowance từ smart contract
      const allowance = await contract.checkAllowance(spender, amount);
      return allowance;
    } catch (error) {
      console.error('Lỗi kiểm tra allowance:', error.message);
      return false;
    }
  };

  const buyPremium = async () => {
    const spender = '0x1C674CBBAAE98dB354528cD96767C996Eb49d8e5'; // Địa chỉ của tài khoản quản lý chi trả token
    const requiredAllowance = 0; // Số lượng token cần kiểm tra allowance

    try {
      // Kiểm tra allowance
      const isAllowanceEnough = await checkAllowance(spender, requiredAllowance);
      console.log(333666,isAllowanceEnough);

      if (!isAllowanceEnough) {
        console.log('Allowance không đủ. Không thể mua gói premium.');
        return;
      }

      // Nếu allowance đủ, thực hiện mua gói premium
      const result = await contract.buyPremium(packageId, accountEmail);
      console.log('Gói premium đã được mua thành công:', result);
    } catch (error) {
      console.error('Lỗi mua gói premium:', error.message);
    }
  };

  return (
    <div>
      <h1>Next.js Web3 Example</h1>
      <p>Địa chỉ tài khoản: {accounts[0]}</p>
      <p>Địa chỉ chủ sở hữu: {owner}</p>
      <button onClick={buyPremium}>Mua Gói Premium</button>
    </div>
  );
};

export default HandleSmartContract;
