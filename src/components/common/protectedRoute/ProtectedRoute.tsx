import { useAppSelector } from "@store/hooks"
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}:{children:React.ReactNode}) {
    const {jwt}=useAppSelector(state => state.AuthSlice)

    if(!jwt){
       return <Navigate to="/login?message=login_required" />
    }
    return <>{children}</>;
}

export default ProtectedRoute
