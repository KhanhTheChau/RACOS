"use client";

import Link from "next/link";
import Image from "next/image";
import {
	Navbar,
	NavbarBrand,
	Dropdown,
	DropdownItem,
	DropdownHeader,
} from "flowbite-react";
import { useSettings } from "../managers/SettingsContext";

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
		<nav className="sticky top-0 z-10">
			<Navbar
				fluid
				rounded
				className="list-none backdrop-blur-md"
				theme={customTheme}
			>
				<NavbarBrand href="/">
					<Image
						width="32"
						height="32"
						src="https://img.icons8.com/external-basicons-color-edtgraphics/50/external-Drop-abstract-basicons-color-edtgraphics.png"
						alt="icons"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold text-highlights">
						CAAS
					</span>
				</NavbarBrand>
				<div className="flex md:order-2">
					<Dropdown arrowIcon={false} inline>
						<DropdownHeader>
							<span className="block text-sm">Anonymous</span>
							<span className="block truncate text-sm font-medium">
								name@mail.com
							</span>
						</DropdownHeader>
						<DropdownItem>Settings</DropdownItem>
						<Link href={"/admin"}>
							<DropdownItem>Admin</DropdownItem>
						</Link>
						<DropdownItem>Sign out</DropdownItem>
					</Dropdown>
					<Navbar.Toggle />

					<input
						type="checkbox"
						id="toggle-dark-mode"
						className="toggle toggle-info"
						checked={isDarkMode}
						onClick={() => setIsDarkMode(!isDarkMode)}
						value={"Chế độ tối"}
					/>
				</div>

				<Navbar.Collapse>
					<Navbar.Link href="/chat">
						<Link href="/chat">Chat</Link>
					</Navbar.Link>
					<Navbar.Link href="/voice">
						<Link href="/voice">Voice</Link>
					</Navbar.Link>
					<Navbar.Link href="/settings">
						<Link href="/settings">Cài đặt</Link>
					</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
		</nav>
	);
}
