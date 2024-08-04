"use client";

import { useState, useEffect, useContext, createContext } from "react";

const ChatContext = createContext();



export const ChatProvider = ({ children }) => {
	const [chatlog, setChatlog] = useState([]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [voiceAnswer, setVoiceAnswer] = useState("");
	const [voiceQuestion, setVoiceQuestion] = useState("");
	const [voicelog, setVoicelog] = useState([]);

	const appendChatlog = (userInput, botInput) => {
		setChatlog((prev) => [
			...prev,
			{
				user: userInput,
				bot: botInput,
			},
		]);
	};

	const appendVoicelog = (userInput, botInput) => {
		setVoicelog((prev) => [
			...prev,
			{
				user: userInput,
				bot: botInput,
			},
		]);
	};

	const context = {
		chatlog,
		setChatlog,
		appendChatlog,
		inputText,
		setInputText,
		isLoading,
		setIsLoading,
		voiceAnswer,
		setVoiceAnswer,
		voiceQuestion,
		setVoiceQuestion,
		voicelog, 
		appendVoicelog,
	};

	return (
		<ChatContext.Provider value={context}>{children}</ChatContext.Provider>
	);
};

export const useChat = () => {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
