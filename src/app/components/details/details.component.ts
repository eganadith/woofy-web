import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
// import express from "express";
import { TriggerApiService } from 'src/services/trigger-api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  messages: string[] = [];
  subscription: Subscription = new Subscription();

  constructor(private sseService: TriggerApiService) {}

  ngOnInit() {
    this.subscription = this.sseService.getEvents().subscribe(
      data => {
        this.messages.push(data);
        console.log(this.messages)
      },
      error => {
        console.error('Error with SSE connection:', error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
