"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import UploadTable from "./uploadTable";

export default function Home() {
	return (
		<main className="flex min-h-screen py-3 m-0 flex-col items-center justify-between px-0 text-black dark:text-white">
			<div className="pt-16 w-11/12 lg:w-5/6 px-6 gap-2">
				<h1>Admin</h1>
				<div>
					<Link href={"/"} className="flex items-center gap-4 pl-2 py-3">
						<FaArrowLeft /> Quay về trang chủ
					</Link>

					<UploadTable />

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</div>
		</main>
	);
}
