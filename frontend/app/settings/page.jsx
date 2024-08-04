"use client";
import SettingSectionAdmin from "./SettingSectionAdmin";
import SettingSectionGeneral from "./SettingSectionGeneral";

export default function Home() {
	return (
		<main className="p-0 m-0 flex-col items-center justify-between max-w-screen px-0 text-black dark:text-white">
			<div className="flex justify-center p-5 overflow-clip">
				<div className="text-highlights grid grid-cols-1 text-left gap-4 overflow-x-hidden">
					<h1 className="font-bold text-extra-large text-opacity-10 px-0">
						Cài đặt
					</h1>
					<div className="grid gap-4">
						<SettingSectionGeneral />
						<SettingSectionAdmin />
					</div>
				</div>
			</div>
		</main>
	);
}
