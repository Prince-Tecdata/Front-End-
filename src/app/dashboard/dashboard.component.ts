import { MatDialog } from '@angular/material/dialog';
import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate!: TemplateRef<any>;

  constructor(private Router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {


  }

  BusinessType: string = ''
  GotoBusiness(event: any) {
    debugger
    this.BusinessType = event.value
    const title = this.Projectname + ' ' + event.value
    sessionStorage.setItem('BusinessTitle', title)
    sessionStorage.setItem('BusinessType', this.BusinessType)
    this.dialog.closeAll();
    // const close = document.getElementById('cancel') as HTMLButtonElement
    // close.click()
    this.Router.navigate(['PrivatecarNewBusiness'])
  }

  Projectname: string = ''
  GetProjectname(event: any) {
    // debugger
    // console.log(event.srcElement.alt,'@@');
    this.Projectname = event.srcElement.alt
  }

  OpenDialog() {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      // width: '75%',
      // height: '25%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  closedialog() {
    this.dialog.closeAll();
  }



}
