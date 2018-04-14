import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['id', 'first_name', 'last_name', 'avatar'];
  dataSource: any;
  currentPage:PageEvent;
  page_size;
  length;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private userService: UserService) {}

  ngOnInit(){
    this.loadData(this.currentPage);
}
loadData(currentPage){ 
 
  this.userService.getPage(currentPage).subscribe(
    data => { 
      console.log(data);
      this.page_size=data['per_page'];
      this.length=data['total'];
      this.dataSource=new MatTableDataSource(data.data);
      console.log(this.dataSource);
    }
  );
}
onPaginateChange(event){ 
  this.currentPage=event.pageIndex+1;
  this.loadData(this.currentPage);
}
}