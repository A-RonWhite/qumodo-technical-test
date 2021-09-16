import { useState, useEffect } from "react";
import Search from "./components/Search";
import styled from "styled-components";
import gitHubLogo from "./github_logo-white.png";

const Container = styled.div`
  max-width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppWrapper = styled.div`
  background-color: #404040;
  min-height: 100vh;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [showResults, setshowResults] = useState(false);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(8);
  const [repoName, setRepoName] = useState("");
  const [error, setError] = useState(false);
  const [rateLimitReached, setRateLimitedReached] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const checkRateLimit = async () => {
    const res = await fetch("https://api.github.com/rate_limit");
    const data = await res.json();

    if (data.rate.remaining === 0) {
      setRateLimitedReached(true);
    }
  };

  useEffect(() => {
    checkRateLimit();
  }, []);

  const repoSearch = async () => {
    setLoading(true);
    const allRepos = await fetchRepoData();
    setRepos(allRepos);
    setLoading(false);
    setshowResults(true);
  };

  const fetchRepoData = async () => {
    let res = await fetch(`/${repoName}`).catch((e) => {
      console.log(e);
    });
    if (res === undefined || res.status === 555) {
      setError(true);
      return;
    }
    let data = await res.json();

    console.log(data.length);
    if (data.length === 0) {
      setSearchError(true);
      console.log("search error ran");
    }
    setSearchError(false);
    return await data;
  };

  const getCurrentRepos = () => {
    if (!error) {
      //get current repos
      const indexOfLastRepo = currentPage * reposPerPage;
      const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
      const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
      return currentRepos;
    }
  };

  //change page
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <AppWrapper>
      <Container width="1200px" padding="3rem 0 0 0">
        <img src={gitHubLogo} alt="" width="200px" />
        {rateLimitReached ? (
          <h1 style={{ color: "white", paddingTop: "1rem" }}>
            Rate Limit has been reached, please check back later
          </h1>
        ) : (
          <Search
            intro="Type a GitHub or Organisation name below to see their public repository"
            setRepoName={setRepoName}
            repoSearch={repoSearch}
            loading={loading}
            currentRepos={getCurrentRepos()}
            reposPerPage={reposPerPage}
            repos={repos}
            setRepos={setRepos}
            paginate={paginate}
            showResults={showResults}
            currentPage={currentPage}
            error={error}
            searchError={searchError}
          />
        )}
      </Container>
    </AppWrapper>
  );
}

export default App;
