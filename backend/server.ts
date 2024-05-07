import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000;

// Enable CORS
app.use(cors());

app.post("/api/files", async (req, res) => {
  // 1. Extract file from request
  // 2. Validate that we have file
  // 3. Validate that mimetype (csv)
  // 4. Transform the file (buffer) to a string
  // 5. Transform string to CSV
  // 6. Save the JSON to db (or memory)
  // 7. Return 200 with the message and the JSON
  return res.status(200).json({
    data: [],
    message: "El archivo se cargó correctamente",
  });
});

app.get("/api/users", async (req, res) => {
  // 1. Extract the query param 'q' from the request
  // 2. Validate that we have the query param
  // 3. Filter the data from the db (or memory) whit the query param
  // 4. Return 200 with the filtered data
  return res.status(200).json({
    data: [],
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
