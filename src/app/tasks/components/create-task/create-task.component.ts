import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Person, Skill, Task } from '../../interfaces/tasks.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  public taskForm!: FormGroup;
  public isId: boolean = false;

  @Input() taskToEdit: Task | null = null;

  @Output() emitNewTask: EventEmitter<Task> = new EventEmitter();
  @Output() emitEditTask: EventEmitter<Task> = new EventEmitter();

  constructor(
    private router: Router,
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
      this.taskForm.updateValueAndValidity();
    }
  }

  get people() {
    return this.taskForm.get('people') as FormArray;
  }

  public newTask(): void {
    this.taskForm = this.fb.group({
      id: [Math.floor(Math.random() * 1000)],
      state: [false],
      nameTask: ['', [ Validators.required ]],
      limitDate: ['', [ Validators.required ]],
      people: this.fb.array([])
    });
  }

  public newPeople(): FormGroup {
    return this.fb.group({
      fullName: ['', [ Validators.required, Validators.minLength(5) ]],
      age: [null, [ Validators.required, Validators.min(18) ]],
      skills: this.fb.array([this.newSkill()], Validators.required)
    });
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
  
    task.people.forEach((person: Person) => {
      this.people.push(
        this.fb.group({
          fullName: [ person.fullName, [Validators.required, Validators.minLength(5)] ],
          age: [ person.age, [Validators.required, Validators.min(18)] ],
          skills: this.fb.array(
            person.skills.map((skill: Skill) => 
              this.fb.group({ nameSkill: [skill.nameSkill, [Validators.required]] })
            )
          )
        })
      );
    });
  }

  public cancelEdit(): void {
    this.taskForm.reset();
    this.people.clear();
    this.router.navigate(['/tasks/list']);
  }

  public saveTask(): void {
    if (this.taskForm.valid) {
      if (this.isId) this.emitEditTask.emit(this.taskForm.value);
      else this.emitNewTask.emit(this.taskForm.value);
      this.taskForm.reset();
      this.people.clear();
    };
  }
}