import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import QuantityPicker from '../../components/utils/QuantityPicker'
import config from '../../static/config';
import axios from 'axios';
import '../../assets/css/product.css'


class Product extends Component {

  emptyItem = {
    productID:'ss',
    categoryID: '',
    userEmail: "alexlz@gmail.com",
    productName: '',
    productDescription: '',
    unitPrice: '',
    quantity: 10,
    productURLPicture: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      error: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get(config.apiUrl + config.apiPathProductsAll + `/${this.props.match.params.id}`).then(response => response.data).then(
     (result)=>{
         this.setState({item: result})
     },
     (error)=>{
         this.setState({error})
     }
    )
  }


  handleClick() {
    // event.preventDefault();
    let {item} = this.state;

    let userEmail = localStorage.getItem('userEmail');
    let picker = document.getElementById('quantityPicker').value;

    item["userEmail"] = userEmail;
    item["quantity"] = parseInt(picker);

    axios({
        method: 'post',
        url: config.apiUrl + config.apiPathCartPost,
        data: item
    })
    .then((response) => {
        console.log(response);
        this.props.history.push('/cart');
      }, (error) => {
        console.log(error);
      })
    // body: JSON.stringify(item),
  }



  render() {
  
    const {item} = this.state;
    
    let LOGEADO = null;
    let status = localStorage.getItem('status');
    let CONTROLS = <div><QuantityPicker id={"quantityPicker"} min={1} max={20}/><br /><br /><Button color="primary" onClick={this.handleClick}>Agregar al carrito</Button></div>;
    
    status == 'true' ? LOGEADO = CONTROLS : LOGEADO = <div></div>;
    

    return <div className="product">
        <h4 className="text-primary"
          title={ item.productName }>
          { item.productName }
        </h4>
        
        <div className="product-img-wrapper">
          <a href={ item.productURLPicture }>
            <img
              alt={ item.productName }
              className="img-responsive product-img"
              src={ item.productURLPicture } />
          </a>
        </div>

        <div className="h4 text-success">
          {`$ ${ item.unitPrice }`}
        </div>

        <h5
          className="ellipsis product-brand-name"
          title={ item.productDescription }>
          {`${ item.productDescription }`}
        </h5>
      
        {LOGEADO}
        <br />

      </div>
  }
}

export default withRouter(Product);