import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render() {

        return;
    }
}

class TabelaAutores extends Component {

    render() {

        return;
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();    
        this.state = {lista : []};    
      }
    
    render() {

        return;
    }
}