import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Recipe from "../components/Recipe";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function Profile() {
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/${name}`);
        setRecipes(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchRecipes();
  }, [name]);

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
      <Container>
        <Header>
          <h2>{`${name}'s Recipes`}</h2>
        </Header>
        <RecipeContainer>
          {user.name == name && (
            <Recipe
              title={"Click here to add a New Recipe"}
              description={""}
              id={""}
              name={name}
              edit={false}
              dummy={true}
            />
          )}
          {recipes.map((recipe, index) => (
            <Recipe
              title={recipe.title}
              description={recipe.description}
              id={recipe._id}
              key={index}
              name={name}
              edit={user.name == name}
            />
          ))}
        </RecipeContainer>
      </Container>
    </div>
  );
}

export default Profile;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  transform: translateX(8vw);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  h2 {
    font-weight: normal;
  }
`;

const RecipeContainer = styled.div`
  column-count: 3;
  column-gap: 10px;
  /* justify-content: space-between; */
`;
