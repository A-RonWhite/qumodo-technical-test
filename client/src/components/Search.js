import Pagination from "./Pagination";
import RepoTable from "./RepoTable";
import styled from "styled-components";

const SearchBar = styled.input`
  width: 400px;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px 0 0 50px;
  display: inline-block;
  font-size: 1.2rem;
`;

const SearchButton = styled.button`
  border: none;
  display: inline-block;
  border-radius: 0 50px 50px 0;
  padding: 1rem 2rem;
  background-color: #e3401b;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  width: 100%;
`;

const Tagline = styled.p`
  color: white;
  width: 40%;
  margin: 0 auto;
  padding: 1.5rem 0;
  font-size: 1.2rem;
`;

const Loading = styled.p`
  color: white;
  font-size: 1.5rem;
`;

const SearchError = styled.p`
  color: white;
  /* background-color: #e3401b; */
  padding: 1rem 0;
`;

export default function Search({
  intro,
  setRepoName,
  repoSearch,
  loading,
  currentRepos,
  reposPerPage,
  repos,
  paginate,
  showResults,
  setRepos,
  currentPage,
  searchError,
}) {
  return (
    <SearchWrapper>
      <Tagline>{intro}</Tagline>
      <SearchBar
        type="text"
        name="githubSearch"
        id="githubSearch"
        placeholder="A-RonWhite, facebook..."
        onChange={(e) => setRepoName(e.target.value)}
      />
      <SearchButton onClick={repoSearch}>Search</SearchButton>

      {/* Add loading spinner */}
      {loading ? <Loading>Data is being loaded...</Loading> : ""}

      {searchError === true ? (
        <SearchError>
          Couldn't find any Github users or Organisations with that name
        </SearchError>
      ) : showResults && !loading ? (
        <>
          <RepoTable
            currentRepos={currentRepos}
            repos={repos}
            setRepos={setRepos}
          />
          <Pagination
            reposPerPage={reposPerPage}
            totalRepos={repos.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        ""
      )}
    </SearchWrapper>
  );
}
