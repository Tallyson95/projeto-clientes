import React from 'react';

export function About() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: '100vw',
            }}
        >
            <div
                className='modal-content'
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "#673AB7",
                    padding: "20px",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    maxWidth: "600px",
                    width: "100%",
                }}
            >
                <p>
                    Nossa aplicação de gestão de clientes foi projetada para auxiliar empresas na organização e otimização do relacionamento com seus clientes. Com uma interface clara e responsiva, a plataforma proporciona uma experiência de uso fluida e acessível em qualquer dispositivo.
                </p>
                <br />
                <p>
                    Através de funcionalidades como cadastro, edição e busca de clientes, a aplicação garante eficiência na gestão de informações. Além disso, sua arquitetura robusta, construída com tecnologias modernas, assegura um desempenho confiável e uma navegação intuitiva.
                </p>
                <br />
                <p>
                    Estamos comprometidos em oferecer uma solução que atenda às necessidades específicas de cada empresa, facilitando a comunicação e promovendo a satisfação do cliente.
                </p>
            </div>
        </div>
    );
}
