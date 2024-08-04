"use client";

import { IoMdSend } from "react-icons/io";
import { Button, Spinner } from "flowbite-react";
import { useSpeechToText } from "../managers/speechToText";
import { useRef, useEffect } from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";


export default function VoiceInput({
	textInput,
	setTextInput,
	submit,
	isLoading,
}) {
	const { isListening, transcript, startListening, stopListening } =
		useSpeechToText({ continuous: true, lang: "vi-VN" });
	const buttonRef = useRef(null);
	const cancelButton = useRef(null);

	const startStopListening = async () => {
		if (isListening) {
			let text = isListening
				? textInput +
				  (transcript.length ? (textInput.length ? " " : "") + transcript : "")
				: textInput;
			submit({ role: "user", content: text });

			stopVoiceInput();
		} else {
			startListening();
			setTextInput("");
		}
	};

	const stopVoiceInput = () => {
		stopListening();
		setTextInput(
			(prevVal) =>
				prevVal +
				(transcript.length ? (prevVal.length ? " " : "") + transcript : "")
		);
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === " " || event.key === "Enter") {
				event.preventDefault();
				if (buttonRef.current) {
					buttonRef.current.click();
				}
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<div className="fixed w-full bottom-0 bg-gradient-to-t from-white dark:dark:from-slate-800 to-transparent">
			<div className="grid px-2 text-center text-wrap overflow-hidden place-items-center">
				<div>
					<p
						className={
							!(isListening && textInput.length == 0)
								? "hidden"
								: "text-lg mb-5 text-opacity-60 font-light bg-white dark:bg-black dark:text-white rounded-lg shadow-md"
						}
					>
						{isListening
							? textInput +
							  (transcript.length
									? (textInput.length ? " " : "") + transcript
									: "")
							: textInput}
					</p>
				</div>
				<div className="grid grid-cols-3 place-items-center">
					<div>
						<div className={isListening ? "" : "hidden"}>
							<button
								onClick={() => {
									stopListening();
									setTextInput("");
								}}
								color="transparent"
								className="btn btn-circle border-2 flex justify-center bg-red-500 rounded-full aspect-square hover:bg-red-700 text-white"
							>
								<div className="w-full h-full grid items-center p-0 m-0">
									<p className="w-full flex justify-center text-center text-white">
										<IoIosClose className="text-3xl" size={20} />
									</p>
								</div>
							</button>
						</div>
					</div>
					<button
						disabled={isLoading}
						onClick={startStopListening}
						ref={buttonRef}
						color={isListening ? "red" : "blue"}
						className="btn btn-circle bg-blue-700 hover:bg-blue-800 btn-lg text-center align-middle"
					>
						<div className="w-full text-center h-full grid items-center">
							<p className="w-full flex justify-center text-center text-white">
								{!isLoading ? (
									isListening ? (
										<IoMdSend size={24} offset={[0, -100]} />
									) : (
										<BiSolidMicrophone size={24} />
									)
								) : (
									<div className="p-2 mt-2">
										<span className="loading loading-dots text-black dark:text-white loading-md"></span>
									</div>
								)}
							</p>
						</div>
					</button>
				</div>
				<div className="p-1">
					<p className="text-xs p-0 m-0 text-center gap-2">
						<span className="hidden md:inline-block px-1">
							<kbd className="kbd">Enter</kbd> hoặc{" "}
							<kbd className="kbd">Space</kbd>
							{" để ghi âm hoặc gửi."}
						</span>
						{"Thông tin có thể đưa ra không chính xác, hãy xác minh câu trả lời của AI."}
					</p>
				</div>
			</div>
		</div>
	);
}
