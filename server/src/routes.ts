import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { create } from "domain";
import { createCalcado, deleteCalcado, readAllCalcados, updateCalcado } from "./controllers/CalcadosController";


const routes = express.Router();

routes.get("/users", readAllUsers);

// Rotas para Calçados
routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);

export default routes;

