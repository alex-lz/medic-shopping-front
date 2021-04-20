import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, CardColumns, Container
  } from 'reactstrap';
import config from '../../static/config';
import axios from 'axios';

export default class Catalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null, 
      products: [], 
      response: {}, 
      isLoading: true
    };
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
              console.error('$http:ajax:catch', error)
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

  render() {
    const {products, isLoading} = this.state;

    if (isLoading) {
      return <div className="loader"></div>;
    }
    const prodList = products.map(prod => {
        return <Card>
          <CardImg top width="100%" src={prod.productURLPicture} alt={'Card image - '+prod.productName} />
          <CardBody>
            <CardTitle tag="h5" className="text-info">{prod.productName}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-success">{'$ '+prod.unitPrice}</CardSubtitle>
            <CardText>{prod.productDescription}</CardText>
            <Button color="primary" tag={Link} to={'/catalog/'+prod.productID}>Ver más</Button>
          </CardBody>
        </Card>
      });


    return (
      <div>
          <Container className="themed-container" fluid="md">
          <CardColumns>{prodList}</CardColumns>
          </Container>
      </div>
    );
  }
}
