import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const UserRegistration = () => {
    const { currentColor } = useStateContext();
    const [isChosen, setIsChosen] = useState(false);
    const [wantsLogin, setWantsLogin] = useState(false);

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
    });

    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordMatchError: '',
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData({
            ...registerFormData,
            [name]: value,
            passwordMatchError: name === 'confirmPassword' && registerFormData.password !== value ? 'Passwords do not match' : '',
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:4000/api/users/login`,
                {
                    "email": loginFormData.email,
                    "password": loginFormData.password
                })
            .then((res) => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                window.location.replace('http://localhost:3000/map');
            }).catch((err) => alert(err.response.data.message));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerFormData.password !== registerFormData.confirmPassword) {
            setRegisterFormData({
                ...registerFormData,
                passwordMatchError: 'Passwords do not match'
            });
        } else {
            setRegisterFormData({
                ...registerFormData,
                passwordMatchError: ''
            });
            axios
                .post(`http://localhost:4000/api/users/register`,
                    {
                        "name": registerFormData.name,
                        "email": registerFormData.email,
                        "password": registerFormData.password
                    })
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                    window.location.replace('http://localhost:3000/map');
                }).catch((err) => alert(err.response.data.message));
        }
    };

    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96" style={{ maxHeight: '150vmin', overflowY: 'scroll' }}>
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">User Login / Register</p>
                <Button
                    icon={<MdOutlineCancel />}
                    color="rgb(153, 171, 180)"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                />
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <p className="font-semibold text-xl dark:text-gray-200"> Get benefit from our Accessibility Map Application! </p>
            </div>
            {isChosen ? (
                <>
                    {wantsLogin ? (
                        <div>
                            <div className="flex gap-5 border-b-1 border-color p-4 cursor-default dark:hover:bg-[#42464D]" style={{ justifyContent: 'center' }}>
                                <div style={{ width: "240vmin" }}>
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">E-Mail</p>
                                            <input
                                                type="email"
                                                name="email"
                                                value={loginFormData.email}
                                                onChange={handleLoginChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Password</p>
                                            <input
                                                type="password"
                                                name="password"
                                                value={loginFormData.password}
                                                onChange={handleLoginChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                                                className=" text-undefined p-3 w-full hover:drop-shadow-xl hover:bg-undefined"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex gap-5 border-b-1 border-color p-4 cursor-default dark:hover:bg-[#42464D]" style={{ justifyContent: 'center' }}>
                                <div style={{ width: "240vmin" }}>
                                    <form onSubmit={handleRegisterSubmit}>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                value={registerFormData.name}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">E-Mail</p>
                                            <input
                                                type="email"
                                                name="email"
                                                value={registerFormData.email}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Password</p>
                                            <input
                                                type="password"
                                                name="password"
                                                value={registerFormData.password}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Password Again</p>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={registerFormData.confirmPassword}
                                                onChange={handleRegisterChange}
                                                className={`border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100 ${registerFormData.passwordMatchError && 'border-red-500'
                                                    }`}
                                                required
                                            />
                                            {registerFormData.passwordMatchError && (
                                                <p className="text-red-500 text-sm">{registerFormData.passwordMatchError}</p>
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                                                className=" text-undefined p-3 w-full hover:drop-shadow-xl hover:bg-undefined"
                                            >
                                                Sign-Up
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </>) : (
                <div className="mt-5" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={() => { setWantsLogin(true); setIsChosen(true) }}
                        style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                        className=" text-undefined p-3 w-full hover:drop-shadow-xl hover:bg-undefined"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => { setWantsLogin(false); setIsChosen(true) }}
                        style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                        className=" text-undefined p-3 w-full hover:drop-shadow-xl hover:bg-undefined"
                    >
                        Sign-Up
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserRegistration;
