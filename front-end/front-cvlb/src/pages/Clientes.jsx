// src/components/Clientes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClientInfo } from '../components/ClientInfo.jsx';
import { ClientForm } from '../components/ClientForm.jsx';
import { Modal } from '../components/Modal.jsx';
import '../styles/clientes.css';

export function Clientes() {
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const clientsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const criarCliente = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/clients`);
            setClients(response.data);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
        }
    };

    useEffect(() => {
        criarCliente();
    }, []);

    const filteredClients = clients.filter(client => {
        const lowerCaseFilter = filter.toLowerCase();
        return (
            client.name.toLowerCase().includes(lowerCaseFilter) ||
            client.email.toLowerCase().includes(lowerCaseFilter) ||
            client.phone.includes(lowerCaseFilter) ||
            client.address.street.toLowerCase().includes(lowerCaseFilter) ||
            client.address.city.toLowerCase().includes(lowerCaseFilter) ||
            client.address.state.toLowerCase().includes(lowerCaseFilter)
        );
    });

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleClientCreated = (newClient) => {
        setClients(prev => [newClient, ...prev]);
    };

    return (
        <div>
            <h1>Clientes</h1>
            <input
                type="text"
                placeholder="Filtrar clientes..."
                value={filter}
                onChange={handleFilterChange}
                className="filter-input"
            />
            <button onClick={() => setIsModalOpen(true)}>Cadastrar Novo Cliente</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ClientForm onClientCreated={handleClientCreated} onClose={() => setIsModalOpen(false)} />
            </Modal>
            <div className="client-list">
                {currentClients.map(client => (
                    <ClientInfo key={client.id} client={client} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próximo
                </button>
            </div>
        </div>
    );
}
