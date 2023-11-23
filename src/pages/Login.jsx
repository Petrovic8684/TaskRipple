import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import baseUrl from '../lib/api/apiUrl';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.access_token) {
      setMessage('You are already logged in.');
      return;
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      if (response.data.message === 'User does not exist!') {
        setMessage('User does not exist!');
        return;
      }

      if (response.data.message === 'Username or password is incorrect!') {
        setMessage('Username or password is incorrect!');
        return;
      }

      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.userID);
      window.localStorage.setItem('username', username);

      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold text-gray-700 md:text-2xl'>
              Login
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-700'
                  hidden={cookies.access_token}
                >
                  Username
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
                  className='bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg block w-full p-2.5'
                  disabled={cookies.access_token}
                  hidden={cookies.access_token}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-700'
                  hidden={cookies.access_token}
                >
                  Password
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
                  className='bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg block w-full p-2.5'
                  disabled={cookies.access_token}
                  hidden={cookies.access_token}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                disabled={cookies.access_token}
                hidden={cookies.access_token}
              >
                Login
              </button>
              <p className='text-red-600'>{message}</p>
              <p
                className='text-sm font-light text-gray-500'
                hidden={cookies.access_token}
              >
                Don't already have an account?{' '}
                <Link
                  to='/register'
                  className='font-medium text-blue-600 hover:underline'
                  hidden={cookies.access_token}
                >
                  Register here
                </Link>
              </p>
            </form>
            <Link to='/' hidden={!cookies.access_token}>
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.2}
                viewBox='0 0 24 22'
                className='w-10 h-10 mt-4'
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
  );
}

export default Login;
