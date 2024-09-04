"use client"
import Link from "next/link";
import { Web3 } from "web3";


export default function HOME() {
  // check if Metamask is installed
  // if installed, initialize Web3JS
  // request user to connect to Metamask

  return (
    <div className="py-10 px-20">
        <div>
            <p className="text-[32px] font-medium form-item">Welcome</p>
            <p className=" form-item">Vote to make your voice heard</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center border rounded-lg p-10 gap-14 mt-10 form-item">
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">Easy Registration</p>
                <p className="text-sm font-normal text-[#8F96A1]">We offer seamless registration process to quickly get you onboard</p>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">Secure Voting System</p>
                <p className="text-sm font-normal text-[#8F96A1]">Secure voting process with no hitches</p>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">Real-time Result</p>
                <p className="text-sm font-normal text-[#8F96A1]">Verifiable and transparent results</p>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">Stay Anonymous</p>
                <p className="text-sm font-normal text-[#8F96A1]">Vote without fear of being chastised for your choice</p>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">Vote Candidates</p>
                <p className="text-sm font-normal text-[#8F96A1]">Vote your preferred candidate without fear or pressure</p>
            </div>
            <div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[47%] form-item">
                <p className="text-[24px] font-medium">View Election Results</p>
                <p className="text-sm font-normal text-[#8F96A1]">Watch your favorite candidate win</p>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center w-full">
            <Link href="/kyc">
            <button className="space-x-4 bg-[#9747FF] text-white rounded-lg w-auto py-4 px-6 my-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Complete KYC To Get Started
            </button>
            </Link>
        </div>
    </div>
  );
}
