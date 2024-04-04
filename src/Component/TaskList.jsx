import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskList = ({ taskData, setCurrentViewTask, setTaskData }) => {
	console.log(taskData, "tasklist");

	const calculateRemainingTime = (dueDate) => {
		const dueDateTime = new Date(dueDate).getTime();
		const now = new Date().getTime();
		const difference = dueDateTime - now;

		if (difference < 0) {
			return "Task date crossed";
		}

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(difference % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds };
	};

	const handleDelete = (indexToRemove) => {
		const updatedTaskData = taskData.filter(
			(_, index) => index !== indexToRemove
		);

		setTaskData(updatedTaskData);

		localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
	};
	const handleMarkAsCompleted = (indexToMark) => {
		console.log(indexToMark);
		console.log(taskData);

		const updatedTaskData = [...taskData];

		updatedTaskData[indexToMark].completed = "true";
		setTaskData(updatedTaskData);

		localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
	};

	return (
		<div>
			{taskData?.map((item, index) => (
				<div
					onClick={() => setCurrentViewTask(index)}
					key={item?.id || index}
					className={`mb-4 cursor-pointer text-xl flex justify-between  p-4	 mt-4 ${
						item?.completed
							? "bg-green-500 text-white"
							: typeof calculateRemainingTime(
									item?.taskDueDate
							  ) === "string"
							? "bg-red-500 text-white"
							: "bg-white"
					}`}
				>
					<div>
						<h1>{item?.taskName} </h1>
						<p className="mr-2 text-base text-white">
							{typeof calculateRemainingTime(
								item?.taskDueDate
							) === "string" ? (
								<span className="text-white">
									{calculateRemainingTime(item?.taskDueDate)}
								</span>
							) : item?.completed ? (
								"completed"
							) : (
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
					<div className="flex gap-8 text-2xl">
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

export default TaskList;
