import SliderUtil from '../../components/SliderUtil.jsx'
import {useGetNewMoviesQuery} from '../../redux/api/movies.js'
import {Link} from 'react-router-dom'



const Header = () => {
  const {data} = useGetNewMoviesQuery()


  return (
    <div className="flex flex-col mt-[4rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
        <nav className='w-full md:w-[10rem] ml-0 md:ml-2 md:mb-0'>
            <Link to="/"
            className='transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded md:mb-2 text-lg'
            >Home</Link>
            <Link to="/movies"
            className='transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded md:mb-2 text-lg'
            >Browse Movies</Link>
        </nav>

        <div className="w-full md:w-[80%] mr-0 md:mr-10">
            <SliderUtil data={data} />
        </div>
    </div>
  )
}

export default Header