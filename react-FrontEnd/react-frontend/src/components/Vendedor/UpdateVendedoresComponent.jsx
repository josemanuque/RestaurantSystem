import React, { Component } from 'react';
import PersonasService from '../../services/PersonasService';
import VendedoresService from '../../services/VendedoresService';
import { withRouter } from '../../services/withRouter';

class UpdateVendedoresComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: this.props.params.id,
            cedula: '',
            clave: '',
            personas: []
        }
        this.changeCedulaHandler = this.changeCedulaHandler.bind(this);
        this.changeUsuarioHandler = this.changeUsuarioHandler.bind(this);
        this.updatePersonas = this.updatePersonas.bind(this);
    }

    componentDidMount(){
        VendedoresService.getVendedorById(this.state.usuario).then( (res) =>{
            let vendedor = res.data;
            this.setState({usuario: vendedor.usuario,
                cedula: vendedor.cedula,
                clave: vendedor.clave
            });
        });
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }

    updatePersonas = (e) => {
        e.preventDefault();
        let vendedor = {usuario : this.state.usuario, cedula: this.state.cedula, clave: this.state.clave};
        console.log('vendedor => ' + JSON.stringify(vendedor));
        VendedoresService.updateVendedor(vendedor, this.state.usuario).then(res => {
            this.props.navigate('/vendedores');
        });
    }

    changeCedulaHandler = (event) => {
        PersonasService.getPersonaById(event.target.value).then( (res) =>{
            let persona = res.data;
            this.setState({cedula: persona}, () => {console.log(this.state)});
        });
    }

    changeUsuarioHandler = (event) => {
        this.setState({usuario: event.target.value}, () => {console.log(this.state)});
    }

    cancel(){
        this.props.navigate('/vendedores');
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Update Vendedor</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className = "form-group">
                                            <label> Usuario: </label>
                                            <input placeholder="Nombre" name="nombre" className="form-control" 
                                                value={this.state.usuario} onChange={this.changeUsuarioHandler}/>
                                        </div>
                                        <div className = "form-group">
                                        <label> Cedula: </label>
                                            <select className="form-control" onChange = {this.changeCedulaHandler}>
                                                
                                                <option>--Eliga una Cédula--</option>
                                                {
                                                        this.state.personas.map(
                                                            persona =>
                                                            <option key={persona.cedula} value={persona.cedula}>{persona.cedula}</option>
                                                        )

                                                    }
                                            </select>
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


export default withRouter(UpdateVendedoresComponent);