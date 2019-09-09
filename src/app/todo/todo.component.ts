import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {TodoService} from '../service/todo/todo.service';
import {Todo} from '../interfaces/todo';
import { map } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [trigger('moveInLeft', [transition ('void=> *', [style ({transform: 'translateX(300px)'}),
    animate(200, keyframes ([style ({transform: 'translateX(300px)'}), style ({transform: 'translateX(0)'})]))]),
    transition('*=>void', [style({transform: 'translateX(0px)'}), animate(100, keyframes ([style(
      {transform: 'translateX(0px)'}), style({transform: 'translateX(300px)'})]))])])
  ]})

export class TodoComponent implements OnInit {

  todo: Todo;
  todoList: any[];
  displayName: string;

  todoArray = [];
  todoItem: string = '';

  isLoading = true;

  constructor( private todoService: TodoService) { }

  ngOnInit() {
    this.getTodoData();
    this.getName();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoArray, event.previousIndex, event.currentIndex);
  }

  getTodoData() {
    this.todoService.getTodo().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(todos => {
      this.todoList = todos;
      this.todoArray = [];
      todos.forEach((el) => {
        this.todoArray.push(el);
      });
      this.isLoading = false;
    });
  }

  addTodo(value) {
    value = this.todoItem;
    if (!!value) {
      if (this.todoArray.length === 0) {
        this.todo = new class implements Todo {
          isDone = false;
          key: string;
          title: string = value;
        }();
        this.todoService.sendTodo(this.todo);
      } else {

        for (let i = 0; i < this.todoArray.length; i++) {
          if (value === this.todoArray[i]) {
            return false;
          }
        }
        this.todo = new class implements Todo {
          isDone = false;
          key: string;
          title: string = value;
        }();
        this.todoService.sendTodo(this.todo);
      }
    }
    this.todoItem = '';
  }

  todoSubmit(value) {
    if (value !== '') {
      this.addTodo(value);
    }
  }

  deleteItem(todo) {
    for (let i = 0; i <= this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
        this.todoArray.splice(i, 1);

        this.todoService
          .removeTodo(todo.key)
          .catch(err => console.log(err));
      }
    }
  }

  taskComplete(done: boolean, todo) {
    if (this.todoItem === '') {
      this.todoList.forEach((el) => {
        if (el.title === todo) {
          this.todoService
            .updateTodo(el.key, { isDone: done })
            .catch(err => console.log(err));
        }
      });
    }
  }

  getName() {
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    this.displayName = loginResponse.displayName;
  }

}
