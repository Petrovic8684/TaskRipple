import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function RemoveBoard({ boardName, removeFunction }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        onClick={() => {
          handleShow();
        }}
        className="h-[42px] px-[16px] text-2xl text-white bg-red-400 rounded-2xl md:text-4xl md:w-auto md:mb-0"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          height="2rem"
          width="2rem"
        >
          <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
        </svg>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              removeFunction(boardName);
            }}
            autoComplete="off"
            id="removeboard"
            className="w-full md:max-w-sm md:w-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <p>Are you sure you want to remove this board?</p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              handleClose();
            }}
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
          >
            No
          </button>
          <button
            form="removeboard"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-red-400 rounded-2xl md:w-auto md:mb-0"
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveBoard;
