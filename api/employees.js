import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = Router();

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.status(200).send(employees);
});

router.post("/", async (req, res) => {
  const { name, birthday, salary } = req.body ?? {};
  if (!name || !birthday || !salary) {
    return res.status(400).send("Name, birthday, and salary are required.");
  }
  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await getEmployee(req.params.id);
  if (!employee) return res.status(404).send("Employee not found.");
  res.status(200).send(employee);
});

router.put("/:id", async (req, res) => {
  const { name, birthday, salary } = req.body ?? {};
  if (!name || !birthday || !salary) {
    return res.status(400).send("Name, birthday, and salary are required.");
  }
  const existing = await getEmployee(req.params.id);
  if (!existing) return res.status(404).send("Employee not found.");
  const employee = await updateEmployee({
    id: req.params.id,
    name,
    birthday,
    salary,
  });
  res.status(200).send(employee);
});

router.delete("/:id", async (req, res) => {
  const rows = await deleteEmployee(req.params.id);
  if (!rows[0]) return res.status(404).send("Employee not found.");
  res.status(204).end();
});

export default router;