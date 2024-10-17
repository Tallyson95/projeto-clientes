import React from 'react';

export function Home() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width:'100vw'
            }}
        >
            <div
                className='modal-content'
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "#673AB7",
                    padding: "20px",
                    borderRadius: "8px",
                    color: "#FFFFFF"
                }}
            >
                <p>
                    Nossa aplicação de gestão de clientes foi desenvolvida para ajudar empresas a otimizar seu relacionamento com os clientes. Com uma interface intuitiva e responsiva, a plataforma oferece ferramentas eficazes para gerenciar informações e facilitar a comunicação, promovendo eficiência e organização nos processos de atendimento.
                </p>
            </div>
        </div>
    );
}
