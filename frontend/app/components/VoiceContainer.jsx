"use client";

import { useChat } from "ai/react";
import PromptInput from "./PromptInput";
import ChatResponse from "./ChatResponse";
import Textarea from "react-textarea-autosize";
import { IoMdSend } from "react-icons/io";
import { Spinner } from "flowbite-react";
import { useEffect, useRef } from "react";
import ChatGetStarted from "./VoiceGetStarted";
import VoiceInput from "./VoiceInput";
import { useSettings } from "../managers/SettingsContext";

export default function VoiceContainer() {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		setInput,
		append,
		isLoading,
	} = useChat();
	const buttonRef = useRef(null);
	const { isVoiceAutoSpeak } = useSettings();

	return (
		<>
			<div className="w-full pt-0">
				{messages.length === 0 ? <ChatGetStarted /> : null}
				<div className="flex flex-col w-full pt-6 pb-24 mx-auto stretch lg:px-20 md:px-10 px-5">
					{messages.map((m) => (
						<ChatResponse
							response={m}
							key={m.id}
							autoSpeak={isVoiceAutoSpeak}
						/>
					))}
					<div className="py-7" />
				</div>
			</div>
			<VoiceInput
				textInput={input}
				isLoading={isLoading}
				setTextInput={setInput}
				submit={append}
			/>
		</>
	);
}
