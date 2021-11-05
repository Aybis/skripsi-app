import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ToastHandler from '../../helpers/toast';
import { getProfile } from '../../store/actions/user';
import LoadingIcon from '../atoms/LoadingIcon';

// history untuk set url digunakan untuk redirect maupun backpage
const Login = ({ history }) => {
  const dispatch = useDispatch();
  // variable loading ketika proses login
  const [isLoading, setisLoading] = useState(false);
  // var icon eye untuk kondisi ketika type password menjadi text begitu sebaliknya
  const [isShowPassword, setisShowPassword] = useState(false);
  // var untuk ganti type form password menjadi text dan sebaliknya
  const [isPassword, setisPassword] = useState('password');
  // untuk mematkan proses halaman sekarang ketika pindah halaman lain
  const [didMount, setDidMount] = useState(false);
  // params login
  const [form, setform] = useState({
    email: '',
    password: '',
  });

  // handler onchange digunakan untuk mendapatkan value dari form input
  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // function untuk show text password
  const handlerClick = () => {
    setisShowPassword(!isShowPassword);
    if (isPassword === 'text') {
      setisPassword('password');
    } else {
      setisPassword('text');
    }
  };

  // function login submit
  const handlerSubmit = (event) => {
    event.preventDefault();

    // fetch('https://87e9-124-158-189-62.ngrok.io/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Access: '',
    //   },
    //   body: '{"email":"admin@admin.com","password":"12345"}',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // store data token to local storage
    //     localStorage.setItem(
    //       'VMAT:user',
    //       JSON.stringify({
    //         email: form.email,
    //         token: data.token,
    //       }),
    //     );
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    dispatch(getProfile({ name: form.email, token: 'testingtoken' }));

    // store data token to local storage
    localStorage.setItem(
      'VMAT:user',
      JSON.stringify({
        name: form.email,
        token: 'testingTokendoang',
      }),
    );

    // store data user to cookies
    const userCookie = {
      name: form.email,
      token: 'testingTokendoang',
    };

    /**
     * set expires user cookies
     * date + 7 * 24 * 60 * 60 * 1000
     * meaning
     * tanggal + 7hari * 24jam * 60menit * 60detik * 1000ms
     */
    const expires = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);

    document.cookie = `VMAT:user=${JSON.stringify(
      userCookie,
    )}; expires=${expires.toUTCString()}; path:/`;

    const redirect = localStorage.getItem('VMAT:redirect');
    ToastHandler('success', 'Login Berhasil');

    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
      history.push(redirect || '/');
    }, 500);
  };

  // sama seperti componentDidMount namun digunakan untuk mematikan seluruh proses halaman login ketika berpindah halaman
  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen h-full bg-warmGray-50">
      <div className="relative bg-white rounded-xl shadow-lg px-8 py-4">
        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-warmGray-800">
            Login
          </h1>
          <p className="text-sm text-warmGray-400 mt-1">
            I'm happy to see you, please login to continue.
          </p>
        </div>

        <form onSubmit={handlerSubmit} className="flex flex-col gap-4">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handlerOnChange}
              autoComplete="given-name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={isPassword}
              name="password"
              value={form.password}
              onChange={handlerOnChange}
              autoComplete="given-name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div
              className="absolute right-12 -mt-7 cursor-pointer"
              onClick={handlerClick}>
              {isShowPassword ? (
                <EyeIcon className="h-4 w-4 text-warmGray-600" />
              ) : (
                <EyeOffIcon className="h-4 w-4 text-warmGray-600" />
              )}
            </div>
          </div>

          <div className=" bg-gray-50 text-right mt-4 mb-8">
            <button
              type="submit"
              className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full
             tracking-wide">
              {isLoading && <LoadingIcon />}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
