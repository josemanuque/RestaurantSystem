import React, { Component } from 'react';
import ProductosService from '../../services/ProductosService';
import { withRouter } from '../../services/withRouter';

class ViewProductosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProducto: this.props.params.id,
            producto: {}
        }

    }

    componentDidMount(){
        ProductosService.getProductoById(this.state.idProducto).then( (res) =>{
            this.setState({producto: res.data});
        });
    }

    goBack(){
        this.props.navigate('/productos');
    }
        

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Producto</h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label>id Producto: </label>
                            <div> {this.state.producto.idProducto} </div>
                        </div>
                        <div className='row'>
                            <label>Descripción: </label>
                            <div> {this.state.producto.descripcion} </div>
                        </div>
                        <div className='row'>
                            <label>Precio: </label>
                            <div> {this.state.producto.precio} </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className='row'><button className='btn btn-danger btn-properties' onClick={this.goBack.bind(this)}>Cancel</button></div>
            </div>
            
        );
    }
}


export default withRouter(ViewProductosComponent);