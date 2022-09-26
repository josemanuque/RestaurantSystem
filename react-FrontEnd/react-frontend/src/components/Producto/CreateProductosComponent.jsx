import React, { Component } from 'react';
import ProductosService from '../../services/ProductosService';
import { withRouter } from '../../services/withRouter';

class CreateProductosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProducto: '',
            descripcion: '',
            precio: ''
        }
        this.changeIdProductoHandler = this.changeIdProductoHandler.bind(this);
        this.changeDescripcionHandler = this.changeDescripcionHandler.bind(this);
        this.changePrecioHandler = this.changePrecioHandler.bind(this);
        this.saveProducto = this.saveProducto.bind(this);
    }

    saveProducto = (e) => {
        e.preventDefault();


        let producto = {idProducto: this.state.idProducto, descripcion: this.state.descripcion, precio: this.state.precio};
        console.log('producto => ' + JSON.stringify(producto));

        ProductosService.createProducto(producto).then(res => {
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
                                <h3 className='text-center'>Add Productos</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className = "form-group">
                                            <label> Descipción: </label>
                                            <input placeholder="Descipción" name="descripcion" className="form-control" 
                                                value={this.state.descripcion} onChange={this.changeDescripcionHandler}/>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                            <label>Precio: </label>
                                            <input placeholder='Precio' name='precio' className='form-control' 
                                                value={this.state.apellido1} onChange={this.changePrecioHandler}/>
                                        </div>
                                        <br></br>

                                        <button className='btn btn-success' onClick={this.saveProducto}>Save</button>
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

export default withRouter(CreateProductosComponent);