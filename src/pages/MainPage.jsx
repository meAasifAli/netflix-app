import Main from "../components/Main"
import Rows from "../components/Rows"
const key = 'ac1798383fb1c4d4af4f7825fe489b1c'
const MainPage = () => {
    return (
        <div className="relative">

            <Main />
            <Rows rowID='1' title={"Upcoming Movies"} url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`} />
            <Rows rowID='2' title={"Popular Movies"} url={`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`} />
            <Rows rowID='3' title={'Trending'} url={`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`} />
            <Rows rowID='4' title={'Top Rated'} url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`} />

        </div>
    )
}
export default MainPage