import { useState, forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    );
  }
);

function Board({
  name,
  editBoardButton,
  removeBoardButton,
  addTaskButton,
  children,
}) {
  const [showBoardButtons, setShowBoardButtons] = useState(false);

  return (
    <div className="w-[24rem] justify-center items-center bg-white shadow-lg rounded-lg flex flex-col relative">
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
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <svg
                    className="w-10 h-10 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu} style={{ zIndex: 9999 }}>
                  <Dropdown.Item>{editBoardButton}</Dropdown.Item>
                  <Dropdown.Item>{removeBoardButton}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        {children}
      </div>
      {addTaskButton}
    </div>
  );
}

export default Board;
