import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from 'uuid';
import { WarriorEntity } from "../types/warrior";
import { FieldPacket } from "mysql2";

// type WarriorNameResults = [Record<'name', string>[], FieldPacket[]];

type WarriorRecordResults = [WarriorEntity[], FieldPacket[]];

export class WarriorRecord {

    private _id: string;
    private _victories: number;
    private _name: string;
    private _strength: number;
    private _defense: number;
    private _endurance: number;
    private _agility: number;

    constructor(obj: WarriorEntity){

        if(!obj.name || obj.name.length < 2 || obj.name.length > 50) {
            throw new ValidationError('Imię wojownika musi mieć od 2 do 50 znaków.');
        }
       
        // if(this.isNameUnique(obj.name.toLowerCase())){
        //     throw new ValidationError('Imię wojwnika musi być unikalne, wielkość liter nie ma znaczenia.')
        // }

        if(obj.strength < 1 || obj.defense < 1 || obj.endurance < 1|| obj.agility < 1) {
            throw new ValidationError('Każdy z atrybutów musi mieć wartość conajmniej równą 1.');
        }

        if(obj.strength + obj.defense + obj.endurance + obj.agility > 10){
            throw new ValidationError('Suma punktów artybutów wynosi 10.');
        }        

        this._id = obj.id;
        this._name = obj.name;
        this._strength = obj.strength;
        this._defense = obj.defense;
        this._endurance = obj.endurance;
        this._agility = obj.agility;
        this._victories = obj.victories;
    }  

    // private async isNameUnique(name: string): Promise<boolean> {

    //     const[results] = await pool.execute('SELECT `name` FROM `warriors`;') as WarriorNameResults;
    //     const names = results.map(result => result.name.toLowerCase());        
    //     return names.includes(name);
    //  } 

    get name() {
         return this._name;
     }

    get strength() {
         return this._strength;
     }

    get defense() {
        return this._defense;
    }

    get endurace() {
        return this._endurance;
    }

    get agility() {
        return this._agility;
    }

    get id() {
        return this._id;
    }

    get victories() {
        return this._victories;
    }

    set victories(sum: number) {
        this._victories = sum;
    }

    public async insert(): Promise<string> {
        if (!this._id) {
            this._id = uuid();
        }

        if(!this._victories) {
            this._victories = 0;
        }

        await pool.execute('INSERT INTO `warriors` VALUES (:id, :name, :strength, :defense, :endurance, :agility, :victories);', {
            id: this._id,
            name: this._name,
            strength: this._strength,
            defense: this._defense,
            endurance: this._endurance,
            agility: this._agility,
            victories: this._victories,
        })

        return this._id;
    } 

    public static async listAll(): Promise<WarriorRecord[]> {
        const[results] = await pool.execute('SELECT * FROM `warriors`;') as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));   
    }

    public async getOne(id: string): Promise<WarriorRecord> | null {
        const [results] = await pool.execute('SELECT * FROM `warriors` WHERE `id` = :id;', {
            id, 
        }) as WarriorRecordResults;
        return results.length === 0 ? null : new WarriorRecord(results[0]);
    }
        
}