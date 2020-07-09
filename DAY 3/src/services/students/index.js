const express = require("express");
const q2m = require("query-to-mongo");

const StudentSchema = require("./schema");

const studentsRouter = express.Router();

studentsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    const students = await StudentSchema.find(
      query.criteria,
      query.options.fields
    )
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort);

    res.send({
      data: students,
      total: students.length,
    });
  } catch (error) {
    next(error);
  }
});

studentsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await StudentSchema.findById(id);
    res.send(student);
  } catch (error) {
    console.log(error);
    next("While reading students list a problem occurred!");
  }
});

studentsRouter.post("/", async (req, res, next) => {
  try {
    const newStudent = new StudentSchema(req.body);
    const { _id } = await newStudent.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

studentsRouter.put("/:id", async (req, res, next) => {
  try {
    const student = await StudentSchema.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { runValidators: true }
    );
    if (student) {
      res.send("Ok");
    } else {
      const error = new Error(`Student with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

studentsRouter.delete("/:id", async (req, res, next) => {
  try {
    await StudentSchema.findByIdAndDelete(req.params.id);

    res.send("Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = studentsRouter;
