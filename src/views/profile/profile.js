import React, { Component } from "react";

export default class Profile extends Component {
    render() {

        const status = localStorage.getItem('status');
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        const userName = localStorage.getItem('userName');
        const userLast = localStorage.getItem('userLast');
        const userCellphone = localStorage.getItem('userCellphone');
        const userURLPricture = localStorage.getItem('userURLPricture');

        return (
            <form className="login-form cen">
                <h3>Perfil</h3>
                <br />
                <label>Correo electrónico: </label>{' '+userEmail}<br />
                <label>Nombre: </label>{' '+userName}<br />
                <label>Apellidos: </label>{' '+userLast}<br />
                <label>Celular: </label>{' '+userCellphone}<br />
            </form>
        );
    }
}
