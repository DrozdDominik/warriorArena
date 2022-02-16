import { WarriorRecord } from "../records/warrior.record"
import { Log, Round } from "../types/log";

export const compareWarriors = (firstWarrior: WarriorRecord, secondWarrior: WarriorRecord): number => {
    if(firstWarrior.victories < secondWarrior.victories){
        return 1;
    } else if(firstWarrior.victories > secondWarrior.victories){
        return -1;
    } else {
        return 0;
    }
};

export const onlyFirstLetterUpperCase = (name: string): string => {
    for(let i = 0; i < name.length; i++) {
        if(i === 0) {
            name[i].toUpperCase();
        } else {
            name[i].toLowerCase();
        }
        return name;
    }
}

export const fight = (firstWarrior: WarriorRecord, secondWarrior: WarriorRecord): Log => {
    
    let active = 1;
    let log:Log = {
        winner: null,
        rounds: [],       
    };
    
    
    let firstWarriorHP = firstWarrior.endurace * 10;
    let firstWarriorShield = firstWarrior.defense;
    let secondWarriorHP = secondWarrior.endurace * 10;
    let secondWarriorShield = secondWarrior.defense;

    while(true) {
        const round: Round = {
            attack: '',
            defense: false,
            attackResult: '',
        }

        let attacker = active === 1 ? firstWarrior : secondWarrior;
        let defender = active === 1 ? secondWarrior : firstWarrior;

        let defenderHP = active === 1 ? secondWarriorHP : firstWarriorHP;
        let defenderShield = active === 1 ? secondWarriorShield : firstWarriorShield;

        let attackStrength = attacker.strength;
        round.attack = `${attacker.name} atakuje ${defender.name} z siłą równą ${attackStrength}`;
        
        if((defenderShield + defender.agility) > attackStrength) {
            if(attackStrength >= defenderShield) {
                round.defense = true;
                const damage = defenderShield - attackStrength;
                defenderHP += damage;
                defenderShield = 0;
                round.attackResult = `Utracono tarczę! Aktualne HP ${defender.name} wynosi ${defenderHP} (${damage})`;
            } else {
                round.defense = true;
                defenderShield -= attackStrength;
                round.attackResult = `Utracono ${attackStrength} punktów tarczy. ${defender.name} pozostało ${defenderShield} punktów tarczy.`;
            }
        } else {
            defenderHP -= attackStrength
            round.attackResult = `Aktualne HP ${defender.name} wynosi ${defenderHP} (-${attackStrength})`;
        }

        log.rounds.push(round);
        
        if(defenderHP <= 0) {
            log.winner = attacker;
            return log;
        }

        if(active === 1) {
            secondWarriorHP = defenderHP;
            secondWarriorShield = defenderShield;
        } else {
            firstWarriorHP = defenderHP;
            firstWarriorShield = defenderShield;
        }

        active = active === 1 ? 2 : 1;
    }
}
