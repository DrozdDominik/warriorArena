import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter
    .get('/', (req, res) => {
        res.render('warriors/warrior-form');
    })
    .post('/', async (req, res) => {
        const warrior = new WarriorRecord(req.body);
        await warrior.insert();
        const {name} = req.body;
        res.render('warrior/added', {name});
    })