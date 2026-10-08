import express from "express";
import employeeRouter from '#api/employees'
const app = express();
export default app;

app.use(express.json())

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use('/employees', employeeRouter)

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});
