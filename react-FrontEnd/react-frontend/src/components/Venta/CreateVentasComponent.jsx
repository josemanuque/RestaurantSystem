import React, { Component } from 'react';
import ClientesService from '../../services/ClientesService';
import VendedoresService from '../../services/VendedoresService';
import ProductosService from '../../services/ProductosService';
import VentasService from '../../services/VentasService';
import { withRouter } from '../../services/withRouter';

class CreateVentasComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idVenta: '',
            fecha: '',
            vendedor: '',
            cliente: '',
            total: '',
            clientes: [],
            vendedores: [],
            productos: [],
            ventaProducto: [],
            idProducto: ''
        }
        this.changeIdVentaHandler = this.changeIdVentaHandler.bind(this);
        this.changeFechaHandler = this.changeFechaHandler.bind(this);
        this.changeVendedorHandler = this.changeVendedorHandler.bind(this);
        this.changeClienteHandler = this.changeClienteHandler.bind(this);
        this.changeTotalHandler = this.changeTotalHandler.bind(this);
        this.changeVentaProductoHandler = this.changeVentaProductoHandler.bind(this);
        this.saveVenta = this.saveVenta.bind(this);
        this.saveVentaProducto = this.saveVentaProducto.bind(this);
        this.removeProducto = this.removeProducto.bind(this);
        
        this.addProducto = this.addProducto.bind(this);
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

    saveVenta = (e) => {
        e.preventDefault();


        let venta = {fecha: this.state.fecha, vendedor: this.state.vendedor, cliente: this.state.cliente, total: this.state.total};
        console.log('venta => ' + JSON.stringify(venta));

        VentasService.createVenta(venta).then(res => {
            this.setState({idVenta: res.data.idVenta}, () => {window.alert("Venta creada con éxito")});
        });
    }

    componentDidMount(){
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

    changeIdVentaHandler = (event) => {
        this.setState({idVenta: event.target.value});
        console.log(this.props.params.id);
    }

    changeFechaHandler = (event) => {
        this.setState({fecha: event.target.value}, () => {console.log(this.state.fecha)});
    }

    changeVendedorHandler = (event) => {
        this.setState({vendedor: event.target.value});
    }

    changeClienteHandler = (event) => {
        this.setState({cliente: event.target.value});
    }

    changeTotalHandler = (event) => {
        this.setState({total: event.target.value});
    }

    changeVentaProductoHandler = (event) => {
        console.log(event.target.value);
    }

    cancel(){
        this.props.navigate('/ventas');
    }

    addProducto(event, id){
        if (this.state.ventaProducto.length == 0){
            this.setState({ventaProducto: [{idProducto: id, idVenta: this.state.idVenta, cantidad: 1}]}, () => {console.log(this.state.ventaProducto)});
        }
        else{
            var cant = event.target.value;
            if (cant == ""){
                cant = 0;
            }
            let ventaProducto = this.removeProducto(id);

            this.setState({ventaProducto: ventaProducto.concat(
                {   idProducto: id,
                    idVenta: this.state.idVenta,
                    cantidad: cant})}
                    , () => {console.log(this.state.ventaProducto)});
        }
    }
        

    render() {
        return (
            <div>
                    <div className='container'>
                        <br></br>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Add Ventas</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className = "form-group">
                                            <label>Fecha: </label>
                                            <input type="datetime-local" name="fecha" className="form-control" 
                                                value={this.state.fecha} onChange={this.changeFechaHandler}/>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                            <label>Usuario Vendedor: </label>
                                            <select className="form-control" onChange = {this.changeVendedorHandler}>
                                                
                                                <option>--Eliga una Usuario--</option>
                                                {
                                                        this.state.vendedores.map(
                                                            vendedor =>
                                                            <option key={vendedor.usuario} value={vendedor.usuario}>{vendedor.usuario}</option>
                                                        )

                                                    }
                                            </select>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                            <label>Cédula Cliente: </label>
                                            <select className="form-control" onChange = {this.changeClienteHandler}>
                                                
                                                <option>--Eliga una Cédula--</option>
                                                {
                                                        this.state.clientes.map(
                                                            cliente =>
                                                            <option key={cliente.cedula} value={cliente.cedula}>{cliente.cedula}</option>
                                                        )

                                                    }
                                            </select>
                                        </div>
                                        <br></br>
                                        <button className='btn btn-success' onClick={this.saveVenta}>Save</button>
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

                                        <button className='btn btn-success' onClick={this.saveVentaProducto}>Save</button>
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

export default withRouter(CreateVentasComponent);