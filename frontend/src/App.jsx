import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AuthenticationControls from "./components/AuthenticationControls";
import NotificationControls from "./components/NotificationControls/NotificationControls";
import NotificationContainer from "./components/NotificationControls/NotificationContainer/NotificationContainer";

function App() {
	return (
		<div className="App">
			<AuthenticationControls>
				<NotificationControls>
					<BrowserRouter>
						<Navbar />
						<NotificationContainer />
						<div className="pages">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
							</Routes>
						</div>
					</BrowserRouter>
				</NotificationControls>
			</AuthenticationControls>
		</div>
	);
}

export default App;
