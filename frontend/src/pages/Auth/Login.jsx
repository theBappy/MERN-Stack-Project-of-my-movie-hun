import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from '../../components/Loader'
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useLoginMutation } from "../../redux/api/users"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading }] = useLoginMutation()

  const {userInfo} = useSelector((state) => state.auth)

  const {search} = useLocation()

  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async(e) =>{
    e.preventDefault()

    try{
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
      
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <section className="pl-[5rem] flex flex-wrap">
        <div className="mt-[5rem] mr-[4rem]">
          <h2 className="text-2xl mb-4 font-semibold">Sign In</h2>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-white text-sm font-medium">Email Address</label>

              <input type="email" id="email"  className="w-full border rounded mt-1 p-2"
              placeholder="Enter your email" value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>

              <input type="password" id="password"  className="w-full border rounded mt-1 p-2"
              placeholder="Enter your password" value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading} 
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
              {isLoading ? "Signing In..." : "Sing In"}

            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-">
              New customer? {" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="text-teal-500 hover:underline"
              >Register</Link>
            </p>
          </div>
        </div>

        <img src="https://img.us.news.samsung.com/us/wp-content/uploads/2023/06/16090600/disney-pixar-samsung-elemental.png" alt=""
        className="h-[42rem] w-[45%] md:hidden sm:hidden rounded-lg xl:block"
        />

    </section>
  )
}

export default Login