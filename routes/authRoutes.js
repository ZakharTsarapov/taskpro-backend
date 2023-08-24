import express from "express";

import { validateBody } from "../decorators/index.js";

import  usersSchemas  from "../shemas/users-schemas.js";

import authControllers from "../controllers/authCtrl/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.signup,
);

// authRouter.post(
//   "/signin",
//   validateBody(usersSchemas.userSigninSchema),
//   authControllers.signin
// );

// authRouter.post("/signout", authenticate, authControllers.signout);


export default authRouter;