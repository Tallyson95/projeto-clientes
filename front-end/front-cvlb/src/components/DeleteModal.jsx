import React from 'react';
import axios from 'axios';
import '../styles/modalDelete.css';

export function DeleteModal({ isOpen, onClose, clientId, onClientDeleted }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_URL}/clients/${clientId}`);
            onClientDeleted(clientId);
            onClose();
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Confirmar Exclusão</h2>
                <p>Você tem certeza que deseja excluir este cliente?</p>
                <div className="modal-buttons">
                    <button onClick={handleDelete}>Sim</button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
}
