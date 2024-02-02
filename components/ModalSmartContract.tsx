import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import buyAbi from "../public/locale/buyAbi.json";
import tokenAbi from "../public/locale/tokenAbi.json";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicModal({
  isOpen,
  onCloseModal,
  propsEmail,
  emitCloseModal,
  // emitCloseModalComfirm
}) {
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
  const [isComfirm, setIsComfirm] = useState(false);
  const [packageId, setPackageId] = useState(1);

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
  function extractCode(inputString) {
    const regex = /code=([A-Z_]+)/;
    const match = inputString.match(regex);
    if (match && match[1]) {
      return match[1]; 
    } else {
      return null; 
    }
  }

  const handelBuyPackage = async () => {
    try {
      let allowance = await tokenContract.allowance(
        signer,
        tokenContractAddress
      );
      setAlowancePrice(allowance?._hex);
      let hasApproved = false;
      console.log(1, buyPrice);
      console.log(2, allowancePrice);
      console.log(2, new BigNumber(allowancePrice));
      if (buyPrice <= allowancePrice) {
        await buyContract.buyPremium(packageId, propsEmail);
        allowance = await tokenContract.allowance(signer, tokenContractAddress);
        setAlowancePrice([]);
        emitCloseModal();
        setIsComfirm(false);
        toast.success(" You have successfully upgrade!");
      } else {
        if (!hasApproved) {
          setAlowancePrice(allowance?._hex);
          await tokenContract.approve(buyContractAddress, buyPrice.toString());
          console.log(9999, allowancePrice);
          hasApproved = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          allowance = await tokenContract.allowance(
            signer,
            tokenContractAddress
          );
          setAlowancePrice(allowance?._hex);
          setIsComfirm(true);
        }
      }
    } catch (error) {
      console.log(error.message);
      console.log(1, typeof error.message);
      console.error("Lỗi kiểm tra allowance:", error.message);
      const codeValue = extractCode(error.message);
      console.log(11, codeValue);
      if (codeValue === "ACTION_REJECTED") {
        emitCloseModal();
        return
      } else {
        setTimeout(async () => {
          await handelBuyPackage();
        }, 5000);

        console.log(5555, "đang  gọi tieeps");
      }

      return false;
    }
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isOpen}
        onClose={onCloseModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 900,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {!isComfirm
              ? `Transaction information of email: ${propsEmail}`
              : `Transaction Comfirm of email: ${propsEmail}`}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <p>Account address: {tokenContractAddress}</p>
            <p>Owner address: {owner}</p>
            <p>Package price: {buyPrice}</p>
          </Typography>
          {isComfirm && <p className="text-[red]">Are you sure to comfirm</p>}
          <Button variant="solid" onClick={handelBuyPackage}>
            {!isComfirm ? "Buy" : "Comfirm"}
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
