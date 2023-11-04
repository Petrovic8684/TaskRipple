import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

function ErrorModal({ name, details, existsClash, setExistsClash }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (existsClash) {
      handleShow();
      setExistsClash(false);
    }
  }, [existsClash]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="md:flex md:items-center mb-6">
          <p>{details}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleClose}
          className="w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-red-400 rounded-2xl md:w-auto md:mb-0"
        >
          Okay
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
