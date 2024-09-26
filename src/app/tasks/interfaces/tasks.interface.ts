export interface Task {
    id: number;
    nameTask: string;
    limitDate: string;
    people: Person[];
    state: boolean;
}

export interface Person {
    fullName: string;
    age: number;
    skills: Skill[];
}

export interface Skill {
    nameSkill: string;
}