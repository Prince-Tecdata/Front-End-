import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss']
})
export class NewBusinessComponent implements OnInit {


  CarDetailHdr!: FormGroup;
  submittedhdr = false;
  CarDetailAddOn: FormGroup;
  submitted = false;


  @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate!: TemplateRef<any>;

  constructor(private FB: FormBuilder, private DatePipe: DatePipe, private Router: Router, private dialog: MatDialog,
    private Toaster: ToastrService) {

    this.CarDetailHdr = this.FB.group({
      CustomerType: ['', Validators.required],
      CustomerName: ['', Validators.required],
      PhoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      Policy_Tenure: ['', [Validators.required]],
      RegistationNo: ['', Validators.required],
      ManufacturingYear: ['', Validators.required],
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      SubModel: ['', Validators.required],
      RegistrationDate: ['', Validators.required],
      CubicCapacity: ['', Validators.required],
      Fuel_Type: ['', Validators.required],
      Engine_Number: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      Chasis_Number: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      Seating_Capacity: ['', Validators.required],
      Rto: ['', Validators.required],
      Policy_Start_Date: ['', Validators.required],
      Policy_End_Date: ['', Validators.required],
      OD_End_Date: ['', Validators.required],
      TP_End_Date: ['', Validators.required],

      Previous_Insurance_Company_Name: ['', Validators.required],
      Previous_Policy_Number: ['', Validators.required],
      Previous_Policy_Type: ['', Validators.required],
      Previous_Policy_Expiry_Date: ['', Validators.required],
      Vehicle_Ownership: [false],
      any_claim_in_last_past_year: [false],
      NCB: ['', Validators.required],
    });

    this.CarDetailAddOn = this.FB.group({
      Electrical_Accessories: [null, [Validators.required, Validators.min(10000), Validators.max(50000)]],
      Non_Electrical_Accessories: [null, [Validators.required, Validators.min(10000), Validators.max(50000)]],
      Bi_Fuel_Kit: [null, [Validators.required]],
      Compulsory_Personal_Accident: [true],
      Legal_Liability_to_Paid_Driver: [false],
      Legal_Liability_to_Paid_Employee: [false],
      PA_Cover: ['', [Validators.required]],
      Unnamed_Passenger: ['', [Validators.required]],
      Zero_Depreciation: [false],
      Roadside_Assistance: [false],
      Engine_Protection: [false],
      Consumables: [false],
      Key_Cover: [false],
      Tyre_Cover: [false],
      NCB_Protect: [false],
      Invoice_Cover: [false],
      Daily_Allowance: [false],
      Loss_of_Personal_Belonging: [false],
      Emergency_Transport_Hotel_Expenses: [false],
      Accident_Shield: [false],
      Hydrostatic_Lock: [false],
      Inconvenience_Allowance: [false],
      Mandatory_Deduction_Protect: [false],
      Passenger_Assistance: [false],
      Anti_Theft_Discount: [false],
      Voluntary_Excess: ['', [Validators.required]],
    });

  }

  JobTitle: any = ''
  Header: any = ''
  ngOnInit(): void {
    // console.log(sessionStorage.getItem('BusinessType'));
    if (!sessionStorage.getItem('BusinessType')) {
      this.Router.navigate(['dash'])
    } else {
      // console.log(sessionStorage.getItem('BusinessType'),'@');
      this.JobTitle = sessionStorage.getItem('BusinessType')
      this.Header = sessionStorage.getItem('BusinessTitle')
      this.GetPolicyTenue()
    }
    if (this.JobTitle === 'New Business') {
      const Today = new Date()
      this.CarDetailHdr.controls['RegistrationDate'].setValue(this.DatePipe.transform(Today, 'yyyy-MM-dd'));
      this.CarDetailHdr.controls['Policy_Start_Date'].setValue(this.DatePipe.transform(Today, 'yyyy-MM-dd'));
      this.MinDate = this.DatePipe.transform(Today, 'yyyy-MM-dd')
      Today.setDate(Today.getDate() + 2);
      const nextDate = Today.toISOString().split('T')[0];
      this.MaxDate = this.DatePipe.transform(nextDate, 'yyyy-MM-dd')
      // this.CarDetailHdr.controls['Policy_End_Date'].setValue(this.DatePipe.transform(nextDate, 'yyyy-MM-dd'));
    } else {
      const Today = new Date()
      this.MaxDate = this.DatePipe.transform(Today, 'yyyy-MM-dd')
    }

    const Today = new Date()
    this.CarDetailHdr.controls['RegistrationDate'].setValue(this.DatePipe.transform(Today, 'yyyy-MM-dd'));
    this.CarDetailHdr.controls['Policy_Start_Date'].setValue(this.DatePipe.transform(Today, 'yyyy-MM-dd'));
    // this.MinDate = this.DatePipe.transform(Today, 'yyyy-MM-dd')
    Today.setDate(Today.getDate() + 364);
    const nextDate = Today.toISOString().split('T')[0];
    this.CarDetailHdr.controls['Policy_End_Date'].setValue(this.DatePipe.transform(nextDate, 'yyyy-MM-dd'));


  }

  get f(): { [key: string]: AbstractControl } {
    return this.CarDetailHdr.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.CarDetailAddOn.controls;
  }

  PolicyTenueList: any[] = new Array()
  GetPolicyTenue() {
    debugger
    this.PolicyTenueList = []
    if (this.Header === 'Private Car New Business') {
      this.PolicyTenueList.push({
        Name: '1 Year OD+3 Years TP',
        Value: '1 Year OD+3 Years TP'
      })
    }
    else if (this.Header === 'Two Wheeler New Business'){
      this.PolicyTenueList.push({
        Name: '1 Year OD+5 Years TP',
        Value: '1 Year OD+5 Years TP'
      })
    }
  }

  SelectedTab: number = 0
  SubmitForm() {
    this.submittedhdr = true;
    console.log('Form Submitted!', this.CarDetailHdr.value);
    if (this.JobTitle !== 'New Business') {
      this.CarDetailHdr.controls['Policy_Tenure'].clearValidators();
      this.CarDetailHdr.controls['Policy_Tenure'].updateValueAndValidity();
      this.CarDetailHdr.controls['Policy_Tenure'].setValidators([Validators.required])
      this.CarDetailHdr.controls['OD_End_Date'].clearValidators();
      this.CarDetailHdr.controls['OD_End_Date'].updateValueAndValidity();
      this.CarDetailHdr.controls['OD_End_Date'].setValidators([Validators.required])
      this.CarDetailHdr.controls['TP_End_Date'].clearValidators();
      this.CarDetailHdr.controls['TP_End_Date'].updateValueAndValidity();
      this.CarDetailHdr.controls['TP_End_Date'].setValidators([Validators.required])
      if (this.NCB !== true) {
        this.CarDetailHdr.controls['NCB'].clearValidators();
        this.CarDetailHdr.controls['NCB'].updateValueAndValidity();
        this.CarDetailHdr.controls['NCB'].setValidators([Validators.required])
      }
    } else if (this.JobTitle !== 'Comprehensive') {
      this.CarDetailHdr.controls['Previous_Insurance_Company_Name'].clearValidators();
      this.CarDetailHdr.controls['Previous_Insurance_Company_Name'].updateValueAndValidity();
      this.CarDetailHdr.controls['Previous_Insurance_Company_Name'].setValidators([Validators.required])
      this.CarDetailHdr.controls['Previous_Policy_Number'].clearValidators();
      this.CarDetailHdr.controls['Previous_Policy_Number'].updateValueAndValidity();
      this.CarDetailHdr.controls['Previous_Policy_Number'].setValidators([Validators.required])
      this.CarDetailHdr.controls['Previous_Policy_Type'].clearValidators();
      this.CarDetailHdr.controls['Previous_Policy_Type'].updateValueAndValidity();
      this.CarDetailHdr.controls['Previous_Policy_Type'].setValidators([Validators.required])
      this.CarDetailHdr.controls['Previous_Policy_Expiry_Date'].clearValidators();
      this.CarDetailHdr.controls['Previous_Policy_Expiry_Date'].updateValueAndValidity();
      this.CarDetailHdr.controls['Previous_Policy_Expiry_Date'].setValidators([Validators.required])
      this.CarDetailHdr.controls['NCB'].clearValidators();
      this.CarDetailHdr.controls['NCB'].updateValueAndValidity();
      this.CarDetailHdr.controls['NCB'].setValidators([Validators.required])

    }
    if (this.CarDetailHdr.valid) {
      if (this.SelectedTab === 0) {
        const hide0 = document.getElementById('Hide0') as HTMLDivElement
        hide0.style.display = 'none'
        const hide1 = document.getElementById('Hide1') as HTMLDivElement
        hide1.style.display = 'block'
        this.SelectedTab = 1
      } else {
        const hide0 = document.getElementById('Hide0') as HTMLDivElement
        hide0.style.display = 'block'
        const hide1 = document.getElementById('Hide1') as HTMLDivElement
        hide1.style.display = 'none'
        this.SelectedTab = 0
      }
    }
  }

  CarDetailHdrSubmit() {
    this.submittedhdr = true;
    console.log('Form Submitted!', this.CarDetailHdr.value);
    if (this.CarDetailHdr.valid) {
      this.SelectedTab = 1
    }
  }

  NumberOnly(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    if (event.target.value.length >= 10) {
      event.preventDefault()
    }
  }

  AlphabeticOnly(event: any) {
    debugger
    if (this.JobTitle == "New Business") {
      if (event.code == 'Space') {
        if (event.target.value.length == 0) {
          event.preventDefault();
        }
      } else {
        if (event.target.value.length <= 2) {
          if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else if (event.target.value.length <= 4) {
          if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else {
          event.preventDefault()
        }
      }
    } else {
      if (event.code == 'Space') {
        if (event.target.value.length == 0) {
          event.preventDefault();
        }
      } else {
        if (event.target.value.length <= 2) {
          if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else if (event.target.value.length <= 5) {
          if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else if (event.target.value.length <= 8) {
          if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else if (event.target.value.length <= 12) {
          if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        } else {
          event.preventDefault()
        }
      }
    }

  }
  spacedefault(event: any) {
    if (this.JobTitle == "New Business") {
      if (event.inputType === 'insertText') {
        if (event.target.value !== undefined) {
          if (event.target.value.length === 2) {
            event.target.value = event.target.value + ' '
          } else {
            event.target.value = event.target.value
          }
        }
      }
    } else {
      if (event.inputType === 'insertText') {
        if (event.target.value !== undefined) {
          if (event.target.value.length === 2) {
            event.target.value = event.target.value + ' '
          } else if (event.target.value.length === 5) {
            event.target.value = event.target.value + ' '
          } else if (event.target.value.length === 8) {
            event.target.value = event.target.value + ' '
          } else {
            event.target.value = event.target.value
          }
        }
      }
    }
  }

  MinDate: any
  MaxDate: any
  UpdateDate(event: any) {
    const Year = event.target.value
    const MaxYear = parseInt(Year) + 1
    const MinDate = Year + '-01-01'
    const MaxDate = MaxYear + '-01-31'
    this.CarDetailHdr.controls['RegistrationDate'].setValue('');
    this.MinDate = MinDate
    this.MaxDate = MaxDate
  }

  NumberLength(event: any) {
    if (event.target.value.length >= 17) {
      event.preventDefault()
    }
  }

  CustomerType: string = 'Customer Name'
  Updatetype(event: any) {
    if (event.target.value === 'INDIVIDUAL') {
      this.CustomerType = 'Customer Name'
    } else if (event.target.value === 'COMPANY') {
      this.CustomerType = 'Company Name'
    } else {
      this.CustomerType = 'Customer Name'
    }
  }

  CarDetailAddOnSubmit() {
    this.submitted = true;
    if (this.CarDetailAddOn.controls['Compulsory_Personal_Accident'].value === false && this.ReasonForCPA === '') {
      this.Toaster.error("Field Must be Select Compulsory Personal Accident (Owner Driver) Or Proper Reason Should be Compulsory")
      return
    } else {
      if (this.CustomerType === 'Customer Name') {
        this.CarDetailAddOn.controls['PA_Cover'].clearValidators();
        this.CarDetailAddOn.controls['PA_Cover'].updateValueAndValidity();
        this.CarDetailAddOn.controls['PA_Cover'].setValidators([Validators.required])
      }
      console.log('Form Submitted!', this.CarDetailAddOn.value);
      if (this.CarDetailAddOn.valid) {
        let Obj = {
          CarNumber: this.CarDetailHdr.controls['RegistationNo'].value,
          Make: this.CarDetailHdr.controls['Make'].value,
          Model: this.CarDetailHdr.controls['Model'].value,
          SubModel: this.CarDetailHdr.controls['SubModel'].value,
          Engine_Number: this.CarDetailHdr.controls['Engine_Number'].value,
          Chasis_Number: this.CarDetailHdr.controls['Chasis_Number'].value,
          MobileNo: this.CarDetailHdr.controls['PhoneNo'].value,
          EMail: this.CarDetailHdr.controls['email'].value
        }
        sessionStorage.setItem('PrivateCarDetail', JSON.stringify(Obj))
        this.Router.navigateByUrl('/Quote')
      }
    }
  }



  numberValidates(event: any) {
    if (event.target.value.length >= 5) {
      event.preventDefault()
    }
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  numberValidate(event: any) {
    if (event.target.value.length > 9) {
      event.preventDefault()
    }
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }


  OpenPopup(event: any) {
    if (event.checked === false) {
      this.OpenDialog()
    } else if (event.checked === true) {
      this.ReasonForCPA = ''
    }
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

  UpdateData(event: any) {
    if (event.checked === true) {
      const hidediv = document.getElementById('hides') as HTMLDivElement
      hidediv.style.display = 'none'
      const agree = document.getElementById('agree') as HTMLDivElement
      agree.style.color = 'green'
    } else {
      const hidediv = document.getElementById('hides') as HTMLDivElement
      hidediv.style.display = 'block'
      const agree = document.getElementById('agree') as HTMLDivElement
      agree.style.color = 'black'
    }
  }

  PreviousTab() {
    if (this.SelectedTab === 0) {
      const hide0 = document.getElementById('Hide0') as HTMLDivElement
      hide0.style.display = 'none'
      const hide1 = document.getElementById('Hide1') as HTMLDivElement
      hide1.style.display = 'block'
      this.SelectedTab = 1
    } else {
      const hide0 = document.getElementById('Hide0') as HTMLDivElement
      hide0.style.display = 'block'
      const hide1 = document.getElementById('Hide1') as HTMLDivElement
      hide1.style.display = 'none'
      this.SelectedTab = 0
    }
  }

  closedialog() {
    this.dialog.closeAll();
  }

  ReasonForCPA: string = ''
  Proceed() {
    if (this.ReasonForCPA === '') {
      this.Toaster.error("Field Must be Select the Reason for not selecting Compulsory Personal Accident(CPA)", '')
      return
    } else {
      this.closedialog()
    }
  }

  ModalboxClose() {
    this.CarDetailAddOn.controls['Compulsory_Personal_Accident'].setValue(true)
    this.ReasonForCPA = ''
    this.closedialog()
  }

  DateCheck(event: any) {
    console.log(this.CarDetailHdr.controls['ManufacturingYear'].value, this.DatePipe.transform(event.target.value, 'yyyy'));

    // if (parseInt(this.CarDetailHdr.controls['ManufacturingYear'].value) > parseInt(this.DatePipe.transform(event.target.value, 'yyyy'))) {
    //   const Year = this.CarDetailHdr.controls['ManufacturingYear'].value
    //   const MinDate = Year + '-01-01'
    //   this.CarDetailHdr.controls['RegistrationDate'].setValue(MinDate);
    // }
  }

  NCB: boolean = true
  UpdateType() {
    if (this.CarDetailHdr.controls['Vehicle_Ownership'].value === true || this.CarDetailHdr.controls['any_claim_in_last_past_year'].value === true) {
      this.NCB = false
    } else {
      this.NCB = true
    }
  }

}

