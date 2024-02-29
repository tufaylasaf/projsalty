import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

function Recipe({ title, description, id, name, edit, dummy }) {
  if (dummy) {
    return (
      <Link to={"/" + name + "/newrecipe"}>
        <Container>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Container>
      </Link>
    );
  } else {
    return (
      <Link to={"/" + name + "/" + id}>
        {edit && (
          <Link to={"/" + name + "/" + id + "/edit"}>
            <EditIcon>
              <MdEdit />
            </EditIcon>
          </Link>
        )}
        <Container>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Container>
      </Link>
    );
  }
}

export default Recipe;

const Container = styled.div`
  width: 300px;
  height: fit-content;
  padding: 12px;
  border-radius: 8px;
  /* margin: 5px 5px; */
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
  grid-row: 1 / -1;
  grid-column: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`;

const EditIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(265px, 10px);
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 5px;
  border-radius: 50%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  line-height: 1.2;
  text-decoration: 3px solid underline #f9dd94;
`;

const Description = styled.div`
  margin-top: 6px;
  height: 100%;
  color: rgb(1, 1, 1, 0.8);
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 16px;
`;
