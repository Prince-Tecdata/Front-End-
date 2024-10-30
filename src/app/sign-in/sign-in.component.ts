import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  Login: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private Router: Router, private Toaster: ToastrService, config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.Login = this.formBuilder.group({
      PhoneNo: [null, [Validators.required, Validators.minLength(10)]],
      OTP: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Login.controls;
  }

  ngOnInit(): void {
  }

  Submit() {
    debugger
    this.submitted = true;
    if (this.Login.valid) {
      console.log('Form Submitted!', this.Login.value);
      this.Router.navigate(['dash'])
    } else {
      if (this.Login.controls['PhoneNo'].value == null) {
        this.Toaster.error("Field Must be Enter the Mobile No", 'Message')
        return
      }
      if (this.Login.controls['PhoneNo'].value == null) {
        this.Toaster.error("Field Must be Enter the OTP", 'Message')
        return
      }
      if (this.Login.controls['PhoneNo'].value.length < 10) {
        this.Toaster.error("Field Must be Enter the Valid Mobile No", 'Message')
        return
      }
      if (this.Login.controls['OTP'].value.length <= 5) {
        this.Toaster.error("Field Must be Enter the Valid OTP", 'Message')
        return
      }

    }
  }

  numberValidates(event: any) {
    if (event.target.value.length >= 10) {
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

  numberValidatesOTP(event: any) {
    if (event.target.value.length >= 4) {
      event.preventDefault()
      if (event.keyCode === 13) {
        this.Submit()
      }
    }
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  SignUp() {
    const signUpLink = document.querySelector('.signUp-link') as HTMLElement
    const wrapper = document.querySelector('.wrapper') as HTMLElement
    signUpLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signIn')
      wrapper.classList.remove('animate-signUp');
    });
  }

  SignIn() {
    const wrapper = document.querySelector('.wrapper') as HTMLElement
    const signInLink = document.querySelector('.signIn-link') as HTMLElement
    signInLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  getfile() {
    const dobInput = document.getElementById('files') as HTMLInputElement;
    dobInput.click()
  }

  fileToUpload: any;
  imageUrl: any = 'https://www.w3schools.com/howto/img_avatar.png'
  handleFileInput(event: any) {
    const files: FileList = event.target.files[0]
    this.fileToUpload = files

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


}
