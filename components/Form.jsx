import React, { useState, useEffect } from 'react'
import formStyle from '../styles/Form.module.css';
import { FcRefresh } from 'react-icons/fc'
import { IconContext } from "react-icons";

function Form({getModal}) {

   const [nep, setNep] = useState('')
   const [busd, setBusd] = useState('')

   const handleNepChange = (e) => {
      e.preventDefault();
      setNep(() => e.target.value)
      setBusd(() => {
         if (e.target.value != 0.00 || e.target.value != '')
            return ((parseFloat(e.target.value) * 3).toFixed(2)).toString();
         return '';
      })
   }

   const handleBusdChange = (e) => {
      e.preventDefault();
      setBusd(() => e.target.value)
      setNep(() => {
         if (e.target.value != 0.00 || e.target.value != '')
            return ((parseFloat(e.target.value) / 3).toFixed(2)).toString();
         return '';
      })
   }

   const handleWallet = () => {
      getModal(true)
   }

   return (
      <div className={formStyle.container}>
         <div className={formStyle.card}>
            <form >
               <div><h3 className={formStyle.cardTitle}>Crypto converter</h3></div>
               <div className={formStyle.cardItem}>
                  <label >NEP</label> <br />
                  <input type='text'
                     id='nep'
                     placeholder='0.00'
                     onChange={handleNepChange}
                     value={nep}
                  />
               </div>
               <IconContext.Provider value={{ className: 'react-icons', size: '1.5rem' }}>
                  <div className={formStyle.icon}>
                     <center>
                        <FcRefresh />
                     </center>
                  </div>
               </IconContext.Provider>
               {/* <IconContext.Provider value={{ className: 'react-icons', size: '1.5rem' }}>
                  <div className={formStyle.icon}>
                     <FcRefresh />
                  </div>
               </IconContext.Provider> */}
               <div className={formStyle.cardItem}>
                  <label >BUSD</label> <br />
                  <input type='text'
                     id='busd'
                     placeholder='0.00'
                     onChange={handleBusdChange}
                     value={busd} />
               </div>
               <div>
                  <center>
                     <a className={formStyle.btn} type='button' onClick={handleWallet}>Check Wallet Details</a>
                  </center>
               </div>
            </form>
         </div>

      </div >
   )
}

export default Form
