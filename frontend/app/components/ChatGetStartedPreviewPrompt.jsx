"use client";

//import { useChat } from "../managers/chatContext";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export function ChatGetStartedPreviewPrompt({ prompt, setInput, icon }) {
	//const { setInputText } = useChat();
	const [mounted, setMounted] = useState(false);

	const handleClick = () => {
		//setInputText(prompt);
		setInput(prompt);
		document.getElementById("prompt-input").focus();
		//handleInputChange()
	};

	useEffect(
		() => {
			setMounted(true);
		},
		[] // eslint-disable-line react-hooks/exhaustive-deps
	);

	if (!mounted) {
		return null;
	}

	return (
		<button
			className="chat-response hover:bg-black/10 transition-all duration-100 rounded-lg p-3"
			onClick={handleClick}
		>
			<div className="flex items-center min-h-10 md:min-h-24 gap-2">
				<span className="text-black dark:text-white">{icon ? icon : "📝"}</span>
				<p className=" text-left min-lin">{prompt}</p>
			</div>
		</button>
	);
}
