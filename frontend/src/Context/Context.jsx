import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { createContext, useEffect } from "react";
import { useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [isloggedin, setisloggedin] = useState(false)
    const [userdata, setuserdata] = useState(null)
    const [isverified, setisverified] = useState(false)
    const [carrymail, setcarrymail] = useState('')

    
    const getuserdata = async () => {
        const { data } = await axios.get(backendurl + '/getuserdata')

        if (data.success) {
            console.log(data);
            setuserdata(data.user);
            setisloggedin(true)
        }
        else {
            setisloggedin(false);
            toast.error(data.message);
        }
    }

    useEffect(()=>{
        getuserdata()
    },[])

    const addtocount = async () => {
        const { data } = await axios.post(backendurl + '/addcount')
        if (data.success) {
            setuserdata(prev => ({
                ...prev,
                count: data.count,
                streak: data.streak,
                dailyCounts: data.dailyCounts
            }));
        } else {
            console.log("not updated");
        }
    }

    const value = {
        backendurl,
        isloggedin, setisloggedin,
        userdata, setuserdata, getuserdata, isverified, setisverified, addtocount, carrymail, setcarrymail
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}