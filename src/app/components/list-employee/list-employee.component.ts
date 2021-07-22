import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
 shirtCollection: any
  constructor(
    private _employeeService: EmployeeService,
    public dialog: MatDialog
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
          // ...element.payload.doc.data()
        });
      });
      this.dataSource = new MatTableDataSource(this.listEmployee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error)
    });
  }

  public deleteEmployee(idEmployee: string) {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: {message: 'Do you want to delete this employee?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._employeeService.deleteEmployee(idEmployee).then(() => {
        this.loadEmployees();
      }, error => {
  
      });
    });

  }

  add() {
    const employee: Employee = {
      fullName: 'Marta Perez',
      email: 'mperez@gmail.com',
      admissionDate: new Date(),
      seniority: 'Ssr',
      position: 'Developer'
    };
    this._employeeService.saveEmployee(employee);
  }

}
