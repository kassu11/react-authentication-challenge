import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import NotificationContainer from "./components/NotificationControls/NotificationContainer/NotificationContainer";
import { useContext } from "react";
import { AuthenticationContext } from "./components/AuthenticationControls";

function App() {
	const [authentication, setAuthentication] = useContext(AuthenticationContext);

	return (
		<div className="App">
			<BrowserRouter>
				<NotificationContainer />
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={authentication.isAuthenticated ? <Home /> : <Navigate to="/login" />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
