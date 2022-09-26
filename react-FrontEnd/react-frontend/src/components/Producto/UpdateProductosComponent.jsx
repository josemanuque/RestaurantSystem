import React, { Component } from 'react';
import ProductosService from '../../services/ProductosService';
import { withRouter } from '../../services/withRouter';

class UpdateProductosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProducto: this.props.params.id,
            descripcion: '',
            precio: ''
        }
        this.changeIdProductoHandler = this.changeIdProductoHandler.bind(this);
        this.changeDescripcionHandler = this.changeDescripcionHandler.bind(this);
        this.changePrecioHandler = this.changePrecioHandler.bind(this);
        this.updateProductos = this.updateProductos.bind(this);
    }

    componentDidMount(){
        ProductosService.getProductoById(this.state.idProducto).then( (res) =>{
            let producto = res.data;
            this.setState({idProducto: producto.idProducto,
                descripcion: producto.descripcion,
                precio: producto.precio
            });
        });
    }

    updateProductos = (e) => {
        e.preventDefault();
        let producto = {idProducto: this.state.idProducto, descripcion: this.state.descripcion, precio: this.state.precio};
        console.log('producto => ' + JSON.stringify(producto));
        ProductosService.updateProducto(producto, this.state.idProducto).then(res => {
            this.props.navigate('/productos');
        });
    }

    changeIdProductoHandler = (event) => {
        this.setState({idProducto: event.target.value});
        console.log(this.props.params.id);
    }

    changeDescripcionHandler = (event) => {
        this.setState({descripcion: event.target.value});
    }

    changePrecioHandler = (event) => {
        this.setState({precio: event.target.value});
    }

    cancel(){
        this.props.navigate('/productos');
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <br></br>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Update Producto</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className = "form-group">
                                            <label> Descripción: </label>
                                            <input placeholder="Descripción" name="descripcion" className="form-control" 
                                                value={this.state.descripcion} onChange={this.changeDescripcionHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Precio: </label>
                                            <input placeholder='Precio' name='precio' className='form-control' 
                                                value={this.state.precio} onChange={this.changePrecioHandler}/>
                                        </div>

                                        <button className='btn btn-success' onClick={this.updateProductos}>Update</button>
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


export default withRouter(UpdateProductosComponent);