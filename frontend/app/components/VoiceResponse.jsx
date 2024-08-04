/* 
	response: [
		{
			user: String,
			bot: String,
		}, ...
	]
*/
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useChat } from "../managers/chatContext";

export default function VoiceResponse({ response, index }) {
	//const { voiceAnswer, setVoiceAnswer, voiceQuestion } = useChat();
	return (
		<div className="text-black grid grid-cols-1 gap-4">
			<div className="flex items-start pt-10 flex-row-reverse gap-4">
				<div className=" rounded-full bg-white p-2 text-lg">
					<FaUser />
				</div>
				<div className="bg-white shadow-md rounded-lg p-2 max-w-2/3">
					<p className="text-left max-w-2/3">{response.user}</p>
				</div>
			</div>
			<div className="flex items-start pt-10 gap-4">
				<div className=" rounded-full bg-white p-2 text-lg">
					<RiRobot2Fill />
				</div>
				<div className="bg-white shadow-md rounded-lg p-2">
					<Markdown
						className={"p-0 text-wrap"}
						rehypePlugins={[rehypeRaw]}
						key={index}
					>
						{response.bot}
					</Markdown>
				</div>
			</div>
		</div>
	);
}
