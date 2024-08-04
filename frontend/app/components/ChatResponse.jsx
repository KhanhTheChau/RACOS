/* 
	response: {
		role: String (user, bot)
		content: String
	}
*/
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ChatOptions from "./ChatOptions";

export default function ChatResponse({
	response,
	index,
	autoSpeak,
	isLoading,
}) {
	return (
		<div className="text-black grid grid-cols-1 gap-4 py-4">
			{response.role === "user" ? (
				<div className="chat chat-end flex items-start flex-row-reverse gap-4">
					<div className="place-self-end rounded-full bg-white p-2 text-lg">
						<FaUser />
					</div>
					<div className="chat-bubble bg-white dark:bg-slate-700 min-w-40 shadow-md rounded-lg p-2 max-w-2/3">
						<p className="text-left max-w-2/3">{response.content}</p>
						<ChatOptions
							autoSpeak={false}
							text={response.content}
							audioId={"audio" + index}
							options={{ role: "user", text: response.content }}
						/>
					</div>
				</div>
			) : (
				<div className="chat chat-start flex items-start  gap-4">
					<div className="place-self-end rounded-full bg-white p-2 text-lg">
						<RiRobot2Fill />
					</div>
					<div className="chat-bubble bg-white text-black dark:text-white dark:bg-slate-700 shadow-md rounded-lg p-2">
						<div className="text-left p-1">
							{/* { <pre>{JSON.stringify(data, null, 2)}</pre>} */}
							<Markdown
								className={"p-0 text-wrap"}
								key={index}
								rehypePlugins={[rehypeRaw]}
							>
								{response.content}
							</Markdown>
						</div>

						<ChatOptions
							autoSpeak={autoSpeak || false}
							text={response.content}
							audioId={"audio" + index}
							options={{ role: "bot" }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
