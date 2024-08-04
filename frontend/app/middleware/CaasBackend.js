"use server";

import axios from "axios";
// import { cookies } from "next/headers";

// fetch userdata from server
async function getUserInfo({ token }) {
	//console.log(process.env.BACKEND_URL + "/api/user/info");
	//console.log("logging in with ", token);

	const config = {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: {
			token: token,
		},
	};
	const response = await axios.get(
		process.env.BACKEND_URL + "/api/user/info",
		null,
		{
			params: {
				token: token,
			},
			...config,
		}
	);
	const data = response.data;
	return data;
}

async function login({ email, password }) {
	//console.log(process.env.BACKEND_URL + "/api/user/login");
	//console.log("logging in with ", email, password);

	const response = await axios.post(
		process.env.BACKEND_URL + "/api/user/login",
		{
			email: email,
			password: password,
		}
	);

	const data = response.data;
	//console.log(data);

	// if login successfully, get user info and store in cookies
	if (data.success) {
		const res = await getUserInfo({ token: data.token });
		//console.log(res);
		if (res.success) {
			let data = {
				token: data.token,
				name: res.name,
				email: res.email,
			};
			// cookies().set("token", data.token);
			// cookies().set("name", data.name);
			// cookies().set("email", data.email);
			localStorage.setItem("token", data.token);
			localStorage.setItem("name", data.name);
			localStorage.setItem("email", data.email);
		}
	}

	return data;
}

async function sendPrompt({ prompt }) {
	const response = await axios.post(
		process.env.BACKEND_URL + "/api/chat/prompt",
		{
			//token: token,
			prompt: prompt,
		}
	);
	const data = response.data;
	return data;
}

async function register({ username, email, password }) {
	const response = await axios.post(
		process.env.BACKEND_URL + "/api/user/register",
		{
			username: username,
			email: email,
			password: password,
		}
	);
	const data = response.data;
	return data;
}

// clear cookies
async function logout() {
	// cookies().set("token", '', {expires: new Date(0)});
	// cookies().set("name", '', {expires: new Date(0)});
	// cookies().set("email", '', {expires: new Date(0)});
	localStorage.removeItem("token");
	localStorage.removeItem("name");
	localStorage.removeItem("email");
	return { success: true };
}

// send userinfo
async function getUser() {
	// const token = cookies().get("token")?.value;
	// const name = cookies().get("name")?.value;
	// const email = cookies().get("email")?.value;
	const token = localStorage.getItem("token");
	const name = localStorage.getItem("name");
	const email = localStorage.getItem("email");

	let success = token && name && email;

	return {
		success: success,
		token: token,
		name: name,
		email: email,
	};
}

export { login, logout, register, sendPrompt, getUser };
