"use client";
import { useEffect } from "react";
import { useTextToSpeech } from "../managers/textToSpeech";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";

// text: the text to be read
// onCompleted: a function to be called when the reading is completed
// autoSpeak: a boolean to indicate if the text should be read automatically or wait for onCompleted
/* 
options = {
	role: string, text: string
}
*/
export default function ChatOptions({
	text,
	onResponse,
	autoSpeak,
	disabled,
	audioId,
	options,
}) {
	//const [isSpeaking, setIsSpeaking] = useState(false);
	const { pause, cancel, speakText, isSpeaking } = useTextToSpeech({
		lang: "vi-VN",
	});
	//const googleSearchUrl = `https://www.google.com/search?q=${encodedText}`;
	const role = options?.role;

	useEffect(() => {
		if (disabled) return;
		if (autoSpeak) speakText(text);
	}, [text]);

	useEffect(() => {
		//console.log(role);
	}, []);

	const handleSpeak = () => {
		speakText(text);
	};

	const handlePause = () => {
		pause();
	};

	const handleCancel = () => {
		cancel();
	};

	const handleGoogleSearch = () => {
		const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
			text
		)}`;
		window.open(searchUrl, "_blank", "noopener,noreferrer");
	};

	return disabled ? null : (
		<div className="flex px-2">
			{role !== "user" ? (
				isSpeaking ? (
					<>
						{/* <Button onClick={handlePause}>
						<IoPauseSharp />
					</Button> */}
						<div className="tooltip tooltip-bottom  shadow-lg" data-tip="Dừng">
							<button
								className="btn btn-outline btn-sm py-1 text-black dark:text-white"
								onClick={handleCancel}
							>
								<IoMdClose />
							</button>
						</div>
					</>
				) : (
					<div
						className="tooltip tooltop-md tooltip-bottom  shadow-lg"
						data-tip="Nghe"
					>
						<button
							className="btn btn-outline btn-sm py-1 text-black dark:text-white"
							onClick={handleSpeak}
						>
							<HiSpeakerWave />
						</button>
					</div>
				)
			) : (
				<div
					className="tooltip tooltop-md tooltip-bottom  shadow-lg"
					data-tip="Tìm kiếm trên Google"
				>
					<button
						className="btn btn-outline btn-sm py-1 text-black dark:text-white"
						onClick={handleGoogleSearch}
					>
						<FaGoogle />
					</button>
				</div>
			)}
		</div>
	);
}
