import { useContext } from "react";
import { api } from "../api";
import { useField } from "../hooks/useField";
import { NotificationContext } from "./NotificationControls/NotificationControls";

const GoalForm = ({ onUpdate }) => {
	const [addNotification] = useContext(NotificationContext);
	const [text, setText] = useField("text");
	const handleSubmit = async (event) => {
		event.preventDefault();
		await api.createGoal({ text: text.value });
		addNotification({ type: "success", title: "Goal added", message: "Goal added successfully!", duration: 2500 });
		setText("");
		onUpdate((prev) => !prev);
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Goal</h3>

			<label>Text:</label>
			<input {...text} />
			<button type="submit">Add Goal</button>
		</form>
	);
};

export default GoalForm;
