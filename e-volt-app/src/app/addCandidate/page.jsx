"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Web3 } from "web3";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import SuccessModal from "@/components/SuccessModal";


export default function Onboard() {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);

const handleClick = () => {
 const image = document.getElementsByClassName("uploadNIN");
 const input = document.querySelector("input[type='file']");
 input.click();
}

const handleGoback = () => {
  // if (isMounted) {
    router.back();
  // }
}


  return (
    <main className=" flex justify-center items-start h-screen py-10">
      <div className="w-[34rem] h-[79vh] border rounded-lg p-6 py-10">
        <div className="flex flex-col justify-start items-center align-middle h-[69vh] overflow-scroll">
        <h2 className="text-xl font-bold non-italic justify-center items-center text-center pb-2 text-wrap form-item">
          Create An Election.
        </h2>
        <p className="font-normal text-slate-400 text-center form-item">
          Fill the input fields below.
        </p>
        <form className="mt-10">
          <div className=" form-item">
            <label htmlFor="" className="block pb-1.5 font-medium">
              Election ID
            </label>
            <input
              type="text"
              placeholder="Input election id"
              id="id"
              className="pt- w-[28rem] pl-5 h-[2.8rem] border-[#8F96A1] border rounded-md"
            />
          </div>
          <div className=" form-item mt-4">
            <label htmlFor="" className="block pb-1.5 font-medium">
              Candidate Name
            </label>
            <input
              type="text"
              placeholder="Input candidate name"
              id="name"
              className="pt- w-[28rem] pl-5 h-[2.8rem] border-[#8F96A1] border rounded-md"
            />
          </div>

          <div class="flex space-x-4 pt-5 ml-2 form-item">
            <button onClick={handleGoback} className="border-[#8F95B1] border text-black w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Cancel
            </button>
            <button className="bg-[#5773fb] text-white w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Link href="/elections">Proceed</Link>
            </button>
          </div>
        </form>
        </div>
      </div>

        {/* voting time */}
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <SuccessModal onCloseModal={() => setOpen(false)} />
        </Dialog>
    </main>
  );
}
