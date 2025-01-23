import Banner from "../../Components/Banner/Banner";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";

const Home = () => {
    return (
        <body>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <PopularCamps></PopularCamps>
            </section>
        </body>
    );
};

export default Home;