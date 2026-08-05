import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import { faker } from '@faker-js/faker'

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const newEmployee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ mode: 'age', min: 18, max: 65 }),
      salary: faker.number.int({ min: 36000, max: 275000 })
    }
    await createEmployee(newEmployee);
  }
}
