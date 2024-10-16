import React from 'react';
import '../styles/clientes.css';

export function ClientInfo({ client }) {
    return (
        <div className="client-card">
            <h2>{client.name}</h2>
            <p>Email: {client.email}</p>
            <p>Telefone: {client.phone}</p>
            <p>Endereço: {client.address.street}, {client.address.city} - {client.address.state}, {client.address.zipCode}</p>
        </div>
    );
}
