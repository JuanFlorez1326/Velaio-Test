import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  public taskForm!: FormGroup;

  @Output() emitNewTask: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {}  

  ngOnInit(): void {
    this.newTask();
  }

  get people() {
    return this.taskForm.get('people') as FormArray;
  }

  public newTask(): void {
    this.taskForm = this.fb.group({
      id: [Math.floor(Math.random() * 1000)],
      nameTask: ['', [ Validators.required ]],
      limitDate: ['', [ Validators.required ]],
      people: this.fb.array([])
    });
  }

  public newPeople(): FormGroup {
    return this.fb.group({
      fullName: ['', [ Validators.required, Validators.minLength(5), this.uniqueNameValidator.bind(this) ]],
      age: [null, [ Validators.required, Validators.min(18) ]],
      skills: this.fb.array([this.newSkill()], Validators.required)
    });
  }

  public uniqueNameValidator(control: any) {
    const names = this.people.value.map((persona: any) => persona.nombre);
    if (names.includes(control.value)) return { nameExists: true };
    return;
  }

  public newSkill(): FormGroup {
    return this.fb.group({
      nameSkill: ['', [ Validators.required ]],
    });
  }

  public addPeople(): void {
    this.people.push(this.newPeople());
  }

  public removePeople(index: number): void {
    this.people.removeAt(index);
  }

  public getSkills(index: number): FormArray {
    return this.people.at(index).get('skills') as FormArray;
  }

  public addSkill(index: number): void {
    this.getSkills(index).push(this.newSkill());
  }

  public removeSkill(indexPeople: number, indexSkill: number): void {
    this.getSkills(indexPeople).removeAt(indexSkill);
  }

  public saveTask(): void {
    if (this.taskForm.valid) {
      this.emitNewTask.emit(this.taskForm.value);
      this.newTask();
    } else {
      console.log('Invalid Form');
    }
  }
}