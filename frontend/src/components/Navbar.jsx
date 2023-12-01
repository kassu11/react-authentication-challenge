import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { AuthenticationContext } from "./AuthenticationControls";

const Navbar = () => {
	const [flag, setFlag] = useState(false);
	const [authentication, setAuthentication] = useContext(AuthenticationContext);

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
							<span>my.email@email.com</span>
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
