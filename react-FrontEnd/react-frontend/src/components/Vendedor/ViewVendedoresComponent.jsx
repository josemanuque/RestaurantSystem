import React, { Component } from 'react';
import PersonasService from '../../services/PersonasService';
import VendedoresService from '../../services/VendedoresService';
import { withRouter } from '../../services/withRouter';

class ViewVendedoresComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: this.props.params.id,
            cedula: '',
            clave: '',
            persona: {}
        }
        this.getPersona = this.getPersona.bind(this);
    }

    getPersona() {
        PersonasService.getPersonaById(this.state.cedula.cedula).then( (res) =>{
            this.setState({persona: res.data}, () => {console.log(JSON.stringify(this.state))});
        });
    }

    componentDidMount(){
        console.log(this.state.usuario);
        VendedoresService.getVendedorById(this.state.usuario).then( (res) =>{
            let vendedor = res.data;
            this.setState({usuario: vendedor.usuario,
                cedula: vendedor.cedula,
                clave: vendedor.clave
            }, () => {this.getPersona()});
            
        });


    }

    goBack(){
        this.props.navigate('/vendedores');
    }
        

    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Vendedores</h2>
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
                            <div> {this.state.usuario} </div>
                        </div>
                        <div className='row'>
                            <label>Contraseña: </label>
                            <div> {this.state.clave} </div>
                        </div>
                    </div>
                </div>
                <div className='row'><button className='btn btn-danger btn-properties' onClick={this.goBack.bind(this)}>Cancel</button></div>
            </div>
            
        );
    }
}


export default withRouter(ViewVendedoresComponent);