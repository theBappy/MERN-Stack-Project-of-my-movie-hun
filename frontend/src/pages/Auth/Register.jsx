import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from '../../components/Loader'
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/users"



const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()
  const {userInfo} = useSelector((state) => state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect') || '/'

  useEffect(() =>{
    if(userInfo){
        navigate(redirect)
    } 

  }, [navigate, userInfo, redirect])

  const submitHandler = async(e) =>{
    e.preventDefault()

    if(password !== confirmPassword){
        toast.error('Password do not match')
    }else{
        try{
            const res = await register({username, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
            toast.success("User registered successfully!")

        }catch(err){
            console.log(err)
            toast.error(err.data.message)
        }
    }
  } 



  return (
    <div className="pl-[5rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h2 className="text-2xl font-semibold text-white mb-4">Register</h2>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
                <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                <input type="text" id="name" className="mt-1 p-2 text-white border rounded w-full"
                placeholder="Enter Name" value={username} onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="my-[2rem]">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <input type="email" id="email" className="mt-1 p-2 text-white border rounded w-full"
                placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="my-[2rem]">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <input type="password" id="password" className="mt-1 p-2 text-white border rounded w-full"
                placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="my-[2rem]">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
                <input type="password" id="confirmPassword" className="mt-1 p-2 text-white border rounded w-full"
                placeholder="Confirm Your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button type="submit" disabled={isLoading} className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                {isLoading ? "Registering..." : "Register" }
            </button>
            {isLoading && <Loader />}
          </form>  

          <div className="mt-4">
            <p className="text-white">
                Already have an account? {" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-teal-500 hover:underline"
                >Login</Link>
            </p>
          </div>
        </div>
        <img src="https://t3.ftcdn.net/jpg/09/68/93/06/360_F_968930603_pbeym9KPeiZojDdtd0zgxjl0A8EMyazO.jpg" 
        className="h-[42rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </div>
  )
}

export default Register