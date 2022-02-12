import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { fight } from "../utils/auxiliary-methods";

export const arenaRouter = Router();

arenaRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.listAll();
        res.render('arena/menu', {warriors});
    })
    .post('/', async (req, res) => {
        const firstWarriorId = req.body['first-warrior'];
        const secondWarriorId = req.body['second-warrior'];
        const firstWarrior = await WarriorRecord.getOne(firstWarriorId);
        const secondWarrior= await WarriorRecord.getOne(secondWarriorId);

        const winner = fight(firstWarrior, secondWarrior);
        await winner.update();

        res.render('arena/result', {winner});
    })