import { useContext } from "react";
import { api } from "../api";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";
import { useNavigate } from "react-router-dom";

export const useSignup = (name, email, password, passwordConfirm) => {
	const navigate = useNavigate();
	const [addNotification] = useContext(NotificationContext);
	const signup = async (event) => {
		event.preventDefault();
		if (!name || !email || !password)
			return addNotification({ type: "error", title: "Registration failed", message: "Please fill all fields" });
		if (password !== passwordConfirm)
			return addNotification({ type: "error", title: "Registration failed", message: "Passwords do not match" });
		try {
			const response = await api.register({ name, email, password });
			if (response.status === 401) {
				return addNotification({ type: "error", title: "Login failed", message: "User with this email already exists" });
			}

			if (response.status === 201) addNotification({ type: "success", title: "Registration successful", message: "User created" });
			navigate("/login");
		} catch (err) {
			console.error(err);
		}
	};
	return signup;
};
