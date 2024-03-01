import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiBookOpen } from "react-icons/bi";
import { TbScript } from "react-icons/tb";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const { user, loading } = useContext(UserContext);

  const navigate = useNavigate();

  const clickMyRecipe = () => {
    navigate(`/${user.name}`);
  };

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  const handleSearch = (s) => {
    setSearch(s);
    if (s == "") return;
    axios
      .get(`/search?q=${s}`)
      .then((response) => {
        setUsers((prevUsers) => response.data.users);
        setRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Heading>projsalty.</Heading>
      <Icons>
        <Search>
          <Searchbar
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>
        <SearchResults
          style={{
            display:
              users.length == 0 && recipes.length == 0 ? "none" : "block",
          }}
        >
          {recipes.map((recipe, index) => {
            return (
              <Link to={"/" + recipe["user"]["name"] + "/" + recipe._id}>
                <SearchResult key={index}>
                  <div>
                    <TbScript />
                  </div>
                  <span>{recipe.title}</span>
                </SearchResult>
              </Link>
            );
          })}
          {users.map((user, index) => {
            return (
              <Link to={"/" + user.name}>
                <SearchResult key={index}>
                  <div>
                    <BiUser />
                  </div>
                  <span>{user.name}</span>
                </SearchResult>
              </Link>
            );
          })}
        </SearchResults>
        <Icon>
          <BiHomeAlt />
          <span>Home</span>
        </Icon>
        <Icon selected={true} onClick={clickMyRecipe}>
          <BiBookOpen />
          <span>My Recipes</span>
        </Icon>
        <Icon>
          <BiBookmark />
          <span>Bookmarks</span>
        </Icon>
        <Icon>
          <BiUser />
          <span>Profile</span>
        </Icon>
      </Icons>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 13.5vw;
  background-color: #252525;
  margin: 0;
  padding: 0;
  left: 0;
  top: -1px;
`;

const Heading = styled.h1`
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  color: #f6f5f7;
  text-align: center;
  text-decoration: 3px solid underline #f9dd94;
`;

const Icons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  /* gap: 8px; */
`;

const Icon = styled.div`
  display: flex;
  width: 85%;
  background-color: ${({ selected }) => (selected ? "#f9dd94" : "transparent")};
  color: ${({ selected }) => (selected ? "rgba(0,0,0,0.85)" : "#f6f5f7")};
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  /* color: black; */
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  margin: 6px 0px;

  &:hover {
    transform: scale(1.075);
    background-color: #f9dd94;
    color: rgba(0, 0, 0, 0.85);
  }

  span {
    font-size: 14px;
    margin-left: 8px;
    /* font-weight: bold; */
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Searchbar = styled.input`
  width: 95%;
  outline: none;
  border-radius: 8px;
  font-size: 14px;
  background-color: #0a0a0a;
  color: white;
  margin-bottom: 0px;
`;

const SearchResults = styled.ul`
  /* display: (${(props) => (props.display ? "none" : "block")}); */
  list-style: none;
  margin: 0;
  padding: 10px 0px;
  background-color: #0a0a0a;
  max-height: 220px;
  overflow-y: scroll;
  transition: all 0.25s ease;
  border-radius: 0px 0px 8px 8px;
  transform: translateY(-5px);
  width: 174px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResult = styled.li`
  width: 140px;
  height: 40px;
  padding: 20px 0px;
  color: white;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0px 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  transform: translateX(17px);
  border-radius: 8px;

  &:hover {
    transform: scale(1.075) translateX(17px);
    background-color: #f9dd94;
    color: rgba(0, 0, 0, 0.85);
  }

  span {
    font-size: 14px;
    margin-left: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default Navbar;
