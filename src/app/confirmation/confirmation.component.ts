import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  toMyAppointments() {
  this.router.navigate(['/appointments']);
  }
}
