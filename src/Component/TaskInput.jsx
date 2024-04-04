import React, { useEffect, useState } from 'react';

// TaskInput component
const TaskInput = ({ setTaskData, taskData }) => {
    // State variable to manage collapse state of input form
    const [collapse, setCollapse] = useState(true);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Extract task information from form fields
        const taskName = e.target.tack_Name.value;
        const taskDueDate = e.target.Due_Date.value;
        const tackDescription = e.target.task_Description.value;
        const taskCreationDate = new Date().toISOString();

        // Create taskInfo object with extracted information
        const taskInfo = { taskCreationDate, taskName, taskDueDate, tackDescription };

        // Update taskData state with new taskInfo
        setTaskData((prevTaskData) => [...prevTaskData, taskInfo]);
        
        // Update taskData in localStorage
        localStorage.setItem('taskData', JSON.stringify([...taskData, taskInfo]));

        // Reset form fields
        e.target.reset();
    };

    // Function to handle collapse of input form
    const handleCollapse = () => {
        setCollapse(false);
        document.getElementById("collapse").classList.remove("collapse-close");
        document.getElementById("collapse").classList.add("collapse-open");
    };

    // Function to handle closing of collapsed input form
    const handleCollapseClose = () => {
        setCollapse(true);
        document.getElementById("collapse").classList.remove("collapse-open");
        document.getElementById("collapse").classList.add("collapse-close");
    };

    // JSX return
    return (
        <div className=''>
            <div>
                <form onSubmit={handleSubmit}>
                    <div tabIndex={0} id="collapse" className="text-xl relative  rounded-none  bg-white   collapse collapse-arrow	 border border-base-300 ">
                        {collapse ? (
                            <div onClick={handleCollapse} className="collapse-title flex  text-xl relative justify-between font-medium">
                                <h1>create new Task</h1>
                            </div>
                        ) : (
                            <div onClick={handleCollapseClose} className="collapse-title flex  text-xl relative justify-between font-medium">
                                <h1>create new Task</h1>
                            </div>
                        )}
                        <div className="collapse-content  z-[8888888888] ">
                            <div className='flex flex-col md:flex-row justify-between'>
                                {/* Task title input field */}
                                <input
                                    required
                                    type="text"
                                    placeholder="Task Title"
                                    className=" outline-none border-b-2  w-full md:max-w-full"
                                    name="tack_Name"
                                />
                            </div>
                            <div>
                                {/* Task description textarea */}
                                <textarea required className="mt-4 text-xl outline-none border-b-2  w-full md:max-w-full h-24 " name='task_Description' placeholder="Task Description"></textarea>
                                {/* Due date input field */}
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
                            {/* Submit button */}
                            <button type="submit" className=" top-4 right-12 absolute btn btn-outline btn-sm">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskInput; // Export TaskInput component
