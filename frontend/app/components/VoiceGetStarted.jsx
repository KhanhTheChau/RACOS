"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { BiSolidMicrophone } from "react-icons/bi";

export default function VoiceGetStarted() {
	const [mounted, setMounted] = useState(false);
	const [selected, setSelected] = useState([]);

	let commonQuestions = [
		"Bạn làm được gì?",
		"Ngành Kỹ thuật máy tính là gì?",
		"Điểm chuẩn ngành Kiến trúc là bao nhiêu?",
		"Chỉ tiêu Kỹ thuật Phần mềm là bao nhiêu?",
		"Ngành Công nghệ thông tin là gì?",
		"Điều khiển và Tự động hóa là gì?",
		"Cơ hội việc làm của ngành Kiểm toán?",
		"Ngành Quản trị kinh doanh là gì?",
		"Cơ hội việc làm của ngành Kiến trúc?",
		"Chỉ tiêu tuyển sinh ngành Kỹ thuật xây dựng là bao nhiêu?",
	];

	const pickAndPopRandomElement = (arr) => {
		// Ensure the array is not empty
		if (arr.length === 0) {
			throw new Error("Cannot pick from an empty array");
		}

		// Generate a random index
		let randomIndex = Math.floor(Math.random() * arr.length);

		// Remove and return the element at the random index
		return arr.splice(randomIndex, 1)[0];
	};

	useEffect(() => {
		let selectedQuestions = [];
		for (let i = 0; i < 4; i++) {
			selectedQuestions.push(pickAndPopRandomElement([...commonQuestions]));
		}
		setSelected(selectedQuestions);

		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<div
				className="bg-white dark:bg-gray-500 bg-opacity-60 rounded-lg px-2 md:mx-6 lg:mx-10 py-6 my-4 md:mt-10 lg:mt-10 shadow-xl \
					relative overflow-clip -z-0"
			>
				<Image
					src="/robot_stand_and_look.png"
					width={300}
					height={200}
					className="absolute right-0 bottom-10 -z-10 opacity-40 lg:opacity-100"
					alt="robot image"
				/>
				<h1 className="text-highlights text-extra-large">Xin chào!</h1>
				<h1 className=" text-gray-600 dark:text-gray-300 text-extra-large opacity-30">
					Hãy hỏi để bắt đầu cuộc trò chuyện.
				</h1>
				<p>Chỉ hỗ trợ trên Chrome và Edge</p>
				<div className=" h-48 " />
				<div className="flex gap-1 text-center text-black dark:text-white flex-wrap">
					<p className="self-center p-0 m-0">Nhấn vào</p>
					<span className="rounded-full self-center bg-blue-700/80 text-white min-w-8 aspect-square">
						<BiSolidMicrophone className="w-full h-full p-2" />{" "}
					</span>{" "}
					<p className="self-center  p-0 m-0">để bắt đầu.</p>
				</div>
			</div>
		</>
	);
}
