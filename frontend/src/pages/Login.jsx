import { useBox } from "../hooks/useBox";
import { useField } from "../hooks/useField";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
	const [email] = useField("email");
	const [password] = useField("password");
	const rememberPassword = useBox("checkbox");
	const user = { email: email.value, password: password.value, rememberPassword: rememberPassword.checked };
	const login = useLogin(user);

	return (
		<form className="login" onSubmit={login}>
			<h3>Log In</h3>

			<label htmlFor="email">Email address:</label>
			<input id="email" {...email} />
			<label htmlFor="password">Password:</label>
			<input id="password" {...password} />

			<label htmlFor="remember">Remember password:</label>
			<input id="remember" {...rememberPassword} />

			<button>Log in</button>
		</form>
	);
};

export default Login;
