"use client";

import VoiceGetStarted from "../components/VoiceGetStarted";
import VoiceInput from "../components/VoiceInput";
import { ChatProvider, useChat } from "../managers/chatContext";
import VoiceContainer from "../components/VoiceContainer";

export default function Home() {
	return (
		<ChatProvider>
			<main className="p-0 m-0 flex-col items-center justify-between px-0 text-white dark:text-dark">
				<div className="flex w-full justify-center px-0">
					{/* <ChatGetStarted></ChatGetStarted> */}
					<VoiceContainer />
				</div>
			</main>
		</ChatProvider>

		// <ChatProvider>
		// 	<div className="w-full py-1 pt-0 ">
		// 		<div className="">
		// 			<VoiceContainer />
		// 			<div className=" w-full h-30"></div>
		// 		</div>
		// 	</div>
		// </ChatProvider>
	);
}
