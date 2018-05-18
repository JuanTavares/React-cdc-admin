import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

export default class Livro extends Component {

    render() {

        return;
export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/livros',
            dataType: 'json',
            success: (resposta) => {
                this.setState({ lista: resposta });
            }
        }
        );

        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                </div>
            </div>
        );
    }
}