export default function SettingSection({ title, children }) {
	return (
		<div className="flex p-2 max-w-4xl bg-white dark:bg-gray-600 shadow-lg rounded-lg">
			<div className="grow w-screen">
				<h4 className=" grow">{title}</h4>
				{children}
			</div>
		</div>
	);
}
