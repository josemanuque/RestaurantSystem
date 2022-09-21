import React, { Component } from 'react';
import { withRouter } from '../services/withRouter';
import PersonasService from '../services/PersonasService';

class ListPersonasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            personas: []
        }
        this.addPersonas = this.addPersonas.bind(this);
        this.editPersona = this.editPersona.bind(this);
        this.deletePersona = this.deletePersona.bind(this);
    }

    viewPersona(cedula) {
        console.log(cedula);
        this.props.navigate('/view-personas/' + cedula, {id: cedula});
    }

    componentDidMount() {     
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }

    editPersona(cedula) {
        console.log(cedula);
        this.props.navigate('/update-personas/' + cedula, {id: cedula});
    }

    deletePersona(cedula) {
        PersonasService.deletePersona(cedula).then(res => {
            this.setState({personas: this.state.personas.filter(persona => persona.cedula !== cedula)});
        });
    }

    addPersonas = () => {
        this.props.navigate('/add-personas');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Personas</h2>
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
                                            <td>
                                                <button onClick = { () => this.editPersona(personas.cedula)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.deletePersona(personas.cedula)} className="btn btn-danger">Delete</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.viewPersona(personas.cedula)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button className='btn btn-primary btn-properties' onClick={this.addPersonas}> Add Personas</button>
                </div>
            </div>
        );
    }
}


export default withRouter(ListPersonasComponent);