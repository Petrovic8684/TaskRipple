import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { handleShowTaskAdd } from "../../../features/modals";
import { AddTaskFunction } from "../../../features/boards";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const show = useSelector((state) => state.modals.value.showTaskAdd);
  const boardName = useSelector((state) => state.current.currentBoardName);
  const dispatch = useDispatch();

  return (
    <Modal
      show={show}
      onHide={() => {
        dispatch(handleShowTaskAdd(false));
      }}
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
            dispatch(handleShowTaskAdd(false));
            dispatch(
              AddTaskFunction({
                boardName: boardName,
                taskName: taskName,
                taskDescription: taskDescription,
                taskStartDate: taskStartDate,
                taskEndDate: taskEndDate,
              })
            );

            setTaskName("");
            setTaskDescription("");
            setTaskStartDate("");
            setTaskEndDate("");
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
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-blue-400"
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
                className="resize-none appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-blue-300"
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
            dispatch(handleShowTaskAdd(false));
          }}
          className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
        >
          Close
        </button>
        <button
          form="addtask"
          className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-blue-400 rounded-2xl md:w-auto md:mb-0"
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTask;
