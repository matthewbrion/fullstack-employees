import express from "express";
import employeesRouter from '#api/employees';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Fullstack Employees API.');
});

app.use('/employees', employeesRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

export default app;
