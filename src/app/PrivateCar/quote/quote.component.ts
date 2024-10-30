import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {



  @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private Router: Router) { }

  ngOnInit(): void {
  }

  UpdateAmout() {
    const Viewinput = document.getElementById('updatedvalue') as HTMLInputElement
    if (Viewinput.style.display !== 'block') {
      const Viewinput = document.getElementById('updatedvalue') as HTMLInputElement
      Viewinput.style.display = 'block'
      const Viewinputspan = document.getElementById('updatespan') as HTMLInputElement
      Viewinputspan.style.display = 'none'
    } else {
      const Viewinput = document.getElementById('updatedvalue') as HTMLInputElement
      Viewinput.style.display = 'none'
      const Viewinputspan = document.getElementById('updatespan') as HTMLInputElement
      Viewinputspan.style.display = 'block'
    }
  }

  numberValidate(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  OpenDialog() {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      // width: '75%',
      // height: '75%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  closedialog() {
    this.dialog.closeAll();
  }

  GOTOGouteDetail() {
    this.Router.navigateByUrl('/Quotedetail')
  }

}
