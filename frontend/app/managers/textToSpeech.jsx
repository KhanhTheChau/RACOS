"use client";

import { useEffect, useRef, useState } from "react";
/* options = {
    text: String,
    lang: String, // e.g., 'en-US', 'es-ES'
} */

export const useTextToSpeech = (options) => {
	let utteranceRef = useRef(null);
	let speechSynthesisRef = useRef(null);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [voices, setVoices] = useState([]);

	useEffect(() => {
		speechSynthesisRef.current = window.speechSynthesis;

		const loadVoices = () => {
			const voicesList = speechSynthesisRef.current.getVoices();
			setVoices(voicesList);
			//console.log(voicesList);
		};

		// Load voices if they're available
		if (speechSynthesisRef.current.onvoiceschanged !== undefined) {
			speechSynthesisRef.current.onvoiceschanged = loadVoices;
		}
		loadVoices();
	}, []);

	const speak = () => {
		speechSynthesisRef.current.speak(utteranceRef.current);
		setIsSpeaking(true);
	};

	const speakText = (text) => {
		let utt = new window.SpeechSynthesisUtterance(stripMarkdown(text));
		if (options && options.lang) {
			utt.lang = options.lang;
		}

		const selectedVoice = voices.find((voice) => voice.lang === utt.lang);
		if (selectedVoice) {
			utt.voice = selectedVoice;
		} else {
			console.warn(`No voice found for lang: ${utt.lang}`);
			return;
		}

		console.log(
			`Speaking with voice: ${utt.voice ? utt.voice.name : "default"}, lang: ${
				utt.lang
			}`
		);
		cancel();
		utt.onend = () => setIsSpeaking(false);
		speechSynthesisRef.current.speak(utt);
		setIsSpeaking(true);
	};

	const stripMarkdown = (markdown) => {
		return markdown
			.replace(/[#*_\-~`>[\]()]/g, "") // Remove Markdown characters
			.replace(/!\[.*\]\(.*\)/g, "") // Remove images
			.replace(/\[(.*?)\]\(.*\)/g, "$1") // Remove links but keep the text
			.replace(/\n/g, " ") // Replace newlines with spaces
			.replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
			.replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Remove emoticons
			.replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Remove miscellaneous symbols and pictographs
			.replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Remove transport and map symbols
			.replace(/[\u{1F700}-\u{1F77F}]/gu, "") // Remove alchemical symbols
			.replace(/[\u{1F780}-\u{1F7FF}]/gu, "") // Remove Geometric Shapes Extended
			.replace(/[\u{1F800}-\u{1F8FF}]/gu, "") // Remove Supplemental Arrows-C
			.replace(/[\u{1F900}-\u{1F9FF}]/gu, "") // Remove Supplemental Symbols and Pictographs
			.replace(/[\u{1FA00}-\u{1FA6F}]/gu, "") // Remove Chess Symbols
			.replace(/[\u{1FA70}-\u{1FAFF}]/gu, "") // Remove Symbols and Pictographs Extended-A
			.trim();
	};

	const pause = () => {
		speechSynthesisRef.current.pause();
		setIsSpeaking(false);
	};

	const cancel = () => {
		speechSynthesisRef.current.cancel();
		setIsSpeaking(false);
	};

	return {
		speak,
		pause,
		cancel,
		speakText,
		isSpeaking,
	};
};
