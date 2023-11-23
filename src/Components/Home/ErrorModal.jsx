import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { handleShowError } from '../../features/modals';
import { ResetIsClash } from '../../features/boards';

function ErrorModal({ name, details }) {
  const show = useSelector((state) => state.modals.value.showError);
  const { isClash } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClash) {
      dispatch(handleShowError(true));
      dispatch(ResetIsClash());
    }
  }, [isClash]);

  return (
    <Modal
      show={show}
      onHide={() => {
        dispatch(handleShowError(false));
      }}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='md:flex md:items-center mb-6'>
          <p>{details}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            dispatch(handleShowError(false));
          }}
          className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-red-400 rounded-2xl md:w-auto md:mb-0'
        >
          Okay
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
