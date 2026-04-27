import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { create } from "domain";
import {createCalcado, deleteCalcado, readAllCalcados, updateCalcado} from "./controllers/CalcadosController";
import {readCalcadosByTamanho, readCalcadosByMarca, readTotalEstoque} from "./controllers/CalcadosExtraController";

const routes = express.Router();

routes.get("/users", readAllUsers);

// Rotas para Calçados
routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);

// Busca por tamanho
routes.get("/calcados/tamanho", readCalcadosByTamanho);

// Busca por marca
routes.get("/calcados/marca", readCalcadosByMarca);

// Total em estoque
routes.get("/calcados/estoque/total", readTotalEstoque);

export default routes;

