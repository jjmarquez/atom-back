import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import * as Joi from "joi";
import { sendResponse } from "../utils";
import db from "./../firebase";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const usersArray: User[] = [];

    usersSnapshot.forEach((doc) => {
      const user = new User(doc.id, doc.data().email);
      usersArray.push(user);
    });

    sendResponse(res, 200, usersArray, "Users fetched successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // Validate data before processing
    const { error } = userSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const docRef = db.collection("users").doc(data.email);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      sendResponse(res, 400, null, "Email already exists");
      return;
    }

    await docRef.set(data);
    sendResponse(res, 201, null, "User created successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = db.collection("users").doc(id);
    const userSnapshot = await user.get();

    if (!userSnapshot.exists) {
      sendResponse(res, 404, null, "User not found");
      return;
    }

    await user.delete();
    sendResponse(res, 200, null, "User deleted successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;
    console.log(email);

    const usersRef = db.collection("users");
    const q = usersRef.where("email", "==", email);
    const querySnapshot = await q.get();

    if (querySnapshot.empty) {
      sendResponse(res, 404, null, "User not found");
      return;
    }

    let user: User | null = null;

    querySnapshot.forEach((doc) => {
      user = new User(doc.id, doc.data().email);
    });

    sendResponse(res, 200, user, "User fetched successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};
