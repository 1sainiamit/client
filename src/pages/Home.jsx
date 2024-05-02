import axios from "axios";
import { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, ] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
    if(cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes`,
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Recipes</h1>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="bg-white shadow-md p-4 rounded-lg">
            {savedRecipes.includes(recipe._id)}
            <div className="mb-2">
              <h2 className="text-xl mb-1 font-semibold">{recipe.name}</h2>
              <button
                className={`${
                  isRecipeSaved(recipe._id) ? "bg-gray-300" : "bg-blue-500"
                } text-white font-semibold px-2`}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">{recipe.instructions}</p>
            </div>
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full rounded-lg"
            />
            <p className="mt-2 text-gray-500">
              Cooking Time: {recipe.cookingTime} minutes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
