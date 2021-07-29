import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { CustomSnackbarConfig } from 'src/app/models/CustomSnackbarConfig.model';
import { Employee } from 'src/app/models/Employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'admissionDate', 'position', 'seniority', 'actions'];
  dataSource = new MatTableDataSource();
  listEmployee: Employee[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackbarConfig: CustomSnackbarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  constructor(
    private _employeeService: EmployeeService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadEmployees() {
    this._employeeService.getEmployees().subscribe(doc => {
      this.listEmployee = [];
      doc.forEach(element => {
        let admissionDate = new Date((element.payload.doc.data().admissionDate.seconds)*1000);

        this.listEmployee.push({
          id: element.payload.doc.id,
          fullName: element.payload.doc.data().fullName,
          email: element.payload.doc.data().email,
          admissionDate: admissionDate,
          seniority: element.payload.doc.data().seniority,
          position: element.payload.doc.data().position
        });
      });
      this.dataSource = new MatTableDataSource(this.listEmployee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.snackbar.open('An error occurred', '', {
        panelClass: ['error'],
        ...this.snackbarConfig
      });
    });
  }

  public deleteEmployee(idEmployee: string) {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: { message: 'Do you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._employeeService.deleteEmployee(idEmployee).then(() => {
          this.loadEmployees();
          this.snackbar.open('The employee was successfully removed', '', {
            panelClass: ['success'],
            ...this.snackbarConfig
          });
        }, error => {
          this.snackbar.open('An error occurred', '', {
            panelClass: ['error'],
            ...this.snackbarConfig
          });
        });
      }
    });
  }

  public editEmployee(employee: Employee){
    this._employeeService.employee = employee;
  }


}
