import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';
import {Todo} from '../../interfaces/todo';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  userId: string;
  items;
  todosCol: AngularFirestoreCollection<Todo>;

  endpoint: string = 'https://hotel-management-c19a3.firebaseio.com/tasks.json';
  private dbpath = '/todo';
  todoRef: AngularFireList<Todo> = null;

  constructor( private baseService: BaseService,
               private afAuth: AngularFireAuth,
               private db: AngularFireDatabase,
               private afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.todoRef = db.list(this.dbpath);
    //this.todosCol = this.afs.collection('todo');
  }

  getTodo(): AngularFireList<Todo> {
    return this.todoRef;
  }

  sendTodo(todo: Todo): void {
    this.todoRef.push(todo);
  }

  /*sendTodo(todo: Todo) {
    const uid = firebase.auth().currentUser.uid;

// Change this next line to save the transaction

    const newRef = this.todoRef.push({
      //key: todo.key,
      title: todo.title,
      isDone: todo.isDone,
      uid: uid
    });

    todo.key = newRef.key;

    const keyTrans = {};
    keyTrans[todo.key] = true;

    this.todoRef.update(uid, todo);
  }*/

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
