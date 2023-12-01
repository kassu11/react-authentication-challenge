import { api } from "../api";
import { useField } from "../hooks/useField";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";
import { useContext } from "react";

const Signup = () => {
	const name = useField("text");
	const email = useField("email");
	const password = useField("password");
	const [addNotification] = useContext(NotificationContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await api.register({ name: name.value, email: email.value, password: password.value });
			if (response.status === 401) {
				return addNotification({ type: "error", title: "Login failed", message: "User with this email already exists" });
			}
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign Up</h3>
			<label>Name:</label>
			<input {...name} />
			<label>Email address:</label>
			<input {...email} />
			<label>Password:</label>
			<input {...password} />

			<button>Sign up</button>
		</form>
	);
};

export default Signup;
