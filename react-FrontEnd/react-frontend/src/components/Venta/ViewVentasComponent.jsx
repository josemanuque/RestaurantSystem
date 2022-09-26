import React, { Component } from 'react';
import ProductosService from '../../services/ProductosService';
import VentasService from '../../services/VentasService';
import { withRouter } from '../../services/withRouter';

class ViewVentasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            idVenta: this.props.params.id,
            venta: [],
            productos: [],
            ventaProducto: [],
            joined: [{
                idProducto: '',
                descripcion: '',
                precio: '',
                cantidad: ''
            }]
        }

    }

    joinArrays(){
        var arreglo = [];
        for (var i = 0; i < this.state.ventaProducto.length; i++) {
            for (var j = 0; j < this.state.productos.length; j++) {
                if(this.state.ventaProducto[i].idProducto === this.state.productos[j].idProducto){
                    arreglo.push( 
                        {   idProducto: this.state.ventaProducto[i].idProducto,
                            descripcion: this.state.productos[j].descripcion,
                            precio: this.state.productos[j].precio,
                            cantidad: this.state.ventaProducto[i].cantidad
                        });
                }
            }
        }
        this.setState({joined: arreglo});
        console.log(JSON.stringify(this.state.joined));
    }

    componentDidMount(){
        VentasService.getVentaById(this.state.idVenta).then( (res) =>{
            this.setState({venta: [res.data]}, () => {console.log(JSON.stringify(this.state.venta))});
        });

        ProductosService.getProductos().then( (res) =>{
            this.setState({productos: res.data}, () => {console.log(JSON.stringify(this.state.productos))});
        });
        VentasService.getVentaProductoByIdVenta(this.state.idVenta).then( (res) =>{
            this.setState({ventaProducto: res.data}, () => {this.joinArrays()});
        });


    }

    goBack(){
        this.props.navigate('/ventas');
    }
        

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Venta</h2>
                    <div className='card-body'>
                    <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id Venta</th>
                                <th>Fecha</th>
                                <th>Vendedor</th>
                                <th>Cliente</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.venta.map(
                                    venta =>
                                        <tr key={venta.idVenta}>
                                            <td>{venta.idVenta}</td>
                                            <td>{venta.fecha}</td>
                                            <td>{venta.vendedor}</td>
                                            <td>{venta.cliente}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                    <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.joined.map(
                                    productos =>
                                        <tr key={productos.idProducto}>
                                            <td>{productos.idProducto}</td>
                                            <td>{productos.descripcion}</td>
                                            <td>{productos.precio}</td>
                                            <td>{productos.cantidad}</td>
                                            <td>{productos.cantidad * productos.precio}</td>
                                        </tr>
                                )
                            }
                    </tbody>
                </table>
                </div>
                </div>
                </div>
                <br></br>

                <div className='row'><button className='btn btn-danger btn-properties' onClick={this.goBack.bind(this)}>Back</button></div>
            </div>
            
        );
    }
}


export default withRouter(ViewVentasComponent);