import { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { handleShowBoardEdit } from '../../../features/modals';
import { EditBoardFunction } from '../../../features/boards';

function EditBoard() {
  const [currentBoardName, setCurrentBoardName] = useState('');

  const show = useSelector((state) => state.modals.value.showBoardEdit);
  const boardName = useSelector((state) => state.current.currentBoardName);
  const dispatch = useDispatch();

  // used to focus the element on show, for some reason autoFocus does not work here
  const nameInputElement = useRef(null);

  useEffect(() => {
    if (nameInputElement.current) {
      nameInputElement.current.focus();
    }
    if (show === true) {
      setCurrentBoardName(boardName);
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          dispatch(handleShowBoardEdit(false));
        }}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete='off'
            id='editboard'
            className='w-full md:max-w-sm md:w-auto'
          >
            <div className='md:flex md:items-center mb-6'>
              <div className='md:w-1/3'>
                <label
                  className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  htmlFor='inline-full-name'
                >
                  Board name:
                </label>
              </div>
              <div className='md:w-2/3'>
                <input
                  ref={nameInputElement}
                  className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none bg-white focus:border-yellow-300'
                  id='inline-full-name'
                  type='text'
                  value={currentBoardName}
                  onChange={(e) => {
                    setCurrentBoardName(e.target.value);
                  }}
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
              dispatch(handleShowBoardEdit(false));
            }}
            className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0'
          >
            Close
          </button>
          <button
            onClick={() => {
              dispatch(handleShowBoardEdit(false));
              dispatch(
                EditBoardFunction({
                  boardName: boardName,
                  newName: currentBoardName,
                })
              );
              setCurrentBoardName('');
            }}
            form='editboard'
            className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-yellow-300 rounded-2xl md:w-auto md:mb-0'
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBoard;
