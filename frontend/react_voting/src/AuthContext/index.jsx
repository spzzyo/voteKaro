import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {


    let [loading, setLoading] = useState(true)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const navigate = useNavigate()

    let signupUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value,'password': e.target.password.value, 'phone_number': e.target.phone_number.value})
        })

        if(response.status===200){
            navigate('/signin')
        }else{
            alert('Something Went Wrong')
            navigate('/signup/')
        }

        let data = await response.json()
        console.log(data)


    }


    let signinUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password': e.target.password.value})
        })

        let data = await response.json()

        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/dashboard')
        }else{
            alert('Something Went Wrong')
            navigate('/signup/')
        }
    }

    let signoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/signin')
    } 

    let updateToken = async () => {
        
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        
        }else{
            signoutUser()
        }

        if(loading){
            setLoading(false)
        }

    } 

    let contextData = {
        signoutUser:signoutUser,
        authTokens:authTokens,
        user:user,
        signinUser:signinUser,
        signupUser:signupUser
    }

    useEffect(()=>{

        if(loading){
            updateToken()
        }

        let fourMins = 100*60*4

        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMins)
        return ()=> clearInterval(interval) //to avoid compounding of function calls

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}