import React, { Component } from 'react';
import PersonasService from '../services/PersonasService';
import { withRouter } from '../services/withRouter';

class ViewPersonasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cedula: this.props.params.id,
            persona: {}
        }

    }

    componentDidMount(){
        PersonasService.getPersonaById(this.state.cedula).then( (res) =>{
            this.setState({persona: res.data});
        });
    }

    goBack(){
        this.props.navigate('/personas');
    }
        

    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Personas</h2>
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
                    </div>
                </div>
                <div className='row'><button className='btn btn-danger btn-properties' onClick={this.goBack.bind(this)}>Cancel</button></div>
            </div>
            
        );
    }
}


export default withRouter(ViewPersonasComponent);