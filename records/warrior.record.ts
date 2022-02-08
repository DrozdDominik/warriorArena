import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from 'uuid';
import { WarriorEntity } from "../types/warrior";
import { FieldPacket } from "mysql2";

type WarriorRecordResults = [Record<'name', string>[], FieldPacket[]];

export class WarriorRecord {

    private id = uuid();
    private victories = 0;
    private name: string;
    private strength: number;
    private defense: number;
    private endurance: number;
    private agility: number;

    constructor(obj: WarriorEntity){

        if(!obj.name || obj.name.length < 2 || obj.name.length > 50) {
            throw new ValidationError('Imię wojownika musi mieć od 2 do 50 znaków.');
        }

        //unikalność wojownika

        if(obj.strength < 1 || obj.defense < 1 || obj.endurance < 1|| obj.agility < 1) {
            throw new ValidationError('Każdy z atrybutów musi mieć wartość conajmniej równą 1.');
        }

        if(obj.strength + obj.defense + obj.endurance + obj.agility > 10){
            throw new ValidationError('Suma punktów artybutów wynosi 10.');
        }        

        this.name = obj.name;
        this.strength = obj.strength;
        this.defense = obj.defense;
        this.endurance = obj.endurance;
        this.agility = obj.agility;
    }  

    public static async isNameUnique(obj: Record<'name', string>): Promise<boolean> {

        const[results] = await pool.execute("SELECT `name` FROM `warriors`;") as WarriorRecordResults;
        console.log(results);
        return results.includes(obj);

     } 
        
}