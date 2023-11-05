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
                          <EditTask
                            boardName={board}
                            taskId={task.id}
                            editFunction={EditTaskFunction}
                            previousTaskName={task.name}
                          />
                        }
                        removeButton={
                          <RemoveTask
                            boardName={board}
                            taskId={task.id}
                            taskName={task.name}
                            removeFunction={RemoveTaskFunction}
                          />
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
