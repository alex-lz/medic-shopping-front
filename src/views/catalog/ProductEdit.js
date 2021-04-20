import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import config from '../../static/config';


class CarEdit extends Component {

  emptyItem = {
    id:'',
    productName: '',
    productDescription: '',
    supplier: '',
    unitPrice: '',
    color: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      axios.get(config.apiUrl + config.apiPathProductsAll +'/'+ this.props.match.params.id).then(response => response.data).then(
        (result)=>{
            this.setState({item: result})
        },
        (error)=>{
            this.setState({error})
        }
       )
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    axios({
        method: (item.id) ? 'put' : 'post',
        url: (item.id) ? config.apiUrl + config.apiPathProductsAll +'/'+ this.props.match.params.id : config.apiUrl + config.apiPathProductsAll ,
        data: (item.id) ? item : (delete item.id, item)
    })
    .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    // body: JSON.stringify(item),
    this.props.history.push('/catalog');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar Producto' : 'Agregar producto'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="brand">Nombre</Label>
            <Input type="text" name="productName" id="productName" value={item.productName || ''}
                   onChange={this.handleChange} autoComplete="productName"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Descripción</Label>
            <Input type="text" name="productDescription" id="productDescription" value={item.productDescription || ''}
                   onChange={this.handleChange} autoComplete="productDescription"/>
          </FormGroup>
          <FormGroup>
            <Label for="model">Proveedor</Label>
            <Input type="text" name="supplier" id="supplier" value={item.supplier || ''}
                   onChange={this.handleChange} autoComplete="supplier"/>
          </FormGroup>
          <FormGroup>
            <Label for="year">Precio unitario</Label>
            <Input type="number" name="unitPrice" id="unitPrice" value={item.unitPrice || ''}
                   onChange={this.handleChange} autoComplete="unitPrice"/>
          </FormGroup>
          <FormGroup>
            <Label for="price">Color</Label>
            <Input type="text" name="color" id="color" value={item.color || ''}
                   onChange={this.handleChange} autoComplete="color"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Guardar</Button>{' '}
            <Button color="secondary" tag={Link} to="/products">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CarEdit);