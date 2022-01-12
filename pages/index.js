import Form from '../components/Form'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import WalletModal from '../components/WalletModal'
import WalletDetailsModal from '../components/WalletDetailsModal'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../components/wallet/Connectors'
import Web3 from 'web3'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [showWalletDetails, setshowWalletDetails] = useState(false)
  const [walletDetails, setWalletDetails] = useState([])
  const [isConnecting, setIsConnecting] = useState(false)

  const handleModalVisibility = (val) => {
    setShowModal(val);
  }

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    }
    else if (window.web3) {
      provider = window.web3.currentProvider;
    }
    else {
      console.error('no provider detected')
    }
    return provider;
  }

  const loginHandler = async () => {
    const provider = detectProvider();
    const web3 = new Web3(provider);

    setIsConnecting(true);

    if (provider) {
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      // console.log('account', accounts[0])

      const chainId = await web3.eth.getChainId();
      // console.log(chainId)

      const web3Bal = await web3.eth.getBalance(accounts[0]);
      const balance  = web3.utils.fromWei(web3Bal)
      // console.log('web3bal', balance );

      setWalletDetails([accounts[0], chainId, balance])

      setIsConnecting(false);
      setshowWalletDetails(true)
    }

  }

  const showWalletDetailsHandler = (val) => {
      // handleWalletConnect();
      // let walletDetails = await getWalletDetails()
      // setWalletDetails(walletDetails);
      setshowWalletDetails(val)
  }

  // const handleWalletConnect = async () => {
  //   try {
  //     await activate(injected);
  //   } catch (error) {
  //     console.log(error)
  //   }    
  // }

  // const handleWalletDisconnect = async () => {
  //   try {
  //     deactivate();
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(`Wallet is now disconnected: ${active}`)
  // }

  // const getWalletDetails = async () => {
  //   const balance = 0;
  //   try {
  //     const balanceWei = await library.eth.getBalance(account)
  //     balance = await library.utils.fromWei(balanceWei)
  //     console.log('balance : ', balance, 'account', account, 'chainId', chainId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return [account, chainId, balance]
  // }

  return (
    <div className={styles.container}>
      <Form getModal={handleModalVisibility} />
      <WalletModal showModal={showModal} handleModalVisibility={handleModalVisibility} loginHandler={loginHandler} isConnecting={isConnecting} />
      <WalletDetailsModal showWalletDetails={showWalletDetails} handleWalletDetailsVisibility={showWalletDetailsHandler} data={walletDetails} />
    </div>
  )
}
