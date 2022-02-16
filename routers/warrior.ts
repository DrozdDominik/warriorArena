import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { WarriorEntity } from "../types/warrior";
import { onlyFirstLetterUpperCase } from "../utils/auxiliary-methods";
import { ValidationError } from "../utils/errors";

export const warriorRouter = Router();

warriorRouter
    .get('/', (req, res) => {
        res.render('warriors/warrior-form');
    })
    .post('/', async (req, res) => {
        const {strength, defense, endurance, agility} = req.body;
        const name = onlyFirstLetterUpperCase(req.body.name);

        if(await WarriorRecord.isNameTaken(name)) {
            throw new ValidationError(`Wybrane imię wojownika: ${name} jest już zajęte.`);
        }

        const data: WarriorEntity = {
            name,
            strength: Number(strength),
            defense: Number(defense),
            endurance: Number(endurance),
            agility: Number(agility),
        }
        const warrior = new WarriorRecord(data);
        await warrior.insert();        
        res.render('warriors/added', {name});
    })