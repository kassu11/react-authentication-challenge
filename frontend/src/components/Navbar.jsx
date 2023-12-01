import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { AuthenticationContext } from "./AuthenticationControls";
import { NotificationContext } from "../components/NotificationControls/NotificationControls";

const Navbar = () => {
	const [flag, setFlag] = useState(false);
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [addNotification] = useContext(NotificationContext);

	useEffect(() => {
		setFlag(authentication.isAuthenticated);
	}, [authentication]);

	const logout = async () => {
		try {
			await api.logout();

			setAuthentication({
				isAuthenticated: false,
				accessToken: null,
				refreshToken: null,
			});
			setFlag(false);
			addNotification({ type: "success", title: "Logout successful", message: "Till next time!", duration: 2500 });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Dashboard</h1>
				</Link>
				<nav>
					{flag && (
						<div>
							<span>{authentication?.user?.email}</span>
							<button onClick={logout}>Log out</button>
						</div>
					)}
					{!flag && (
						<div>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
