// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { api } from "../api";

const GoalDetails = ({ goal, onUpdate }) => {
	const handleDelete = async () => {
		try {
			await api.removeGoal(goal._id);
			onUpdate((prev) => !prev);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="goal-details">
			<h4>{goal.text}</h4>
			<p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p>
			<span className="material-symbols-outlined" onClick={handleDelete}>
				delete
			</span>
		</div>
	);
};

export default GoalDetails;
