"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { useTheme } from "next-themes";
import { setCookie, getCookie, hasCookie } from "cookies-next";

const SettingsContext = createContext();

export const modelType = [
	{
		key: "Gemini 1.5 Pro",
		model: "models/gemini-1.5-pro-latest"
	},
	{
		key: "Gemini 1.5 Flash",
		model: "models/gemini-1.5-flash-latest"
	},
]

export const SettingsProvider = ({ children }) => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [modelId, setModelId] = useState(modelType[0].model);

	const checkItem = (item, cond) => {
		if (hasCookie(item)) {
			return getCookie(item) === (cond || "true");
		}
		return item === "voiceAutoSpeak";
	};

	const checkModel = () => {
		if (hasCookie("model")){
			return getCookie("model");
		}
		return modelType[0].model
	}

	const getCurrentModel = () => {
		return modelId;
	}

	const getAllModel = () => {
		return modelType;
	}

	const setModel = (newModel) => {
		if (modelType.some((model) => model.model === newModel)){
			setModelId(newModel);
			setCookie("model", newModel, {
				maxAge: 60 * 60 * 24 * 365
			});
		} else {
			setModel("models/gemini-1.5-pro-latest");
		}
	}

	const [isDarkMode, setIsDarkMode] = useState(theme === "dark" || false);
	const [isChatAutoSpeak, setIsChatAutoSpeak] = useState(
		checkItem("chatAutoSpeak")
	);

	const [isVoiceAutoSpeak, setIsVoiceAutoSpeak] = useState(
		checkItem("voiceAutoSpeak")
	);

	// const [modalOption, setModalOption] = useState(
	// 	"models/gemini-1.5-flash-latest"
	// );

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		setIsDarkMode(checkItem("theme", "dark"));
		setIsChatAutoSpeak(checkItem("chatAutoSpeak"));
		setIsVoiceAutoSpeak(checkItem("voiceAutoSpeak"));
		setModelId(checkModel());
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined" && isDarkMode !== null) {
			let html = document.documentElement;
			html.classList.remove("light");
			html.classList.remove("dark");
			html.setAttribute("data-theme", isDarkMode ? "dark" : "light");
			html.classList.add(theme);

			//localStorage.setItem("theme", isDarkMode ? "dark" : "light");
			setCookie("theme", isDarkMode ? "dark" : "light", {
				maxAge: 60 * 60 * 24 * 365,
			});
			//console.log("Theme set to: ", localStorage.getItem("theme"));
		}
	}, [theme]);

	useEffect(() => {
		setCookie("chatAutoSpeak", isChatAutoSpeak ? "true" : "false", {
			maxAge: 60 * 60 * 24 * 365,
		});
		setCookie("voiceAutoSpeak", isVoiceAutoSpeak ? "true" : "false", {
			maxAge: 60 * 60 * 24 * 365,
		});
	}, [isChatAutoSpeak, isVoiceAutoSpeak]);

	useEffect(() => {
		if (isDarkMode == true) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, [isDarkMode]);

	const context = {
		isDarkMode,
		setIsDarkMode,
		isChatAutoSpeak,
		setIsChatAutoSpeak,
		isVoiceAutoSpeak,
		setIsVoiceAutoSpeak,
		// modalOption,
		// setModalOption,
		getAllModel,
		getCurrentModel,
		setModel
	};

	if (!mounted) {
		return null;
	}

	return (
		<SettingsContext.Provider value={context}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}
	return context;
};
