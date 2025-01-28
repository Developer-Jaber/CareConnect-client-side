import Banner from "../../Components/Banner/Banner";
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
        </>
    );
};

export default Home;