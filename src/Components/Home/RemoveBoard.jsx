import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function RemoveBoard({ boardName, removeFunction }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        onClick={() => {
          handleShow();
        }}
      >
        Remove
      </div>

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
            onClick={() => {
              handleClose();
              removeFunction(boardName);
            }}
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
