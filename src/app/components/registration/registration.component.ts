import { Component } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { NgForm } from '@angular/forms';

const clientCollection: Client[] = [];

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  id: number = 0;
  name: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';

  clients: Client[] = [];

  constructor(private clientService: ClientService) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.getClients();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert(
        'Faltan campos por capturar. Se requieren todos los campos obligatorios.'
      );
      form.control.markAllAsTouched();
      return;
    }

    let client: Client;
    client = {
      Id: 0,
      Name: this.name,
      FirstName: this.firstName,
      LastName: this.lastName,
      Phone: this.phone,
      Email: this.email,
    };

    this.clientService.saveClient(client);
    alert('Cliente guardado correctamente.');
    this.getClients();
    form.resetForm();
  }

  getClients() {
    this.clients = this.clientService.getClients();
  }

  onDelete(id: number) {
    const confirmed = confirm(
      '¿Estás seguro de que deseas eliminar este cliente?'
    );
    if (confirmed) {
      this.clientService.deleteClient(id);
      alert('Cliente eliminado correctamente.');
      this.getClients();
    }
  }
}
