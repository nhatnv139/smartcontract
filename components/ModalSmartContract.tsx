import React, { useState } from 'react';
import CustomModal from './CustomModal';
import HandleSmartContract from './HandleSmartContract'

const ModalSmartContract = (props) => {
    const closeModal =()=>{
        props.onClickClose();
    }
   
  return (
    <div>
      {/* <h1>Next.js Modal Example</h1> */}
      {/* <button onClick={openModal}>Open Modal</button> */}
      
      <CustomModal isOpen={props.isModalOpen} onRequestClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <HandleSmartContract/>
        <button onClick={closeModal}>Close Modal</button>
      </CustomModal>
    </div>
  );
};

export default ModalSmartContract;