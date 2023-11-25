import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { handleShowBoardRemove } from '../../../features/modals';
import { RemoveBoardFunction } from '../../../features/boards';
import { useTranslation } from 'react-i18next';

function RemoveBoard() {
  const show = useSelector((state) => state.modals.value.showBoardRemove);
  const boardName = useSelector((state) => state.current.currentBoardName);
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation('global');

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          dispatch(handleShowBoardRemove(false));
        }}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('removeBoard.removeBoard')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete='off'
            id='removeboard'
            className='w-full md:max-w-sm md:w-auto'
          >
            <div className='md:flex md:items-center mb-6'>
              <p>{t('removeBoard.areYouSure')}</p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              dispatch(handleShowBoardRemove(false));
            }}
            className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-gray-400 rounded-2xl md:w-auto md:mb-0'
          >
            {t('removeBoard.no')}
          </button>
          <button
            onClick={() => {
              dispatch(handleShowBoardRemove(false));
              dispatch(RemoveBoardFunction(boardName));
            }}
            form='removeboard'
            className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-red-400 rounded-2xl md:w-auto md:mb-0'
          >
            {t('removeBoard.yes')}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveBoard;
