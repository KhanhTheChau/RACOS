import SettingSection from "./SettingSection";
import { useSettings } from "../managers/SettingsContext";
export default function SettingSectionGeneral() {
	const {
		isDarkMode,
		setIsDarkMode,
		isChatAutoSpeak,
		setIsChatAutoSpeak,
		isVoiceAutoSpeak,
		setIsVoiceAutoSpeak,
		modalOption,
		setModalOption,
	} = useSettings();
	return (
		<SettingSection title={"Cài đặt chung"}>
			<div className="p-2 grid grid-cols-1 gap-1">
				<span className="flex py-4 px-2 gap-4 hover:bg-slate-400/20 bg-opacity-10 transition-all duration-150 rounded-md">
					<label
						className="text-black grow dark:text-white"
						htmlFor="toggle-dark-mode"
					>
						Chế độ tối
					</label>
					<input
						type="checkbox"
						id="toggle-dark-mode"
						className="toggle bg-blue-700"
						checked={isDarkMode}
						onClick={() => setIsDarkMode(!isDarkMode)}
					/>
				</span>
				<span className="flex py-4 px-2 gap-4 hover:bg-slate-400/20 bg-opacity-10 transition-all duration-150 rounded-md">
					<label
						className="text-black grow h-max dark:text-white"
						htmlFor="toggle-chat-speak"
					>
						Tự động nói trong Chat
					</label>
					<input
						type="checkbox"
						id="toggle-chat-speak"
						className="toggle bg-blue-700"
						checked={isChatAutoSpeak}
						onClick={() => setIsChatAutoSpeak(!isChatAutoSpeak)}
					/>
				</span>
				<span className="flex py-4 px-2 gap-4 hover:bg-slate-400/20 bg-opacity-10 transition-all duration-150 rounded-md">
					<label
						className="text-black grow dark:text-white"
						htmlFor="toggle-voice-speak"
					>
						Tự động nói trong Voice
					</label>
					<input
						type="checkbox"
						id="toggle-voice-speak"
						className="toggle bg-blue-700"
						checked={isVoiceAutoSpeak}
						onClick={() => setIsVoiceAutoSpeak(!isVoiceAutoSpeak)}
					/>
				</span>
			</div>
		</SettingSection>
	);
}
