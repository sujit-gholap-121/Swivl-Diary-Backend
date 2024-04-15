import Diary from "../models/diary.js";


export  async function handleCreateDiaryEntry(req, res) {
  const { title, body, place } = req.body;
  const {userId}=req
  try {
    const createdDiary=await Diary.create({
      title,
      body,
      place,
      owner: userId,
    })
    console.log(createdDiary)
    const isFound=await Diary.findOne({_id:createdDiary._id})
    if (!isFound){
        throw new Error("Error creating a diary entry")
    }
        res.status(201).json({
            msg:"Diary Entry created Successfully",
            Diary:isFound
        })
    
   
  } catch (e) {
    res.status(502).send({
      msg: e.message,
    });
  }
}
