import axios from "axios";
import React, { useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3001/recipes`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Recipe</h2>
      <form className="mb-4" onSubmit={onSubmit}>
        <label className="block text-gray-700 font-medium" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 font-medium"
          htmlFor="ingredients"
        >
          Ingredients
        </label>

        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          </div>
        ))}

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>

        <label
          className="block text-gray-700 font-medium"
          htmlFor="instructions"
        >
          Instructions
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          id="instructions"
          name="instructions"
          onChange={handleChange}
        />
        <label className="block text-gray-700 font-medium" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          type="text"
          name="imageUrl"
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 font-medium"
          htmlFor="cookingTime"
        >
          Cooking Time (minutes)
        </label>
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          type="number"
          name="cookingTime"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 m-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
