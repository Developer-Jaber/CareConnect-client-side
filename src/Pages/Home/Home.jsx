import Banner from "../../Components/Banner/Banner";
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
        </>
    );
};

export default Home;