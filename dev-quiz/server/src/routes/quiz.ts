import express, { Request, Response } from "express";
import QuestionModel from "../schema/question";

const router = express.Router();

router.get("/getAllQuestions", async (req: Request, res: Response) => {
  try {
    const records = await QuestionModel.find({});
    if (records.length === 0) return res.status(404).send("No records found");
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getQuestions/:search", async (req: Request, res: Response) => {
  try {
    const search = req.params.search;
    const records = await QuestionModel.find({ question: search });
    if (records.length === 0) return res.status(404).send("No records found");
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getQuestionById/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const records = await QuestionModel.find({ id: id });
    if (records.length === 0) return res.status(404).send("No records found");
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new QuestionModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await QuestionModel.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await QuestionModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
