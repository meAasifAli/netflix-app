import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Auth = () => {
    const navigate = useNavigate()
    const { signUp, signIn } = UserAuth()
    const [variant, setVariant] = useState('signup')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const toggleVariant = () => {
        setVariant((currVar) => currVar === 'signin' ? "signup" : "signin")
    }

    const handleAuth = async (e) => {
        e.preventDefault()
        try {
            if (variant === 'signup') {
                try {
                    await signUp(email, password)
                    navigate("/")
                } catch (error) {
                    // if(error)
                    console.log(error);
                    setErr(error.message)
                }


            }
            if (variant === 'signin') {

                await signIn(email, password)
                navigate("/")

            }
        } catch (error) {
            alert(error)

        }
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen p-4 w-full">

                <h3 className="text-white font-bold text-2xl">{variant === 'signup' ? "SignUp User Below" : "Login User Below"}</h3>
                <form className="flex flex-col justify-center items-center gap-[20px] p-10 bg-gray-950 shadow-lg">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email.." className="p-2 w-[300px] bg-zinc-900 focus:bg-slate-700" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your password" className="p-2 w-[300px] bg-zinc-900 focus:bg-slate-700" />
                    <button type="submit" className="p-3 text-white bg-red-700 outline-none font-normal w-full" onClick={handleAuth}>{variant === 'signup' ? "Signup" : "Login"}</button>
                    <p className="text-white text-start">{variant === 'signup' ? "Already a Subscriber?" : "new to netflix?"} <span className="cursor-pointer" onClick={toggleVariant}>{variant === 'signup' ? "Login" : "Signup"}</span></p>

                </form>
                {
                    err && <div className="toast toast-top toast-center w-[30%]">
                        <div className="alert alert-error">
                            <div className="text-center">
                                <span className="text-white">{err}</span>
                            </div>
                        </div>

                    </div>
                }

            </div>
        </div>
    )
}
export default Auth