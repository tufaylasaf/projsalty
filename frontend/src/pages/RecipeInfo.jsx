import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function RecipeInfo() {
  const { name, id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(false);
  const { user, loading } = useContext(UserContext);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/${name}/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchRecipes();
  }, [name]);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  // Function to handle textarea change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading indicator
  }

  if (error) {
    return (
      <div>
        <h2>User Not Found</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {recipe.map((r, i) => (
        <Container key={i}>
          <Header>{r.title}</Header>
          <Description>{r.description}</Description>
          <Ingredients>
            <IngSection>
              <div style={{ width: "100%" }}>
                <Subheading>Ingredients</Subheading>
              </div>
              <ul>
                {r.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <Quantity>{`${ingredient.quantity}`}</Quantity>{" "}
                    {`${ingredient.name}`}
                  </li>
                ))}
              </ul>
            </IngSection>
            <Section>
              <Subheading>Instructions</Subheading>
              <ol>
                {r.instructions.map((instruction, index) => (
                  <li key={index}>{`${instruction.step}`}</li>
                ))}
              </ol>
            </Section>
          </Ingredients>
          <RR>
            <Rating>
              <Subheading style={{ marginBottom: "0" }}>Your Rating</Subheading>
              <div>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <RatingStar
                    key={starIndex}
                    selected={rating >= starIndex}
                    onClick={() => handleStarClick(starIndex)}
                  >
                    ★
                  </RatingStar>
                ))}
              </div>
            </Rating>
            <Review>
              <Subheading>Your Review</Subheading>
              <StyledTextarea
                value={text}
                onChange={handleTextChange}
                placeholder="What did you think about this recipe?"
              />
            </Review>
          </RR>
        </Container>
      ))}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  transform: translateX(7vw);
  width: 86.5vw;
  height: 100vh;
  padding: 25px;
`;

const Header = styled.h1`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  line-height: 1.2;
  text-decoration: 3px solid underline #f9dd94;
  margin-bottom: 0;
`;

const Subheading = styled.h2`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-align: center;
  text-decoration: 3px solid underline #f9dd94;
`;

const IngSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* border-right: 4px solid rgba(0, 0, 0, 0.75); */
`;

const Section = styled.div`
  width: 100%;
`;

const Description = styled.h3`
  color: rgba(0, 0, 0, 0.75);
  font-weight: normal;
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 16px;
`;

const Ingredients = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 86.5vw;
  padding: 0px 30px;

  li {
    font-family: "Playfair Display", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 18px;
    font-weight: 400;
  }
`;

const Quantity = styled.span`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 18px;
  background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=f9dd94);
  margin: -2px -6px;
  padding: 2px 6px;
  font-weight: 500;
`;

const RR = styled.div`
  display: flex;
  width: 86.5vw;
  padding: 0px 30px;
  justify-content: center;
  align-items: flex-start;
`;

const Rating = styled.div`
  width: 50%;
  padding: 12px;
  margin: 5px 8px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Review = styled.div`
  width: 100%;
  padding: 12px;
  margin: 5px 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RatingStar = styled.span`
  font-size: 48px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#ff4b2b" : "rgba(0,0,0,0.25)")};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #ff4b2b;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  background-color: #f6f5f7;
  outline: none;
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

export default RecipeInfo;
