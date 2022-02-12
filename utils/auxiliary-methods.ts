import { WarriorRecord } from "../records/warrior.record"

export const compareWarriors = (firstWarrior: WarriorRecord, secondWarrior: WarriorRecord): number => {
    if(firstWarrior.victories < secondWarrior.victories){
        return 1;
    } else if(firstWarrior.victories > secondWarrior.victories){
        return -1;
    } else {
        return 0;
    }
};

export const fight = (firstWarrior: WarriorRecord, secondWarrior: WarriorRecord): WarriorRecord => {
    
    let active = 1;
    
    let firstWarriorHP = firstWarrior.endurace * 10;
    let firstWarriorShield = firstWarrior.defense;
    let secondWarriorHP = secondWarrior.endurace * 10;
    let secondWarriorShield = secondWarrior.defense;

    while(true) {
        let attacker = active === 1 ? firstWarrior : secondWarrior;
        let defender = active === 1 ? secondWarrior : firstWarrior;

        let defenderHP = active === 1 ? secondWarriorHP : firstWarriorHP;
        let defenderShield = active === 1 ? secondWarriorShield : firstWarriorShield;

        let attackStrength = attacker.strength;

        if((defenderShield + defender.agility) > attackStrength) {
            if(attackStrength >= defenderShield) {
                defenderHP += (defenderShield - attackStrength);
                defenderShield = 0;
            } else {
                defenderShield -= attackStrength;
            }
        } else {
            defenderHP -= attackStrength
        }

        if(defenderHP <= 0) {
            return attacker;
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
