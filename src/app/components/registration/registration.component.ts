import { Component } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { NgForm } from '@angular/forms';

const clientCollection: Client[] = [];

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  id: number = 0;
  name: string = "";
  firstName : string = "";
  lastName: string = "";
  phone: string = "";

  clients: Client[] = [];

  constructor(private clientService: ClientService) { 
     localStorage.clear();
  }

  ngOnInit(): void {
    this.getClients();
  }

  onSubmit(form: NgForm) {
    let client: Client;
    client = {
         Id:  0,
         Name:  this.name,
         FirstName:  this.firstName,
         LastName:  this.lastName,
         Phone:  this.phone
    } 
    
    this.clientService.saveClient(client)
    alert("Cliente guardado correctamente.");
    this.getClients();
  }

 getClients(){  
    this.clients = this.clientService.getClients()
  }
}
