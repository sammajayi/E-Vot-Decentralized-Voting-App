import Link from "next/link";
import { Web3 } from "web3";

"use client"

export default function Onboard() {
  // check if Metamask is installed
  // if installed, initialize Web3JS
  // request user to connect to Metamask

const handleClick = () => {
 const image = document.getElementsByClassName("uploadNIN");
 const input = document.querySelector("input[type='file']");
 input.click();
}

  return (
    <>
      <head>
        <title></title>
      </head>
      <body class="flex justify-center items-center h-screen">
        <header>
          <navbar className="flex h-20 justify-around items-center">
            <div className="logo mr-[-10px]">
              <img src="/assets/Logo.png" alt="logo" />
            </div>

            <div className="flex ml-20 ">
              <ul className="flex ">
                <li className="px-8 font-medium">
                  <a href="http://">Dashboard</a>
                </li>
                <li className="px-8 font-medium">
                  <a href="http://">History</a>
                </li>
                <li className="px-8 font-medium">
                  <a href="http://">Settings</a>
                </li>
              </ul>
            </div>

            <div>
              <button className="space-x-4 bg-[#1F2C64] text-white rounded-lg w-[9rem] h-[2.5rem] ml-20">
                Connect Wallet
              </button>
            </div>
          </navbar>
          <hr></hr>
        </header>
        <main className=" flex justify-center items-center h-screen ">
          <div className="flex flex-col justify-center items-center align-middle w-[34rem] border rounded-lg p-6 py-10 mt-[-30px]">
            <h2 className="text-xl font-bold non-italic justify-center items-center text-wrap">
              Please perform your KYC Verification to access your dashboard.
            </h2>
            <p className="font-normal text-slate-400 text-center">
              Fill the input fields below.
            </p>
            <form className="mt-10">
              <div className="">
                <label htmlFor="" className="block pb-1.5 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Input full name"
                  id="fullName"
                  className="pt- w-[28rem] pl-5 text-slate-100 h-[2.8rem] border-[#8F96A1] border rounded-md"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="" className="block pb-1.5 font-medium">
                  Department
                </label>
                <select
                  id="dropdown"
                  className="w-[28rem] h-[2.8rem] border-[#8F96A1] border rounded-md pl-5"
                >
                  <option
                    value=""
                    disabled
                    selected
                    value
                    className="text-slate-400"
                  >
                    Select department
                  </option>
                  <option value=""></option>
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="" className="block pb-1.5 font-medium">
                  Matric Number
                </label>
                <input
                  type="number"
                  placeholder="Input matric number"
                  id="matricNumber"
                  required
                  className="w-[28rem] h-[2.8rem] border-[#8F96A1] border rounded-md pl-5"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="" className="block pb-1.5 font-medium">
                  National Identity Number
                </label>
                <input
                  type="number"
                  placeholder="Input NIN"
                  id="NIN"
                  required
                  className="w-[28rem] h-[2.8rem] border-[#8F96A1] border rounded-md pl-5"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="" className="block pb-1.5 font-medium">
                  Upload an Image of your NIN
                </label>
                <div className="uploadNIN" onClick={() => handleClick()}></div>
                <input type="file" className="invisible"/>
              </div>

              <div class="flex space-x-4 pt-5">
                <button className="border-[#8F95B1] border text-black w-[12.9rem] h-[2.6rem] rounded-full">
                  Skip
                </button>
                <button className="bg-[#1F2C64] text-white w-[12.9rem] h-[2.6rem] rounded-full">
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </main>
      </body>
    </>
  );
}
