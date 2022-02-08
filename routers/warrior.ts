import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter
    .get('/', async (req, res) => {
        console.log(await WarriorRecord.isNameUnique({name: 'Jak'}))
        res.end();
    })