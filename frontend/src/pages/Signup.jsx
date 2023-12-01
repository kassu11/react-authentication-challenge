import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";

const Signup = () => {
	const [name] = useField("text");
	const [email] = useField("email");
	const [password] = useField("password");
	const [passwordConfirm] = useField("password");
	const signup = useSignup(name.value, email.value, password.value, passwordConfirm.value);

	return (
		<form className="signup" onSubmit={signup}>
			<h3>Sign Up</h3>
			<label htmlFor="name">Name:</label>
			<input id="name" {...name} />
			<label htmlFor="email">Email address:</label>
			<input id="email" {...email} />
			<label htmlFor="password">Password:</label>
			<input id="password" {...password} />
			<label htmlFor="password">Confirm password:</label>
			<input id="password" {...passwordConfirm} />

			<button>Sign up</button>
		</form>
	);
};

export default Signup;
