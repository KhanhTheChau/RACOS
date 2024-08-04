"use client";

import { useChat } from "ai/react";
import ChatResponse from "./ChatResponse";
import Textarea from "react-textarea-autosize";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import ChatGetStarted from "./ChatGetStarted";
import { useSettings } from "../managers/SettingsContext";

export default function ChatContainer() {
	const { isChatAutoSpeak, getCurrentModel } = useSettings();
	const model = getCurrentModel();
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		setInput,
	} = useChat();
	const buttonRef = useRef(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.shiftKey && event.key === "Enter") {
				event.preventDefault();
				if (buttonRef.current) {
					buttonRef.current.click();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="w-full pt-0">
			{messages.length === 0 ? <ChatGetStarted setInput={setInput} /> : null}
			<div className="flex flex-col w-full pt-1 pb-20 stretch lg:px-20 md:px-10 px-5">
				{messages.map((m) => (
					<ChatResponse
						response={m}
						key={m.id}
						autoSpeak={isChatAutoSpeak}
						isLoading={isLoading}
					/>
				))}
				<div className="py-10" />
			</div>

			<div className="fixed overflow-hidden w-full bottom-5 py-1 pt-1 -mb-5 bg-gradient-to-t from-white to-transparent dark:from-slate-900">
				<div className="lg:px-24 md:px-16 px-4">
					<form onSubmit={handleSubmit}>
						<div className="flex px-2 text-center text-wrap overflow-hidden align-middle justify-center">
							<Textarea
								value={input}
								tabIndex={0}
								rows={1}
								id="prompt-input"
								placeholder="Bạn muốn hỏi gì?"
								//disabled={isLoading}
								spellCheck={true}
								className="rounded-lg textarea focus:border-blue-400 text-black dark:text-white w-full m-2 resize-none py-4 my-2 bg-gray-200 dark:bg-gray-700  grow overflow-visible"
								onChange={handleInputChange}
							/>

							<div className="relative text-xl flex flex-col px-2 overflow-hidden max-h-60 bg-background">
								{isLoading ? ( // is loading
									<div className="p-2 mt-2">
										<span className="loading loading-dots text-black dark:text-white loading-md"></span>
									</div>
								) : (
									<button
										className="btn rounded-md bg-blue-700 hover:bg-blue-800 text-white mt-2 disabled:bg-gray-500 disabled:hover:bg-gray-600"
										style={{ alignSelf: "flex-start" }}
										type="submit"
										id="submit-prompt"
										ref={buttonRef}
									>
										<IoMdSend />
									</button>
								)}
							</div>
						</div>
					</form>
					<p className="text-xs p-0 m-0 text-center gap-2">
						<span className="hidden md:inline-block px-1">
							<kbd className="kbd">Shift</kbd>+<kbd className="kbd">Enter</kbd>
							{" để gửi."}
						</span>
						Thông tin có thể đưa ra không chính xác, hãy xác minh câu trả lời
						của AI.
					</p>
				</div>
			</div>
		</div>
	);
}
