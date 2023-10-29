import { useState } from "react";

function Task({ name, editButton, removeButton }) {
  const [showTaskButtons, setShowTaskButtons] = useState(false);

  return (
    <div
      className="w-full max-h-[70px] min-h-[45px] py-2 justify-between items-center mb-[10px] px-3 bg-slate-200 rounded-lg flex flex-row"
      onMouseOver={() => setShowTaskButtons(true)}
      onMouseLeave={() => setShowTaskButtons(false)}
    >
      <h4
        className="unselectable text-lg m-0 text-gray-700 break-words min-w-0"
        unselectable="on"
      >
        {name}
      </h4>
      {showTaskButtons && (
        <div className="text-right">
          {editButton} {removeButton}
        </div>
      )}
    </div>
  );
}

export default Task;
