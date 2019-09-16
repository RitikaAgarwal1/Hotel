import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Employee} from '../../interfaces/personnel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private dbpath = '/employees';
  empRef: AngularFireList<Employee> = null;

  constructor(private db: AngularFireDatabase) {
    this.empRef = db.list(this.dbpath);
  }

  getEmployee(): AngularFireList<Employee> {
    return this.empRef;
  }

  addEmployee(todo: Employee): void {
    this.empRef.push(todo);
  }

  deleteEmployee(key: string): Promise<void> {
    return this.empRef.remove(key);
  }
}
