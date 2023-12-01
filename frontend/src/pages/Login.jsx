import { useContext, useState } from "react";
import { api } from "../api";
import { useField } from "../hooks/useField";
import { AuthenticationContext } from "../components/AuthenticationControls";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";
import { useNavigate, useNavigation } from "react-router-dom";
import { useBox } from "../hooks/useBox";

const Login = () => {
	const email = useField("email");
	const password = useField("password");
	const rememberPassword = useBox("checkbox");
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [addNotification] = useContext(NotificationContext);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email.value || !password.value) {
			return addNotification({ type: "error", title: "Login failed", message: "Please fill in all fields" });
		}

		try {
			const { data, status } = await api.login({
				email: email.value,
				password: password.value,
				rememberPassword: rememberPassword.checked,
			});

			if (status === 400) return addNotification({ type: "error", title: "Login failed", message: "Wrong password or email" });

			if (status === 200) addNotification({ type: "success", title: "Login successful", message: "Welcome back!" });

			setAuthentication({
				isAuthenticated: true,
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			});

			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Log In</h3>

			<label>Email address:</label>
			<input {...email} />
			<label>Password:</label>
			<input {...password} />

			<label>Remember password:</label>
			<input {...rememberPassword} />

			<button>Log in</button>
		</form>
	);
};

export default Login;
