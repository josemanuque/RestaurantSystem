import React, { Component } from 'react';
import PersonasService from '../services/PersonasService';

class ListPersonasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            personas: []
        }
    }

    componentDidMount() {     
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Personas List</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Cedula</th>
                                <th>Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.personas.map(
                                    personas =>
                                        <tr key={personas.cedula}>
                                            <td>{personas.cedula}</td>
                                            <td>{personas.nombre}</td>
                                            <td>{personas.apellido1}</td>
                                            <td>{personas.apellido2}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}


export default ListPersonasComponent