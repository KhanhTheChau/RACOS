"use client";

import { useEffect, useRef, useState } from "react";

export const useSpeechToText = (options) => {
	const [isListening, setIsListening] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [isSpeechSupported, setIsSpeechSupported] = useState(false);
	const recognitionRef = useRef(null);

	useEffect(() => {
		//console.log(window);

		if (!("webkitSpeechRecognition" in window)) {
			setIsSpeechSupported("webkitSpeechRecognition" in window);
			alert("Trình duyệt này không hỗ trợ chuyển giọng nói thành văn bản");
			//console.error("Speech recognition is not supported in this browser");
			return;
		}

		recognitionRef.current = new window.webkitSpeechRecognition();
		const recognition = recognitionRef.current;
		recognition.interimResults = options.interimResults || true;
		recognition.lang = options.lang || "en-US";
		recognition.continuous = options.continuous || false;

		if ("webkitSpeechGrammarList" in window) {
			const grammar =
				"#JSGF V1.0; grammar punctuation; public <punctuation> = period | comma | exclamation | question | colon";
			const speechRecognitionList = new window.webkitSpeechGrammarList();
			speechRecognitionList.addFromString(grammar, 1);
			recognition.grammars = speechRecognitionList;
		}

		recognition.onresult = (event) => {
			let text = "";
			const current = event.resultIndex;
			//for (let i = 0; i < event.results.length; i++) {
				text += event.results[current][0].transcript;
			//}

			setTranscript(text);
		};

		recognition.onerror = (event) => {
			console.error("Speech recognition error", event.error);
		};

		recognition.onend = () => {
			setIsListening(false);
			setTranscript("");
		};

		return () => {
			recognition.stop();
		};
	}, []);

	const startListening = () => {
		if (recognitionRef.current && !isListening) {
			recognitionRef.current.start();
			setIsListening(true);
		}
	};

	const stopListening = () => {
		if (recognitionRef.current && isListening) {
			recognitionRef.current.stop();
			setIsListening(false);
		}
	};

	return {
		isListening,
		startListening,
		stopListening,
		transcript,
		isSpeechSupported,
	};
};
