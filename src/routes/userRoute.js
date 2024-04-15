import express from "express";
import handleUserRegistration from "../controllers/createUser.js";
import handleLoginUser from "../controllers/userLogin.js";
import handleUserAuthentication from "../middleware/userAuthentication.js";
import { handleCreateDiaryEntry } from "../controllers/createDiaryEntry.js";
import { handleUpdateDiaryEntry } from "../controllers/updateDiaryEntry.js";
import { handleGetDiaryEntry } from "../controllers/getUserDiary.js";
import handleDeleteDiaryEntry from "../controllers/deleteDiaryEntry.js";


const router = express.Router();

router.route("/register")
.post(handleUserRegistration)

router.route("/login")
.post(handleLoginUser)

router.route("/diary/")
.post(handleUserAuthentication,handleCreateDiaryEntry)

router.route("/diary/:diaryId")
.get(handleUserAuthentication,handleGetDiaryEntry)
.put(handleUserAuthentication,handleUpdateDiaryEntry)
.delete(handleUserAuthentication,handleDeleteDiaryEntry)
export default router