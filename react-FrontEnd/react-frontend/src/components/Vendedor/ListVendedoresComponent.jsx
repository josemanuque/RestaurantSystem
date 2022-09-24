import React, { Component } from 'react';
import { withRouter } from '../../services/withRouter';
import VendedoresService from '../../services/VendedoresService';

class ListVendedoresComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vendedores: []
        }
        this.addVendedores = this.addVendedores.bind(this);
        this.editVendedor = this.editVendedor.bind(this);
        this.deleteVendedor = this.deleteVendedor.bind(this);
    }

    viewVendedor(usuario) {
        console.log(usuario);
        this.props.navigate('/view-vendedores/' + usuario, {id: usuario});
    }

    componentDidMount() {     
        VendedoresService.getVendedores().then((res) => {
            this.setState({ vendedores: res.data });
        });
    }

    editVendedor(usuario) {
        console.log(usuario);
        this.props.navigate('/update-vendedores/' + usuario, {id: usuario});
    }

    deleteVendedor(usuario) {
        VendedoresService.deleteVendedor(usuario).then(res => {
            this.setState({vendedores: this.state.vendedores.filter(vendedor => vendedor.usuario !== usuario)});
        });
    }

    addVendedores = () => {
        this.props.navigate('/add-vendedores');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Vendedores</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Cedula</th>
                                <th>Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.vendedores.map(
                                    vendedores =>
                                        <tr key={vendedores.usuario}>
                                            <td>{vendedores.cedula.cedula}</td>
                                            <td>{vendedores.usuario}</td>
                                            <td>
                                                <button onClick = { () => this.editVendedor(vendedores.usuario)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => {
                                                    const confirmBox = window.confirm("Are you sure you want to delete this persona?")
                                                    if (confirmBox === true) {
                                                        this.deleteVendedor(vendedores.usuario)
                                                    }}} className="btn btn-danger">Delete</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.viewVendedor(vendedores.usuario)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button className='btn btn-primary btn-properties' onClick={this.addVendedores}> Add Vendedor</button>
                </div>
            </div>
        );
    }
}


export default withRouter(ListVendedoresComponent);