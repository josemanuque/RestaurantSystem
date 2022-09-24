import React, { Component } from 'react';
import PersonasService from '../../services/PersonasService';
import VendedoresService from '../../services/VendedoresService';
import { withRouter } from '../../services/withRouter';

class CreateVendedoresComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: '',
            cedula: '',
            clave: '',
            personas: []
        }
        this.changeCedulaHandler = this.changeCedulaHandler.bind(this);
        this.changeUsuarioHandler = this.changeUsuarioHandler.bind(this);
        this.changeClaveHandler = this.changeClaveHandler.bind(this);
        this.saveVendedores = this.saveVendedores.bind(this);
    }

    componentDidMount(){
        PersonasService.getPersonas().then((res) => {
            this.setState({ personas: res.data });
        });
    }

    saveVendedores = (e) => {
        e.preventDefault();

        let vendedor = {usuario: this.state.usuario, cedula: this.state.cedula, clave: this.state.clave};
        console.log('vendedor => ' + JSON.stringify(vendedor));

        VendedoresService.createVendedor(vendedor).then(res => {
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
        this.setState({usuario: event.target.value});
    }

    changeClaveHandler = (event) => {
        this.setState({clave: event.target.value});
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
                                <h3 className='text-center'>Add Vendedores</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label>Cedula: </label>
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
                                        <div className = "form-group">
                                            <label> Usuario: </label>
                                            <input placeholder="Usuario" name="usuario" className="form-control" 
                                                value={this.state.usuario} onChange={this.changeUsuarioHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Password: </label>
                                            <input placeholder='Password' name='clave' className='form-control' 
                                                value={this.state.clave} onChange={this.changeClaveHandler}/>
                                        </div>

                                        <button className='btn btn-success' onClick={this.saveVendedores}>Save</button>
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

export default withRouter(CreateVendedoresComponent);