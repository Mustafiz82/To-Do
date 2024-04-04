import { useState } from "react";
import "./App.css";
import TaskInput from "./Component/TaskInput";
import TaskList from "./Component/TaskList";
import TaskDetail from "./Component/TaskDetail";

// Main App component
function App() {
	// Check localStorage for existing task data
	let localStorageTask = localStorage.getItem("taskData");
	if (localStorageTask === null || localStorageTask === undefined) {
		localStorageTask = []; // If no task data found, initialize as empty array
	} else {
		localStorageTask = JSON.parse(localStorageTask); // Parse existing task data from localStorage
	}

	// State variables
	const [expandTaskDetail, setExpandTaskDetail] = useState(true); // State for expanding/collapsing task detail
	const [taskData, setTaskData] = useState(localStorageTask); // State for storing task data
	const [currentViewTask, setCurrentViewTask] = useState(0); // State for tracking currently viewed task index

	// Retrieve current task info based on currentViewTask index
	const currentTaskInfo = taskData?.[currentViewTask];

	// JSX return
	return (
		<>
			<div className="flex gap-5 lg:p-5">
				{/* TaskInput component */}
				<div className="lg:w-2/3 w-full  bg-slate-100 h-calc-screen-full p-5 lg:rounded-xl overflow-y-auto">
					<TaskInput
						setTaskData={setTaskData}
						taskData={taskData}
					></TaskInput>
					<TaskList
						setTaskData={setTaskData}
						setCurrentViewTask={setCurrentViewTask}
						taskData={taskData}
					></TaskList>
				</div>
				{/* TaskDetail component */}
				<div
					className={`lg:w-1/3 w-full transition-all duration-500  lg:h-calc-screen-full overflow-hidden  absolute bottom-0   bg-white lg:bg-slate-100 p-5 rounded-xl lg:sticky lg:top-5 ${
						expandTaskDetail
							? "max-h-[125px] lg:max-h-none" // Conditional class for task detail expansion
							: "max-h-[800px] lg:max-h-none overflow-scroll " // Conditional class for task detail collapse
					}`}
				>
					<TaskDetail
						expandTaskDetail={expandTaskDetail}
						setExpandTaskDetail={setExpandTaskDetail}
						currentTaskInfo={currentTaskInfo}
					></TaskDetail>
				</div>
			</div>
		</>
	);
}

export default App; // Export App component
