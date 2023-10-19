import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUserList } from 'src/app/interfaces/responseInterfaces';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '6rem'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  dataSource?: Array<IUserList>;
  currentItemsToShow:any = [];
  expandedElement = 'collapsed';
  dataSourceForPaginator?: MatTableDataSource<unknown>;
  spinner?: boolean;
  defaultPage = 10;
  expandSpecificRow?: string;

  constructor(private uService: UsersService) {}

  ngOnInit() {
    this.spinner = true;
    this.uService.getUsers().subscribe({
      next: resp => {
        if (resp.length > 0) {
          this.spinner = false;
          this.dataSource = resp;
          this.currentItemsToShow = this.dataSource;
          this.currentItemsToShow = this.dataSource.slice(0, this.defaultPage);
        }
      },
      error: e => {
        console.log(e);
      }
    })
  }

  onPageChange($event:any) {
    this.currentItemsToShow =  this.dataSource?.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  expandRow(rowState:any) {
    this.expandedElement = (this.expandedElement === 'collapsed' ? 'expanded' : 'collapsed');
  }

  updateUser(userData:any) {
    this.uService.blockUnblock(userData).subscribe({
      next: successResp => {
        console.log(successResp);
      },
      error: errRes => {
        console.log(errRes);
      }
    });
  }

}
