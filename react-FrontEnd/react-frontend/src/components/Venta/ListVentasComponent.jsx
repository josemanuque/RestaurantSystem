import React, { Component } from 'react';
import { withRouter } from '../../services/withRouter';
import VentasService from '../../services/VentasService';

class ListVentasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            ventas: []
        }
        this.addVentas = this.addVentas.bind(this);
        this.editVenta = this.editVenta.bind(this);
        this.deleteVenta = this.deleteVenta.bind(this);
    }

    viewVenta(idVenta) {
        console.log(idVenta);
        this.props.navigate('/view-ventas/' + idVenta, {id: idVenta});
    }

    componentDidMount() {     
        VentasService.getVentas().then((res) => {
            this.setState({ ventas: res.data });
        });
    }

    editVenta(idVenta) {
        console.log(idVenta);
        this.props.navigate('/update-ventas/' + idVenta, {id: idVenta});
    }

    deleteVenta(idVenta) {
        VentasService.deleteVenta(idVenta).then(res => {
            this.setState({ventas: this.state.ventas.filter(venta => venta.idVenta !== idVenta)});
        }).catch( function(error) {
            window.alert("Venta no puede ser eliminado porque tiene una cuenta asociada");
        });;
    }

    addVentas = () => {
        this.props.navigate('/add-ventas');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Ventas</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id Venta</th>
                                <th>Fecha</th>
                                <th>Vendedor</th>
                                <th>Cliente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.ventas.map(
                                    ventas =>
                                        <tr key={ventas.idVenta}>
                                            <td>{ventas.idVenta}</td>
                                            <td>{ventas.fecha}</td>
                                            <td>{ventas.vendedor}</td>
                                            <td>{ventas.cliente}</td>
                                            <td>
                                                <button onClick = { () => this.editVenta(ventas.idVenta)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => {
                                                    const confirmBox = window.confirm("Are you sure you want to delete this venta?")
                                                    if (confirmBox === true) {
                                                        this.deleteVenta(ventas.idVenta)
                                                    }}} className="btn btn-danger">Delete</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.viewVenta(ventas.idVenta)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button className='btn btn-primary btn-properties' onClick={this.addVentas}> Add Ventas</button>
                </div>
            </div>
        );
    }
}


export default withRouter(ListVentasComponent);