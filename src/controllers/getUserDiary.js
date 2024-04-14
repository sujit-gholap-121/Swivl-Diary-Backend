import Diary from "../models/diary.js";

export  async function handleGetDiaryEntry(req, res) {
    const {diaryId}=req.params
  const {userId}=req
  try {
    const isFound=await Diary.findOne({_id:diaryId,owner:userId})
    if (isFound){
        throw new Error("Error fetching diary entry")
    }
        res.status(201).json({
            msg:"Diary Fetched Successfully",
            result:isFound
        })
    
   
  } catch (e) {
    res.status(502).send({
      msg: e.message,
    });
  }
}
