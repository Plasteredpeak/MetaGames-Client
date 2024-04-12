import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import metaMask from "../../assets/metaMask.svg";
import Logo from "../../assets/wLogo.png";
import { CiCircleCheck } from "react-icons/ci";

const Login = () => {
  const [connected, setConnected] = useState(false);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        const accounts = await window.ethereum.enable();
        // Save user address in browser for session management
        localStorage.setItem("userAddress", accounts[0]);

        setConnected(true);

        window.location.href = "/home";
      } catch (error) {
        // User denied account access...
        console.log("User denied account access");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // Save user address in browser for session management
      localStorage.setItem("userAddress", window.web3.eth.defaultAccount);

      setConnected(true);

      window.location.href = "/home";
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div
        role="alert"
        className={`alert alert-success my-3 w-1/3 ${connected ? "" : "hidden"}`}
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
