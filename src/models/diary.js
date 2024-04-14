import mongoose from "mongoose";

const diarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
    },
    place: {
      type: String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);
export default Diary ;
