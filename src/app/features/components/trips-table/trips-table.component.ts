import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {StatusMapping} from "../../../core/enums/requestStatus";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {UserTripModel} from "../../../../models/userTripModel";

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})

export class TripsTableComponent implements OnInit {
  displayedColumns: string[] = ['client', 'clientLocation', 'projectName', 'startDate', 'endDate', 'accommodation', 'status', 'action'];
  statusMapping = StatusMapping;
  user: String;
  userRole = UserRoles[0];
  btoRole = UserRoles[1];

  @Input() dataSource;
  constructor(private _liveAnnouncer: LiveAnnouncer, private authenticationService: AuthenticationService){
  }

  @ViewChild(MatSort , {static: false}) sort: MatSort;

  ngOnInit(): void {
    this.user = this.authenticationService.getUserRole();

  }

  announceSortChange(sortState: Sort) {
   if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
    this._liveAnnouncer.announce('Sorting cleared');
    }
   this.dataSource.sort = this.sort;
  }
}
