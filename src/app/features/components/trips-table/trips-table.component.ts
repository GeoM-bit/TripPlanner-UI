import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatusMapping} from "../../../core/enums/requestStatus";
import {AreaMapping} from "../../../core/enums/areaType";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {UserTripModel} from "../../../../models/userTripModel";
import {ViewTripsService} from "../../../core/services/viewTrips.service";
import {Subject} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {BtoTripModel} from "../../../../models/btoTripModel";
import {FilterModel} from "../../../../models/filterModel";

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})

export class TripsTableComponent implements OnInit, AfterViewInit{
  displayedColumnsUser: string[] = ['client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'status', 'action'];
  displayedColumnsBTO: string[] = ['firstName', 'email','pmName','area','client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'action'];
  displayedColumns: string[];
  statusMapping = StatusMapping;
  areaMapping = AreaMapping;
  user: String;
  userRole = UserRoles[0];
  btoRole = UserRoles[1];
  dataSource: MatTableDataSource<any>;
  noTrips=false;

  @Input() filter: FilterModel;
  @Input() sub:Subject<FilterModel>;

  constructor(private viewTripsService: ViewTripsService, private authenticationService: AuthenticationService){
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
    this.noTrips = false;
    debugger
    if(this.user==this.userRole) {
      this.displayedColumns=this.displayedColumnsUser;
      this.viewTripsService.getFilteredTripsForUser(searchCriteria).subscribe((response: UserTripModel[]) => {
        if(response.length==0){
          this.noTrips=true;
        }
        debugger
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;

        }
      )
    }
    if(this.user==this.btoRole) {
      this.displayedColumns=this.displayedColumnsBTO;
      this.viewTripsService.getFilteredTripsForBTO(searchCriteria).subscribe((response: BtoTripModel[]) => {
        if(response.length==0){
          this.noTrips=true;
        }
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        }
      )
    }
    console.log(this.noTrips);
  }

  checkBtoRole(){
    return this.user==UserRoles[1] ? true: false;
  }

}
