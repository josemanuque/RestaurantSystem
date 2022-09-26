import React, { Component } from 'react';
import { withRouter } from '../../services/withRouter';
import ProductosService from '../../services/ProductosService';

class ListProductosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productos: []
        }
        this.addProductos = this.addProductos.bind(this);
        this.editProducto = this.editProducto.bind(this);
        this.deleteProducto = this.deleteProducto.bind(this);
    }

    viewProducto(idProducto) {
        console.log(idProducto);
        this.props.navigate('/view-productos/' + idProducto, {id: idProducto});
    }

    componentDidMount() {     
        ProductosService.getProductos().then((res) => {
            this.setState({ productos: res.data });
        });
    }

    editProducto(idProducto) {
        console.log(idProducto);
        this.props.navigate('/update-productos/' + idProducto, {id: idProducto});
    }

    deleteProducto(idProducto) {
        ProductosService.deleteProducto(idProducto).then(res => {
            this.setState({productos: this.state.productos.filter(producto => producto.idProducto !== idProducto)});
        }).catch( function(error) {
            window.alert("Producto no puede ser eliminado porque tiene una cuenta asociada");
        });;
    }

    addProductos = () => {
        this.props.navigate('/add-productos');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Productos</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.productos.map(
                                    productos =>
                                        <tr key={productos.idProducto}>
                                            <td>{productos.idProducto}</td>
                                            <td>{productos.descripcion}</td>
                                            <td>{productos.precio}</td>
                                            <td>
                                                <button onClick = { () => this.editProducto(productos.idProducto)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => {
                                                    const confirmBox = window.confirm("Are you sure you want to delete this persona?")
                                                    if (confirmBox === true) {
                                                        this.deleteProducto(productos.idProducto)
                                                    }}} className="btn btn-danger">Delete</button>
                                                <button style={{marginLeft: "10px"}} onClick = { () => this.viewProducto(productos.idProducto)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <button className='btn btn-primary btn-properties' onClick={this.addProductos}> Add Productos</button>
                </div>
            </div>
        );
    }
}


export default withRouter(ListProductosComponent);