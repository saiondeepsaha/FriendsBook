import { Component, OnInit, ViewChild } from '@angular/core';
import { IFriend, IUserList } from 'src/app/interfaces/responseInterfaces';
import { LoginService } from 'src/app/services/login.service';
import { FriendsService } from '../../services/friends.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  spinner = true;
  defaultPage = 5;
  loggedInUserId?: string;
  successMsg: any;
  
  itemsToShow: IUserList[] = [];
  currentItemsToShow:any = [];

  reqItems: IFriend[] = [];
  currentRequestsToShow:any = [];

  constructor(private uss: UsersService, private ls: LoginService, private fs: FriendsService) {}

  ngOnInit() {
    this.ls.getToken().subscribe((resp:any) => {
      this.loggedInUserId = resp['_id']; 
    });
    this.populate();
  }

  populate() {
    this.fs.getMyFriends().subscribe({
      next: res => {
        const allUsers = res[0];
        const allFrnds = res [1];
        this.pendingRequestResult(allFrnds);
        this.sendRequestResult(allUsers);
       },
       error: errRes => {
        console.log(errRes);
      }
    })
  }

  pendingRequestResult(responseArr:any) {
    for (const entry of responseArr) {
      if (entry.userId === this.loggedInUserId && entry.status.includes('Request Pending')) {
        this.uss.getUserById(entry['friendId']).subscribe({
          next: (res:any) => {
            this.spinner = false;
            const nameObj = {
              firstName: res['firstName'],
              lastName: res['lastName']
            }
            Object.assign(entry, nameObj);
            this.reqItems.push(entry);
            this.currentRequestsToShow = this.reqItems; 
            this.currentRequestsToShow = this.reqItems.slice(0, this.defaultPage);
          },
          error: errRes => {
            console.log(errRes);
          }
        });
      }
    }
  }

  sendRequestResult(userData:any) {
    for (const entry of userData) {
      // logic to remove entry of the loggedin user and blocked users from the array to display
      if (entry.id !== this.loggedInUserId && entry.isActive) {
          this.itemsToShow.push(entry);
          this.currentItemsToShow = this.itemsToShow;
          this.currentItemsToShow = this.itemsToShow.slice(0, this.defaultPage);
      }
    }
  }

  pageChange($event:any) {
    this.currentRequestsToShow =  this.reqItems.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  onPageChange($event:any) {
    this.currentItemsToShow =  this.itemsToShow.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  sendRequest(toUser:any) {
    console.log(toUser);
    const userObj = {
      userId: this.loggedInUserId, // who is sending request
      friendId: toUser['id'], // to whom it is being sent
      status: "Request Pending"
    };
    this.fs.createRequest(userObj).subscribe({
      next: successResp => {
        this.successMsg = successResp['message'];
      },
      error: errRes => {
        this.spinner = false;
        console.log(errRes);
      }
    })
  }

  updateReq(req:any, status:any){
    this.fs.updatefriend(req, status).subscribe({
      next: successResp => {
        this.successMsg = "Request " + status;
        this.currentRequestsToShow.splice(this.currentRequestsToShow.indexOf(req), 1);
      },
      error: errRes => {
        console.log(errRes);
      }
    });
  }

}
