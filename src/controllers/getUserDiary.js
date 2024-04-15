import Diary from "../models/diary.js";

export async function handleGetDiaryEntry(req, res) {
  const { diaryId } = req.params;
  const { userId } = req;
  console.log(userId, diaryId);
  try {
    const isFound = await Diary.findOne({ _id: diaryId, owner: userId });
    if (!isFound) {
      throw new Error("Specified diary entry not Found");
    }
    res.status(201).json({
      msg: "Diary Fetched Successfully",
      result: isFound,
    });
  } catch (e) {
    res.status(502).send({
      msg: e.message,
    });
  }
}
