import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
	return (
		<main className="p-0 m-0 flex-col items-center justify-between px-0">
			<div className="w-screen grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center p-5 px-7">
				<Image src="/robot_error.png" width={300} height={400} className="" />
				<div className=" col-span-1 lg:col-span-3 grid grid-cols-1 text-left shrink place-content-start">
					<h1 className="text-extra-large">404!</h1>
					<h1 className=" text-gray-600 text-extra-large opacity-30">
						Trang này không tồn tại
					</h1>
					<div className="p-2"></div>

					<Link href={"/"} className="flex items-center gap-4 pl-2 py-3">
						<FaArrowLeft /> Quay về trang chủ
					</Link>
				</div>
			</div>
		</main>
	);
}
