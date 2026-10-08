import express from 'express'
import { getEmployee, getEmployees, getRandomEmployee, addEmployee } from "#db/employees";

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    const employees = getEmployees();
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.")
    const { name } = req.body
    if (!name) return res.status(400).send("New employee must have a name.")

    const newEmp = addEmployee(name)

    res.status(201).send(newEmp)
  })

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.route('/random').get((req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});

export default router