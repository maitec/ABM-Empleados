import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public listEmployee: Employee[] = [
    { 
      fullName: 'Lucas Martinez',
      email: 'lmartinez@gmail.com',
      admissionDate: new Date(),
      seniority: 'Junior',
      position: 'Developer'
    }
  ];

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getEmployees(): Observable<any> {
    return this.firestore.collection('employees', ref => ref.orderBy('admissionDate', 'asc')).snapshotChanges();
  }

  public saveEmployee(employee: Employee): Promise<any>{
    return this.firestore.collection('employees').add(employee);
  }

  public deleteEmployee(id: string): Promise<any>{
    return this.firestore.collection('employees').doc(id).delete();
  }
}
