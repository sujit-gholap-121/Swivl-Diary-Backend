import Diary from "../models/diary.js";

export  async function handleUpdateDiaryEntry(req, res) {
  const { title, body, place } = req.body;
  const {diaryId}=req.params
  const {userId}=req
  try {
    const isUpdated=await Diary.findOneAndUpdate({
      _id:diaryId,
      owner:userId
    },{
      $set:{
         ...req.body
      }
    })
    console.log(isUpdated)
    if(!isUpdated){
      throw new Error("Error updating diary entry")
    }
    const isFound=await Diary.findOne({_id:diaryId,owner:userId})
    if (!isFound){
        throw new Error("Error feetching updated diary entry")
    }
        res.status(201).json({
            msg:"Diary Updated Successfully",
            product:isFound
        })
    
   
  } catch (e) {
    res.status(502).send({
      msg: e.message,
    });
  }
}
