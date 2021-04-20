import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import config from '../static/config';
import '../assets/css/bootstrap.min.css'
import '../assets/css/Login.css'
import axios from 'axios';

class SignUp extends Component {
    emptyItem = {
        userEmail:'',
        userPassword: '',
        userName: '',
        userLast: '',
        userCellphone: '',
        userURLPricture: '/',
        type: 'c'
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
            url: config.apiUrl + config.apiPathPostUser,
            data: item
        })
        .then((response) => {
            console.log(response);
            localStorage.setItem('status', true);
            //localStorage.setItem('statusLog', true);
            localStorage.setItem('userEmail', item.userEmail);
            //localStorage.setItem('userPassword', 'asd1357');
            localStorage.setItem('userName', item.userName);
            localStorage.setItem('userLast', item.userLast);
            localStorage.setItem('userCellphone', item.userCellphone);
            this.props.history.push('/catalog');
          }, (error) => {
            console.log(error);
          })
        // body: JSON.stringify(item),
      }  

    render() {
        const {item} = this.state;
        return (
        <Form className="login-form" onSubmit={this.handleSubmit}>
        <h3>Registro</h3>

          <br />
          <FormGroup>
            <Label for="brand">Nombre</Label>
            <Input type="text" name="userName" id="userName" value={item.userName || ''}
                   onChange={this.handleChange} autoComplete="userName" placeholder="Escriba su nombre"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Apellidos</Label>
            <Input type="text" name="userLast" id="userLast" value={item.userLast || ''}
                   onChange={this.handleChange} autoComplete="userLast" placeholder="Escriba sus apellidos"/>
          </FormGroup>
          <FormGroup>
            <Label for="model">Correo electrónico</Label>
            <Input type="email" name="userEmail" id="userEmail" value={item.userEmail || ''}
                   onChange={this.handleChange} autoComplete="userEmail" placeholder="Escriba su correo electrónico"/>
          </FormGroup>
          <FormGroup>
            <Label for="model">Celular</Label>
            <Input type="number" name="userCellphone" id="userCellphone" value={item.userCellphone || ''}
                   onChange={this.handleChange} autoComplete="userCellphone" placeholder="Escriba su celular"/>
          </FormGroup>
          <FormGroup>
            <Label for="year">Contarseña</Label>
            <Input type="password" name="userPassword" id="userPassword" value={item.userPassword || ''}
                   onChange={this.handleChange} autoComplete="userPassword" placeholder="Escriba su contraseña"/>
          </FormGroup>
          <Button color="primary" type="submit" className="btn btn-primary btn-block">Registrarse</Button>
          <br />
          <p className="forgot-password text-right">Ya esta registrado <a href="/sign-in">Iniciar?</a></p>
        </Form>
        );
    }
}

export default withRouter(SignUp);