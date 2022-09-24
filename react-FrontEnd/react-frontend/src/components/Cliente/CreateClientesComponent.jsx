import React, { Component } from 'react';
import ClientesService from '../../services/ClientesService';
import PersonasService from '../../services/PersonasService';
import { withRouter } from '../../services/withRouter';

class CreateClientesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cedula: '',
            persona: '',
            telefono: '',
            email: '',
            personas: []
        }
        this.changePersonaHandler = this.changePersonaHandler.bind(this);
        this.changeCedulaHandler = this.changeCedulaHandler.bind(this);
        this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveClientes = this.saveClientes.bind(this);
    }

    componentDidMount(){
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }

    saveClientes = (e) => {
        e.preventDefault();

        let cliente = {cedula: this.state.cedula, persona: this.state.persona, telefono: this.state.telefono, email: this.state.email};
        console.log('cliente => ' + JSON.stringify(cliente));

        ClientesService.createCliente(cliente).then(res => {
            this.props.navigate('/clientes');
        });
    }

    changePersonaHandler = (event) => {
        PersonasService.getPersonaById(event.target.value).then( (res) =>{
            let persona = res.data;
            this.setState({persona: persona}, () => {console.log(this.state)});
        });
        this.setState({cedula: event.target.value});
    }

    changeCedulaHandler = (event) => {
        this.setState({cedula: event.target.value});
    }

    changeTelefonoHandler = (event) => {
        this.setState({telefono: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    cancel(){
        this.props.navigate('/clientes');
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Add Clientes</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label>Cedula: </label>
                                            <select className="form-control" onChange = {this.changePersonaHandler}>
                                                
                                                <option>--Eliga una Cédula--</option>
                                                {
                                                        this.state.personas.map(
                                                            persona =>
                                                            <option key={persona.cedula} value={persona.cedula}>{persona.cedula}</option>
                                                        )

                                                    }
                                            </select>
                                        </div>
                                        <div className = "form-group">
                                            <label> Teléfono: </label>
                                            <input placeholder="Teléfono" name="telefono" className="form-control" 
                                                value={this.state.telefono} onChange={this.changeTelefonoHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Correo: </label>
                                            <input placeholder='Correo' name='correo' className='form-control' 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className='btn btn-success' onClick={this.saveClientes}>Save</button>
                                        <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(CreateClientesComponent);