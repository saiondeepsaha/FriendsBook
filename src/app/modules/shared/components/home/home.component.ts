import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import { IGetAllPostResponse } from 'src/app/interfaces/responseInterfaces';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  spinner?: boolean;
  defaultPage = 10;
  currentItemsToShow:any = [];
  itemsToShow: IGetAllPostResponse[] = [];
  createPostForm: FormGroup = new FormGroup({});
  postPayload:any = {};

  constructor(private sharedService: SharedService, private fb: FormBuilder, private ls: LoginService) {
    this.ls.getToken().subscribe((resp:any) => {
      console.log(resp);
      this.postPayload['userId'] = resp['_id'];
      this.postPayload['userName'] = resp['firstName'] + ' ' + resp['lastName'];
      this.postPayload['userPhotoId'] = resp['photoId'];
      this.postPayload['postImageId'] = '';
      this.postPayload['isActive'] = resp['isActive'];
      this.postPayload['isAdmin'] = resp['isAdmin'];
      this.postPayload['profession'] = resp['profession'] ? resp['profession'] : 'Developer';
    });
  }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      post:['', Validators.required]
    });
    this.showAllPosts();    
  }

  showAllPosts() {
    this.spinner = true;
    this.sharedService.getAllPosts().subscribe({
      next: resp => {
        if (resp.length > 0) {
          this.spinner = false;
          this.itemsToShow = resp;
          this.currentItemsToShow = this.itemsToShow;
          this.currentItemsToShow = this.itemsToShow.slice(0, this.defaultPage);
        }
      },
      error: e => {
        console.log(e);
      }
    });
  }

  onPageChange($event:any) {
    this.currentItemsToShow =  this.itemsToShow.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  createPost() {
    if (this.createPostForm.valid) {
        this.postPayload['post'] = this.createPostForm.controls["post"].value;
        console.log(this.postPayload);
        this.sharedService.createPost(this.postPayload).subscribe({
            next: successResp => {
              this.spinner = false;
              console.log(successResp);
              this.showAllPosts();
            },
            error: errRes => {
              console.log(errRes);
            }
        });
        this.spinner = true;
      }
  }
}


