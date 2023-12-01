import { useContext } from "react";
import { api } from "../api";
import { useField } from "../hooks/useField";
import { AuthenticationContext } from "../components/AuthenticationControls";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";

const Login = () => {
	const email = useField("email");
	const password = useField("password");
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [addNotification] = useContext(NotificationContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email.value || !password.value) {
			console.log("?????");
			return addNotification({ type: "error", title: "Login failed", message: "Please fill in all fields" });
		}
		try {
			console.log("asdasdasda", email);
			const response = await api.login({ email: email.value, password: password.value, rememberPassword: true });
			console.log(response);
			setAuthentication({
				isAuthenticated: true,
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken,
			});
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

			<button>Log in</button>
		</form>
	);
};

export default Login;
