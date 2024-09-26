export interface Task {
    id: number;
    nameTask: string;
    limitDate: string;
    people: Person[];
}

export interface Person {
    fullName: string;
    age: number;
    skills: Skill[];
}

export interface Skill {
    nameSkill: string;
}