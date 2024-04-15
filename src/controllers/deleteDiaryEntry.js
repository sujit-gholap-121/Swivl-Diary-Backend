import Diary from "../models/diary.js";

 async function handleDeleteDiaryEntry(req, res) {
    const {diaryId}=req.params
  const {userId}=req
  try {
    const isDeleted=await Diary.findOneAndDelete({
      _id:diaryId,
      owner:userId
    })
    const isFound=await Diary.findOne({_id:diaryId,owner:userId})
    if (isFound){
        throw new Error("Error Deleting diary entry")
    }
        res.status(201).json({
            msg:"Diary Deleted Successfully",
        })
    
   
  } catch (e) {
    res.status(502).send({
      msg: e.message,
    });
  }
}

export default handleDeleteDiaryEntry