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

    const handleClientDeleted = (clientId) => {
        setClients(prev => prev.filter(client => client.id !== clientId));
    };

    const handleClientUpdated = (updatedClient) => {
        setClients((prevClients) =>
            prevClients.map(client => client.id === updatedClient.id ? updatedClient : client)
        );
    };

    return (
        <div className='container-client'>
            <div style={{width:"100%", display:'flex', justifyContent:'space-between'}}>
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={filter}
                    onChange={event => {
                        setFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="filter-input"
                />
                <button className='btn-new-client' onClick={() => setIsModalOpen(true)}>Cadastrar Cliente</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ClientForm onClientCreated={newClient => setClients(prev => [newClient, ...prev])} onClose={() => setIsModalOpen(false)} />
            </Modal>
            <div className="client-list">
                {filteredClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage).map(client => (
                    <ClientInfo
                        key={client.id}
                        client={client}
                        onClientDeleted={handleClientDeleted}
                        onClientUpdated={handleClientUpdated}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>Página {currentPage} de {Math.ceil(filteredClients.length / clientsPerPage)}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredClients.length / clientsPerPage)))} disabled={currentPage === Math.ceil(filteredClients.length / clientsPerPage)}>
                    Próximo
                </button>
            </div>
        </div>
    );
}
