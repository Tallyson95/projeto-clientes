import React, { useState } from 'react';
import axios from 'axios';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+55)?(?:\(?[1-9][0-9]?\)?[ ]?)?[9]?[0-9]{4}-?[0-9]{4}$/;

export function ClientForm({ onClientCreated, onClose }) {
    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setNewClient(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else {
            setNewClient(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCreateClient = async (event) => {
        event.preventDefault();

        if (!newClient.name || !emailRegex.test(newClient.email) || !phoneRegex.test(newClient.phone)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/clients`, newClient);
            onClientCreated(response.data);
            setNewClient({
                name: '',
                email: '',
                phone: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                },
            });
            alert('Cliente cadastrado com sucesso!');
            onClose();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    return (
        <form onSubmit={handleCreateClient} className="client-form">
            <h2>Cadastrar Novo Cliente</h2>
            <input
                type="text"
                name="name"
                placeholder="Nome"
                value={newClient.name}
                onChange={handleInputChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newClient.email}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="phone"
                placeholder="Telefone"
                value={newClient.phone}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="address.street"
                placeholder="Rua"
                value={newClient.address.street}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="address.city"
                placeholder="Cidade"
                value={newClient.address.city}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="address.state"
                placeholder="Estado"
                value={newClient.address.state}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="address.zipCode"
                placeholder="CEP"
                value={newClient.address.zipCode}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Cadastrar Cliente</button>
        </form>
    );
}
