import React from "react";
import "./../App.css";

const TaskDetail = ({
	currentTaskInfo,
	expandTaskDetail,
	setExpandTaskDetail,
}) => {
	console.log(currentTaskInfo, "taskdetial");

	const handleExpandTaskDetail = () => {
		setExpandTaskDetail(!expandTaskDetail);
		console.log(expandTaskDetail);
	};

	return (
		<div className="sticky top-5">
			<div className="flex justify-between items-center text-xl">
				<h1 className="text-2xl wow font-medium">
					{" "}
					<span className="md:hidden ">View </span>Task Detail
				</h1>
				<div className="md:hidden">
                   
                <label class="switch">
					<input  onClick={handleExpandTaskDetail} type="checkbox" class="chk"></input>
					<span class="slider"></span>
				</label>{" "}
                </div>
			</div>

			<h2 className="text-xl font-bold text-gray-700 my-4">
				{currentTaskInfo?.taskName}
			</h2>

			<h1 className="font-bold text-gray-500">Description</h1>
			<p>
				{currentTaskInfo?.tackDescription || "No Description Avallable"}
			</p>

			<div>
				{currentTaskInfo ? (
					<div className="mt-10">
						<h1>
							Task Creation Date :{" "}
							{new Date(
								currentTaskInfo?.taskCreationDate
							).toLocaleString()}
						</h1>
						<h1>
							Task Due Date :{" "}
							{new Date(
								currentTaskInfo?.taskDueDate
							).toLocaleString()}
						</h1>
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

export default TaskDetail;
