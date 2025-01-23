const express = require('express');
const multer = require("multer");
const Recipe = require('../models/recipe');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });

// Multer upload middleware
const upload = multer({ storage });  


// Add a new recipe with image upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
      const { title, servings, ingredients, instructions, category, prepTime, description } = req.body;
  
      const newRecipe = new Recipe({
        title,
        servings,
        ingredients: JSON.parse(ingredients), // Parse JSON string
        instructions,
        category,
        prepTime,
        description,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Save image path
      });
  
      const savedRecipe = await newRecipe.save();
      res.status(201).json(savedRecipe);
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ message: "Failed to add recipe" });
    }
  });



// Get all recipes with filtering and search
router.get("/", async (req, res) => {
    try {
      const { category, search } = req.query;
  
      // Build a query object
      const query = {};
      if (category) {
        query.category = category;
      }
      if (search) {
        query.title = { $regex: search, $options: "i" }; // Case-insensitive search
      }
  
      const recipes = await Recipe.find(query);
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Get a single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a recipe
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search recipes by ingredients (NEW ENDPOINT)
router.post('/search-by-ingredients', async (req, res) => {
    try {
      const { ingredients } = req.body;
  
      // Validate input
      if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: 'Ingredients must be provided as an array' });
      }
  
      // Normalize input: trim spaces and convert to lowercase
      const normalizedIngredients = ingredients
        .filter((ingredient) => ingredient.trim() !== '') // Remove empty strings
        .map((ingredient) => ingredient.trim().toLowerCase());
  
      if (normalizedIngredients.length === 0) {
        return res.status(400).json({ message: 'At least one valid ingredient must be provided' });
      }
  
      // Perform case-insensitive and trimmed matching using regex
      const recipes = await Recipe.find({
        ingredients: {
          $all: normalizedIngredients.map(
            (ingredient) => new RegExp(`^${ingredient}$`, 'i') // Case-insensitive exact match
          ),
        },
      });
  
      // If no recipes are found
      if (recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found matching the ingredients' });
      }
  
      // Return matched recipes
      return res.status(200).json({ success: true, recipes });
    } catch (error) {
      console.error('Error searching recipes:', error);
      return res.status(500).json({ message: 'Error fetching recipes', error });
    }
  });
  

module.exports = router;
