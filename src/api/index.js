import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "1036296666msh16c21f173447dcep15a330jsnb0778316d442",
  },
};

app.get("/", async (req, res) => {});

app.get("/getRandomFoodJoke", async (req, res) => {
  const url =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "1036296666msh16c21f173447dcep15a330jsnb0778316d442",
    },
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  res.json(response)
});

app.post("/home", async (req, res) => {});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
