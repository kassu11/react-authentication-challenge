// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GoalDetails = ({ goal }) => {
  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>
        {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default GoalDetails;
