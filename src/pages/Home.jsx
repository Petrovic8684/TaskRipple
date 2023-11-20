import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Board from "../Components/Home/Board";
import AddBoard from "../Components/Home/AddBoard";
import EditBoard from "../Components/Home/EditBoard";
import RemoveBoard from "../Components/Home/RemoveBoard";

import Task from "../Components/Home/Task";
import AddTask from "../Components/Home/AddTask";
import DetailsTask from "../Components/Home/DetailsTask";
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

import axios from "axios";

function Home() {
  const [boards, setBoards] = useState({});
  const [cookies, _] = useCookies(["access_token"]);

  const FetchBoards = async () => {
    try {
      const response = await axios.get(
        "https://task-ripple-backend.vercel.app:3001/api/home",
        {
          params: {
            userID: window.localStorage.getItem("userID"),
          },
          headers: { authorization: cookies.access_token },
        }
      );
      if (response.data.message === "Could not find user by that id!") {
        console.log("Could not find user by that id!");
        return;
      }

      setBoards(JSON.parse(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateBoards = async () => {
    try {
      const response = await axios.put(
        "https://task-ripple-backend.vercel.app:3001/api/home",
        {
          userID: window.localStorage.getItem("userID"),
          boards: JSON.stringify(boards),
        }
      );

      if (response.data.message === "User does not exist!") {
        console.log("User does not exist!");
        return;
      }

      if (response.data.message === "Records up to date!") {
        console.log("Records up to date!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (isLoad) {
      FetchBoards();
      setIsLoad(false);
      return;
    } else {
      UpdateBoards();
    }
  }, [boards]);

  const [currentTask, setCurrentTask] = useState({});
  const [currentBoardName, setCurrentBoardName] = useState();

  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const handleDetailsClose = () => setShowDetails(false);
  const handleDetailsShow = () => setShowDetails(true);
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

  function AddTaskFunction(
    boardName,
    taskName,
    taskDescription,
    taskStartDate,
    taskEndDate
  ) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      description: taskDescription,
      startdate: taskStartDate,
      enddate: taskEndDate,
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

  function EditTaskFunction(
    boardName,
    taskId,
    taskName,
    taskDescription,
    taskStartDate,
    taskEndDate
  ) {
    Object.keys(boards).forEach((board) => {
      if (board === boardName) {
        setBoards((prevState) => {
          return {
            ...boards,
            [board]: prevState[board].map((task) => {
              if (task.id === taskId) {
                const newTask = task;
                newTask.name = taskName;
                newTask.description = taskDescription;
                newTask.startdate = taskStartDate;
                newTask.enddate = taskEndDate;
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

  return cookies.access_token === "" ? (
    <></>
  ) : (
    <section className="px-[3%] py-[3%] md:px-[12%]">
      <div className="flex flex-column justify-center items-center">
        <h1 className=" text-4xl text-gray-700 text-center md:text-5xl">
          {window.localStorage.getItem("username")}'s boards
        </h1>
        <Link to="/" className="mb-3">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 22"
            className="w-10 h-10"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
            <path d="M7 12h14l-3-3m0 6l3-3" />
          </svg>
        </Link>
      </div>
      {Object.keys(boards).length === 0 && (
        <p className="mb-[15px] text-lg text-gray-600 text-center md:text-xl md:mb-8">
          Looks like you don't have any boards yet!
        </p>
      )}
      <AddBoard addFunction={AddBoardFunction} />
      <hr className="mb-[35px]" />
      <div className="flex flex-wrap gap-4 justify-evenly items-center mb-[10%]">
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
                        description={task.description}
                        detailsButton={
                          <div
                            onClick={() => {
                              handleDetailsShow();
                              setCurrentTask({
                                id: task.id,
                                name: task.name,
                                description: task.description,
                                startdate: task.startdate,
                                enddate: task.enddate,
                              });
                            }}
                          >
                            Show details
                          </div>
                        }
                        editButton={
                          <div
                            onClick={() => {
                              handleEditShow();
                              setCurrentBoardName(board);
                              setCurrentTask({
                                id: task.id,
                                name: task.name,
                                description: task.description,
                                startdate: task.startdate,
                                enddate: task.enddate,
                              });
                            }}
                          >
                            Edit
                          </div>
                        }
                        removeButton={
                          <div
                            onClick={() => {
                              handleRemoveShow();
                              setCurrentBoardName(board);
                              setCurrentTask({
                                id: task.id,
                                name: task.name,
                                description: task.description,
                                startdate: task.startdate,
                                enddate: task.enddate,
                              });
                            }}
                          >
                            Remove
                          </div>
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
        <DetailsTask
          task={currentTask}
          show={showDetails}
          handleClose={handleDetailsClose}
        />
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
