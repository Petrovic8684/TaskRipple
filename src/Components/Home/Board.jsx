import { useState } from "react";

import Task from "./Task";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import RemoveTask from "./RemoveTask";

import { v4 as uuidv4 } from "uuid";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

function Board({ id, name, editButton, removeButton }) {
  const [tasks, setTasks] = useState([]);
  const [showBoardButtons, setShowBoardButtons] = useState(false);

  function AddTaskFunction(taskName) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
    };
    setTasks([...tasks, newTask]);
  }

  function EditTaskFunction(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }

      return task;
    });
    setTasks(updatedTasks);
  }

  function RemoveTaskFunction(id) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  }

  function onTaskChange(sorceId, sourceIndex, targetIndex) {
    const nextState = swap(tasks, sourceIndex, targetIndex);
    setTasks(nextState);
  }

  return (
    <div className="w-[24rem] justify-center items-center bg-white shadow-lg rounded-lg flex flex-col">
      <div className="w-full p-4 justify-start flex flex-col">
        <div
          className="flex justify-between"
          onMouseOver={() => setShowBoardButtons(true)}
          onMouseLeave={() => setShowBoardButtons(false)}
        >
          <h4
            className="unselectable text-4xl mb-3 text-gray-700 break-words min-w-0"
            unselectable="on"
          >
            {name}
          </h4>
          {showBoardButtons && (
            <div className="text-right">
              {editButton} {removeButton}
            </div>
          )}
        </div>
        <div className="h-[30vh] overflow-x-hidden overflow-y-auto">
          <GridContextProvider onChange={onTaskChange}>
            <GridDropZone
              id="tasks"
              boxesPerRow={1}
              rowHeight={60}
              style={{ height: 60 * Math.ceil(tasks.length) }}
            >
              {tasks.map((task) => (
                <GridItem key={task.id}>
                  <Task
                    name={task.name}
                    editButton={
                      <EditTask
                        taskId={task.id}
                        editFunction={EditTaskFunction}
                        previousTaskName={task.name}
                      />
                    }
                    removeButton={
                      <RemoveTask
                        taskId={task.id}
                        removeFunction={RemoveTaskFunction}
                      />
                    }
                  />
                </GridItem>
              ))}
            </GridDropZone>
          </GridContextProvider>

          <AddTask addFunction={AddTaskFunction} />
        </div>
      </div>
    </div>
  );
}

export default Board;
