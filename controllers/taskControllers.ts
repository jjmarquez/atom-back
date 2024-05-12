import { Request, Response, NextFunction } from "express";
import Task from "../models/taskModel";
import * as Joi from "joi";
import { sendResponse } from "../utils";
import db from "./../firebase";
import { Timestamp } from "firebase-admin/firestore";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { error } = taskSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const taskData = {
      ...data,
      isCompleted: false,
      createdAt: Timestamp.now(),
    };
    await db.collection("tasks").add(taskData);
    sendResponse(res, 201, null, "Task created successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasksSnapshot = db.collection("tasks");
    const tasks: Task[] = [];
    const snapshot = await tasksSnapshot.get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      const task = new Task(
        doc.id,
        data.title,
        data.description,
        data.createdAt,
        data.isCompleted
      );
      tasks.push(task);
    });

    sendResponse(res, 200, tasks, "Tasks fetched successfully");
  } catch (error) {
    next(new Error((error as Error).message));
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await db.collection("tasks").doc(id).get();
    if (data.exists) {
      sendResponse(res, 200, data.data(), "Task fetched successfully");
    } else {
      sendResponse(res, 404, null, "Task not found");
    }
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const { error } = taskSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const task = db.collection("tasks").doc(id);
    const taskSnapshot = await task.get();

    if (!taskSnapshot.exists) {
      sendResponse(res, 404, null, "Task not found");
      return;
    }

    await task.update(data);
    sendResponse(res, 200, null, "Task updated successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const task = db.collection("tasks").doc(id);
    const taskSnapshot = await task.get();

    if (!taskSnapshot.exists) {
      sendResponse(res, 404, null, "Task not found");
      return;
    }

    await task.delete();
    sendResponse(res, 200, null, "Task updated successfully");
  } catch (error) {
    const err = error as Error;
    res.status(400).send(err.message);
  }
};

export const markTaskAsCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const task = db.collection("tasks").doc(id);
    const taskSnapshot = await task.get();

    if (!taskSnapshot.exists) {
      sendResponse(res, 404, null, "Task not found");
      return;
    }

    await task.update({ isCompleted: true });
    sendResponse(res, 200, null, "Task marked as done");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};

export const getPendingTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasksQuery = db
      .collection("tasks")
      .where("isCompleted", "in", [false])
      .orderBy("createdAt", "asc");

    const tasksSnapshot = await tasksQuery.get();
    const taskArray: Task[] = [];

    tasksSnapshot.forEach((doc) => {
      const task = new Task(
        doc.id,
        doc.data().title,
        doc.data().description,
        doc.data().createdAt,
        doc.data().isCompleted
      );
      taskArray.push(task);
    });

    sendResponse(res, 200, taskArray, "Pending tasks fetched successfully");
  } catch (error) {
    const err = error as Error;
    next(new Error(err.message));
  }
};
