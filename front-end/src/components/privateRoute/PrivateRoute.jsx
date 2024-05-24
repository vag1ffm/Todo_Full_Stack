import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {checkAuth} from "../../server/checkAuth";
import {useDispatch, useSelector} from "react-redux";
import {GetUserDataAxios} from "../../store/reducer/user/axios";
import Header from "../header";
import {GetTodoGroupsAxios} from "../../store/reducer/todo/axios";
import Notification from "../notification";

const PrivateRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.authSlice)

    let isAuth = checkAuth(dispatch)


    useEffect(() => {
        if (!isAuth) {
            return navigate('/welcome')
        } else {
            dispatch(GetUserDataAxios())
            dispatch(GetTodoGroupsAxios())
        }
    }, [status])

    const {error} = useSelector(state => state.userSlice)

    useEffect(()=> {
        if (error) {
            setNotificationMessage(error);
            handleShowNotification()
        }
    }, [error])

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    function handleShowNotification() {
        setShowNotification(true);
    }

    function handleCloseNotification() {
        setShowNotification(false);
    }



    return (
        <>
            <Notification
                show={showNotification}
                onClose={handleShowNotification}
                message={notificationMessage}
            />
            <Header/>
            <Outlet/>
        </>
    );
};

export default PrivateRoute;
