import axios from "axios";

let refreshToken = "";
let accessToken = "";

export const api = {
	login: async ({ password, email, rememberPassword }) => {
		try {
			console.log(email);
			const response = await axios.post(
				"http://localhost:5000/auth/login",
				{ password, email, rememberPassword },
				{ withCredentials: true }
			);

			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
			refreshToken = response.data.refreshToken;
			accessToken = response.data.accessToken;

			return response;
		} catch (err) {
			console.error(err);
		}
	},
	refreshToken: async () => {
		try {
			const response = await axios.post("http://localhost:5000/auth/refresh", { token: refreshToken }, { withCredentials: true });
			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
			accessToken = response.data.accessToken;
			const user = response.data.user;
			localStorage.setItem("user", JSON.stringify(user));
			return response;
		} catch (err) {
			console.log(err);
			return err.response;
		}
	},
	logout: async () => {
		try {
			const response = await axios.post("http://localhost:5000/auth/logout", { token: refreshToken }, { withCredentials: true });
			delete axios.defaults.headers.common["Authorization"];
			accessToken = "";
			refreshToken = "";

			return response;
		} catch (err) {
			console.error(err);
		}
	},
	register: async ({ email, password, name }) => {
		try {
			const response = await axios.post("http://localhost:5000/api/users/register", { email, password, name });
			return response;
		} catch (err) {
			console.error(err);
		}
	},

	createGoal: requiresAuth(async ({ text }) => {
		const response = await axios.post("http://localhost:5000/api/goals", { text });
		return response;
	}),
	getGoals: requiresAuth(async () => {
		const response = await axios.get("http://localhost:5000/api/goals");
		return response;
	}),
	removeGoal: requiresAuth(async (goalId) => {
		const response = await axios.delete(`http://localhost:5000/api/goals/${goalId}`);
		return response;
	}),
	// getPosts: async () => {
	// 	const response = await axios.get("http://localhost:4000/posts");
	// 	return response;
	// },
	// getPostById: async (postId) => {
	// 	const response = await axios.get(`http://localhost:4000/posts/${postId}`);
	// 	return response;
	// },
	// getPostsByAuthor: async (userTag) => {
	// 	const response = await axios.get(`http://localhost:4000/posts/author/${userTag}`);
	// 	return response;
	// },
	// getPostReplies: async (postId, nesting) => {
	// 	const response = await axios.get(`http://localhost:4000/posts/${postId}/replies?nesting=${nesting ?? 3}`);
	// 	return response;
	// },
	// getPostParent: async (postId, nesting) => {
	// 	const response = await axios.get(`http://localhost:4000/posts/${postId}/parents?nesting=${nesting ?? 3}`);
	// 	return response;
	// },
	// searchPosts: async (search) => {
	// 	const response = await axios.get(`http://localhost:4000/posts/search/${search}`);
	// 	return response;
	// },
	// replyToPost: requiresAuth(async ({ postId, postText }) => {
	// 	const response = await axios.patch(`http://localhost:4000/posts/${postId}/reply`, { postText }, { withCredentials: true });
	// 	return response;
	// }),
	// dislikePost: requiresAuth(async (postId) => {
	// 	const response = await axios.put(`http://localhost:4000/posts/${postId}/dislike`, {}, { withCredentials: true });
	// 	return response;
	// }),
	// likePost: requiresAuth(async (postId) => {
	// 	const response = await axios.put(`http://localhost:4000/posts/${postId}/like`, {}, { withCredentials: true });
	// 	return response;
	// }),
	// removePost: requiresAuth(async (postId) => {
	// 	const response = await axios.delete(`http://localhost:4000/posts/${postId}`, { withCredentials: true });
	// 	return response;
	// }),

	// createUser: async ({ userTag, email, password }) => {
	// 	const response = await axios.post("http://localhost:4000/users", { userTag, email, password });
	// 	return response;
	// },
	// users: async () => {
	// 	const response = await axios.get("http://localhost:4000/users");
	// 	return response;
	// },
	// getUserById: async (userId) => {
	// 	const response = await axios.get(`http://localhost:4000/users/${userId}`);
	// 	return response;
	// },
	// getUserByUserTag: async (userTag) => {
	// 	const response = await axios.get(`http://localhost:4000/users/userTag/${userTag}`);
	// 	return response;
	// },
	// followUser: requiresAuth(async (userTag) => {
	// 	const response = await axios.put(`http://localhost:4000/users/follow/${userTag}`, {}, { withCredentials: true });
	// 	return response;
	// }),
	// unfollowUser: requiresAuth(async (userTag) => {
	// 	const response = await axios.put(`http://localhost:4000/users/unfollow/${userTag}`, {}, { withCredentials: true });
	// 	return response;
	// }),
	// addFriend: requiresAuth(async (userTag) => {
	// 	const response = await axios.put(`http://localhost:4000/users/addFriend/${userTag}`, {}, { withCredentials: true });
	// 	return response;
	// }),
	// removeFriend: requiresAuth(async (userTag) => {
	// 	const response = await axios.put(`http://localhost:4000/users/removeFriend/${userTag}`, {}, { withCredentials: true });
	// 	return response;
	// }),
};

function requiresAuth(callback) {
	return async function (...settings) {
		try {
			const response = await callback(...settings);
			return response;
		} catch (err) {
			if (err.response?.status === 403) {
				const response = await api.refreshToken();
				if (response?.status === 200) {
					return await callback(...settings);
				} else {
					return response;
				}
			} else {
				return err.response;
			}
		}
	};
}
