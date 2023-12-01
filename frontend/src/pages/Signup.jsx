import { api } from "../api";
import { useField } from "../hooks/useField";

const Signup = () => {
	const name = useField("text");
	const email = useField("email");
	const password = useField("password");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await api.register({ name: name.value, email: email.value, password: password.value });
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
