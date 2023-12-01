const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
	const { name } = req.body;
	try {
		const goals = await Goal.find({ user: name });
		res.status(200).json({
			success: true,
			data: goals,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
	const { name, text } = req.body;
	try {
		const user = await User.findOne({ name });
		const goal = await new Goal({
			text,
			user: user._id,
		});
		res.status(201).json({
			success: true,
			data: goal,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Update goal
// @route   PUT /api/goals/:id <---
// @access  Private
const updateGoal = async (req, res, next) => {
	const { id } = req.params;
	try {
		const goal = await Goal.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
		if (!goal) {
			return res.status(400).json({ Error: "No goal found" });
		}
		res.status(200).json({
			success: true,
			data: goal,
		});
	} catch (error) {}
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
	const { id } = req.params;
	try {
		const goal = await Goal.findByIddAndDelete(id);
		res.status(200).json({
			success: true,
			data: goal,
		});
		if (!goal) {
			return next(new ErrorResponse("No goal found", 404));
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
