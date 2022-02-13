import { WarriorRecord } from "../records/warrior.record";

export interface Round {
    attack: string;
    defense: boolean;
    attackResult: string;
}

export interface Log {
    winner: WarriorRecord | null;
    rounds: Round[];
}