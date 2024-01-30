import React, { useState } from 'react';
import Web3 from 'web3';

const WalletTransfer = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const connectAndTransfer = async () => {
    try {
      // Kết nối đến ví Ethereum
      const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/your-infura-api-key'));

      // Tạo một đối tượng tài khoản từ khóa riêng
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);

      // Kiểm tra số dư của tài khoản
      const balance = await web3.eth.getBalance(account.address);
      console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

      // Tạo một giao dịch
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 21000;
      const nonce = await web3.eth.getTransactionCount(account.address);

      const txObject = {
        from: account.address,
        to: toAddress,
        value: web3.utils.toWei(amountToSend, 'ether'),
        gasPrice: gasPrice,
        gas: gasLimit,
        nonce: nonce,
      };

      // Ký giao dịch
      const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

      // Gửi giao dịch đã ký
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('Transaction successful:', receipt.transactionHash);
      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Wallet Transfer</h2>
      <label>
        From Address:
        <input type="text" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Private Key:
        <input type="text" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
      </label>
      <br />
      <label>
        To Address:
        <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Amount to Send (ETH):
        <input type="text" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} />
      </label>
      <br />
      <button onClick={connectAndTransfer}>Transfer</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default WalletTransfer;