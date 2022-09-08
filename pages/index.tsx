import Header from "../components/Home/Header/Header";
import Search from "../components/Home/Search/Search";

function Home() {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Header />
      <Search />
    </div>
  );
}

export default Home;
