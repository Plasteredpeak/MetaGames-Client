import React from "react";
import { FaKey, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getGuestSignupMessage,
  isGuestModeEnabled,
} from "../../services/guestMode";

import Logo from "../../assets/wLogo.png";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isGuestModeEnabled()) {
      toast.info(getGuestSignupMessage());
      navigate("/login");
      return;
    }

    toast.info("Signup endpoint is not wired yet");
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <form
        className="mb-5 flex w-full max-w-lg flex-col justify-center rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 flex justify-center">
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
            <FaUser />
            <input type="text" className="grow" placeholder="Username" />
          </label>
        </label>
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
        <label className="form-control mb-5 w-full">
          <label className="input input-bordered flex items-center gap-2">
            <FaKey />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
            />
          </label>
        </label>
        <button
          className="text-md btn btn-accent my-5 text-[1rem]"
          type="submit"
        >
          {/* <span class="loading loading-spinner"></span> */}
          {isGuestModeEnabled() ? "Continue as Guest" : "Sign Up"}
        </button>
        {isGuestModeEnabled() && (
          <p className="text-center text-sm text-gray-500">
            {getGuestSignupMessage()}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
