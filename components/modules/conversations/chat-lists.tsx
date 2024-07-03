import { BotIcon, User2Icon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DUMMY_MESSAGES = [
	{
		id: "1",
		content:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos aspernatur accusamus recusandae atque praesentium eligendi. Eius at optio, laborum ipsa consequuntur accusantium fugit temporibus illo iusto quae nobis ut consequatur?",
		senderId: "1",
		recipientId: "2",
	},
	{
		id: "2",
		content:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos aspernatur accusamus recusandae atque praesentium eligendi. Eius at optio, laborum ipsa consequuntur accusantium fugit temporibus illo iusto quae nobis ut consequatur?",
		senderId: "2",
		recipientId: "1",
	},
];

export default function ChatLists() {
	return (
		<ul className="list-none p-8 flex flex-col-reverse gap-8 flex-[1_0_0] overflow-y-auto overflow-x-hidden">
			{DUMMY_MESSAGES.map((item) =>
				"1" === item.senderId ? (
					<li key={item.id} className="flex items-start gap-5 max-w-[80%]">
						<span className="shrink-0 w-10 h-10 border-slate-300 flex items-center justify-center border rounded-full bg-slate-200">
							<BotIcon className="text-slate-600" />
						</span>
						<div className="break-keep break-words transition w-full py-3 px-5 border border-slate-300 bg-slate-200 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl prose">
							<Markdown remarkPlugins={[remarkGfm]}>
								{item.content}
							</Markdown>
						</div>
					</li>
				) : (
					<li
						key={item.id}
						className="flex items-start gap-5 max-w-[80%] ml-auto"
					>
						<span className="shrink-0 w-10 h-10 border-slate-300 flex items-center justify-center border rounded-full bg-slate-200 order-2">
							<User2Icon className="text-slate-600" />
						</span>
						<div className="break-keep break-words transition w-full py-3 px-5 border border-slate-300 bg-slate-200 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl prose order-1">
							<Markdown remarkPlugins={[remarkGfm]}>
								{item.content}
							</Markdown>
						</div>
					</li>
				)
			)}
		</ul>
	);
}
