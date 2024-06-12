class RegistroGuarderia extends HTMLElement {
    constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

        // Creamos el encabezado afuera del contenedor
        const encabezadoExterno = document.createElement('h2');
        encabezadoExterno.textContent = '¡Bienvenido a la Guardería Happy World !';
        encabezadoExterno.style.textAlign = 'center'; 
        encabezadoExterno.style.fontSize = '3em';
        // Agregamos el encabezado externo al shadow DOM
        shadow.appendChild(encabezadoExterno);
    

    const container = document.createElement('div');
    container.classList.add('container');

    const registro = document.createElement('h1');
    registro.textContent = 'Registro en la Guardería';



    const formulario = document.createElement('form');
    formulario.id = 'registro-formulario';

    formulario.innerHTML = `
    <label for="imagen">Foto del Niño:</label>
    <input type="file" id="imagen" name="imagen" accept="image/*" required>

        <label for="nombre-nino">Nombre del Niño:</label>
        <input type="text" id="nombre-nino" name="nombre-nino" required>


        <label for="nombre-padre">Nombre del Padre/Madre:</label>
        <input type="text" id="nombre-padre" name="nombre-padre" required>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>

        <label for="telefono">Teléfono de Contacto:</label>
        <input type="tel" id="telefono" name="telefono" required>

        <label for="fn">Fecha de Nacimiento:</label>
        <input type="date" id="fn" name="fn" required>

        <label for="notas">Notas:</label>
        <textarea id="notas" name="notas"></textarea>

        <button type="submit">Registrar</button>
    `;


// Elemento para mostrar registros
        const registrosContainer = document.createElement('div');
        registrosContainer.id = 'registros-container';

        // Cargar registros almacenados al cargar el componente
        this.cargarRegistros(registrosContainer);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData.entries());

        const file = formulario.querySelector('#imagen').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    data.imagen = reader.result; //guarda la imagen leida en URL base 64 y la almacena al objeto DATA
                    this.guardarRegistro(data); //funcion de agrgacion al local stogers
                    this.mostrarRegistro(data, registrosContainer);
                    formulario.reset(); //vulve a cargar
                    mostrarAviso('Registro exitoso. ¡Gracias!'); //aviso de registro
                };
                reader.readAsDataURL(file); //leida de la imagen con la api
            }
        });
        const salirBtn = document.createElement('button');
        salirBtn.textContent = 'Salir';
        salirBtn.addEventListener('click', () => {
            window.location.href = 'app.html'; // Cambia 'index.html' por la ruta de tu página principal
        });
        formulario.appendChild(salirBtn); // Agregamos el botón al final del formulario

    function mostrarAviso(mensaje) {
        // Crea un elemento para mostrar el aviso
        const aviso = document.createElement('div');
        aviso.textContent = mensaje;
        aviso.classList.add('aviso');
    
            shadow.appendChild(aviso);


    setTimeout(() => {
        aviso.remove();
    }, 3000); // Desaparece
}

    const estilo = document.createElement('style');
    estilo.textContent = `
        .container {
            width: 40%;
            margin: auto;
            border: 2px solid #000;
            padding: 40px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
        }
    
        label {
            display: block;
            margin-bottom: 10px;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="date"],
        textarea {
            width: calc(95% - 10px);
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #0a0a0a;
            border-radius: 2px;
    }
    
        button[type="submit"] {
            background-color: #8C5E80;
            padding: 10px 20px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
    }
    
        button[type="submit"]:hover {
            background-color: #c6a7ac;
        }
	#registros-container {
                margin-top: 20px;
            }

            .registro-item {
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
            }
            .registro-item img {
                max-width: 100px;
                max-height: 100px;
                border-radius: 5px;
            }
        
    `;

    shadow.appendChild(estilo);
    container.appendChild(registro);
    container.appendChild(formulario);
 	container.appendChild(registrosContainer);
    shadow.appendChild(container);
    }
guardarRegistro(data) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(data);
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    cargarRegistros(container) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.forEach(data => this.mostrarRegistro(data, container));
    }

    mostrarRegistro(data, container) {
        const registroItem = document.createElement('div');
        registroItem.classList.add('registro-item');
        registroItem.innerHTML = `
        <img src="${data.imagen}" alt="Foto del Niño">
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

        const eliminarBtn = registroItem.querySelector('.eliminar-btn');
        eliminarBtn.addEventListener('click', () => {
            this.eliminarRegistro(data);
            registroItem.remove();
        });

        container.appendChild(registroItem);
    }

    eliminarRegistro(data) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        const nuevosRegistros = registros.filter(registro => {

            return Object.keys(data).every(key => data[key] !== registro[key]);
        });
        localStorage.setItem('registros', JSON.stringify(nuevosRegistros));
    }
    }


customElements.define('registro-guarderia', RegistroGuarderia);
