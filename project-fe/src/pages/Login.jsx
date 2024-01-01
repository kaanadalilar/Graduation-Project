import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from '@themesberg/react-bootstrap';

import { Header } from '../components';

const Login = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded p-8">
            <Header category="Page" title="Login" />

            <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold">Sign in to your account</h2>
            </div>

            <Form>
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="email" placeholder="example@company.com" />
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className="mb-4 flex items-center">
                    <Form.Check type="checkbox" label="Remember me" />
                </div>

                <Button variant="primary" type="submit" className="w-full">
                    Sign in
                </Button>

                <div className="mt-4 mb-2 text-center">
                    <span className="text-gray-600">or login with</span>
                </div>

                <div className="flex justify-center gap-4">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-dark">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                    </Button>
                </div>
            </Form>

            <div className="mt-6 text-center">
                <span className="text-gray-600">Not registered?</span>{' '}
                <a href="#" className="text-primary">Sign Up</a>
            </div>
        </div>
    </div>
);

export default Login;
