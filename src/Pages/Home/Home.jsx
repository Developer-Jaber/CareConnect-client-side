import Banner from "../../Components/Banner/Banner";
import CampSuccessStories from "../../Components/CampSuccessStories.jsx/CampSuccessStories";
import FAQSection from "../../Components/FAQSection/FAQSection";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";
import LocationTagline from "../../Components/LocationTagline/LocationTagline";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";
import ProfessionalsSection from "../../Components/ProfessionalsSection/ProfessionalsSection";

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
            <section>
                <ProfessionalsSection></ProfessionalsSection>
            </section>
            <section>
                <FAQSection></FAQSection>
            </section>
            <section>
                <LocationTagline></LocationTagline>
            </section>
        </div>
    );
};

export default Home;