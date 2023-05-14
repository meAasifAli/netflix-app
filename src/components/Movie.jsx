import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { useState } from 'react'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
const Movie = ({ item }) => {
    const { currUser } = UserAuth()
    const [like, setLike] = useState(false)
    // const [saved, setSaved] = useState(false)
    const MovieId = doc(db, 'users', `${currUser?.email}`);
    const savedShow = async () => {
        if (currUser?.email) {
            setLike(!like)
            // setSaved(true)
            await updateDoc(MovieId, {
                SavedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path
                })
            })
        }
        else {
            alert("Please Login to save the movie")
        }
    }
    return (
        <>

            <div className="w-[160px] sm:[200px] md:w-[240px] lg:w-[280px] 
        inline-block cursor-pointer relative p-2">
                <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <p className='white-space-normal text-xs md:text-sm font-bold flex  justify-center items-center h-full'>{item?.title}</p>
                    <p onClick={savedShow}>
                        {
                            like ? <FaHeart className='absolute top-4 left-6 text-gary-300' /> :
                                <FaRegHeart className='absolute top-4 left-6 text-gary-300' />
                        }

                    </p>
                </div>
            </div>
        </>
    )
}
export default Movie