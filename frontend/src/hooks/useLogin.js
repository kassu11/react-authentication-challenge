import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";
import { useContext } from "react";
import { AuthenticationContext } from "../components/AuthenticationControls";

export const useLogin = (user) => {
	const navigate = useNavigate();
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [addNotification] = useContext(NotificationContext);
	const { email, password, rememberPassword } = user;

	const login = async (event) => {
		event.preventDefault();
		if (!email || !password) {
			return addNotification({ type: "error", title: "Login failed", message: "Please fill in all fields" });
		}

		try {
			const { data, status } = await api.login({
				email,
				password,
				rememberPassword,
			});

			if (status === 400) return addNotification({ type: "error", title: "Login failed", message: "Wrong password or email" });

			if (status === 200) addNotification({ type: "success", title: "Login successful", message: "Welcome back!" });

			authentication.isAuthenticated = true;
			Object.assign(authentication, data);
			setAuthentication({ ...authentication });

			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};
	return login;
};
