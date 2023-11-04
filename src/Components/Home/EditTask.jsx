import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function EditTask({
  boardName,
  taskId,
  editFunction,
  previousTaskName,
  disableDragEdit,
  setDisableDragEdit,
}) {
  const [taskName, setTaskName] = useState(previousTaskName);

  const handleClose = () => setDisableDragEdit(false);
  const handleShow = () => setDisableDragEdit(true);

  return (
    <>
      <button
        onClick={() => {
          handleShow();
        }}
        className="h-[30px] px-[15px] text-2xl text-white bg-yellow-300 rounded-2xl md:w-auto md:mb-0"
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M13.498.795l.149-.149a1.207 1.207 0 111.707 1.708l-.149.148a1.5 1.5 0 01-.059 2.059L4.854 14.854a.5.5 0 01-.233.131l-4 1a.5.5 0 01-.606-.606l1-4a.5.5 0 01.131-.232l9.642-9.642a.5.5 0 00-.642.056L6.854 4.854a.5.5 0 11-.708-.708L9.44.854A1.5 1.5 0 0111.5.796a1.5 1.5 0 011.998-.001zm-.644.766a.5.5 0 00-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 000-.708l-1.585-1.585z" />
        </svg>
      </button>

      <Modal
        show={disableDragEdit}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              editFunction(boardName, taskId, taskName);
              setTaskName("");
            }}
            autoComplete="off"
            id="edittask"
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
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-300"
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
            onClick={() => {
              handleClose();
            }}
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
          >
            Close
          </button>
          <button
            form="edittask"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-yellow-300 rounded-2xl md:w-auto md:mb-0"
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;
