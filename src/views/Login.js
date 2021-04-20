import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import config from '../static/config';
import axios from 'axios';
import '../assets/css/bootstrap.min.css'
import '../assets/css/Login.css'

class Login extends Component {

    emptyItem = {
        userEmail:'',
        userPassword: ''
      };
    
      constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            method: 'post',
            url: config.apiUrl + config.apiPathLoginUser,
            data: item
        })
        .then((response) => {
            console.log('Usuario: '+response.data.userEmail);
            localStorage.setItem('status', true);
            localStorage.setItem('userEmail', response.data.userEmail);
            //localStorage.setItem('userPassword', 'asd1357');
            localStorage.setItem('userName', response.data.userName);
            localStorage.setItem('userLast', response.data.userLast);
            localStorage.setItem('userCellphone', response.data.userCellphone);
            this.props.history.push('/catalog');
          }, (error) => {
            alert('Ocurrio un error al iniciar sesión!')
            console.log(error);
          })
        // body: JSON.stringify(item),
      }  

      handleClick() {
        localStorage.setItem('status', true);
        localStorage.setItem('userEmail', 'alex@gmail.com');
        localStorage.setItem('userPassword', 'asd1357');
        localStorage.setItem('userName', 'Juan');
        localStorage.setItem('userLast', 'Perez Lopez');
        localStorage.setItem('userCellphone', '6677553311');
        this.props.history.push('/catalog');
      }
    
        

    render() {
        /*localStorage.setItem('status', true);
        localStorage.setItem('userEmail', 'alex@gmail.com');
        localStorage.setItem('userPassword', 'asd1357');
        localStorage.setItem('userName', 'Juan');
        localStorage.setItem('userLast', 'Perez Lopez');
        localStorage.setItem('userCellphone', '6677553311');
        localStorage.setItem('userURLPricture', 'https://i.ibb.co/NW3n48x/iphone-12-pro-graphite-hero.png');

        const status = localStorage.getItem('status');
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        const userName = localStorage.getItem('userName');
        const userLast = localStorage.getItem('userLast');
        const userCellphone = localStorage.getItem('userCellphone');
        const userURLPricture = localStorage.getItem('userURLPricture');*/

        const {item} = this.state;

        return (
            
        <Form className="login-form" onSubmit={this.handleSubmit}>
        <h3>Iniciar Sesión</h3>

          <br />
          <FormGroup>
            <Label for="model">Correo electrónico</Label>
            <Input type="email" name="userEmail" id="userEmail" value={item.userEmail || ''}
                   onChange={this.handleChange} autoComplete="userEmail" placeholder="Escriba su correo electrónico"/>
          </FormGroup>
          <FormGroup>
            <Label for="year">Contarseña</Label>
            <Input type="password" name="userPassword" id="userPassword" value={item.userPassword || ''}
                   onChange={this.handleChange} autoComplete="userPassword" placeholder="Escriba su contraseña"/>
          </FormGroup>
          <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
                    </div>
          </div>
          <Button color="primary" type="submit" className="btn btn-primary btn-block">Iniciar</Button>
          <br />
          <p className="forgot-password text-right">Olvido su <a href="#">contraseña?</a></p>
        </Form>
        );
    }
}

export default withRouter(Login);