import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  text-align: right;
`;

const PaginationButton = styled.button`
  margin: 0 0.2rem 2rem 0;
  width: 30px;
  height: 25px;
  background: ${(props) => (props.isActive ? "#e3401b" : "#242424")};
  border-radius: 0.2rem;
  border: none;
  color: white;
  cursor: pointer;
`;

export default function Pagination({
  reposPerPage,
  totalRepos,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalRepos / reposPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <PaginationWrapper>
      {pageNumbers.map((number) => (
        <PaginationButton
          onClick={() => paginate(number)}
          key={number}
          isActive={number === currentPage ? true : false}
        >
          {number}
        </PaginationButton>
      ))}
    </PaginationWrapper>
  );
}
