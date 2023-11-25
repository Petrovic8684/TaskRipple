import { Link } from 'react-router-dom';
import ParticlesEffect from '../Components/ParticlesEffect.jsx';
import { useTranslation } from 'react-i18next';

function LearnMore() {
  const [t, i18n] = useTranslation('global');

  return (
    <>
      <section className='relative z-[200] h-[100vh] flex items-center overflow-hidden'>
        <div className='px-12 mx-auto max-w-7xl'>
          <div className='w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center'>
            <h1 className='mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-800 md:text-6xl md:tracking-tight'>
              {t('learnMore.about')}{' '}
              <span className='block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-pink-500 lg:inline'>
                TaskRipple
              </span>
            </h1>
            <p className='mb-14 text-sm text-gray-600 sm:text-lg md:text-xl lg:px-24'>
              {t('learnMore.description')}
            </p>
            <div>
              <Link
                to='/'
                className='no-underline inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-400 rounded-2xl sm:w-auto sm:mb-0'
              >
                {t('learnMore.goBack')}
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
