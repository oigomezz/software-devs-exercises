import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";
import { log } from "console";

const app = express();
const port = process.env.PORT ?? 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

let userData: Array<Record<string, string>> = [];

app.use(express.json());

// Enable CORS
app.use(cors());

app.post("/api/files", upload.single("file"), async (req, res) => {
  // 1. Extract file from request
  const { file } = req;
  // 2. Validate that we have file
  if (!file) return res.status(500).json({ message: "File is requered" });
  // 3. Validate that mimetype (csv)
  if (file.mimetype !== "text/csv")
    return res.status(500).json({ message: "File must be CSV" });

  let json: Array<Record<string, string>> = [];

  try {
    // 4. Transform the file (buffer) to a string
    const csv = Buffer.from(file.buffer).toString("utf-8");
    // console.log(csv);
    // 5. Transform string to JSON
    json = csvToJson.csvStringToJson(csv);
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" });
  }
  // 6. Save the JSON to db (or memory)
  userData = json;
  // 7. Return 200 with the message and the JSON
  return res.status(200).json({
    data: json,
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
