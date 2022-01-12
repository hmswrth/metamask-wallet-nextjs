import React from 'react'
import Modal from 'react-modal';
import ModalStyles from '../styles/WalletModal.module.css'
import { Button } from 'antd';



Modal.setAppElement('#__next');

function WalletModal({ showModal, handleModalVisibility, loginHandler, isConnecting }) {
   
   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         width: '350px'
      },
   };

   const handleOk = () => {
      handleModalVisibility(false);
   };

   const handleClose = () => {
      handleModalVisibility(false);
   };

   const handleConnectWallet = () => {
      loginHandler()
   }

   return (
      <div className={ModalStyles.container}>
         <Modal
            className={ModalStyles.Modal}
            style={customStyles}
            onOk={handleOk} onRequestClose={handleClose}
            isOpen={showModal}
         >
            <div className={ModalStyles.title}>Wallet Details</div>
            <div className={ModalStyles.message}>
               <p>Wallet not connected. Please click the &quot;Connect Now&quot; button below</p>
            </div>
            <div>
               {isConnecting && <Button className={ModalStyles.btn1} type='primary' loading >loading...</Button>}
               {!isConnecting && <Button className={ModalStyles.btn1} type='primary' onClick={handleConnectWallet} >connect now</Button>}
               <Button className={ModalStyles.btn2} onClick={handleClose}>cancel</Button>

            </div>

         </Modal>
      </div>
   )
}

export default WalletModal
