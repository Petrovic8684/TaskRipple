import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddBoard({ addFunction }) {
  const [boardName, setBoardName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="h-[70px] w-[70px] text-2xl text-white bg-blue-400 z-[10000] flex justify-center items-center rounded-full fixed bottom-10 right-10 md:text-4xl md:bottom-20 md:right-20"
      >
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          height="2.5rem"
          width="2.5rem"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M256 112v288M400 256H112"
          />
        </svg>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              addFunction(boardName);
              setBoardName("");
            }}
            autoComplete="off"
            id="addboard"
            className="w-full md:max-w-sm md:w-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Board name:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-blue-400"
                  id="inline-full-name"
                  type="text"
                  value={boardName}
                  onChange={(e) => {
                    setBoardName(e.target.value);
                  }}
                  autoFocus
                  required
                  maxLength={29}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
          >
            Close
          </button>
          <button
            form="addboard"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-blue-400 rounded-2xl md:w-auto md:mb-0"
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBoard;
