"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ConnectButton } from "@/providers/ConnectButton";

// const projectId = "a6a91196516cd2b211e9d6bebf8a5c13";

export default function Onboard() {
	const router = useRouter();

	return (
		<header >
			<nav className="flex h-[10vh] z-50 justify-around items-center fixed top-0 right-0 min-w-[100vw] bg-[#ffffff] border-b-2">
				<div className="logo mr-[-10px]">
					<Link href="/">
						<img src="/assets/Logo.png" alt="logo" />
					</Link>
				</div>

				<div className="flex ml-20">
					<ul className="flex gap-16">
						<li
							className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links ${
								router.pathname === "/" ? "active" : ""
							}`}
							id="dashboard"
						>
							<Link className="" href="/">
								Home
							</Link>
						</li>
						<li
							className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links ${
								router.pathname === "/elections" ? "active" : ""
							}`}
							id="elections"
						>
							<Link className="" href="/elections">
								All Elections
							</Link>
						</li>
						{/* <li className="px-8  nav-linksfont-medium">
                    <Link hre className=""f="/kyc">KYC</Link>
                </li> */}
						<li
							className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links ${
								router.pathname === "/addElection" ? "active" : ""
							}`}
							id="addElection"
						>
							<Link className="" href="/addElection">
								Create Election
							</Link>
						</li>
						<li
							className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] nav-links ${
								router.pathname === "/addElection" ? "active" : ""
							}`}
							id="addElection"
						>
							<Link className="" href="/addElection">
								Voting History
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ConnectButton />
					{/* <w3m-button /> */}
				</div>
			</nav>
		</header>
	);
}
