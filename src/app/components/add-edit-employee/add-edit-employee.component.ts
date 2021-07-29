import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackbarConfig } from 'src/app/models/CustomSnackbarConfig.model';
import { Employee } from 'src/app/models/Employee.model';
import { Position } from 'src/app/models/Position.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmployeeComponent implements OnInit {
  public listPositions: Position[] = [];
  public idEmployee: string;
  public action = 'Add';
  public employeeForm: FormGroup;
  snackbarConfig: CustomSnackbarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  constructor(
    private _employeeService: EmployeeService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { 
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      admissionDate: ['', Validators.required],
      position: ['', Validators.required],
      seniority: ['', Validators.required]
    });
    this.idEmployee = this.aRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this._employeeService.getPositions().subscribe(doc => {
      this.listPositions = [];
      doc.forEach(element => {
        this.listPositions.push({
          id: element.payload.doc.id,
          name: element.payload.doc.data().name
        });
      });
    });

    if (this.idEmployee != undefined) {
      this.action = 'Edit';
      
      this.employeeForm.setValue({
        fullName: this._employeeService.employee.fullName,
        email: this._employeeService.employee.email,
        admissionDate: this._employeeService.employee.admissionDate,
        position: this._employeeService.employee.position,
        seniority: this._employeeService.employee.seniority
      })
    }
  }
  
  public saveEmployee(){
    if (this.idEmployee === undefined){
      this.addEmployee();
    } else {
      this.editEmployee();
    }
  }

  public addEmployee() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        fullName: this.employeeForm.get('fullName').value,
        email: this.employeeForm.get('email').value,
        admissionDate: this.employeeForm.get('admissionDate').value,
        position: this.employeeForm.get('position').value,
        seniority: this.employeeForm.get('seniority').value
      };
      this._employeeService.saveEmployee(employee).then(() => {
        this.router.navigate(['/']);
        this.snackbar.open('The employee was successfully added', '', {
          panelClass: ['success'],
          ...this.snackbarConfig
        });
      }, error => {
        this.snackbar.open('An error occurred', '', {
          panelClass: ['error'],
          ...this.snackbarConfig
        });
      });
    } else {
      return;
    }
  }

  public editEmployee() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        id: this.idEmployee,
        fullName: this.employeeForm.get('fullName').value,
        email: this.employeeForm.get('email').value,
        admissionDate: this.employeeForm.get('admissionDate').value,
        position: this.employeeForm.get('position').value,
        seniority: this.employeeForm.get('seniority').value
      };
      this._employeeService.editEmployee(employee).then(() => {
        this.router.navigate(['/']);
        this.snackbar.open('The employee was successfully updated', '', {
          panelClass: ['success'],
          ...this.snackbarConfig
        });
      }, error => {
        this.snackbar.open('An error occurred', '', {
          panelClass: ['error'],
          ...this.snackbarConfig
        });
      });
    } else {
      return;
    }
  }

}
