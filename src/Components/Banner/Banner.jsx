
import { Link } from 'react-router-dom'
import banner from '../../img/image.png'

const Banner = () => {
  return (
    <div className='mx-auto my-6 lg:my-14 w-11/12 lg:w-10/12 hero'>
      <div className='lg:flex-row-reverse flex-col hero-content'>
        <div className='lg:w-5/12'>
          <img
            src={banner}
            className='mx-auto rounded-lg'
          />
        </div>
        <div className='lg:w-7/12'>
        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl'>
         <span className='text-[#1A8A83]'>Organize & Manage</span> Medical 
          </h1>
          <h1 className='md:mt-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
          Camps with Ease
          </h1>
          <p className='py-6 text-xl'>
          "Streamline medical camp planning, volunteer coordination, and patient care—all in one platform.
          Ensure seamless healthcare outreach with smart scheduling, real-time tracking, and automated reporting."
          </p>
          <Link to="/available-camps-page" className='bg-[#42bb76] hover:bg-[#b8c7bf] border-none text-white text-xl btn btn-primary'>Explore Camps</Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
