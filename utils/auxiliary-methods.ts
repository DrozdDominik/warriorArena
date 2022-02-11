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
