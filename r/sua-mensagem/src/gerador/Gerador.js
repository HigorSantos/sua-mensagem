import React, { Component } from 'react';
import ClassFormataTexto from './ClassFormataTexto.js';

class Gerador extends Component {
	constructor(props){
	    super(props);
		this.state = {
			dados:{
				interno:{
					top:0,
					/*left:0,*/
					fontSize:'',
				},
				texto:'',
			},
			configuracao:{
				tamanhoPadraoFonte:120,
			},
    	};
    	this.state.dados.interno.fontSize = this.state.configuracao.tamanhoPadraoFonte+'px';
    	this.state.dados.texto = props.texto;
    	this.gerarImagem = this.gerarImagem.bind(this);

	}

	gerarImagem(){
		const texto = this.props.texto;
		if(!texto) return;

		let newState = Object.assign({}, this.state);
		const d = formataElementos(texto, this.state.configuracao.tamanhoPadraoFonte);

		if(d){
			newState.dados = d;
			this.setState(newState);
		}
	}

	render(){
		const texto = this.state.dados.texto;// ? this.state.dados.texto : this.props.texto;
		//console.log(texto);
		return (
			<div className="Gerador">
		        <div class="row">
		          <button class="button-primary" id="btn_gera_imagem" onClick={this.gerarImagem}>Gerar imagem fenomenal!</button>
		        </div>

				<div class="row" >
		          <div id="bloco" class={this.props.estilosSelecionados}>
		            {/*<span id="marca" class="space_mono marca_sem_borda">bit.ly/suamensagem</span>-->*/}
		            <a id="casulo">
			            <span id="onde" style={this.state.dados.interno}>
			            	{texto}
			            </span>
		            </a>
		          </div>
		        </div>
	        </div>
		);
	}
}

function formataElementos(texto,tamanhoFonte){

	let ft = new ClassFormataTexto(tamanhoFonte, true);
	return ft.scaleText(texto, "bloco", "casulo","onde");
}

export default Gerador;
