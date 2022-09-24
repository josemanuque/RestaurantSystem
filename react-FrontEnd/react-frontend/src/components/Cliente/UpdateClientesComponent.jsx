import React, { Component } from 'react';
import ClientesService from '../../services/ClientesService';
import PersonasService from '../../services/PersonasService';
import { withRouter } from '../../services/withRouter';

class UpdateClientesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cedula: this.props.params.id,
            persona: '',
            telefono: '',
            email: '',
            personas: []
        }
        this.changePersonaHandler = this.changePersonaHandler.bind(this);
        this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
        this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
    }

    componentDidMount(){
        ClientesService.getClienteById(this.state.cedula).then( (res) =>{
            let cliente = res.data;
            this.setState({cedula: cliente.cedula,
                persona: cliente.persona,
                telefono: cliente.telefono,
                email: cliente.email
            });
        });
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }

    updatePersonas = (e) => {
        e.preventDefault();
        let cliente = {cedula : this.state.cedula, persona: this.state.persona, telefono: this.state.telefono, email: this.state.email};
        console.log('cliente => ' + JSON.stringify(cliente));
        ClientesService.updateCliente(cliente, this.state.cedula).then(res => {
            this.props.navigate('/clientes');
        });
    }

    changePersonaHandler = (event) => {
        PersonasService.getPersonaById(event.target.value).then( (res) =>{
            let persona = res.data;
            this.setState({persona: persona}, () => {console.log(this.state)});
        });
    }

    changeTelefonoHandler = (event) => {
        this.setState({telefono: event.target.value}, () => {console.log(this.state)});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value}, () => {console.log(this.state)});
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
                                <h3 className='text-center'>Update Cliente</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className = "form-group">
                                            <label> Teléfono: </label>
                                            <input placeholder="Teléfono" name="telefono" className="form-control" 
                                                value={this.state.telefono} onChange={this.changeTelefonoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Correo: </label>
                                            <input placeholder="Correo" name="correo" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className='btn btn-success' onClick={this.updatePersonas}>Update</button>
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


export default withRouter(UpdateClientesComponent);