import Link from "next/link";
import { Web3 } from "web3";

export default function Onboard() {
  // check if Metamask is installed
  // if installed, initialize Web3JS
  // request user to connect to Metamask

  return (
    <>
      <head>
        <title></title>
      </head>
      <body class="flex">
        <header>
          <navbar>
            <ul class="flex flex-row">
              <li>Dashboard</li>
              <li>History</li>
              <li>Settings</li>
            </ul>

            <button>Wallet Display</button>
          </navbar>
          <hr></hr>
        </header>
        <main>
          <div class="w-51 h-240 rounded-lg justify-center content-center border-[#9747FF1A]">
            <h2 class="text-xl font-semibold non-italic">
              Please perform your KYC Verification to access your dashboard.
            </h2>
            <p class="font-normal text-slate-400">Fill the input fields below.</p>
            <form>
              <div>
                <label htmlFor="" class="block">Full Name</label>
                <input type="text" placeholder="Input full name" />
              </div>

              <div>
                <label htmlFor="" class="block">Department</label>
                <select>
                  <option></option>
                </select>
              </div>

              <div>
                <label htmlFor="" class="block">National Identity Number</label>
                <input type="number" required />
              </div>

              <div>
                <label htmlFor="" class="block">Upload an Image of your NIN</label>
                <input type="file" name="" id="NIN" />
              </div>

              <div class="flex flex-column">
                <button>Skip</button>
                <button class="bg-[#1F2C64]-500">Proceed</button>
              </div>
            </form>
          </div>
        </main>
      </body>
    </>
  );
}
