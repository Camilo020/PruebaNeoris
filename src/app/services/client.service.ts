import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [];

  constructor(private http: HttpClient) {}

  public saveClient(client: Client) {
    this.clients = this.getClients();
    let maxId = Math.max(...this.clients.map((c) => c.Id), 0);

    client.Id = maxId + 1;
    this.clients.push(client);

    localStorage.setItem('Clients', JSON.stringify(this.clients));
  }

  public getClients() {
    let clientsData = localStorage.getItem('Clients');

    if (clientsData) {
      this.clients = JSON.parse(clientsData) as Client[];
      return this.clients;
    } else {
      this.clients = [
        {
          Id: 1,
          Name: 'Juan',
          FirstName: 'Garza',
          LastName: 'Perez',
          Phone: '324234',
          Email: 'prueba@gmail.com',
        },
      ];

      localStorage.setItem('Clients', JSON.stringify(this.clients));
    }

    return this.clients;
  }
}
