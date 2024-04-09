import React from "react";
import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import Logo from "../../assets/wLogo.png";

const Login = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
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
          className="text-md btn btn-accent my-5 text-[1rem]"
          type="submit"
        >
          {/* <span class="loading loading-spinner"></span> */}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
