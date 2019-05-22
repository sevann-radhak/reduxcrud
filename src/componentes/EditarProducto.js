import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { mostrarProducto, editarProducto } from '../actions/productosActions';

class EditarProducto extends Component {
    state = {
        nombre: '',
        precio: '',
        id: '',
        error: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.mostrarProducto(id);
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { nombre, precio, id } = nextProps.producto;

        this.setState({ nombre, precio, id });
    }

    nombreProducto = (e) => {
        this.setState({ nombre: e.target.value });
    }

    precioProducto = (e) => {
        this.setState({ precio: e.target.value });
    }

    actualizarProducto = e => {
        e.preventDefault();

        const { nombre, precio, id } = this.state;

        if (nombre === '' || precio === '') {
            this.setState({ error: true });

            return;
        }

        const infoProducto = {
            nombre,
            precio,
            id
        }

        // Actualizar el producto
        this.props.editarProducto(infoProducto);

        // Quitar mensaje de error si existe
        this.setState({ error: false });

        // Redireccionar
        this.props.history.push('/');
    }

    render() {
        const { error, nombre, precio } = this.state;

        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Actualizar Producto</h2>
                            <form onSubmit={this.actualizarProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input onChange={this.nombreProducto} type="text" className="form-control" defaultValue={nombre} />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input onChange={this.precioProducto} type="text" className="form-control" defaultValue={precio} />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar cambios</button>
                            </form>

                            {error ?
                                <div className="font-weight-bold alert alert-danger text-center mt-4">
                                    Todos los campos son obligatorios
                            </div>
                                :
                                ''}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// State   
const mapStateToProps = state => ({
    producto: state.productos.producto
})

export default connect(mapStateToProps, { mostrarProducto, editarProducto })(EditarProducto);