import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';
import {Todo} from '../../interfaces/todo';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint: string = 'https://hotel-management-c19a3.firebaseio.com/tasks.json';
  private dbpath = '/todo';
  todoRef: AngularFireList<Todo> = null;

  constructor( private baseService: BaseService,
               private db: AngularFireDatabase) {
    this.todoRef = db.list(this.dbpath);
  }

  getTodo(): AngularFireList<Todo> {
    return this.todoRef;
  }

  sendTodo(todo: Todo): void {
    this.todoRef.push(todo);
  }

  removeTodo(key: string): Promise<void> {
    return this.todoRef.remove(key);
  }

  updateTodo(key: string, value: any): Promise<void> {
    return this.todoRef.update(key, value);
  }

  deleteAll(): Promise<void> {
    return this.todoRef.remove();
  }
}
