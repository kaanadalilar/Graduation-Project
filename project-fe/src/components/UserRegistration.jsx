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
        age: '',
        gender: '',
        disability: '',
        location: '',
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
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                {
                    email: loginFormData.email,
                    password: loginFormData.password,
                },
            )
            .then((res) => {
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                window.location.replace(`${process.env.REACT_APP_URL}/map`);
            }).catch((err) => console.log(err.response.data.message));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerFormData.password !== registerFormData.confirmPassword) {
            setRegisterFormData({
                ...registerFormData,
                passwordMatchError: 'Passwords do not match',
            });
        } else {
            setRegisterFormData({
                ...registerFormData,
                passwordMatchError: '',
            });
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
                    {
                        name: registerFormData.name,
                        email: registerFormData.email,
                        password: registerFormData.password,
                        age: registerFormData.age,
                        gender: registerFormData.gender,
                        disability: registerFormData.disability,
                        location: registerFormData.location,
                    },
                )
                .then((res) => {
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    window.location.replace(`${process.env.REACT_APP_URL}/map`);
                }).catch((err) => console.log(err.response.data.message));
        }
    };

    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96" style={{ maxHeight: '80vh', overflowY: 'scroll', maxWidth: '98%' }}>
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
                                            <p className="font-semibold dark:text-gray-200">Confirm Password</p>
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
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Age</p>
                                            <input
                                                type="number"
                                                name="age"
                                                value={registerFormData.age}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Gender</p>
                                            <select
                                                name="gender"
                                                value={registerFormData.gender}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                            >
                                                <option value="Unspecified">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Disability</p>
                                            <select
                                                name="disability"
                                                value={registerFormData.disability}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                                required
                                            >
                                                <option value="">Select Disability</option>
                                                <option value="Mobility">Mobility Impairment</option>
                                                <option value="Visual">Visual Impairment</option>
                                                <option value="Hearing">Hearing Impairment</option>
                                                <option value="Cognitive">Cognitive Impairment</option>
                                                <option value="None">None</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold dark:text-gray-200">Current Location</p>
                                            <input
                                                type="text"
                                                name="location"
                                                value={registerFormData.location}
                                                onChange={handleRegisterChange}
                                                className="border border-gray-300 p-2 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-gray-100"
                                            />
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
