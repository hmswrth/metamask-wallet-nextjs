import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { Button, Table } from 'antd';
import WalletStyles from '../styles/WalletDetailsModal.module.css'

Modal.setAppElement('#__next');

function WalletDetailsModal({ showWalletDetails, handleWalletDetailsVisibility, data }) {

   const account = data[0] === null ? '-' : data[0] ? `${data[0].substring(0, 4)}...${data[0].substring(data[0].length - 4)}` : '';
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
      handleWalletDetailsVisibility(false);
   };

   const handleClose = () => {
      handleWalletDetailsVisibility(false);
   };

   const handleDisconnect = () => {
      handleWalletDetailsVisibility(false);
   }

   const columns = [
      {
         title: 'key',
         dataIndex: 'name',
         key: 'name'
      },
      {
         title: 'value',
         dataIndex: 'value',
         key: 'value'
      }
   ]

   const dataSource = [
      {
         key: '1',
         name: 'Account',
         value: account
      },
      {
         key: '2',
         name: 'Chain ID',
         value: data[1]
      },
      {
         key: '3',
         name: 'Balance',
         value: ParseFloat(`${data[2]}`)
      },
   ]

   function ParseFloat(bal) {
      // bal = bal.toString()
      bal = bal.slice(0, (bal.indexOf('.') + 3))
      return parseFloat(bal);
   }

   return (
      <div>
         <Modal
            style={customStyles}
            isOpen={showWalletDetails}
            onRequestClose={handleClose}
            onOk={handleOk}
         >
            {/* <div><h3>Wallet details</h3></div>
            <div>
               <table className={styles.container}>
                  <thead>
                     <tr>
                        <td>key</td>
                        <td>value</td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Account</td>
                        <td>{data[0]}</td>
                     </tr>
                     <tr>
                        <td>Chain ID</td>
                        <td>{data[1]}</td>
                     </tr>
                     <tr>
                        <td>Balance</td>
                        <td>{data[2]}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div>Wallet Details</div>
            <div>
               <Button onClick={handleDisconnect}>Disconect</Button>
            </div> */}
            <div><h3>Wallet Details</h3></div>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            <div><Button onClick={handleDisconnect} type='danger' className={WalletStyles.btn}>disconnect</Button></div>
         </Modal>
      </div>
   )
}

export default WalletDetailsModal
