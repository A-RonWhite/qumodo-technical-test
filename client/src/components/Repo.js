import React from "react";
import styled from "styled-components";

const ResultsData = styled.td`
  padding: 0.3rem;
`;

const RepoURL = styled.a`
  text-decoration: underline;
  color: white;
`;

export default function Repo({
  repoName,
  description,
  watchers,
  stars,
  forks,
  html_url,
}) {
  return (
    <>
      <ResultsData style={{ width: "10%" }}>{repoName}</ResultsData>
      <ResultsData style={{ width: "30%" }}>{description}</ResultsData>
      <ResultsData style={{ width: "12%" }}>{watchers}</ResultsData>
      <ResultsData style={{ width: "12%" }}>{stars}</ResultsData>
      <ResultsData style={{ width: "12%" }}>{forks}</ResultsData>
      <ResultsData style={{ width: "26%" }}>
        <RepoURL href={html_url} target="_blank" rel="noopener">
          {html_url}
        </RepoURL>
      </ResultsData>
    </>
  );
}
