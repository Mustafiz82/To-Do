import React, { useEffect, useState } from 'react';

const TaskInput = ({setTaskData , taskData}) => {

    const [collapse, setCollapse] = useState(true);

 
    
	const handleSubmit = (e) => {
		e.preventDefault();
		const taskName = e.target.tack_Name.value;
		const taskDueDate = e.target.Due_Date.value
        const tackDescription =  e.target.task_Description.value;
		const taskCreationDate = new Date().toISOString()

        const taskInfo = { taskCreationDate,  taskName, taskDueDate, tackDescription };

        setTaskData((prevTaskData) => [...prevTaskData, taskInfo]);
        localStorage.setItem('taskData', JSON.stringify([...taskData, taskInfo]));
        e.target.reset()

	};

    const handleCollapse = () => {
		setCollapse(false);

		document.getElementById("collapse").classList.remove("collapse-close");
		document.getElementById("collapse").classList.add("collapse-open");
	};

    const handleCollapseClose = () => {
		setCollapse(true);
		document.getElementById("collapse").classList.remove("collapse-open");
		document.getElementById("collapse").classList.add("collapse-close");
	};

    return (
        <div className=''>
            <div >
					<form onSubmit={handleSubmit}>
						<div
							tabIndex={0}
							id="collapse"
							className="text-xl relative  rounded-none  bg-white   collapse collapse-arrow	 border border-base-300 "
						>
							{collapse ? (
								<div
									onClick={handleCollapse}
									className="collapse-title flex  text-xl relative justify-between font-medium"
								>
									{/* <h1>
										{budgetStateData?.length > 0
											? "Add Another Budget"
											: "Add Your First Budget"}{" "}
									</h1> */}
                                    <h1>create new Task</h1>
								</div>
							) : (
								<div
									onClick={handleCollapseClose}
									className="collapse-title flex  text-xl relative justify-between font-medium"
								>
									{/* <h1>
										{budgetStateData?.length > 0
											? "Add Another Budget"
											: "Add Your First Budget"}{" "}
									</h1> */}
                                                                        <h1>create new Task</h1>

								</div>
							)}

							<div className="collapse-content  z-[8888888888] ">
								<div className='flex flex-col md:flex-row justify-between'>
                                <input
									required
									type="text"
									placeholder="Task Title"
									className=" outline-none border-b-2  w-full md:max-w-full"
									name="tack_Name"
								/>
								
                                </div>
                                <div>
                                <textarea required className="mt-4 text-xl outline-none border-b-2  w-full md:max-w-full h-24 " name='task_Description' placeholder="Task Description"></textarea>
                                <div className='flex text-gray-400 mt-4 md:mt-0 md:py-2 border-b-2 justify-center items-center'>
                                    <h1 className='w-1/2'>Due Date</h1>
                                <input
									required
									type="datetime-local"
									placeholder="Due Date"
									className=" md:text-right outline-none    md:max-w-sm"
									name="Due_Date"


								/>
                                </div>
                                </div>
								<button
									type="submit"
									className=" top-4 right-12 absolute btn btn-outline btn-sm"
								>
									Add
								</button>
							</div>
						</div>
					</form>
				</div>


        </div>
    );
};

export default TaskInput;