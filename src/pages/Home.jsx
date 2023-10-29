import { useState } from "react";

import Board from "../Components/Home/Board";
import AddBoard from "../Components/Home/AddBoard";
import EditBoard from "../Components/Home/EditBoard";
import RemoveBoard from "../Components/Home/RemoveBoard";

import { v4 as uuidv4 } from "uuid";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

function Home() {
  const [boards, setBoards] = useState([]);

  function AddBoardFunction(boardName) {
    const newBoard = {
      id: uuidv4(),
      name: boardName,
    };
    setBoards([...boards, newBoard]);
  }

  function EditBoardFunction(id, newName) {
    const updatedBoards = boards.map((board) => {
      if (id === board.id) {
        return { ...board, name: newName };
      }

      return board;
    });
    setBoards(updatedBoards);
  }

  function RemoveBoardFunction(id) {
    setBoards(
      boards.filter((board) => {
        return board.id !== id;
      })
    );
  }

  function onBoardChange(sorceId, sourceIndex, targetIndex) {
    const nextState = swap(boards, sourceIndex, targetIndex);
    setBoards(nextState);
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
      <AddBoard addFunction={AddBoardFunction} />
      <hr className="mb-[35px]" />
      <GridContextProvider onChange={onBoardChange}>
        <GridDropZone
          id="boards"
          boxesPerRow={4}
          rowHeight={450}
          style={{ height: 450 * Math.ceil(boards.length / 4) }}
        >
          {boards.map((board) => (
            <GridItem key={board.id}>
              <Board
                id={board.id}
                name={board.name}
                editButton={
                  <EditBoard
                    boardId={board.id}
                    editFunction={EditBoardFunction}
                    previousBoardName={board.name}
                  />
                }
                removeButton={
                  <RemoveBoard
                    boardId={board.id}
                    removeFunction={RemoveBoardFunction}
                  />
                }
              />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </section>
  );
}

export default Home;
