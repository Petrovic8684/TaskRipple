import { Link } from 'react-router-dom';
import ParticlesEffect from '../Components/ParticlesEffect.jsx';

function LearnMore() {
  return (
    <>
      <section className='relative z-[200] h-[100vh] flex items-center overflow-hidden'>
        <div className='px-12 mx-auto max-w-7xl'>
          <div className='w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center'>
            <h1 className='mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-800 md:text-6xl md:tracking-tight'>
              About{' '}
              <span className='block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-pink-500 lg:inline'>
                TaskRipple
              </span>
            </h1>
            <p className='mb-14 text-sm text-gray-600 sm:text-lg md:text-xl lg:px-24'>
              Welcome to TaskRipple, a practical app focused on simplifying the
              planning of your everyday activities. Developed by Jovan Petrović,
              TaskRipple is designed for individuals seeking a straightforward
              tool to organize daily tasks and activities efficiently. Without
              unnecessary complexity, TaskRipple provides a user-friendly
              interface to help you plan and manage your day-to-day routine with
              ease. Whether it's creating a shopping list, scheduling
              appointments, or jotting down reminders, TaskRipple aims to be
              your uncomplicated companion for daily planning. Discover the
              convenience of a no-frills approach to organizing your routine
              with TaskRipple.
            </p>
            <div>
              <Link
                to='/'
                className='no-underline inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-400 rounded-2xl sm:w-auto sm:mb-0'
              >
                Go back
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                  className='w-4 h-4 ml-1'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2' />
                  <path d='M7 12h14l-3-3m0 6l3-3' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ParticlesEffect />
    </>
  );
}

export default LearnMore;
