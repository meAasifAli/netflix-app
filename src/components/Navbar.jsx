
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"

const Navbar = () => {
    const navigate = useNavigate()
    const { currUser, logOut } = UserAuth()
    console.log(currUser);
    const HandleLogout = async () => {
        try {
            await logOut()
            navigate("/auth")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <nav className="flex justify-between items-center py-2 z-[100] w-full absolute">
            <Link to={'/'}>
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="error" className="w-[100px] ml-2" />
            </Link>
            {
                currUser?.email ? (<div className="mr-2">
                    <Link to='/account'>
                        <button className='p-3  text-white bg-transparent outline-none font-normal'>Account</button>
                    </Link>
                    <button onClick={HandleLogout} className='p-3 text-white bg-red-700 outline-none font-normal '>Log Out</button>
                </div>) :
                    (<div >
                        <button className='p-3 text-white bg-transparent outline-none font-normal'><Link to={'/auth'}>Signin</Link></button>
                        <button className='p-3 text-white bg-red-700 outline-none font-normal'><Link to={'/auth'}>Signup</Link></button>
                    </div>)
            }
        </nav>
    )
}
export default Navbar