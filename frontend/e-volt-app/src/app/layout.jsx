import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import "@coinbase/onchainkit/styles.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import { OnchainProviders } from "../providers/OnchainProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "E-vot",
	description: "A decentralized voting platform",
};

export default function RootLayout({ children }) {
	
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex flex-col min-h-screen">
					<OnchainProviders >
						<div className="mb-[10vh]">
							<Navbar />
						</div>
						<ToastContainer />

						<div className="overflow-scroll pt-[1vh] flex-grow pb-6">
							{children}
						</div>
						<Footer />
					</OnchainProviders>
				</div>
			</body>
		</html>
	);
}
