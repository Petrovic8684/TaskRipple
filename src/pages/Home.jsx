import { useState } from "react";

import Board from "../Components/Home/Board";
import AddBoard from "../Components/Home/AddBoard";
import EditBoard from "../Components/Home/EditBoard";
import RemoveBoard from "../Components/Home/RemoveBoard";

import Task from "../Components/Home/Task";
import AddTask from "../Components/Home/AddTask";
import EditTask from "../Components/Home/EditTask";
import RemoveTask from "../Components/Home/RemoveTask";

import ErrorModal from "../Components/Home/ErrorModal";

import { v4 as uuidv4 } from "uuid";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

function Home() {
  const [boards, setBoards] = useState({
    "To Do": [],
    "In Progress": [],
    Done: [],
  });

  const [currentTask, setCurrentTask] = useState({});
  const [currentBoardName, setCurrentBoardName] = useState();

  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);
  const handleRemoveClose = () => setShowRemove(false);
  const handleRemoveShow = () => setShowRemove(true);

  const [existsClash, setExistsClash] = useState(false);

  function AddBoardFunction(boardName) {
    let clash = false;

    Object.keys(boards).forEach((board) => {
      if (board === boardName) {
        setExistsClash(true);
        clash = true;
        return;
      }
    });

    if (clash === true) return;

    setBoards({ ...boards, [boardName]: [] });
  }

  function EditBoardFunction(boardName, newName) {
    if (boardName === newName) return;

    const keys = Object.keys(boards);
    let clash = false;

    keys.forEach((board) => {
      if (board === newName) {
        setExistsClash(true);
        clash = true;
        return;
      }
    });

    if (clash === true) return;

    const newObj = keys.reduce((acc, val) => {
      if (val === boardName) {
        acc[newName] = boards[boardName];
      } else {
        acc[val] = boards[val];
      }
      return acc;
    }, {});

    setBoards(newObj);
  }

  function RemoveBoardFunction(boardName) {
    setBoards((prevState) => {
      const copy = { ...prevState };
      delete copy[boardName];

      return copy;
    });
  }

  function AddTaskFunction(boardName, taskName) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
    };

    Object.keys(boards).forEach((board) => {
      if (board === boardName) {
        setBoards((prevState) => {
          return {
            ...boards,
            [board]: [...prevState[board], newTask],
          };
        });
      }
    });
  }

  function EditTaskFunction(boardName, taskId, taskName) {
    Object.keys(boards).forEach((board) => {
      if (board === boardName) {
        setBoards((prevState) => {
          return {
            ...boards,
            [board]: prevState[board].map((task) => {
              if (task.id === taskId) {
                const newTask = task;
                newTask.name = taskName;
                return newTask;
              }
              return task;
            }),
          };
        });
      }
    });
  }

  function RemoveTaskFunction(boardName, taskId) {
    Object.keys(boards).forEach((board) => {
      if (board === boardName) {
        setBoards((prevState) => {
          return {
            ...boards,
            [board]: prevState[board].filter((task) => {
              return task.id !== taskId;
            }),
          };
        });
      }
    });
  }

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        boards[sourceId],
        boards[targetId],
        sourceIndex,
        targetIndex
      );
      return setBoards({
        ...boards,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(boards[sourceId], sourceIndex, targetIndex);
    return setBoards({
      ...boards,
      [sourceId]: result,
    });
  }

  return (
    <section className="px-[4%] py-[3%]">
      <h1 className="mb-4 text-4xl leading-none tracking-normal text-gray-700 md:text-5xl md:tracking-tight">
        Boards
      </h1>
      {Object.keys(boards).length === 0 && (
        <p className="mb-[15px] text-lg text-gray-600 md:text-xl md:mb-8">
          Looks like you don't have any boards yet!
        </p>
      )}
      <AddBoard addFunction={AddBoardFunction} />
      <hr className="mb-[35px]" />
      <div className="flex flex-wrap justify-center items-start gap-x-10 gap-y-10">
        <GridContextProvider onChange={onChange}>
          {Object.keys(boards).map((board) => {
            return (
              <Board
                key={uuidv4()}
                name={board}
                editButton={
                  <EditBoard
                    boardName={board}
                    editFunction={EditBoardFunction}
                    previousBoardName={board}
                  />
                }
                removeButton={
                  <RemoveBoard
                    boardName={board}
                    removeFunction={RemoveBoardFunction}
                  />
                }
              >
                <GridDropZone
                  key={uuidv4()}
                  id={board}
                  boxesPerRow={1}
                  rowHeight={65}
                  style={{
                    height:
                      boards[board].length === 0
                        ? 65 * Math.ceil(boards[board].length + 1) + 45
                        : 65 * Math.ceil(boards[board].length) + 45,
                  }}
                >
                  {boards[board].map((task) => (
                    <GridItem key={task.id}>
                      <Task
                        name={task.name}
                        editButton={
                          <button
                            onClick={() => {
                              handleEditShow();
                              setCurrentBoardName(board);
                              setCurrentTask({ id: task.id, name: task.name });
                            }}
                            className="h-[30px] px-[15px] text-2xl text-white bg-yellow-300 rounded-2xl md:w-auto md:mb-0"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                            >
                              <path d="M13.498.795l.149-.149a1.207 1.207 0 111.707 1.708l-.149.148a1.5 1.5 0 01-.059 2.059L4.854 14.854a.5.5 0 01-.233.131l-4 1a.5.5 0 01-.606-.606l1-4a.5.5 0 01.131-.232l9.642-9.642a.5.5 0 00-.642.056L6.854 4.854a.5.5 0 11-.708-.708L9.44.854A1.5 1.5 0 0111.5.796a1.5 1.5 0 011.998-.001zm-.644.766a.5.5 0 00-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 000-.708l-1.585-1.585z" />
                            </svg>
                          </button>
                        }
                        removeButton={
                          <button
                            onClick={() => {
                              handleRemoveShow();
                              setCurrentBoardName(board);
                              setCurrentTask({ id: task.id, name: task.name });
                            }}
                            className="h-[30px] px-[15px] text-2xl text-white bg-red-400 rounded-2xl md:w-auto md:mb-0"
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                            >
                              <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
                            </svg>
                          </button>
                        }
                      />
                    </GridItem>
                  ))}
                </GridDropZone>

                <AddTask boardName={board} addFunction={AddTaskFunction} />
              </Board>
            );
          })}
        </GridContextProvider>
        <EditTask
          boardName={currentBoardName}
          task={currentTask}
          editFunction={EditTaskFunction}
          show={showEdit}
          handleClose={handleEditClose}
        />
        <RemoveTask
          boardName={currentBoardName}
          task={currentTask}
          removeFunction={RemoveTaskFunction}
          show={showRemove}
          handleClose={handleRemoveClose}
        />
        <ErrorModal
          name="Error"
          details="There already exists a board by that name!"
          existsClash={existsClash}
          setExistsClash={setExistsClash}
        />
      </div>
    </section>
  );
}

export default Home;
