import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import metaMask from "../../assets/metaMask.svg";
import Logo from "../../assets/wLogo.png";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  activateGuestSession,
  getGuestLoginMessage,
  isGuestCredentials,
  isGuestModeEnabled,
} from "../../services/guestMode";

const Login = () => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [email, setEmail] = useState(isGuestModeEnabled() ? "guest" : "");
  const [password, setPassword] = useState(
    isGuestModeEnabled() ? "guest" : "",
  );
  const navigate = useNavigate();

  //check if metamask is connected
  useEffect(() => {
    if (isGuestModeEnabled()) return;

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          localStorage.setItem("userAddress", accounts[0]);
          window.dispatchEvent(new Event("login"));
          navigate("/");
        } else {
          localStorage.removeItem("userAddress");
        }
      });
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    if (isGuestModeEnabled()) {
      if (!isGuestCredentials({ email, password })) {
        toast.error(getGuestLoginMessage());
        return;
      }

      activateGuestSession();
      setConnectedAccount("guest");
      window.dispatchEvent(new Event("login"));
      toast.success("Logged in as guest user");
      navigate("/home");
      return;
    }

    toast.info("Use Connect to MetaMask to log in");
  };

  const connectToMetaMask = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (isGuestModeEnabled()) {
      toast.info("MetaMask login is disabled in guest mode");
      return;
    }

    if (window.ethereum) {
      try {
        // instantiate Web3 with the injected provider
        const web3 = new Web3(window.ethereum);

        //request user to connect accounts (Metamask will prompt)
        await window.ethereum.request({ method: "eth_requestAccounts" });

        //get the connected accounts
        const accounts = await web3.eth.getAccounts();

        //show the first connected account in the react page
        setConnectedAccount(accounts[0]);
        localStorage.setItem("userAddress", accounts[0]);
        window.dispatchEvent(new Event("login"));
        navigate("/");
      } catch (e) {
        toast.error("error connecting to metamask");
      }
    } else {
      toast.error("Metamask not installed");
    }
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center">
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
      <form
        className="mb-4 flex w-full max-w-lg flex-col justify-center rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleLogin}
      >
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
            <input
              type={isGuestModeEnabled() ? "text" : "email"}
              className="grow"
              placeholder={isGuestModeEnabled() ? "Email or guest" : "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </label>
        <label className="form-control mb-5 w-full">
          <label className="input input-bordered flex items-center gap-2">
            <FaKey />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </label>
        {isGuestModeEnabled() && (
          <p className="mb-2 text-sm text-gray-500">{getGuestLoginMessage()}</p>
        )}
        <button
          className="text-md btn btn-accent mt-5 text-[1rem]"
          type="submit"
        >
          {/* <span class="loading loading-spinner"></span> */}
          Login
        </button>
        {!isGuestModeEnabled() && (
          <button
            className="text-md btn btn-secondary mb-5 mt-3 text-[1rem]"
            onClick={connectToMetaMask}
          >
            {/* <span class="loading loading-spinner"></span> */}
            Connect to MetaMask
            <img src={metaMask} alt="" height={30} width={30} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
