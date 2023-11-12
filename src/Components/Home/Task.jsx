import { useCallback, useState, forwardRef } from "react";
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

function Task({ name, detailsButton, editButton, removeButton }) {
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
        <div>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <svg
                className="w-7 h-7 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item>{detailsButton}</Dropdown.Item>
              <Dropdown.Item>{editButton}</Dropdown.Item>
              <Dropdown.Item>{removeButton}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Task;

/*<div className="text-right unselectable" unselectable="on">
          {editButton} {removeButton}
        </div> */
