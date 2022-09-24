import React, { Component } from 'react';
import { withRouter } from '../../services/withRouter';
import ClientesService from '../../services/ClientesService';

class ListClientesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clientes: []
        }
        this.addClientes = this.addClientes.bind(this);
        this.editCliente = this.editCliente.bind(this);
        this.deleteCliente = this.deleteCliente.bind(this);
    }

    viewCliente(cedula) {
        console.log(cedula);
        this.props.navigate('/view-clientes/' + cedula, {id: cedula});
    }

    componentDidMount() {     
        ClientesService.getClientes().then((res) => {
            this.setState({ clientes: res.data }, () => {console.log(this.state)});
        });
    }

    editCliente(cedula) {
        console.log(cedula);
        this.props.navigate('/update-clientes/' + cedula, {id: cedula});
    }

    deleteCliente(cedula) {
        ClientesService.deleteCliente(cedula).then(res => {
            this.setState({clientes: this.state.clientes.filter(cliente => cliente.cedula !== cedula)});
        });
    }

    addClientes = () => {
        this.props.navigate('/add-clientes');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Clientes</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Cedula</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.clientes.map(
                                    clientes =>
                                        <tr key={clientes.cedula}>
                                            <td>{clientes.cedula}</td>
                                            <td>{clientes.telefono}</td>
                                            <td>{clientes.email}</td>
                                            <td>
                                                <button onClick = { () => this.editCliente(clientes.cedula)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => {
                                                    const confirmBox = window.confirm("Are you sure you want to delete this persona?")
                                                    if (confirmBox === true) {
                                                        this.deleteCliente(clientes.cedula)
                                                    }}} className="btn btn-danger">Delete</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.viewCliente(clientes.cedula)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button className='btn btn-primary btn-properties' onClick={this.addClientes}> Add Cliente</button>
                </div>
            </div>
        );
    }
}


export default withRouter(ListClientesComponent);