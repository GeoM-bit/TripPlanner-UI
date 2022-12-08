import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {RequestStatus, StatusMapping} from "../../../core/enums/requestStatus";
import {AreaMapping} from "../../../core/enums/areaType";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {UserTripModel} from "../../../../models/userTripModel";
import {ViewTripsService} from "../../../core/services/viewTrips.service";
import {Subject} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {BtoTripModel} from "../../../../models/btoTripModel";
import {FilterModel} from "../../../../models/filterModel";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Guid} from "guid-typescript";
import {UpdateTripStatusModel} from "../../../../models/updateTripStatusModel";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})

export class TripsTableComponent implements OnInit, AfterViewInit{
  displayedColumnsUser: string[] = ['client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'status', 'action'];
  displayedColumnsBTO: string[] = ['firstName', 'email','pmName','area','client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'action'];
  displayedColumns: string[];
  status: RequestStatus;
  statusMapping = StatusMapping;
  areaMapping = AreaMapping;
  user: String;
  userRole = UserRoles[0];
  btoRole = UserRoles[1];
  dataSource= new MatTableDataSource<any>;
  noTrips=false;
  updateTripStatusModel= new UpdateTripStatusModel();

  @Input() filter: FilterModel;
  @Input() sub:Subject<FilterModel>;

  constructor(private viewTripsService: ViewTripsService, private authenticationService: AuthenticationService, private dialog: MatDialog,  private snackBar: SnackBarComponent){
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.user = this.authenticationService.getUserRole();
    this.getData(this.filter);
  }

  ngAfterViewInit():void{
    this.sub.subscribe((response)=>{
      this.getData(response);
    })
  }

  getData(searchCriteria: FilterModel){
    if(this.user==this.userRole) {
      this.displayedColumns=this.displayedColumnsUser;
      this.viewTripsService.getFilteredTripsForUser(searchCriteria).subscribe((response: UserTripModel[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        if(this.dataSource.data.length==0) {
          this.noTrips = true;
        }
      })
    }
    if(this.user==this.btoRole) {
      this.displayedColumns=this.displayedColumnsBTO;
      this.viewTripsService.getFilteredTripsForBTO(searchCriteria).subscribe((response: BtoTripModel[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        if(this.dataSource.data.length==0) {
          this.noTrips = true;
        }
      })
    }
    this.noTrips = this.dataSource.data.length==0 ? true:false;
  }

  checkBtoRole(){
    return this.user==UserRoles[1] ? true:false;
  }

  onUpdateStatus(id: Guid, elementStatus: String){
    switch (elementStatus){
      case "accept": {
        this.status = RequestStatus.Accepted;
        break;
      }
      case "reject": {
        this.status = RequestStatus.Rejected;
        break;
      }
      case "cancel": {
        this.status = RequestStatus.Cancelled;
        break;
      }
    }
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {newStatus: elementStatus}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result.status != 'closed') {
          this.updateTripStatusModel.id = id;
          this.updateTripStatusModel.status = this.status;
          this.viewTripsService.updateTripStatus(this.updateTripStatusModel).subscribe((response: boolean) => {
            if (response == true) {
              this.snackBar.openSnackBar("Status updated successfully.", '');
              this.getData(new FilterModel());
            } else {
              this.snackBar.openSnackBar("Failed to update trip status.", '');
            }
          });
        }
      }
    )
  }
}
