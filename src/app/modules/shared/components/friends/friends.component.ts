import { Component, OnInit } from '@angular/core';
import { IFriend } from 'src/app/interfaces/responseInterfaces';
import { LoginService } from 'src/app/services/login.service';
import { FriendsService } from '../../services/friends.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  spinner = true;
  defaultPage = 10;
  currentItemsToShow:any = [];
  itemsToShow: IFriend[] = [];
  loggedInUserId?: string;
  errMsg: any;

  constructor(private us: UsersService, private ls: LoginService, private fs: FriendsService) { }

  ngOnInit() {
    this.ls.getToken().subscribe((resp:any) => {
      this.loggedInUserId = resp['_id'];
    });
    this.showAllFriendRequests();
  }

  showAllFriendRequests() {
    this.fs.getFriends().subscribe({
      next: res => {
        this.spinner = true;
        this.filterResults(res);
      },
      error: errRes => {
        console.log(errRes);
      }
    })
  }

  filterResults(allReqArr:any) {
    this.itemsToShow = allReqArr.filter((data:any)=>{
      if (data.userId === this.loggedInUserId) { //filtering out the logged in userid in response
        if(data.status.includes("Friend Request Accepted")){
          this.us.getUserById(data['friendId']).subscribe({
            next: (res:any) => {
                this.spinner = false;
                const nameObj = {
                  firstName: res['firstName'],
                  lastName: res['lastName']
                }
                Object.assign(data, nameObj);
                this.itemsToShow.push(data);
                this.currentItemsToShow = this.itemsToShow; 
                this.currentItemsToShow = this.itemsToShow.slice(0, this.defaultPage);
            },
            error: errRes => {
              console.log(errRes);
            }
          });
        }
      }
    });
  }

  onPageChange($event:any) {
    this.currentItemsToShow =  this.itemsToShow.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }
}
