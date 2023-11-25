import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { handleShowTaskDetails } from '../../../features/modals';
import { useTranslation } from 'react-i18next';

function DetailsTask() {
  const show = useSelector((state) => state.modals.value.showTaskDetails);
  const task = useSelector((state) => state.current.currentTask);
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation('global');

  return (
    <>
      <Modal
        className='pointer-events-auto'
        show={show}
        onHide={() => {
          dispatch(handleShowTaskDetails(false));
        }}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('taskDetails.taskDetails')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className='text-gray-500 font-bold'>
              {t('taskDetails.name')}{' '}
              <span className='text-gray-500 font-normal'>{task.name}</span>
            </p>
          </div>
          <div>
            <p className='text-gray-500 font-bold'>
              {t('taskDetails.description')}{' '}
              <span className='text-gray-500 font-normal'>
                {task.description}
              </span>
            </p>
          </div>
          <div>
            <p className='text-gray-500 font-bold'>
              {t('taskDetails.startdate')}{' '}
              <span className='text-gray-500 font-normal'>
                {task.startdate}
              </span>
            </p>
          </div>
          <div>
            <p className='text-gray-500 font-bold'>
              {t('taskDetails.enddate')}{' '}
              <span className='text-gray-500 font-normal'>{task.enddate}</span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              dispatch(handleShowTaskDetails(false));
            }}
            form='detailstask'
            className='w-full px-[17px] py-[10px] mb-2 text-lg text-white bg-blue-400 rounded-2xl md:w-auto md:mb-0'
          >
            {t('taskDetails.close')}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsTask;
