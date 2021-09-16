import { useState } from "react";
import Repo from "./Repo";
import styled from "styled-components";

const ResultsTable = styled.table`
  color: white;
  min-height: 80vh;
  margin: 2rem 0 0 0;
  border-collapse: separate;
  border-spacing: 0 10px;
  border-radius: 1rem;
`;

const RepoHeadings = styled.th`
  padding: 0 0.3rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const HeadingWrapper = styled.tr`
  background-color: #242424;
  padding: 1rem 0;
  border-radius: 15px 15px 0 0;
  height: 3rem;
`;

export default function RepoTable({ currentRepos, repos, setRepos }) {
  const [toggleBool, setToggleBool] = useState(false);

  const sortColumn = (heading, type) => {
    const newRepos = [...repos];

    // Toggle acending/ descending
    // Changed order for number columns to start highest then toggle to lowest
    // due to UX
    if (!toggleBool) {
      newRepos.sort(function (a, b) {
        const relevantValueA = a[heading];
        const relevantValueB = b[heading];

        if (type === "string") {
          if (relevantValueA < relevantValueB) return -1;
          if (relevantValueA > relevantValueB) return 1;
          return 0;
        }
        if (relevantValueA < relevantValueB) return 1;
        if (relevantValueA > relevantValueB) return -1;
        return 0;
      });

      setToggleBool(true);
    }

    if (toggleBool) {
      newRepos.sort(function (a, b) {
        const relevantValueA = a[heading];
        const relevantValueB = b[heading];

        if (type === "string") {
          if (relevantValueA < relevantValueB) return 1;
          if (relevantValueA > relevantValueB) return -1;
          return 0;
        }
        if (relevantValueA < relevantValueB) return -1;
        if (relevantValueA > relevantValueB) return 1;
        return 0;
      });

      setToggleBool(false);
    }

    setRepos(newRepos);
  };

  // related values in JSON due to not using every property in the object
  // passing type through due to sort function
  const tableHeaders = [
    { heading: "Name", JSONVal: "name", type: "string" },
    { heading: "Description", JSONVal: "description", type: "string" },
    { heading: "Watchers", JSONVal: "watchers_count", type: "number" },
    { heading: "Stars", JSONVal: "stargazers_count", type: "number" },
    { heading: "Forks", JSONVal: "forks_count", type: "number" },
    { heading: "URL", JSONVal: "html_url", type: "string" },
  ];

  return (
    <ResultsTable>
      <thead>
        <HeadingWrapper>
          {tableHeaders.map((heading, index) => (
            <RepoHeadings
              key={index}
              onClick={() => {
                sortColumn(heading.JSONVal, heading.type);
              }}
            >
              {heading.heading}
            </RepoHeadings>
          ))}
        </HeadingWrapper>
      </thead>
      <tbody>
        {currentRepos.map(
          ({
            name,
            id,
            description,
            watchers_count,
            stargazers_count,
            forks_count,
            html_url,
          }) => {
            return (
              <tr key={id}>
                <Repo
                  repoName={name}
                  description={description}
                  watchers={watchers_count}
                  stars={stargazers_count}
                  forks={forks_count}
                  html_url={html_url}
                  key={id}
                />
              </tr>
            );
          }
        )}
      </tbody>
    </ResultsTable>
  );
}
