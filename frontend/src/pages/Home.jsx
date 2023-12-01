// components
import { useContext, useEffect, useState } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { AuthenticationContext } from "../components/AuthenticationControls";
import { api } from "../api";

const Home = () => {
	const [update, setUpdate] = useState(false);
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [goals, setGoals] = useState([]);

	useEffect(() => {
		const fetchGoals = async () => {
			try {
				const { status, data } = await api.getGoals();
				if (status === 200) setGoals(data);
				else setGoals([]);
			} catch (err) {
				console.error(err);
			}
		};

		fetchGoals();
	}, [authentication, update]);

	return (
		<div className="home">
			<div className="goals">
				{goals.map((goal) => (
					<GoalDetails goal={goal} key={goal._id} onUpdate={setUpdate} />
				))}
			</div>
			<GoalForm onUpdate={setUpdate} />
		</div>
	);
};

export default Home;
