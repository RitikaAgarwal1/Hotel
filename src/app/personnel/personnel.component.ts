import { Component, OnInit } from '@angular/core';
import {Employee} from '../interfaces/personnel';
import {EmployeeService} from '../service/employee/employee.service';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  employees = [
    {value: 'clerk',  viewValue: 'Front Desk Clerk'},
    {value: 'porter',  viewValue: 'Porter'},
    {value: 'housekeeping', viewValue: 'Housekeeping'},
    {value: 'waiter', viewValue: 'Waiter'},
    {value: 'kitchen_staff', viewValue: 'Kitchen Staff'},
    {value: 'supervisor', viewValue: 'Supervisor'},
    {value: 'manager', viewValue: 'Manager'}
  ];

  genders = [
    {
      value: 'male',
      viewValue: 'Male'
    },
    {
      value: 'female',
      viewValue: 'Female'
    }
  ];

  employee = '';
  phone;
  address;
  gender;
  age;
  employeeType;
  empArray = [];
  personnel: Employee;
  empList = [];
  email;

  isLoading = true;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.getEmployeesData();
  }

  codeValidation(employeeType) {
    let Ccount = 0;
    let Mcount = 0;
    let Pcount = 0;
    let Hcount = 0;
    let Wcount = 0;
    let Kcount = 0;
    let Scount = 0;
    this.empArray.forEach((emp) => {
      switch (emp.profile) {
        case 'clerk':
          Ccount = Ccount + 1;
          break;

        case 'manager':
            Mcount = Mcount + 1;
            break;

        case 'porter':
          Pcount = Pcount + 1;
          break;

        case 'housekeeping':
            Hcount = Hcount + 1;
            break;

        case 'waiter':
            Wcount = Wcount + 1;
            break;

        case 'kitchen_staff':
            Kcount = Kcount + 1;
            break;

        case 'supervisor':
            Scount = Scount + 1;
            break;
      }
    });
    switch (employeeType) {
      case 'clerk':
        if (Ccount >= 4) {
          this.sweetAlert();
        }
        break;

      case 'manager':
        if (Mcount >= 6) {
          this.sweetAlert();
        }
        break;

      case 'porter':
        if (Pcount >= 3) {
          this.sweetAlert();
        }
        break;

      case 'housekeeping':
        if (Hcount >= 8) {
          this.sweetAlert();
        }
        break;

      case 'waiter':
        if (Wcount >= 5) {
          this.sweetAlert();
        }
        break;

      case 'kitchen_staff':
        if (Kcount >= 8) {
          this.sweetAlert();
        }
        break;

      case 'supervisor':
        if (Scount >= 4) {
          this.sweetAlert();
        }
        break;
    }
  }

  addEmployees(employeeType) {

    this.codeValidation(employeeType);

    const empPayload = {
        value: this.employee,
        email: this.email,
        phone: this.phone,
        address: this.address,
        gender: this.gender,
        age: this.age,
        profile: this.employeeType
      };

    if (!!empPayload.value) {
        if (this.empArray.length === 0) {
          this.personnel = new class implements Employee {
            key: string;
            name: string = empPayload.value;
            phone: string = empPayload.phone;
            address: string = empPayload.address;
            gender: string = empPayload.gender;
            age: string = empPayload.age;
            profile: string = empPayload.profile;
            email: string = empPayload.email;
          }();
          this.empService.addEmployee(this.personnel);
        } else {
          for (let i = 0; i < this.empArray.length; i++) {
            if (empPayload.value === this.empArray[i]) {
              return false;
            }
          }
          this.personnel = new class implements Employee {
            key: string;
            name: string = empPayload.value;
            phone: string = empPayload.phone;
            address: string = empPayload.address;
            gender: string = empPayload.gender;
            age: string = empPayload.age;
            profile: string = empPayload.profile;
            email: string = empPayload.email;
          }();
          this.empService.addEmployee(this.personnel);
        }
      }
    this.employee = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.gender = '';
    this.age = '';
    this.employeeType = '';
  }

  sweetAlert() {
    Swal.fire(
      'Warning',
      'More employees cannot be added in this department',
      'warning'
    );
    this.employee = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.gender = '';
    this.age = '';
    this.employeeType = '';

    return false;
  }

  getEmployeesData() {
    this.empService.getEmployee().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe( employees => {
      this.empList = employees;
      this.empArray = [];
      employees.forEach((el) => {
        this.empArray.push(el);
      });
      this.isLoading = false;
    });
  }

  deleteItem(item) {
    for (let i = 0; i <= this.empArray.length; i++) {
      if (item == this.empArray[i]) {
        this.empArray.splice(i, 1);

        this.empService
          .deleteEmployee(item.key)
          .catch(err => console.log(err));
      }
    }
  }

}
