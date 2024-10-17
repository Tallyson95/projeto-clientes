import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { DeleteModal } from './DeleteModal';
import '../styles/clientes.css';

export function ClientInfo({ client, onClientDeleted, onClientUpdated }) {
    const [isEditDelOpen, setIsEditDelOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editClientData, setEditClientData] = useState(client);
    const [emailError, setEmailError] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditDelOpen && modalRef.current && !modalRef.current.contains(event.target)) {
                setIsEditDelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditDelOpen]);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEditSubmit = async () => {
        if (!validateEmail(editClientData.email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            return;
        } else {
            setEmailError('');
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_URL}/clients/${client.id}`, {
                ...editClientData,
                name: client.name,
                id: client.id
            });
            onClientUpdated(response.data);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Erro ao editar cliente:', error);
        }
    };

    return (
        <div className="client-card">
            <header style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <div
                    style={{ backgroundColor: "#6c63ff", cursor: 'pointer' }}
                    className='btn-edit-del'
                    onClick={() => setIsEditDelOpen(!isEditDelOpen)}
                    aria-haspopup="true"
                    aria-expanded={isEditDelOpen}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.90918 6.99997C5.90918 6.39747 6.3976 5.90906 7.00009 5.90906C7.60258 5.90906 8.091 6.39747 8.091 6.99997C8.091 7.60246 7.60258 8.09088 7.00009 8.09088C6.3976 8.09088 5.90918 7.60246 5.90918 6.99997Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.90918 3.18179C5.90918 2.5793 6.3976 2.09088 7.00009 2.09088C7.60258 2.09088 8.091 2.5793 8.091 3.18179C8.091 3.78428 7.60258 4.2727 7.00009 4.2727C6.3976 4.2727 5.90918 3.78428 5.90918 3.18179Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.90918 10.8181C5.90918 10.2157 6.3976 9.72723 7.00009 9.72723C7.60258 9.72723 8.091 10.2157 8.091 10.8181C8.091 11.4206 7.60258 11.9091 7.00009 11.9091C6.3976 11.9091 5.90918 11.4206 5.90918 10.8181Z" fill="#FFFFFF" />
                    </svg>
                    {isEditDelOpen && (
                        <div className="modalEditDel" ref={modalRef}>
                            <ul className='ul-modal' style={{ listStyle: 'none' }}>
                                <li className='txt-list' onClick={() => setIsEditModalOpen(true)}>Editar</li>
                                <li className='txt-list' onClick={() => setIsDeleteModalOpen(true)}>Deletar</li>
                            </ul>
                        </div>
                    )}
                </div>

            </header>

            <h2 className='title-name'>{client.name}</h2>
            <p className='itens-txt'>Email: {client.email}</p>
            <p className='itens-txt'>Telefone: {client.phone}</p>
            <p className='itens-txt'>Endereço: {client.address.street}, {client.address.city} - {client.address.state}, {client.address.zipCode}</p>

            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Cliente</h2>
                        <div className="modal-input-group">
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={editClientData.email}
                                    onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                                />
                            </label>
                            {emailError && <p className="error-message">{emailError}</p>}
                        </div>

                        <div className="modal-input-group">
                            <label>
                                Telefone:
                                <input
                                    type="tel"
                                    value={editClientData.phone}
                                    onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })}
                                />
                            </label>
                        </div>

                        <div className="modal-input-group">
                            <label>
                                Endereço:
                                <input
                                    type="text"
                                    value={editClientData.address.street}
                                    onChange={(e) => setEditClientData({
                                        ...editClientData,
                                        address: { ...editClientData.address, street: e.target.value }
                                    })}
                                />
                            </label>
                        </div>

                        <div className="modal-input-group">
                            <label>
                                Cidade:
                                <input
                                    type="text"
                                    value={editClientData.address.city}
                                    onChange={(e) => setEditClientData({
                                        ...editClientData,
                                        address: { ...editClientData.address, city: e.target.value }
                                    })}
                                />
                            </label>
                        </div>

                        <div className="modal-input-group">
                            <label>
                                Estado:
                                <input
                                    type="text"
                                    value={editClientData.address.state}
                                    onChange={(e) => setEditClientData({
                                        ...editClientData,
                                        address: { ...editClientData.address, state: e.target.value }
                                    })}
                                />
                            </label>
                        </div>

                        <div className="modal-input-group">
                            <label>
                                CEP:
                                <input
                                    type="text"
                                    value={editClientData.address.zipCode}
                                    onChange={(e) => setEditClientData({
                                        ...editClientData,
                                        address: { ...editClientData.address, zipCode: e.target.value }
                                    })}
                                />
                            </label>
                        </div>

                        <div className="modal-button-group">
                            <button onClick={handleEditSubmit}>Salvar</button>
                            <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                clientId={client.id}
                onClientDeleted={onClientDeleted}
            />
        </div>
    );
}
