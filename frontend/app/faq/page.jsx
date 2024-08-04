import Link from "next/link";
export default function Home() {
	return (
		<main className="p-0 m-0 flex-col items-center justify-between px-0 text-white">
			<div className="w-screen flex justify-center p-5">
				<div className="text-highlights grid grid-cols-1 text-left gap-4">
					<h1 className="font-bold text-extra-large text-opacity-10 px-0">
						FAQ
					</h1>
					<h1 className="p-0 text-gray-600 text-extra-large opacity-30 px-0">
						Những câu hỏi thường gặp
					</h1>
				</div>
			</div>
		</main>
	);
}
