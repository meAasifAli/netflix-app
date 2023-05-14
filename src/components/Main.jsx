import React, { useState, useEffect } from 'react'
import axios from "axios"
const key = 'ac1798383fb1c4d4af4f7825fe489b1c'
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
const Main = () => {
    const [movies, setMovies] = useState([])
    const movie = movies[Math.floor(Math.random() * movies.length)]
    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get(URL)
            setMovies(data.results)
        }
        fetchMovies()
    }, [])
    // console.log(movies);

    // console.log(movie);
    return (
        <div className="w-full h-[550px] text-white relative">
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}
                    className='w-full h-[550px] object-cover' />
            </div>
            <div className='absolute left-0 top-[250px] space-y-2 flex flex-col '>
                <h3 className='pl-4 font-semibold text-xl'>{movie?.original_title}</h3>
                <div className='space-x-1 pl-4'>
                    <button className=' p-3 text-white bg-transparent outline-none font-normal  border'>Play Now</button>
                    <button className='p-3 text-white bg-red-700 outline-none font-normal border'>Watch later</button>
                </div>
                <span className='font-light pl-4'>Released: {movie?.release_date}</span>
                <span className='pl-4 font-medium text-xl'>{movie?.overview.slice(0, 150)}..</span>
            </div>
        </div>
    )
}
export default Main