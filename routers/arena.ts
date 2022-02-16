import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { fight } from "../utils/auxiliary-methods";
import { ValidationError } from "../utils/errors";

export const arenaRouter = Router();

arenaRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.listAll();
        res.render('arena/menu', {warriors});
    })
    .post('/', async (req, res) => {
        const {warrior1: firstWarriorId, warrior2: secondWarriorId} = req.body;
        
        if( firstWarriorId === secondWarriorId) {
            throw new ValidationError('Proszę wybrać dwóch różnych wojowników!')
        }

        const firstWarrior = await WarriorRecord.getOne(firstWarriorId);
        const secondWarrior= await WarriorRecord.getOne(secondWarriorId);

        if(!firstWarrior) {
            throw new ValidationError('Nie znaleziono pierwsze wybranego wojownika!')
        }

        if(!secondWarrior) {
            throw new ValidationError('Nie znaleziono drugiego wybranego wojownika!')
        }

        const logs = fight(firstWarrior, secondWarrior);
        const rounds = logs.rounds;
        const winner = logs.winner;
        winner.victories++;
        await winner.update();
        const name = winner.name;

        res.render('arena/result', {rounds, name});
    })