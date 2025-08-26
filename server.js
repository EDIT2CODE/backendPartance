import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Autoriser le front à communiquer avec le back
app.use(cors({ origin: process.env.FRONT_URL }));
app.use(express.json());

// Initialiser Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Exemple : récupérer tous les comptes
app.get("/accounts", async (req, res) => {
  const { data, error } = await supabase.from("account").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Exemple : ajouter un revenu
app.post("/incomes", async (req, res) => {
  const { user_id, name, amount } = req.body;
  const { data, error } = await supabase.from("incomes").insert([{ user_id, name, amount }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
