import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// TaskList component
const TaskList = ({ taskData, setCurrentViewTask, setTaskData }) => {
	// Function to calculate remaining time for task due date
	const calculateRemainingTime = (dueDate) => {
		// Calculate time difference between due date and current time
		const dueDateTime = new Date(dueDate).getTime();
		const now = new Date().getTime();
		const difference = dueDateTime - now;

		// If difference is negative, task date has crossed
		if (difference < 0) {
			return "Task date crossed";
		}

		// Calculate days, hours, minutes, and seconds remaining
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(difference % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		// Return remaining time object
		return { days, hours, minutes, seconds };
	};

	// Function to handle task deletion
	const handleDelete = (indexToRemove) => {
		// Filter out task to be removed from taskData
		const updatedTaskData = taskData.filter(
			(_, index) => index !== indexToRemove
		);

		// Update taskData state
		setTaskData(updatedTaskData);

		// Update taskData in localStorage
		localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
	};

	// Function to mark task as completed
	const handleMarkAsCompleted = (indexToMark) => {
		// Clone taskData array
		const updatedTaskData = [...taskData];

		// Set completed flag to true for selected task
		updatedTaskData[indexToMark].completed = "true";

		// Update taskData state
		setTaskData(updatedTaskData);

		// Update taskData in localStorage
		localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
	};

	// JSX return
	return (
		<div>
			{/* Iterate over taskData array and display each task */}
			{taskData?.map((item, index) => (
				<div
					onClick={() => setCurrentViewTask(index)}
					key={item?.id || index}
					className={`mb-4 cursor-pointer text-xl flex justify-between  p-4	 mt-4 ${
						item?.completed
							? "bg-green-500 text-white" // Styling for completed tasks
							: typeof calculateRemainingTime(
									item?.taskDueDate
							  ) === "string"
							? "bg-red-500 text-white" // Styling for tasks with expired due date
							: "bg-white" // Default styling for uncompleted tasks with valid due date
					}`}
				>
					<div>
						{/* Task name */}
						<h1>{item?.taskName} </h1>
						{/* Remaining time or completion status */}
						<p className="mr-2 text-base text-white">
							{/* Display remaining time or completion status */}
							{typeof calculateRemainingTime(
								item?.taskDueDate
							) === "string" ? (
								// Display "Task date crossed" if due date has passed
								<span className="text-white">
									{calculateRemainingTime(item?.taskDueDate)}
								</span>
							) : item?.completed ? (
								// Display "completed" for completed tasks
								"completed"
							) : (
								// Display remaining time for uncompleted tasks
								<span className="text-green-600">
									{calculateRemainingTime(item?.taskDueDate)
										.days > 0 && (
										<>
											{
												calculateRemainingTime(
													item?.taskDueDate
												).days
											}
											{" "}days,
										</>
									)}
									{(calculateRemainingTime(item?.taskDueDate)
										.hours > 0 ||
										calculateRemainingTime(
											item?.taskDueDate
										).days > 0) && (
										<>
											{
												calculateRemainingTime(
													item?.taskDueDate
												).hours
											}
											{" "}hours ,
										</>
									)}
									{calculateRemainingTime(item?.taskDueDate)
										.minutes > 0 && (
										<>
											{
												calculateRemainingTime(
													item?.taskDueDate
												).minutes
											}
											{" "}minutes
										</>
									)}
									 {" "}remaining
								</span>
							)}
						</p>
					</div>
					{/* Action buttons */}
					<div className="flex gap-8 text-2xl">
						{/* Button to mark task as completed */}
						<button
							onClick={() => handleMarkAsCompleted(index)}
							title="Mark as completed"
							className={`${item?.completed || typeof calculateRemainingTime(
								item?.taskDueDate
							) === "string" ? "text-white " : "text-green-500"}`}
						>
							<span className={`${item?.completed ? "hidden" : "block"}`}>
								<FaCheck />
							</span>
						</button>
						{/* Button to delete task */}
						<button
							onClick={() => handleDelete(index)}
							title="Delete Task"
							type="submit"
							className={`${item?.completed || typeof calculateRemainingTime(
								item?.taskDueDate
							) === "string" ? "text-white " : "text-red-500"}`}
						>
							<MdDelete />
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default TaskList; // Export TaskList component
