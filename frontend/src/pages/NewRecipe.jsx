// RecipeForm.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

const RecipeForm = () => {
  const { name } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState([{ step: "" }]);

  const handleIngredientChange = (index, key, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][key] = value;
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index].step = value;
    setInstructions(updatedInstructions);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
    };

    if (title == "") {
      toast.error("Name of the Recipe is required!");
    } else if (description == "") {
      toast.error("Short Description is required!");
    } else {
      try {
        await axios.post(`/${name}`, recipeData);
        // Handle success, redirect or show a success message
        toast.success("New Recipe Created");
        console.log("Recipe successfully added to the database");
      } catch (error) {
        // Handle error, show an error message
        console.error("Error adding recipe to the database", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container onSubmit={handleSubmit}>
        <Header
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Name"
        />
        <Description
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of your new Recipe"
        />
        <Ingredients>
          <IngSection>
            <div style={{ width: "100%" }}>
              <Subheading>Ingredients</Subheading>
            </div>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "300px",
                    }}
                  >
                    <Name
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(index, "name", e.target.value)
                      }
                      placeholder="Ingredient"
                    />
                    <Quantity
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      placeholder="Quantity"
                    />
                  </div>
                </li>
              ))}
              <AddButton type="button" onClick={handleAddIngredient}>
                +
              </AddButton>
            </ul>
          </IngSection>
          <Section>
            <Subheading>Instructions</Subheading>
            <ol>
              {instructions.map((instruction, index) => (
                <li key={index}>
                  <div
                    key={index}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Instruction
                      value={instruction.step}
                      onChange={(e) =>
                        handleInstructionChange(index, e.target.value)
                      }
                      placeholder={`Step ${index + 1}`}
                    />
                  </div>
                </li>
              ))}
            </ol>
            <AddButtonIns type="button" onClick={handleAddInstruction}>
              +
            </AddButtonIns>
          </Section>
        </Ingredients>
        <CreateButton type="submit" onClick={handleSubmit}>
          Create Recipe
        </CreateButton>
      </Container>
    </div>
  );
};

export default RecipeForm;

const Container = styled.form`
  /* overflow-y: scroll; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  transform: translateX(6vw);
  width: 86.5vw;
  height: 100vh;
  padding: 25px;
  background-color: transparent;
`;

const inputStyle = styled.input`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  border: none;
  background-color: transparent;
  outline: none;
  text-align: center;
  margin-bottom: 0;
  padding: 0;
`;

const Header = styled(inputStyle)`
  line-height: 1.2;
  text-decoration: 3px solid underline #f9dd94;
  margin-top: 20px;
  font-size: 32px;
  font-weight: bold;
`;

const Description = styled(inputStyle)`
  color: rgba(0, 0, 0, 0.75);
  font-size: 16px;
  margin: 16px 0px;
`;

const Subheading = styled.h2`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-align: center;
  text-decoration: 3px solid underline #f9dd94;
`;

const Ingredients = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
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
  width: 75vw;
`;

const Quantity = styled(inputStyle)`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  margin-right: 20px;
  text-align: left;
  margin-bottom: 6px;
`;

const Name = styled(inputStyle)`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  text-align: left;
  width: 200px;
  margin-bottom: 6px;
`;

const Instruction = styled.textarea`
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  width: 85%;
  height: auto;
  border: none;
  outline: none;
  background-color: transparent;
  resize: none; /* Disable textarea resizing */
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  font-size: 22px;
  padding: 0px 8px;
  /* border-radius: 0px; */
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  position: relative;
  left: 75%;
  bottom: 22.5px;
`;

const AddButtonIns = styled.button`
  font-size: 22px;
  padding: 0px 8px;
  /* border-radius: 0px; */
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  position: relative;
  left: 42%;
  bottom: 60px;
`;

const CreateButton = styled.button``;
