import { api } from "../api";
import { useField } from "../hooks/useField";

const Login = () => {
	const email = useField("email");
	const password = useField("password");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log("asdasdasda", email);
			const response = await api.login({ email: email.value, password: password.value });
			console.log(response);
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
