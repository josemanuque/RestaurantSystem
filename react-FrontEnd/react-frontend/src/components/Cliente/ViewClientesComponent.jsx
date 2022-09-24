import React, { Component } from 'react';
import ClientesService from '../../services/ClientesService';
import PersonasService from '../../services/PersonasService';
import { withRouter } from '../../services/withRouter';

class ViewClientesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cedula: this.props.params.id,
            persona: '',
            telefono: '',
            email: '',
            persona: {}
        }
        this.getPersona = this.getPersona.bind(this);
    }

    getPersona() {
        PersonasService.getPersonaById(this.state.cedula).then( (res) =>{
            this.setState({persona: res.data}, () => {console.log(JSON.stringify(this.state))});
        });
    }

    componentDidMount(){
        console.log(this.state.cedula);
        ClientesService.getClienteById(this.state.cedula).then( (res) =>{
            let cliente = res.data;
            this.setState({cedula: cliente.cedula,
                persona: cliente.persona,
                telefono: cliente.telefono,
                email: cliente.email
            }, () => {this.getPersona()});
            
        });


    }

    goBack(){
        this.props.navigate('/clientes');
    }
        

    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Clientes</h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label>Cedula: </label>
                            <div> {this.state.persona.cedula} </div>
                        </div>
                        <div className='row'>
                            <label>Nombre: </label>
                            <div> {this.state.persona.nombre} </div>
                        </div>
                        <div className='row'>
                            <label>Primer Apellido: </label>
                            <div> {this.state.persona.apellido1} </div>
                        </div>
                        <div className='row'>
                            <label>Segundo Apellido: </label>
                            <div> {this.state.persona.apellido2} </div>
                        </div>
                        <div className='row'>
                            <label>Usuario: </label>
                            <div> {this.state.telefono} </div>
                        </div>
                        <div className='row'>
                            <label>Contraseña: </label>
                            <div> {this.state.email} </div>
                        </div>
                    </div>
                </div>
                <div className='row'><button className='btn btn-danger btn-properties' onClick={this.goBack.bind(this)}>Cancel</button></div>
            </div>
            
        );
    }
}


export default withRouter(ViewClientesComponent);