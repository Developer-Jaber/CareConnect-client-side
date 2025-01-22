import { Carousel } from 'antd'
import Img1 from '../../img/carouselImag/image.png'
import Img2 from '../../img/carouselImag/image copy.png'
import Img3 from '../../img/carouselImag/image copy 2.png'

const Banner = () => {

  return (
    <div className='mx-auto py-10 w-7/12'>
      <Carousel autoplay>
        <div>
          <img className='w-full h-96' src={Img1} alt='' />
        </div>
        <div>
          <img className='w-full h-96' src={Img2} alt='' />
        </div>
        <div>
          <img className='w-full h-96' src={Img3} alt='' />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
