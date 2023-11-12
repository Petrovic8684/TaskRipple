import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddTask({ boardName, addFunction }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center items-center w-[45px] h-[45px] text-xl text-white bg-green-400 rounded-full md:text-3xl"
      >
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          height="1.8rem"
          width="1.8rem"
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
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              addFunction(
                boardName,
                taskName,
                taskDescription,
                taskStartDate,
                taskEndDate
              );
              setTaskName("");
              setTaskDescription("");
              setTaskStartDate(new Date());
              setTaskEndDate(new Date());
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
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block md:relative md:-top-9 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-description"
                >
                  Description:
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                  id="inline-full-description"
                  type="text"
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                  rows={4}
                  maxLength={1000}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-startdate"
                >
                  Start date:
                </label>
              </div>
              <div className="md:w-2/3">
                <Form.Control
                  id="inline-full-startdate"
                  type="date"
                  name="datepicstart"
                  placeholder="DateRange"
                  value={taskStartDate}
                  onChange={(e) => setTaskStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-enddate"
                >
                  End date:
                </label>
              </div>
              <div className="md:w-2/3">
                <Form.Control
                  id="inline-full-enddate"
                  type="date"
                  name="datepicend"
                  placeholder="DateRange"
                  value={taskEndDate}
                  onChange={(e) => setTaskEndDate(e.target.value)}
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
