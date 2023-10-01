const {Router} = require("express");
const userRouter = Router();
const {registerUser,listAllUsers,loginUser} = require("../controllers/controllers");
const {hashPassword,passwordCheck,updatePassword,tokenCheck} = require("../middleware");
const {deleteUser} = require("../middleware")




userRouter.post("/users/register",hashPassword,registerUser);
userRouter.get("/user/loginUser",passwordCheck, loginUser)
userRouter.get("/users/listAllUsers",tokenCheck, listAllUsers);
userRouter.delete("/users/deleteUser",deleteUser);
userRouter.put("/users/updatePassword",passwordCheck, updatePassword);

module.exports = userRouter;