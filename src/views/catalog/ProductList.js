import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../static/config';

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null, 
      products: [], 
      response: {}, 
      isLoading: true
    };
    this.remove = this.remove.bind(this);
  }

componentDidMount(){
  this.setState({isLoading: true});

   axios.get(config.apiUrl + config.apiPathProductsAll).then(response => response.data).then(
        (result)=>{
            this.setState({
                products:result, isLoading: false
            });
        },
        (error)=>{
            this.setState({error});
        }
    )
}

componentWillUnmount() {
  this.setState({isLoading: true});

  axios.get(config.apiUrl + config.apiPathProductsAll).then(response => response.data).then(
       (result)=>{
           this.setState({
               products:result, isLoading: false
           });
       },
       (error)=>{
           this.setState({error});
       }
   )

}

  remove(id) {
    const { products } = this.state;
    axios.delete(config.apiUrl + '/api/v1/products/' + id).then(result=>{
       this.setState({
         response:result,
         products:products.filter(prod=>prod.id !== id)
       });
     });
  }

  render() {
    const {products, isLoading} = this.state;

    if (isLoading) {
      return <div className="loader"></div>;
    }

    const prodList = products.map(prod => {
      return <tr key={prod.id}>
        <td style={{whiteSpace: 'nowrap'}}>{prod.productName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{prod.productDescription}</td>
        <td style={{whiteSpace: 'nowrap'}}>{prod.supplier}</td>
        <td style={{whiteSpace: 'nowrap'}}>{prod.unitPrice}</td>
        <td style={{whiteSpace: 'nowrap'}}>{prod.color}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/products/" + prod.id}>Editar</Button>
            <Button 
              size="sm" 
              color="danger" 
              onClick={() => window.confirm("Estas seguro que deseas eliminar este producto?") && this.remove(prod.id)}
            >Eliminar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/products/new">Agregar un producto</Button>
          </div>
          <h3>Catalogo de productos</h3>
          <Table className="table table-hover">
            <thead className="bg-light">
            <tr>
              <th width="15%">Nombre</th>
              <th width="15%">Descripción</th>
              <th width="15%">Proveedor</th>
              <th width="15%">Precio unitario</th>
              <th width="15%">Color</th>
              <th width="10%">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {prodList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProductList;