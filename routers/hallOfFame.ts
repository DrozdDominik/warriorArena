import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { compareWarriors } from "../utils/auxiliary-methods";

export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.getTopWarriors(10);
              
        res.render('hall-of-fame/list', {warriors});
    })