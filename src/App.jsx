import { useState } from "react";
import "./App.css";
import TaskInput from "./Component/TaskInput";
import TaskList from "./Component/TaskList";
import TaskDetail from "./Component/TaskDetail";

function App() {
	let localStorageTask = localStorage.getItem("taskData");
	if (localStorageTask === null || localStorageTask === undefined) {
		localStorageTask = [];
	} else {
		localStorageTask = JSON.parse(localStorageTask);
	}

	const [expandTaskDetail, setExpandTaskDetail] = useState(true);
	const [taskData, setTaskData] = useState(localStorageTask);
	const [currentViewTask, setCurrentViewTask] = useState(0);
	console.log(currentViewTask);

	const currentTaskInfo = taskData?.[currentViewTask];
	console.log(currentTaskInfo);

	return (
		<>
			<div className="flex gap-5 lg:p-5">
				<div className="md:w-2/3   bg-slate-100 h-calc-screen-full p-5 md:rounded-xl overflow-y-auto">
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
				<div
					className={`md:w-1/3 w-full transition-all duration-500  md:h-calc-screen-full overflow-hidden  absolute bottom-0   bg-white md:bg-slate-100 p-5 rounded-xl md:sticky md:top-5 ${
						expandTaskDetail
							? "max-h-[125px] md:max-h-none"
							: "max-h-[800px] md:max-h-none overflow-scroll "
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

export default App;
