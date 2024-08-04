"use client";
import { ChatGetStartedPreviewPrompt } from "./ChatGetStartedPreviewPrompt";
import Image from "next/image";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";

export default function ChatGetStarted({ setInput }) {
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
				className="bg-white dark:bg-gray-500 bg-opacity-60 rounded-lg h-min px-2 md:mx-6 lg:mx-10 py-6 my-4 md:mt-10 lg:mt-10 shadow-xl \
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
					Tôi có thể giúp gì cho bạn?
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
						{selected.map((question, index) => (
							<ChatGetStartedPreviewPrompt
								prompt={question}
								index={index}
								setInput={setInput}
								key={index}
								icon={<CiChat1 />}
							/>
						))}
					</div>
				</div>
				<div className=" h-30"></div>
			</div>
		</>
	);
}
