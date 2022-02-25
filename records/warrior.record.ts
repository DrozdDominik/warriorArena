import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";
import { WarriorEntity } from "../types/warrior";
import { FieldPacket } from "mysql2";

type WarriorNameResults = [Record<"name", string>[], FieldPacket[]];

type WarriorRecordResults = [WarriorEntity[], FieldPacket[]];

export class WarriorRecord {
  private _id?: string;
  private _victories?: number;
  private readonly _name: string;
  private readonly _strength: number;
  private readonly _defense: number;
  private readonly _endurance: number;
  private readonly _agility: number;

  constructor(obj: WarriorEntity) {
    const attributes = [obj.strength, obj.defense, obj.endurance, obj.agility];

    this._id = obj.id ?? uuid();
    this._victories = obj.victories ?? 0;

    if (!obj.name || obj.name.length < 2 || obj.name.length > 50) {
      throw new ValidationError(
        `Imię wojownika musi mieć od 2 do 50 znaków. Obecnie jest to ${obj.name.length}`
      );
    }

    for (const attribute of attributes) {
      if (attribute < 1) {
        console.log(attribute);
        throw new ValidationError(
          "Każdy z atrybutów musi mieć wartość conajmniej równą 1."
        );
      }
    }

    const sum = attributes.reduce((prev, curr) => prev + curr, 0);

    if (sum > 10) {
      throw new ValidationError(
        `Suma punktów artybutów wynosi 10. Obecnie jest to ${sum}`
      );
    }

    this._id = obj.id;
    this._name = obj.name;
    this._strength = obj.strength;
    this._defense = obj.defense;
    this._endurance = obj.endurance;
    this._agility = obj.agility;
    this._victories = obj.victories;
  }

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

  set victories(victories: number) {
    this._victories = victories;
  }

  public static async isNameTaken(name: string): Promise<boolean> {
    const [results] = (await pool.execute(
      "SELECT * FROM `warriors` WHERE `name` = :name;",
      {
        name,
      }
    )) as WarriorNameResults;
    return results.length > 0;
  }

  public async insert(): Promise<string> {
    await pool.execute(
      "INSERT INTO `warriors` VALUES (:id, :name, :strength, :defense, :endurance, :agility, :victories);",
      {
        id: this._id,
        name: this._name,
        strength: this._strength,
        defense: this._defense,
        endurance: this._endurance,
        agility: this._agility,
        victories: this._victories,
      }
    );

    return this._id;
  }

  public static async listAll(): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `warriors`;"
    )) as WarriorRecordResults;
    return results.map((obj) => new WarriorRecord(obj));
  }

  public static async getOne(id: string): Promise<WarriorRecord> | null {
    const [results] = (await pool.execute(
      "SELECT * FROM `warriors` WHERE `id` = :id;",
      {
        id,
      }
    )) as WarriorRecordResults;
    return results.length === 0 ? null : new WarriorRecord(results[0]);
  }

  public static async getTopWarriors(
    quantity: number
  ): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `warriors` ORDER BY `victories` DESC LIMIT :quantity;",
      {
        quantity,
      }
    )) as WarriorRecordResults;
    return results.map((obj) => new WarriorRecord(obj));
  }

  public async update(): Promise<void> {
    await pool.execute(
      "UPDATE `warriors` SET `victories` = :victories WHERE `id` = :id;",
      {
        victories: this._victories,
        id: this._id,
      }
    );
  }
}
