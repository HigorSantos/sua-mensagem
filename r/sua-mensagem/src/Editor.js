import React, { Component } from 'react';
import CaixaTexto from './editor/CaixaTexto';
import Modificadores from './editor/Modificadores';
import Gerador from './gerador/Gerador';

class Editor extends Component {
	constructor(props){
	    super(props);
		this.state = {
			estilos:{
				escrita:'escrita_maiuscula',
				forca:'forca_normal',
				fonte:'work_sans',
				fundo:'bg_stardust',
				formato:'form_retangular',
				alinhamento:'alinhamento_centralizada',
				borda:'borda_com',
			},
			texto:'',
    	};
    	this.atualizaEstilos = this.atualizaEstilos.bind(this);
    	this.atualizaTexto = this.atualizaTexto.bind(this);
	}

	atualizaEstilos(modificador, estilo){
		
		let newState = Object.assign({}, this.state);
		newState.estilos[modificador] = estilo;

		this.setState(newState);
	}

	atualizaTexto(texto){
		let newState = Object.assign({}, this.state);
		newState.texto = texto;
		
		this.setState(newState);
	}

	render(){
		const estilosSelecionados = montaEstilos(this.state.estilos);

		return (
			<div class="container">
				<div class="row">
				    <div class="eleven columns">
				    	<CaixaTexto atualizaTexto={(texto)=>this.atualizaTexto(texto)} />
				    	<Modificadores
				    			padrao={this.state.estilos}
				    			atualizaEstilos={(mod, es)=>this.atualizaEstilos(mod, es)}/>
				    </div>
				</div>
				<div class="row">
					<Gerador 
						texto={this.state.texto}
						estilosSelecionados={estilosSelecionados}/>
				</div>
			</div>
		);
	}
}

function montaEstilos(estilos){
	let est = [];
	Object.keys(estilos)
		  .map((key,value) => est.push(estilos[key]));

	return est.join(' ');
}
export default Editor;
