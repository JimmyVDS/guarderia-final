class MostrarRegistroNiño extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {

        const registros = JSON.parse(localStorage.getItem('registros')) || [];

  
        const container = document.createElement('div');
        container.classList.add('registro-container');

        registros.forEach((data, index) => {
            const registroItem = document.createElement('div');
            registroItem.classList.add('registro-item');
            registroItem.innerHTML = `
                <img src="${data.imagen}" alt="Foto del Niño" class="registro-imagen">
                <div>
                    <p><strong>Nombre del Niño:</strong> ${data['nombre-nino']}</p>
                    <p><strong>Nombre del Padre/Madre:</strong> ${data['nombre-padre']}</p>
                    <p><strong>Correo Electrónico:</strong> ${data.email}</p>
                    <p><strong>Teléfono de Contacto:</strong> ${data.telefono}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${data.fn}</p>
                    <p><strong>Notas:</strong> ${data.notas}</p>
                </div>
                <button class="eliminar-btn">Eliminar</button>
            `;

            // Agregar el evento de eliminar al botón
            const eliminarBtn = registroItem.querySelector('.eliminar-btn');
            eliminarBtn.addEventListener('click', () => {
                this.eliminarRegistro(index);
                container.removeChild(registroItem);
            });

            container.appendChild(registroItem);
        });


        const shadow = this.attachShadow({ mode: 'open' });
        const estilo = document.createElement('style');
        estilo.textContent = `
            .registro-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .registro-item {
                display: flex;
                align-items: center;
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
                gap: 20px;
            }
            .registro-imagen {
                max-width: 100px;
                max-height: 100px;
                border-radius: 5px;
            }
            .eliminar-btn {
                background-color: #e2889b;
                padding: 10px 20px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }
            .eliminar-btn:hover {
                background-color: #c6a7ac;
            }
        `;
        shadow.appendChild(estilo);
        shadow.appendChild(container);
    }

    eliminarRegistro(index) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));
        
    }
}

customElements.define('mostrar-registro-nino', MostrarRegistroNiño);
