import { useState } from 'react';
import PropTypes from 'prop-types';


//Componente A
class Contacto {
  constructor(nombre, apellido, email, conectado) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.conectado = conectado;
  }
}

const ContactoPropType = PropTypes.shape({
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  conectado: PropTypes.bool.isRequired,
});

const ContactoFormulario = ({ agregarContacto }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Crear una instancia de Contacto
    const nuevoContacto = new Contacto(nombre, apellido, email, true);

    // Agregar el nuevo contacto a la lista
    agregarContacto(nuevoContacto);

    // Limpiar los campos del formulario
    setNombre('');
    setApellido('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Contacto</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

ContactoFormulario.propTypes = {
  agregarContacto: PropTypes.func.isRequired,
};


//Componente B
const ListaContactos = ({ contactos, cambiarEstadoConectado }) => {
  return (
    <div>
      <h2>Lista de Contactos</h2>
      <ul>
        {contactos.map((contacto, index) => (
          <li key={index}>
            {contacto.nombre} {contacto.apellido} - {contacto.email}
            <button onClick={() => cambiarEstadoConectado(index)}>
              Cambiar Estado
            </button>
            {contacto.conectado ? (
              <div
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'green',
                  marginLeft: '5px',
                }}
              ></div>
            ) : (
              <div
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'red',
                  marginLeft: '5px',
                }}
              ></div>
            )}
          </li>
        ))}
     
     </ul>
    </div>
  );
};

ListaContactos.propTypes = {
  contactos: PropTypes.arrayOf(ContactoPropType).isRequired,
  cambiarEstadoConectado: PropTypes.func.isRequired,
};

const App = () => {
  const [contactos, setContactos] = useState([]);

  const agregarContacto = nuevoContacto => {
    setContactos(prevContactos => [...prevContactos, nuevoContacto]);
  };

  const cambiarEstadoConectado = index => {
    setContactos(prevContactos => {
      const contactosActualizados = [...prevContactos];
      contactosActualizados[index] = {
        ...contactosActualizados[index],
        conectado: !contactosActualizados[index].conectado,
      };
      return contactosActualizados;
    });
  };

  return (
    <div>
      <ContactoFormulario agregarContacto={agregarContacto} />
      <ListaContactos
        contactos={contactos}
        cambiarEstadoConectado={cambiarEstadoConectado}
      />
    </div>
  );
};

export default App;