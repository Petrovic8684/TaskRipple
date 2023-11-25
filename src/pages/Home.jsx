import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';

import Board from '../Components/Home/Board/Board';
import AddBoard from '../Components/Home/Board/AddBoard';
import EditBoard from '../Components/Home/Board/EditBoard';
import RemoveBoard from '../Components/Home/Board/RemoveBoard';
import Task from '../Components/Home/Task/Task';
import AddTask from '../Components/Home/Task/AddTask';
import DetailsTask from '../Components/Home/Task/DetailsTask';
import EditTask from '../Components/Home/Task/EditTask';
import RemoveTask from '../Components/Home/Task/RemoveTask';
import ErrorModal from '../Components/Home/ErrorModal';

import { GridContextProvider, GridDropZone, GridItem } from 'react-grid-dnd';

import { useDispatch, useSelector } from 'react-redux';

import {
  handleShowTaskAdd,
  handleShowTaskDetails,
  handleShowTaskEdit,
  handleShowTaskRemove,
} from '../features/modals';
import { FetchBoards, UpdateBoards, onChange } from '../features/boards';
import { SetCurrentBoardName, SetCurrentTask } from '../features/current';
import { handleShowBoardEdit } from '../features/modals';
import { handleShowBoardRemove } from '../features/modals';
import LoadingPage from '../Components/Home/LoadingPage';
import ErrorPage from '../Components/Home/ErrorPage';

import { useTranslation } from 'react-i18next';

function Home() {
  const dispatch = useDispatch();
  const { boards, status, error } = useSelector((state) => state.boards);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [cookies, _] = useCookies(['access_token']);

  useEffect(() => {
    if (status === 'idle' || status === 'successful') {
      if (cookies.access_token) {
        if (isFirstLoad) {
          dispatch(FetchBoards({ cookies: cookies.access_token }));
          setIsFirstLoad(false);
          return;
        }
      }
    }
  }, [status]);

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(UpdateBoards({ boards: boards }));
    }
  }, [boards]);

  const [t, i18n] = useTranslation('global');

  if (!cookies.access_token && status !== 'failed')
    return <Navigate to={'/'} />;

  if (status === 'loading') {
    return <LoadingPage />;
  }

  if (status === 'failed') {
    return <ErrorPage error={error} />;
  }

  return (
    <section className='px-[3%] py-[30px] md:py-[50px] md:px-[12%]'>
      <div className='flex flex-column justify-center items-center'>
        <h1 className='text-4xl text-gray-700 font-bold text-center md:text-5xl mb-[15px] md:mb-[10px] '>
          <span className='break-all'>
            {window.localStorage.getItem('username').toString()}
          </span>
          <span className='break-words'>{t('home.sBoards')}</span>
        </h1>
        <Link to='/' className='mb-3'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            viewBox='0 0 24 22'
            className='w-10 h-10'
          >
            <path stroke='none' d='M0 0h24v24H0z' />
            <path d='M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2' />
            <path d='M7 12h14l-3-3m0 6l3-3' />
          </svg>
        </Link>
      </div>
      {Object.keys(boards).length === 0 && (
        <p className='mb-[15px] text-lg text-gray-600 text-center md:text-xl md:mb-8'>
          {t('home.looksLikeNoBoards')}
        </p>
      )}
      <AddBoard />
      <hr className='mb-[35px]' />
      <div className='flex flex-wrap gap-x-4 gap-y-[40px] lg:gap-y-[70px] justify-evenly items-start mb-[10%]'>
        <GridContextProvider
          onChange={(sourceId, sourceIndex, targetIndex, targetId) => {
            dispatch(
              onChange({
                sourceId: sourceId,
                sourceIndex: sourceIndex,
                targetIndex: targetIndex,
                targetId: targetId,
              })
            );
          }}
        >
          {Object.keys(boards).map((board) => {
            return (
              <Board
                key={uuidv4()}
                name={board}
                editBoardButton={
                  <div
                    onClick={() => {
                      dispatch(handleShowBoardEdit(true));
                      dispatch(SetCurrentBoardName(board));
                    }}
                  >
                    {t('home.edit')}
                  </div>
                }
                removeBoardButton={
                  <div
                    onClick={() => {
                      dispatch(handleShowBoardRemove(true));
                      dispatch(SetCurrentBoardName(board));
                    }}
                  >
                    {t('home.remove')}
                  </div>
                }
                addTaskButton={
                  <button
                    onClick={() => {
                      dispatch(handleShowTaskAdd(true));
                      dispatch(SetCurrentBoardName(board));
                    }}
                    className='flex justify-center items-center w-[45px] h-[45px] text-xl text-white bg-blue-400 rounded-full md:text-3xl absolute bottom-5 left-6 '
                  >
                    <svg
                      viewBox='0 0 512 512'
                      fill='currentColor'
                      height='1.8rem'
                      width='1.8rem'
                    >
                      <path
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={32}
                        d='M256 112v288M400 256H112'
                      />
                    </svg>
                  </button>
                }
              >
                <GridDropZone
                  key={uuidv4()}
                  id={board}
                  boxesPerRow={1}
                  rowHeight={65}
                  style={{
                    height:
                      boards[board].length === 0
                        ? 65 * Math.ceil(boards[board].length + 3)
                        : 65 * Math.ceil(boards[board].length + 2),
                  }}
                >
                  {boards[board].map((task, index) => (
                    <GridItem key={task?.id} style={{ zIndex: 9998 - index }}>
                      <Task
                        name={task?.name}
                        description={task?.description}
                        detailsButton={
                          <div
                            onClick={() => {
                              dispatch(handleShowTaskDetails(true));
                              dispatch(
                                SetCurrentTask({
                                  id: task?.id,
                                  name: task?.name,
                                  description: task?.description,
                                  startdate: task?.startdate,
                                  enddate: task?.enddate,
                                })
                              );
                            }}
                          >
                            {t('home.details')}
                          </div>
                        }
                        editButton={
                          <div
                            onClick={() => {
                              dispatch(handleShowTaskEdit(true));
                              dispatch(SetCurrentBoardName(board));
                              dispatch(
                                SetCurrentTask({
                                  id: task?.id,
                                  name: task?.name,
                                  description: task?.description,
                                  startdate: task?.startdate,
                                  enddate: task?.enddate,
                                })
                              );
                            }}
                          >
                            {t('home.edit')}
                          </div>
                        }
                        removeButton={
                          <div
                            onClick={() => {
                              dispatch(handleShowTaskRemove(true));
                              dispatch(SetCurrentBoardName(board));
                              dispatch(
                                SetCurrentTask({
                                  id: task?.id,
                                  name: task?.name,
                                  description: task?.description,
                                  startdate: task?.startdate,
                                  enddate: task?.enddate,
                                })
                              );
                            }}
                          >
                            {t('home.remove')}
                          </div>
                        }
                      />
                    </GridItem>
                  ))}
                </GridDropZone>
              </Board>
            );
          })}
        </GridContextProvider>
        <AddTask />
        <EditBoard />
        <RemoveBoard />
        <DetailsTask />
        <EditTask />
        <RemoveTask />
        <ErrorModal
          name={t('home.error')}
          details={t('home.thereAlreadyExistsSameName')}
        />
      </div>
    </section>
  );
}

export default Home;
