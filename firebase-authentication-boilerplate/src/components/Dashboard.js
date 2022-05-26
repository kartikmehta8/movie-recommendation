import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NoMovie from './NoMovie.js';
import Youtube from './Youtube.js';

export default function Dashboard() {
    const [error, setError] = useState("");
    const [names, setNames] = useState([]);
    const [posters, setPosters] = useState([]);
    const { currentUser, logout } = useAuth();
    const [movieName, setMovieName] = useState("");
    const [recMovie, setRecMovie] = useState("");
    const [isMovie, setIsMovie] = useState(0);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/movie/X-Men').then(response => {
    //     setNames(response.data[0]);
    //     setPosters(response.data[1]);
    // }).then(
    //     console.log(names)
    // ).catch(err => console.log(err));
    // }, [])

    function handleChange() {
        setIsMovie(0);
        axios.get(`http://127.0.0.1:8000/movie/${movieName}`).then(response => {
        setRecMovie(movieName)
        setIsMovie(1);
        setNames(response.data[0]);
        setPosters(response.data[1]);
    })
    }


    async function handleLogout() {
        setError("");

        try {
            navigate("/login");
            await logout();
        } catch {
            setError("Failed to Log Out");
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            {error && <div className="">{error}</div>}
            <div className="flex justify-between poppins bg-blue-500 py-3 px-3 text-white">
                <div className="text-xl font-bold">Recommovie</div>
                <div className="flex items-center">
                    <div className="none mr-8 text-sm">{currentUser.email}</div>
                    <button variant="link" onClick={handleLogout} className="border-b-2 border-white p-1 text-sm">
                        Log Out
                    </button>
                </div>
            </div>
            <div className="p-4 flex justify-center">
                <form className="max-w-sm" style={{width: "60%"}}>
                    <input
                    className="shadow-lg appearance-none border border-rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline signUp-font"
                    type="text"
                    required
                    value={movieName}
                    onChange={e => setMovieName(e.target.value)}
                    placeholder="Movie"
                        />
                </form>
                <span  className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 py-2 pt-3 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins" onClick={handleChange}>Search</span>
            </div>
            {isMovie === 0 ? <NoMovie /> : 
            <div>
                <div className="flex py-2 lg:px-8 mx-4 px-4 lg:mx-8 text-xl text-gray-600 signUp-font">
                    <span className="text-black">Recommendations found for &nbsp;"</span>{recMovie}<span className="text-black">"</span>
                </div>
                <div className="grid grid-cols-1 lg:m-8 md:m-4 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 lg:px-8">
                    <div>
                        <div className="poppins text-lg font-bold p-2">{names[0]}</div>
                            <div><img src={posters[0]} alt="" /></div>
                        </div>
                        <div>
                        <div className="poppins text-lg font-bold p-2">{names[1]}</div>
                            <div><img src={posters[1]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[2]}</div>
                            <div><img src={posters[2]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[3]}</div>
                            <div><img src={posters[3]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[4]}</div>
                            <div><img src={posters[4]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[5]}</div>
                            <div><img src={posters[5]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[6]}</div>
                            <div><img src={posters[6]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[7]}</div>
                            <div><img src={posters[7]} alt="" /></div>
                        </div>
                        <div>
                            <div className="poppins text-lg font-bold p-2">{names[8]}</div>
                            <div><img src={posters[8]} alt="" /></div>
                        </div>
                        <div className="none">
                            <div className="poppins text-lg font-bold p-2">{names[9]}</div>
                            <div><img src={posters[9]} alt="" /></div>
                        </div>
                    </div>
                    <div className="flex py-2 lg:px-8 mx-4 px-4 lg:mx-8 text-xl text-gray-600 signUp-font">
                        <span className="text-black">Youtube results for &nbsp;"</span>{recMovie}<span className="text-black">"</span>
                    </div>
                    <Youtube movie={movieName} />
            </div>
            }
        </div>
    );
}
