
const SectionTitle = ({headline, description}) => {
    return (
        <div className='mb-10 md:mb-24 text-center'>
          <h2 className='font-bold text-[#090109] text-3xl md:text-4xl lg:text-5xl'>
            {headline}
          </h2>
          <p className='mt-4 text-lg md:text-xl'>
            {description}
          </p>
        </div>
    );
};

export default SectionTitle;