import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employee: Employee;

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getEmployees(): Observable<any> {
    return this.firestore.collection('employees', ref => ref.orderBy('admissionDate', 'asc')).snapshotChanges();
  }

  public getPositions(): Observable<any> {
    return this.firestore.collection('positions', ref => ref.orderBy('name', 'asc')).snapshotChanges();
  }

  public saveEmployee(employee: Employee): Promise<any>{
    return this.firestore.collection('employees').add(employee);
  }

  public editEmployee(employee: Employee): Promise<any> {
    return this.firestore.collection('employees').doc(employee.id).update(employee);
  }

  public deleteEmployee(id: string): Promise<any>{
    return this.firestore.collection('employees').doc(id).delete();
  }
}
