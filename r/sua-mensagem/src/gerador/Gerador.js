import React, { Component } from 'react';
import ClassFormataTexto from './ClassFormataTexto.js';

class Gerador extends Component {
	constructor(props){
	    super(props);
		this.state = {
			dados:{
				externo:{
					fontSize:'120px',
				},
				interno:{
					top:0,
					left:0,
					fontSize:'120px',
				},
				texto:'',
			}
    	};

    	this.gerarImagem = this.gerarImagem.bind(this);
	}

	gerarImagem(){
		let newState = Object.assign({}, this.state);
		const d = geraClasse();
		if(d){
			newState.dados = d;
			this.setState(newState);
		}
	}

	render(){
		const dados = this.state.dados;
		const estiloInterno = dados.interno;

		return (
			<div className="Gerador">
		        <div class="row">
		          <button class="button-primary" id="btn_gera_imagem" onClick={this.gerarImagem}>Gerar imagem fenomenal!</button>
		        </div>

				<div class="row" >
		          <div id="bloco" class="escrita_maiuscula forca_normal work_sans bg_stardust form_quadrado alinhamento_esquerda">
		            {/*<span id="marca" class="space_mono marca_sem_borda">bit.ly/suamensagem</span>-->*/}
		            <a id="casulo">
			            <span id="onde" style={estiloInterno}>
			            	{this.state.dados.texto}
			            </span>
		            </a>
		          </div>
		          <div id="bloco2"/>
		        </div>
	        </div>
		);
	}
}

function geraClasse(){


	let ft = new ClassFormataTexto(512, 512,{}, 120, true);

	return ft.scaleText("Lorem ipsum dolor sit amet", "casulo","onde");
}

export default Gerador;
