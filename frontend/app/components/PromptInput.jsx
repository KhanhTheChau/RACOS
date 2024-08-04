"use client";

import { useEffect, useRef } from "react";

export default function PromptInput({
	handlePromptSubmit,
	input,
	handleInputChange,
}) {
	const buttonRef = useRef(null);

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

	return (
		<form onSubmit={handlePromptSubmit} className="flex flex-col items-center">
			<input
				type="text"
				value={input}
				onChange={handleInputChange}
				className="border rounded px-2 py-1"
				placeholder="Type your message"
			/>
			<button
				type="submit"
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
			>
				Send
			</button>
		</form>

		// <div className="fixed w-full bottom-5 py-1 pt-10 -mb-5 bg-gradient-to-t text-black from-white to-transparent">
		// 	<div className="lg:px-24 md:px-16 px-4">
		// 		<form onSubmit={handlePromptSubmit}>
		// 			<div className="flex px-2 text-center text-wrap overflow-hidden align-middle justify-center">
		// 				<Textarea
		// 					value={input}
		// 					tabIndex={0}
		// 					rows={1}
		// 					id="prompt-input"
		// 					placeholder="Bạn muốn hỏi gì?"
		// 					//disabled={isLoading}
		// 					spellCheck={true}
		// 					className="rounded-lg resize-none p-4 my-2 bg-gray-200 dark:bg-gray-700  grow overflow-visible"
		// 					// onChange={(e) => {
		// 					// 	e.preventDefault();
		// 					// 	let newInputValue = e.target.value;
		// 					// 	handleInputChange(e);
		// 					// }}
		// 					onChange={handleInputChange}
		// 				/>

		// 				<div className="relative text-xl flex flex-col px-2 overflow-hidden max-h-60 bg-background">
		// 					{false ? ( // is loading
		// 						<div className="p-2 mt-2">
		// 							<Spinner aria-label="Default status example" size={"lg"} />
		// 						</div>
		// 					) : (
		// 						<button
		// 							className="rounded-md bg-blue-700 hover:bg-blue-800 text-white p-2 mt-2 disabled:bg-gray-500 disabled:hover:bg-gray-600"
		// 							style={{ alignSelf: "flex-start" }}
		// 							type="submit"
		// 							id="submit-prompt"
		// 							//disabled={input ? input.length === 0 : true}
		// 							ref={buttonRef}
		// 							// onClick={(ev) => {
		// 							// 	ev.preventDefault();
		// 							// 	handlePromptSubmit(ev);
		// 							// }}
		// 						>
		// 							<IoMdSend />
		// 						</button>
		// 					)}
		// 				</div>
		// 			</div>
		// 		</form>
		// 		<p className="text-xs p-0 m-0 text-center">
		// 			Shift + Enter để gửi. Thông tin có thể đưa ra một cách không chính
		// 			xác, hãy xác minh câu trả lời của AI.
		// 		</p>
		// 	</div>
		// </div>
	);
}
