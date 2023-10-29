import { useState } from "react";

import Board from "../Components/Home/Board";

import Task from "../Components/Home/Task";
import AddTask from "../Components/Home/AddTask";
import EditTask from "../Components/Home/EditTask";
import RemoveTask from "../Components/Home/RemoveTask";

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
    board0: [],
    board1: [],
    board2: [],
  });

  const [modalActive, setModalActive] = useState(false);

  function AddTaskFunction(boardId, taskName) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
    };

    if (boardId === 0) {
      setBoards((prevState) => {
        return {
          ...boards,
          board0: [...prevState.board0, newTask],
        };
      });
    }

    if (boardId === 1) {
      setBoards((prevState) => {
        return {
          ...boards,
          board1: [...prevState.board1, newTask],
        };
      });
    }

    if (boardId === 2) {
      setBoards((prevState) => {
        return {
          ...boards,
          board2: [...prevState.board2, newTask],
        };
      });
    }
  }

  function EditTaskFunction(boardId, taskId, taskName) {
    if (boardId === 0) {
      setBoards((prevState) => {
        return {
          ...boards,
          board0: prevState.board0.map((task) => {
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

    if (boardId === 1) {
      setBoards((prevState) => {
        return {
          ...boards,
          board1: prevState.board1.map((task) => {
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

    if (boardId === 2) {
      setBoards((prevState) => {
        return {
          ...boards,
          board2: prevState.board2.map((task) => {
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
  }

  function RemoveTaskFunction(boardId, taskId) {
    if (boardId === 0) {
      setBoards((prevState) => {
        return {
          ...boards,
          board0: prevState.board0.filter((task) => {
            return task.id !== taskId;
          }),
        };
      });
    }

    if (boardId === 1) {
      setBoards((prevState) => {
        return {
          ...boards,
          board1: prevState.board1.filter((task) => {
            return task.id !== taskId;
          }),
        };
      });
    }

    if (boardId === 2) {
      setBoards((prevState) => {
        return {
          ...boards,
          board2: prevState.board2.filter((task) => {
            return task.id !== taskId;
          }),
        };
      });
    }
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
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl md:tracking-tight">
        Boards
      </h1>
      {boards.length === 0 && (
        <p className="mb-[15px] text-lg text-gray-600 md:text-xl md:mb-8">
          Looks like you don't have any boards yet!
        </p>
      )}
      <hr className="mb-[35px]" />
      <div className="flex flex-wrap justify-around items-start gap-y-10">
        <GridContextProvider onChange={onChange}>
          <Board name="To do">
            <GridDropZone
              disableDrag={modalActive}
              className="board0"
              id="board0"
              boxesPerRow={1}
              rowHeight={65}
              style={{
                height:
                  boards.board0.length === 0
                    ? 65 * Math.ceil(boards.board0.length + 1) + 20
                    : 65 * Math.ceil(boards.board0.length) + 20,
              }}
            >
              {boards.board0.map((task) => (
                <GridItem key={task.id}>
                  <Task
                    name={task.name}
                    editButton={
                      <EditTask
                        boardId={0}
                        taskId={task.id}
                        editFunction={EditTaskFunction}
                        previousTaskName={task.name}
                        modalToggleFunction={setModalActive}
                      />
                    }
                    removeButton={
                      <RemoveTask
                        boardId={0}
                        taskId={task.id}
                        removeFunction={RemoveTaskFunction}
                        modalToggleFunction={setModalActive}
                      />
                    }
                  />
                </GridItem>
              ))}
            </GridDropZone>

            <AddTask boardId={0} addFunction={AddTaskFunction} />
          </Board>
          <Board name="In progress">
            <GridDropZone
              disableDrag={modalActive}
              className="board1"
              id="board1"
              boxesPerRow={1}
              rowHeight={65}
              style={{
                height:
                  boards.board1.length === 0
                    ? 65 * Math.ceil(boards.board1.length + 1) + 20
                    : 65 * Math.ceil(boards.board1.length) + 20,
              }}
            >
              {boards.board1.map((task) => (
                <GridItem key={task.id}>
                  <Task
                    name={task.name}
                    editButton={
                      <EditTask
                        boardId={1}
                        taskId={task.id}
                        editFunction={EditTaskFunction}
                        previousTaskName={task.name}
                        modalToggleFunction={setModalActive}
                      />
                    }
                    removeButton={
                      <RemoveTask
                        boardId={1}
                        taskId={task.id}
                        removeFunction={RemoveTaskFunction}
                        modalToggleFunction={setModalActive}
                      />
                    }
                  />
                </GridItem>
              ))}
            </GridDropZone>

            <AddTask boardId={1} addFunction={AddTaskFunction} />
          </Board>
          <Board name="Done">
            <GridDropZone
              disableDrag={modalActive}
              className="board2"
              id="board2"
              boxesPerRow={1}
              rowHeight={65}
              style={{
                height:
                  boards.board2.length === 0
                    ? 65 * Math.ceil(boards.board2.length + 1) + 20
                    : 65 * Math.ceil(boards.board2.length) + 20,
              }}
            >
              {boards.board2.map((task) => (
                <GridItem key={task.id}>
                  <Task
                    name={task.name}
                    editButton={
                      <EditTask
                        boardId={2}
                        taskId={task.id}
                        editFunction={EditTaskFunction}
                        previousTaskName={task.name}
                        modalToggleFunction={setModalActive}
                      />
                    }
                    removeButton={
                      <RemoveTask
                        boardId={2}
                        taskId={task.id}
                        removeFunction={RemoveTaskFunction}
                        modalToggleFunction={setModalActive}
                      />
                    }
                  />
                </GridItem>
              ))}
            </GridDropZone>
            <AddTask boardId={2} addFunction={AddTaskFunction} />
          </Board>
        </GridContextProvider>
      </div>
    </section>
  );
}

export default Home;
