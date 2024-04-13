import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import metaMask from "../../assets/metaMask.svg";
import Logo from "../../assets/wLogo.png";
import { CiCircleCheck } from "react-icons/ci";

const Login = () => {
  const [connectedAccount, setConnectedAccount] = useState();

  //check if metamask is connected
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          localStorage.setItem("userAddress", accounts[0]);
          window.location.href = "/home";
        } else {
          localStorage.removeItem("userAddress");
        }
      });
    }
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // instantiate Web3 with the injected provider
        const web3 = new Web3(window.ethereum);

        //request user to connect accounts (Metamask will prompt)
        await window.ethereum.request({ method: "eth_requestAccounts" });

        //get the connected accounts
        const accounts = await web3.eth.getAccounts();

        console.log(accounts[0]);

        //show the first connected account in the react page
        setConnectedAccount(accounts[0]);
        localStorage.setItem("userAddress", accounts[0]);
        window.location.href = "/home";
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please download metamask");
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div
        role="alert"
        className={`alert alert-success my-3 w-1/3 ${connectedAccount ? "" : "hidden"}`}
      >
        <CiCircleCheck className="text-5xl" />
        <div className="mx-2">
          <p className="font-bold">Login Successful</p>
          <p>You have successfully logged in to the platform.</p>
        </div>
      </div>
      <form className="mb-4 flex w-full max-w-lg flex-col justify-center rounded-lg bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-5  flex justify-center">
          <img
            className=" rounded-sm"
            src={Logo}
            alt=""
            height={200}
            width={200}
          />
        </div>
        <label className="form-control mb-5 w-full">
          <label className="input input-bordered flex items-center gap-2">
            <MdEmail />
            <input type="email" className="grow" placeholder="Email" />
          </label>
        </label>
        <label className="form-control mb-5 w-full">
          <label className="input input-bordered flex items-center gap-2">
            <FaKey />
            <input type="password" className="grow" placeholder="Password" />
          </label>
        </label>
        <button
          className="text-md btn btn-accent mt-5 text-[1rem]"
          type="submit"
        >
          {/* <span class="loading loading-spinner"></span> */}
          Login
        </button>
        <button
          className="text-md btn btn-secondary mb-5 mt-3 text-[1rem]"
          onClick={connectToMetaMask}
        >
          {/* <span class="loading loading-spinner"></span> */}
          Connect to MetaMask
          <img src={metaMask} alt="" height={30} width={30} />
        </button>
      </form>
    </div>
  );
};

export default Login;
