import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { WarriorEntity } from "../types/warrior";

export const warriorRouter = Router();

warriorRouter
    .get('/', (req, res) => {
        res.render('warriors/warrior-form');
    })
    .post('/', async (req, res) => {

        const data: WarriorEntity = {
            name: req.body.name,
            strength: Number(req.body.strength),
            defense: Number(req.body.defense),
            endurance: Number(req.body.endurance),
            agility: Number(req.body.agility),
        }
        const warrior = new WarriorRecord(data);
        await warrior.insert();
        const {name} = data;
        res.render('warriors/added', {name});
    })