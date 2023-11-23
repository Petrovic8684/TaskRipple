import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { handleShowTaskRemove } from "../../../features/modals";
import { RemoveTaskFunction } from "../../../features/boards";

function RemoveTask() {
  const show = useSelector((state) => state.modals.value.showTaskRemove);
  const boardName = useSelector((state) => state.current.currentBoardName);
  const task = useSelector((state) => state.current.currentTask);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          dispatch(handleShowTaskRemove(false));
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
            id="removetask"
            className="w-full md:max-w-sm md:w-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <p>Are you sure you want to remove this task?</p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              dispatch(handleShowTaskRemove(false));
            }}
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0"
          >
            No
          </button>
          <button
            onClick={() => {
              dispatch(handleShowTaskRemove(false));
              dispatch(
                RemoveTaskFunction({
                  boardName: boardName,
                  taskId: task.id,
                })
              );
            }}
            form="removetask"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-red-400 rounded-2xl md:w-auto md:mb-0"
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveTask;
