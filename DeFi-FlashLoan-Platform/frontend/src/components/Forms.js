import React from 'react';
import {useState,useContext,useEffect} from 'react';
import { WalletCheck } from '../App';
import {PASSIVE_INCOME_ADDRESS,passive_Income_abi} from "./Constant/index"
import {ethers} from 'ethers';
import Web3Modal from "web3modal"
const Forms = () => {
    const WalletHandler =useContext(WalletCheck);
    const [token, setToken] = useState('DAI');
    const [amtDeposite, setamt] = useState();
    const [amtBorrow, setBorrow] = useState();

    async function submit(event){
        event.preventDefault();
        try{
            const signer=WalletHandler.signer();
            console.log(signer);
            const passiveContract=new ethers.Contract(
                PASSIVE_INCOME_ADDRESS,
                passive_Income_abi,
                signer
              );
              const tx=await passiveContract.RequestFlashLoan(0xdc31ee1784292379fbb2964b3b9c4124d8f89c60,amtBorrow);
              await tx.wait();
        }
        catch(e){
            console.log(e);
        }
       
          

    }
    useEffect(()=>{

    },[]);


    return (
        <>

            <form>

                <div class="grid md:grid-cols-1 md:gap-6 ">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  value="DAI" />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Token</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(event)=>{setamt(event.target.value)}} />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount To Be Deposited</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(event)=>{setBorrow(event.target.value)}} />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount To Be Borrowed</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submit}>Submit</button>
            </form>

        </>
    )
}

export default Forms;