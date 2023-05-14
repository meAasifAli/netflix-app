import { Navigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
    const { currUser } = UserAuth()
    if (!currUser) {
        return <Navigate to={'/'} />
    }
    return children;

}
export default PrivateRoute