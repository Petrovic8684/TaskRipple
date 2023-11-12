import Modal from "react-bootstrap/Modal";

function DetailsTask({ task, show, handleClose }) {
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
          <Modal.Title>Task details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Name: {task.name}</div>
          <div>Description: {task.description}</div>
          <div>Start date: {task.startdate}</div>
          <div>End date: {task.enddate}</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              handleClose();
            }}
            form="detailstask"
            className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-blue-400 rounded-2xl md:w-auto md:mb-0"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsTask;
