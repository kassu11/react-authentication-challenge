import { api } from "../api";
import { useField } from "../hooks/useField";

const GoalForm = () => {
	const text = useField("text");
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("???");
		await api.createGoal({ text: text.value });
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
