import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Profile from "./pages/Profile";
import NewRecipe from "./pages/NewRecipe";
import NotFound from "./pages/NotFound";
import RecipeInfo from "./pages/RecipeInfo";
import EditRecipe from "./pages/EditRecipe";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://projsalty-api.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "white",
            color: "black",
          },
          success: {
            style: {
              border: "2px solid green",
            },
          },
          error: {
            style: {
              border: "3px solid red",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:name" element={<Profile />} />
          <Route path="/:name/newrecipe" element={<NewRecipe />} />
          <Route path="/:name/:id" element={<RecipeInfo />} />
          <Route path="/:name/:id/edit" element={<EditRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
