import axios from "axios";
import { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Saved Recipes</h1>
      <ul className="space-y-4">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="bg-white shadow-md p-4 rounded-lg">
            {savedRecipes.includes(recipe._id)}
            <div className="mb-2">
              <h2 className="text-xl mb-1 font-semibold">{recipe.name}</h2>
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

export default SavedRecipes;
