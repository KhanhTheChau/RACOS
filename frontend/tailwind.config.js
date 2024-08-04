/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
		"./node_modules/flowbite-react/lib/esm/**/*.js",
		"./node_modules/flowbite-react/lib/**/*.js",
		"./public/**/*.html",
		//"./src/**/*.{html,jsx,tsx}",
		// you can either add all styles
		//"./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	daisyui: {
		themes: ["light", "dark"],
	},

	plugins: [
		//require("flowbite/plugin"),
		require("daisyui"),
	],
	darkMode: "class",
};
