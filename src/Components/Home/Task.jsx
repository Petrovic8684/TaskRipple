import { useCallback, useState } from "react";

function Task({ name, editButton, removeButton }) {
  const [showTaskButtons, setShowTaskButtons] = useState(false);

  const handleScroll = useCallback((e) => {
    if (e.cancelable) e.preventDefault();
  });

  return (
    <div
      className="task w-full max-h-[70px] min-h-[45px] py-2 justify-between items-center mb-[10px] px-3 bg-slate-200 rounded-lg flex flex-row"
      onMouseOver={() => {
        setShowTaskButtons(true);
      }}
      onMouseLeave={() => {
        setShowTaskButtons(false);
      }}
      onTouchStart={() => {
        document.body.classList.add("overflow-y-hidden");
        document.addEventListener("touchmove", handleScroll, {
          passive: false,
        });
      }}
      onTouchEnd={() => {
        document.body.classList.remove("overflow-y-hidden");
        document.removeEventListener("touchmove", handleScroll, {
          passive: false,
        });
      }}
    >
      <h4
        className="unselectable text-lg m-0 text-gray-700 break-words min-w-0"
        unselectable="on"
      >
        {name}
      </h4>
      {showTaskButtons && (
        <div className="text-right unselectable" unselectable="on">
          {editButton} {removeButton}
        </div>
      )}
    </div>
  );
}

export default Task;
