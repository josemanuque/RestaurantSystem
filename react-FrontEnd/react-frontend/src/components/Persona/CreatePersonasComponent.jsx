import React, { Component } from 'react';
import PersonasService from '../../services/PersonasService';
import { withRouter } from '../../services/withRouter';

class CreatePersonasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cedula: '',
            nombre: '',
            apellido1: '',
            apellido2: ''
        }
        this.changeCedulaHandler = this.changeCedulaHandler.bind(this);
        this.changeNombreHandler = this.changeNombreHandler.bind(this);
        this.changeApellido1Handler = this.changeApellido1Handler.bind(this);
        this.changeApellido2Handler = this.changeApellido2Handler.bind(this);
        this.savePersonas = this.savePersonas.bind(this);
    }

    savePersonas = (e) => {
        e.preventDefault();
        if (this.state.cedula.length != 9) {
            alert("La cedula debe tener 9 digitos");
            return;
        }

        let persona = {cedula: this.state.cedula, nombre: this.state.nombre, apellido1: this.state.apellido1, apellido2: this.state.apellido2};
        console.log('persona => ' + JSON.stringify(persona));

        PersonasService.createPersona(persona).then(res => {
            this.props.navigate('/personas');
        });
    }

    changeCedulaHandler = (event) => {
        this.setState({cedula: event.target.value});
        console.log(this.props.params.id);
    }

    changeNombreHandler = (event) => {
        this.setState({nombre: event.target.value});
    }

    changeApellido1Handler = (event) => {
        this.setState({apellido1: event.target.value});
    }

    changeApellido2Handler = (event) => {
        this.setState({apellido2: event.target.value});
    }

    cancel(){
        this.props.navigate('/personas');
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Add Personas</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label>Cedula: </label>
                                            <input placeholder='Cedula' name='cedula' className='form-control' 
                                                value={this.state.cedula} onChange={this.changeCedulaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Nombre: </label>
                                            <input placeholder="Nombre" name="nombre" className="form-control" 
                                                value={this.state.nombre} onChange={this.changeNombreHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Primer Apellido: </label>
                                            <input placeholder='Apellido' name='apellido1' className='form-control' 
                                                value={this.state.apellido1} onChange={this.changeApellido1Handler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Segundo Apellido: </label>
                                            <input placeholder='Apellido' name='apellido2' className='form-control' 
                                                value={this.state.apellido2} onChange={this.changeApellido2Handler}/>
                                        </div>

                                        <button className='btn btn-success' onClick={this.savePersonas}>Save</button>
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

export default withRouter(CreatePersonasComponent);