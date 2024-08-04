"use client";

import Link from "next/link";
import Image from "next/image";
import { useSettings } from "../managers/SettingsContext";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const customTheme = {
	root: {
		base: "bg-black/5 backdrop-blur-md px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
		rounded: {
			on: "rounded",
			off: "",
		},
		bordered: {
			on: "border",
			off: "",
		},
		inner: {
			base: "mx-auto flex flex-wrap items-center justify-between",
			fluid: {
				on: "",
				off: "container",
			},
		},
	},
};

export default function NavBar() {
	const { isDarkMode, setIsDarkMode } = useSettings();

	return (
		//<nav className="sticky top-0 z-10">
		<nav className="navbar fixed top-0 z-10 bg-white dark:bg-slate-600/50 text-black dark:text-white backdrop-blur-md bg-opacity-50">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-md dropdown-content bg-white dark:bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link href="/chat">
								<IoChatbox />
								Chat
							</Link>
						</li>
						<li>
							<Link href="/voice">
								<FaMicrophone />
								Voice
							</Link>
						</li>
						<li>
							<Link href="/settings">
								<IoMdSettings />
								Cài đặt
							</Link>
						</li>
					</ul>
				</div>
				<Link href="/">
					<div className="flex p-2 hover:bg-gray-300 hover:dark:bg-gray-700 rounded-md transition-all duration-150">
						<Image
							width="32"
							height="32"
							src="https://img.icons8.com/external-basicons-color-edtgraphics/50/external-Drop-abstract-basicons-color-edtgraphics.png"
							alt="icons"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold text-highlights">
							RACOS
						</span>
					</div>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal gap-2 px-1">
					<li>
						<Link href="/chat">
							<IoChatbox />
							Chat
						</Link>
					</li>
					<li>
						<Link href="/voice">
							<FaMicrophone />
							Voice
						</Link>
					</li>
					<li>
						<Link href="/settings">
							<IoMdSettings />
							Cài đặt
						</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<button
					className="btn btn-outline"
					onClick={() => setIsDarkMode(!isDarkMode)}
				>
					{isDarkMode ? <FaSun /> : <FaMoon />}
				</button>
			</div>
		</nav>
		//</nav>
	);
}
