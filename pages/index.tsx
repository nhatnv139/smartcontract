import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import logo from "../public/images/logopc.png";
import logomb from "../public/images/logomb.png";

import img2 from "../public/images/left.svg";
import img3 from "../public/images/Interface.svg";
import img4 from "../public/images/Gem.png";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../components/CustomSelect";
import ModalSmartContract from "../components/ModalSmartContract";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../api/index";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [email, setEmail] = useState("123@gmail.com");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const itemList = [
    {
      id: 1,
      label:
        "No KYC Required: Enjoy transfer coins transactions between accounts without the hassle.",
      iconSrc: img3,
    },
    {
      id: 2,
      label:
        "Deposit ATH to Athene Gaming and Athene Prediction: Immerse yourself in the gaming world like never before.",
      iconSrc: img3,
    },
    {
      id: 3,
      label: "Increase the Booster Coefficient by 30% on the Athene App.",
      iconSrc: img3,
    },
    {
      id: 4,
      label: " And many more special benefits to elevate your experience.",
      iconSrc: img3,
    },
  ];
  const itemListGem = [
    {
      id: 1,
      label: "F1: $1/ref",
      iconSrc: img4,
    },
    {
      id: 2,
      label: "F2: $0.5/ref",
      iconSrc: img4,
    },
  ];
  const itemListPurchase = [
    {
      id: 1,
      label: "1. Connect your wallet by clicking the button 'Connect Wallet'",
    },
    {
      id: 2,
      label: "2. Enter your Athene account (your email)",
    },
    {
      id: 3,
      label: "3. Click the 'Buy Premium' button and confirm the transaction",
    },
    {
      id: 4,
      label:
        "4. The system will automatically process transactions and update your account's Premium Package.",
    },
  ];
  const fetchCheckEmailData = async () => {
    try {
      const response = await axios.post("api/v1.0/site-wallet/check-email", {
        email: email,
      });
      if (response.data.data === true) {
        toast.success(" You have successfully confirmed your email!");
        openModal();
      } else {
        console.log(987);
        toast.error("Your email is not correct");
      }

      console.log("Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleButtonClick = () => {
    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    fetchCheckEmailData();
    // openModal();

    console.log(123123123);
  };
  const handleClick = () => {
    setShowSubtitle(!showSubtitle);
  };
  const handleChange = (selectedOption) => {
    console.log(`Selected: ${selectedOption.label}`);
  };
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Athene</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt="picture"
              layout="fixed"
            />
          </div>
          <div className={styles.logomb}>
            <Image
              src={logomb}
              alt="picture"
              layout="fixed"
            />
          </div>
          <div className={styles.actionBtn}>
            <div className={styles.actionBtnConnet}>
              <ConnectButton label="Connect Wallet" accountStatus="address" />
            </div>
            <div className={styles.actionBtnSelect}>
              <CustomSelect onChange={handleChange} />
            </div>
          </div>
        </div>
        {/* content */}
        <div className={styles.homeContent}>
          <div className={styles.homeContentTitle}>
            Welcome to Athene Network
          </div>
          <div className={styles.homeContentSub}>
            Please connect your wallet to purchase the Premium Package. With
            only $3, you will get incredible benefits
          </div>
          <div className={styles.homeContentChooie}>
            <ul>
              {itemList.map((item, index) => (
                <li key={item.id} className={styles.homeContentChooieItem}>
                  <Image
                    src={item.iconSrc}
                    alt="picture"
                    layout="fixed"
                    width={16}
                    height={16}
                    className={styles.homeContentChooieImage}
                  />
                  <div className={styles.homeContentChooieItemText}>
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.homeContentGemTitle}>
            For every user you introduce who purchases the Premium Package,
            you'll earn fantastic commissions
          </div>
          <div className={styles.homeContentGemItem}>
            <div>
              {itemListGem.map((item, index) => (
                <li key={item.id} className={styles.homeContentGemItemMain}>
                  <Image
                    src={item.iconSrc}
                    alt="picture"
                    layout="fixed"
                    width={16}
                    height={16}
                    className={styles.homeContentChooieImage}
                  />
                  <div className={styles.homeContentGemItemText}>
                    {item.label}
                  </div>
                </li>
              ))}
            </div>
          </div>
          <div className={styles.homeContentPurchase}>
            <div
              className={styles.homeContentPurchaseContainer}
              onClick={handleClick}
            >
              <div>
                <div className={styles.homeContentPurchaseMain}>
                  <div className={styles.homeContentPurchaseTitle}>
                    How to purchase?
                  </div>
                  <Image
                    src={img2}
                    alt="picture"
                    layout="fixed"
                    width={24}
                    height={24}
                    className={styles.homeContentChooieImage}
                  />
                </div>
              </div>
              {showSubtitle && (
                <div className={styles.homeContentPurchaseSubTitle}>
                  <div className={styles.homeContentPurchaseSubTitleItem}>
                    {itemListPurchase.map((item, index) => (
                      <li
                        key={item.id}
                        className={styles.homeContentPurchaseSubTitleMain}
                      >
                        <div className={styles.homeContentPurchaseSubTitleText}>
                          {item.label}
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.homeContentSubmit}>
            <div className={styles.homeContentSubmitContainer}>
              <input
                className={styles.homeContentSubmitInput}
                placeholder="Thiquynhnguyenptit@gmail.com"
                type="text"
                value={email}
                onChange={handleInputChange}
              />
              <div>
                <button
                  className={styles.homeContentSubmitBtn}
                  onClick={handleButtonClick}
                >
                  BUY PREMIUM
                </button>
              </div>
            </div>
            {error && <p className={styles.homeContentError}>{error}</p>}
          </div>
          <div className={styles.homeContentSubmitMb}>
            <div className={styles.homeContentSubmitContainerMb}>
              <input
                className={styles.homeContentSubmitInputMb}
                placeholder="Thiquynhnguyenptit@gmail.com"
                type="text"
                value={email}
                onChange={handleInputChange}
              />
               {error && <p className={styles.homeContentErrorMb}>{error}</p>}
              <div>
                <button
                  className={styles.homeContentSubmitBtnMb}
                  onClick={handleButtonClick}
                >
                  BUY PREMIUM
                </button>
              </div>
            </div>
           
          </div>
        </div>
        <div className={styles.homeContentTextEnd}>
          THANK YOU FOR CHOOSING ATHENE NETWORK!
        </div>
        <div className={styles.homeFooter}>
          2024 Athene Group LTD. | All rights reserved.
        </div>
        <ModalSmartContract
          isOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          propsEmail={email}
          emitCloseModal={handleCloseModal}
        />
      </main>
    </div>
  );
};

export default Home;
