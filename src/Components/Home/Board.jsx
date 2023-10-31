import { useState } from "react";

function Board({ name, editButton, removeButton, children }) {
  const [showBoardButtons, setShowBoardButtons] = useState(false);

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
        {children}
      </div>
    </div>
  );
}

export default Board;
