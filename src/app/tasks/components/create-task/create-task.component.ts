import { Task } from '../../interfaces/tasks.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  public taskForm!: FormGroup;
  public isId: boolean = false;

  @Input() taskToEdit: Task | null = null;

  @Output() emitNewTask: EventEmitter<any> = new EventEmitter();
  @Output() emitEditTask: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}  

  ngOnInit(): void {
    this.newTask();
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.isId = true;
      const task = this.taskService.getTaskById(Number(taskId));
      this.setTaskToForm(task);
    }
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

  public setTaskToForm(task: Task): void {
    this.taskForm.patchValue(task);

    task.people.forEach((person) => {
      this.people.push(
        this.fb.group({
          fullName: person.fullName,
          age: person.age,
          skills: this.fb.array(person.skills.map((skill: any) => this.fb.group({ nameSkill: skill.nameSkill })))
        })
      );
    });
  }

  public saveTask(): void {
    debugger;
    if (this.taskForm.invalid) return;
    if (this.isId) {
      this.emitEditTask.emit(this.taskForm.value);
    } else {
      this.emitNewTask.emit(this.taskForm.value);
    }
  }
}