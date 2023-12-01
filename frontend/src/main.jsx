import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthenticationControls from "./components/AuthenticationControls";
import NotificationControls from "./components/NotificationControls/NotificationControls";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthenticationControls>
			<NotificationControls>
				<App />
			</NotificationControls>
		</AuthenticationControls>
	</React.StrictMode>
);
