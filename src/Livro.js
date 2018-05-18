import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = { titulo: '', preco: '', autor: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutor = this.setAutor.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autor: this.state.autor }),
            success: (novaListagem) => {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({ titulo: '', preco: '', autor: '' });
            },
            error: (resposta) => {
                if (resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: () => {
                PubSub.publish('limpa-erros', {});
            }
        });
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutor(evento) {
        this.setState({ autor: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
                    <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preco" />
                    <InputCustomizado id="autor" type="text" name="autor" value={this.state.autor} onChange={this.setAutor} label="Autor" />
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        );
    }
}


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