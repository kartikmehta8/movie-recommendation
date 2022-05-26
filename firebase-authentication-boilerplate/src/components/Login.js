import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import recommend from "../recommend.json";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div className="flex justify-between poppins bg-blue-500 py-3 px-3 text-white">
                <div className="text-xl font-bold">Recommovie</div>
            </div>
            {/* <div className="flex poppins text-sm lg:pt-8 justify-center m-4">a movie recommendation engine suggests films based on your mood, the occasion & personal taste</div> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center" style={{height: '90vh', textAlign: 'center'}}>
            <div className="flex justify-center lg:justify-end">
        <Lottie className="lg:m-6 md:m-32 h-80" animationData={recommend} loop={true} />
            </div>
            <div className="flex justify-center lg:justify-start">
            <div className="shadow-xl p-8" style={{ width: "300px", textAlign: 'center' }}>
                {error && (
                    <div
                        className="bg-red-500 signUp-font text-white p-2 text-sm flex justify-center mb-4 rounded-sm"
                        style={{ textAlign: "center" }}
                    >
                        {error}
                    </div>
                )}
                <form className="max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4" id="email">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2 signUp-font"
                            htmlFor="password"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border border-rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline signUp-font"
                            type="email"
                            required
                            ref={emailRef}
                            placeholder="email"
                        />
                    </div>
                    <div className="mb-4" id="password">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2 signUp-font"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            ref={passwordRef}
                            placeholder="*************"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline signUp-font"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div
                    className="flex justify-center mt-4 text-gray-800 signUp-font"
                    style={{ fontSize: "13px" }}
                >
                    <Link
                        className="font-bold text-blue-600 hover:text-blue-800"
                        to="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div
                    className="flex justify-center mt-2 text-gray-800 signUp-font"
                    style={{ fontSize: "13px" }}
                >
                    Need an account?{" "}
                    <Link
                        className="font-bold text-blue-500 hover:text-blue-800"
                        to="/signup"
                    >
                        &nbsp;Sign Up
                    </Link>
                </div>
            </div>
            </div>
            </div>
            <div className="flex justify-center poppins bg-blue-500 py-4 px-3 text-white">
                <div className="text-sm font-bold">By Prerna Choudhary</div>
            </div>
        </div>
    );
}
