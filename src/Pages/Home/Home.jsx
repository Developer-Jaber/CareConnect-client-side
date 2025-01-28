import Banner from "../../Components/Banner/Banner";
import CampSuccessStories from "../../Components/CampSuccessStories.jsx/CampSuccessStories";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";

const Home = () => {
    return (
        <>
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
        </>
    );
};

export default Home;