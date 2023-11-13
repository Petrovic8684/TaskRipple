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
          <div>
            <p className="text-gray-500 font-bold">
              Name: <span className="text-gray-400">{task.name}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-bold">
              Description:{" "}
              <span className="text-gray-400">{task.description}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-bold">
              Start date:{" "}
              <span className="text-gray-400">{task.startdate}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-bold">
              End date: <span className="text-gray-400">{task.enddate}</span>
            </p>
          </div>
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
