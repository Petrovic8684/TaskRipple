import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import baseUrl from '../lib/api/apiUrl';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [cookies, _] = useCookies(['access_token']);
  const navigate = useNavigate();

  const [t, i18n] = useTranslation('global');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/users/register`, {
        username,
        password,
      });

      if (response.status == 400) {
        setMessage(t('register.userAlreadyExists'));
        return;
      }

      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (cookies.access_token) return <Navigate to={'/'} />;

  return (
    <section>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold text-gray-700 md:text-2xl'>
              {t('register.registerNewAccount')}
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-700'
                >
                  {t('register.username')}
                </label>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  autoComplete='off'
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg block w-full p-2.5 focus:border-0 focus:outline-0 focus:ring-2 focus:ring-blue-300'
                  maxLength={22}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-700'
                >
                  {t('register.password')}
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete='off'
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg block w-full p-2.5 focus:border-0 focus:outline-0 focus:ring-2 focus:ring-blue-300'
                  maxLength={50}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                {t('register.register')}
              </button>
              <p className='text-red-600'>{message}</p>
              <p className='text-sm font-light text-gray-500'>
                {t('register.alreadyHaveAccount')}{' '}
                <Link
                  to='/login'
                  className='font-medium text-blue-600 hover:underline'
                >
                  {t('register.loginHere')}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
