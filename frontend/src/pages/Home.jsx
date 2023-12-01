// components
import { useContext, useEffect, useState } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { AuthenticationContext } from "../components/AuthenticationControls";
import { api } from "../api";

const Home = () => {
	const [authentication, setAuthentication] = useContext(AuthenticationContext);
	const [goals, setGoals] = useState([]);

	useEffect(() => {
		const fetchGoals = async () => {
			try {
				const { status, data } = await api.getGoals();
				console.log(data);
				if (status === 200) setGoals(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchGoals();
	}, [authentication]);

	return (
		<div className="home">
			<div className="goals">
				{goals.map((goal) => (
					<GoalDetails goal={goal} key={goal._id} />
				))}
			</div>
			<GoalForm />
		</div>
	);
};

export default Home;
