// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";

const goalsArray = [
	{
		text: "Learn a new programming language",
		createdAt: new Date(2023, 11, 30),
	},
	{
		text: "Complete a fitness challenge",
		createdAt: new Date(2023, 11, 15),
	},
	{
		text: "Read 10 books by the end of the year",
		createdAt: new Date(2023, 10, 1),
	},
];

const Home = () => {
	return (
		<div className="home">
			<div className="goals">
				<GoalDetails goal={goalsArray[0]} />
				<GoalDetails goal={goalsArray[1]} />
				<GoalDetails goal={goalsArray[2]} />
			</div>
			<GoalForm />
		</div>
	);
};

export default Home;
