import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    useEffect(() => {
        const authcheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth')
            console.log(res);

            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authcheck()
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />;
}