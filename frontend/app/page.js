import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<main className="p-0 m-0 flex-col items-center justify-between px-0 text-white">
			<div className="w-screen grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center p-5 px-7">
				<Image src={"/robot_wave_hand.png"} width={300} height={400}></Image>
				<div className=" col-span-1 lg:col-span-3 text-highlights text-white grid grid-cols-1 text-left shrink place-content-start">
					<h1 className="font-bold text-white text-8xl text-opacity-10 px-0">
						RACOS
					</h1>
					<h1 className="text-gray-600 text-extra-large opacity-30 px-0">
						<u>R</u>outed Chat-Voice <u>A</u>dmissions <u>Co</u>unseling <u>S</u>upport
					</h1>
					<h1 className="text-gray-600 text-extra-large opacity-30 px-0">
						Hệ thống tư vấn tuyển sinh CTU
					</h1>
					<div className="p-2"></div>
					<Link href={"/chat"}>
						<button className="btn btn-info text-white">Truy cập</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
