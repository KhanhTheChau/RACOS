"use client";
import { ChatProvider } from "../managers/chatContext";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
	return (
		<ChatProvider>
			<main className="p-0 m-0 flex-col items-center justify-between px-0 text-white dark:text-dark">
				<div className="flex w-full justify-center px-0">
					{/* <ChatGetStarted></ChatGetStarted> */}
					<ChatContainer />
				</div>
			</main>
		</ChatProvider>
	);
}
