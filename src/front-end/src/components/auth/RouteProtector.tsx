import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
interface RouteProtectorProps {
    children: React.ReactNode;
    allowedRoles: string[];
}
export default function RouteProtector({ children, allowedRoles }: RouteProtectorProps) {
    const [cookies] = useCookies(['role']);
    const userRole = cookies.role;
    if (allowedRoles.includes(userRole)) {
        return <>{children}</>
    }
    else if(!userRole) {
        return <Navigate to="/login" />
    }else{

        return <Navigate to={`/${userRole.toLowerCase()}/home`} />
    }
}
