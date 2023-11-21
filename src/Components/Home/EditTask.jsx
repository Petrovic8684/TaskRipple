import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditTask({ boardName, task, editFunction, show, handleClose }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  useEffect(() => {
    if (show === true) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setTaskStartDate(task.startdate);
      setTaskEndDate(task.enddate);
    }
  }, [show]);

  return (
    <>
      <Modal
        className="pointer-events-auto"
        show={show}
        onHide={() => {
          handleClose();
        }}
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
                  Name:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-yellow-300"
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
                  className="resize-none appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-yellow-300"
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
            onClick={() => {
              handleClose();
            }}
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
          >
            Close
          </button>
          <button
            onClick={() => {
              handleClose();
              editFunction(
                boardName,
                task.id,
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
