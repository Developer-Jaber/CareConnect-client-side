import Banner from "../../Components/Banner/Banner";
import CampSuccessStories from "../../Components/CampSuccessStories.jsx/CampSuccessStories";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";

const Home = () => {
    return (
        <div className="bg-[#fef6fd]">
            <section>
                <Banner></Banner>
            </section>
            <section>
                <PopularCamps></PopularCamps>
            </section>
            <section>
                <FeedbackAndRatings></FeedbackAndRatings>
            </section>
            <section>
                <CampSuccessStories></CampSuccessStories>
            </section>
        </div>
    );
};

export default Home;