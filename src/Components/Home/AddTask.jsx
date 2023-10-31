import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddTask({ boardName, addFunction }) {
  const [taskName, setTaskName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center items-center w-[40px] h-[35px] mb-2 text-xl text-white bg-green-400 rounded-2xl md:text-3xl md:w-[42px] md:mb-0 md:w-[51px] md:h-[45px]"
      >
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
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
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              addFunction(boardName, taskName);
              setTaskName("");
            }}
            autoComplete="off"
            id="addtask"
            className="w-full md:max-w-sm md:w-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Task name:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-400"
                  id="inline-full-name"
                  type="text"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
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
            form="addtask"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-green-400 rounded-2xl md:w-auto md:mb-0"
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask;
