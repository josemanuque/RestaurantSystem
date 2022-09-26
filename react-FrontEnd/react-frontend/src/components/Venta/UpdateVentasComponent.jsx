import React, { Component } from 'react';
import ClientesService from '../../services/ClientesService';
import ProductosService from '../../services/ProductosService';
import VendedoresService from '../../services/VendedoresService';
import VentasService from '../../services/VentasService';
import { withRouter } from '../../services/withRouter';

class UpdateVentasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idVenta: this.props.params.id,
            fecha: '',
            vendedor: '',
            cliente: '',
            vendedores: [],
            clientes: [],
            ventaProducto: [],
            productos: []
        }
        this.changeIdVentaHandler = this.changeIdVentaHandler.bind(this);
        this.changeFechaHandler = this.changeFechaHandler.bind(this);
        this.changeVendedorHandler = this.changeVendedorHandler.bind(this);
        this.changeClienteHandler = this.changeClienteHandler.bind(this);
        this.changeVentaProductoHandler = this.changeVentaProductoHandler.bind(this);
        this.updateVentas = this.updateVentas.bind(this);
        this.removeProducto = this.removeProducto.bind(this);
    }


    
    removeProducto(id){
        let ventaProducto = this.state.ventaProducto;
        for (let i = 0; i < ventaProducto.length; i++) {
            if (ventaProducto[i].idProducto == id) {
                ventaProducto.splice(i, 1);
                break;
            }
        }
        return ventaProducto;
    }


    saveVentaProducto = (e) => {
        e.preventDefault();

        VentasService.createVentaProducto(this.state.ventaProducto).then(res => {
            this.props.navigate('/ventas');
        });
    }


    componentDidMount(){
        VentasService.getVentaById(this.state.idVenta).then( (res) =>{
            let venta = res.data;
            this.setState({idVenta: venta.idVenta,
                vendedor: venta.vendedor,
                cliente: venta.cliente
            });
        });
        ClientesService.getClientes().then((res) => {
            this.setState({ clientes: res.data }, () => {console.log(JSON.stringify(this.state.clientes))});
        });
        
        VendedoresService.getVendedores().then((res) => {
            this.setState({ vendedores: res.data });
        });

        ProductosService.getProductos().then((res) => {
            this.setState({ productos: res.data });
        });
    }

    updateVentas = (e) => {
        e.preventDefault();
        this.saveVentaProducto(e);
        let venta = {idVenta: this.state.idVenta, fecha: this.state.fecha, vendedor: this.state.vendedor, cliente: this.state.cliente};
        console.log('venta => ' + JSON.stringify(venta));
        VentasService.updateVenta(venta, this.state.idVenta).then(res => {
            this.props.navigate('/ventas');
        });
    }

    addProducto(event, id){

            var cant = event.target.value;
            if (cant == ""){
                cant = 0;
            }
            let ventaProducto = this.removeProducto(id);
            this.setState({ventaProducto: ventaProducto.concat(
                {   idProducto: id,
                    idVenta: this.state.idVenta,
                    cantidad: cant})}
                    , () => {console.log(JSON.stringify(this.state.ventaProducto))});
        
    }
 
    changeIdVentaHandler = (event) => {
        this.setState({idVenta: event.target.value});
    }

    changeFechaHandler = (event) => {
        this.setState({fecha: event.target.value});
    }

    changeVendedorHandler = (event) => {
        this.setState({vendedor: event.target.value});
    }

    changeClienteHandler = (event) => {
        this.setState({cliente: event.target.value});
    }

    changeVentaProductoHandler = (event) => {
        console.log(event.target.value);
    }

    cancel(){
        this.props.navigate('/ventas');
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <br></br>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Update Venta</h3>
                                <div className='card-body'>
                                    <form>
                                    <div className = "form-group">
                                        <label>Fecha: </label>
                                        <input type="datetime-local" name="fecha" className="form-control" 
                                            value={this.state.fecha} onChange={this.changeFechaHandler}/>
                                    </div>
                                    <br></br>
                                    <div className = "form-group">
                                        <label> Empleado: </label>
                                        <select className="form-control" onChange = {this.changeCedulaHandler}>
                                            
                                            <option>--Eliga un Vededor--</option> {
                                                this.state.vendedores.map(
                                                    vendedor =>
                                                    <option key={vendedor.usuario} value={vendedor.usuario}>{vendedor.usuario}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label> Cédula: </label>
                                        <select className="form-control" onChange = {this.changeCedulaHandler}>
                                            
                                            <option>--Eliga un cliente--</option> {
                                                this.state.clientes.map(
                                                    cliente =>
                                                    <option key={cliente.cedula} value={cliente.cedula}>{cliente.cedula}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <br></br>
                                    <br></br>
                                        <div className='row'>
                                            <table className='table table-striped table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>Id Producto</th>
                                                        <th>Descripcion</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
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
                                                                        <input type="number" placeholder="0" name="cantidad" className="form-control"
                                                                        onChange={(event)=> this.addProducto(event, productos.idProducto)}></input>
                                                                    </td>
                                                                    
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <br></br>
                                        <button className='btn btn-success' onClick={this.updateVentas}>Update</button>
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


export default withRouter(UpdateVentasComponent);