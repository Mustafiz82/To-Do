import React from "react";
import "./../App.css";

// TaskDetail component
const TaskDetail = ({
	currentTaskInfo,
	expandTaskDetail,
	setExpandTaskDetail,
}) => {
	// Function to handle expanding/collapsing task detail
	const handleExpandTaskDetail = () => {
		setExpandTaskDetail(!expandTaskDetail); // Toggle expandTaskDetail state
	};

	// JSX return
	return (
		<div className="sticky top-5"> {/* Sticky positioning for task detail */}
			{/* Heading for task detail */}
			<div className="flex justify-between items-center text-xl">
				<h1 className="text-2xl wow font-medium">
					{" "}
					<span className="lg:hidden ">View </span>Task Detail
				</h1>
				<div className="lg:hidden">
                    {/* Toggle button for expanding/collapsing task detail on mobile */}
                    {/* Using checkbox input with a hidden checkbox and a styled slider */}
                    <label class="switch">
					    <input  onClick={handleExpandTaskDetail} type="checkbox" class="chk"></input>
					    <span class="slider"></span>
				    </label>{" "}
                </div>
			</div>

			{/* Task name */}
			<h2 className="text-xl font-bold text-gray-700 my-4">
				{currentTaskInfo?.taskName}
			</h2>

			{/* Description section */}
			<h1 className="font-bold text-gray-500">Description</h1>
			<p>
				{currentTaskInfo?.tackDescription || "No Description Avallable"} {/* Display task description or placeholder if no description available */}
			</p>

			{/* Task details */}
			<div>
				{currentTaskInfo ? (
					<div className="mt-10">
						{/* Task creation date */}
						<h1>
							Task Creation Date :{" "}
							{new Date(
								currentTaskInfo?.taskCreationDate
							).toLocaleString()}
						</h1>
						{/* Task due date */}
						<h1>
							Task Due Date :{" "}
							{new Date(
								currentTaskInfo?.taskDueDate
							).toLocaleString()}
						</h1>
						{/* Task status */}
						<h1>
							Task Status :{" "}
							{currentTaskInfo?.completed
								? "completed"
								: "uncompleted"}
						</h1>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default TaskDetail; // Export TaskDetail component
