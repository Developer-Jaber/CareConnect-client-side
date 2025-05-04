import { Carousel } from 'antd'
import Img1 from '../../img/carouselImag/image.png'
import Img2 from '../../img/carouselImag/image copy.png'
import Img3 from '../../img/carouselImag/image copy 2.png'
import banner from '../../img/image.png'

const Banner = () => {
  return (
    <div className='mx-auto my-20 w-10/12 hero'>
      <div className='lg:flex-row-reverse flex-col hero-content'>
        <div className='mx-auto w-5/12'>
          <img
            src={banner}
            className='rounded-lg max-w-sm'
          />
        </div>
        <div className='w-7/12'>
          <h1 className='font-bold text-5xl'>
          Organize & Manage Medical Camps with Ease
          </h1>
          <p className='py-6'>
          "Streamline medical camp planning, volunteer coordination, and patient care—all in one platform.
          Ensure seamless healthcare outreach with smart scheduling, real-time tracking, and automated reporting."
          </p>
          <button className='btn btn-primary'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Banner
