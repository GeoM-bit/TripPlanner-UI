import {AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {StatusMapping} from "../../../core/enums/requestStatus";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {UserTripModel} from "../../../../models/userTripModel";
import {GetTripsModel} from "../../../../models/getTripsModel";
import {ViewTripsService} from "../../../core/services/viewTrips.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})

export class TripsTableComponent implements OnInit, OnChanges{
  displayedColumns: string[] = ['client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'status', 'action'];
  statusMapping = StatusMapping;
  user: String;
  userRole = UserRoles[0];
  btoRole = UserRoles[1];
  dataSource: MatTableDataSource<any>;

  @Input() filter: GetTripsModel;
  constructor(private _liveAnnouncer: LiveAnnouncer, private viewTripsService: ViewTripsService, private authenticationService: AuthenticationService){
  }

  @ViewChild(MatSort , {static: false}) sort: MatSort;

  ngOnInit(): void {
    this.user = this.authenticationService.getUserRole();

    this.getData();
  }

  ngOnChanges(changes: any) {
    console.log(changes.filter);
  }

  getData(){
    this.viewTripsService.getFilteredTripsForUser(this.filter).subscribe((response: UserTripModel[]) => {
          this.dataSource = new MatTableDataSource(response);
          console.log(this.dataSource);
          this.dataSource.sort=this.sort;
        }
      )
  }

  /*announceSortChange(sortState: Sort) {
   if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
    this._liveAnnouncer.announce('Sorting cleared');
    }
   this.dataSource.sort = this.sort;
   (matSortChange)="announceSortChange($event)"
  }

   */
}
