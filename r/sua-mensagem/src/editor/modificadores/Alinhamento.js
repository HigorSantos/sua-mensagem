import React, { Component } from 'react';
import './Alinhamento.css';
import Conf from './Conf';

class Alinhamento extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'alinhamento',
			opcoes:[
				{	nome:'Esquerda',
					value:'alinhamento_esquerda', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Centralizado',
					value:'alinhamento_centralizada', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Direita',
					value:'alinhamento_direita', 
					defaultChecked:false,
					enabled:true,
				},
			],
			selecionado:null
    	};
    	this.state.selecionado = this.state.opcoes[0];
    	for(let i=0; i < this.state.opcoes.length; i++){
    		if(this.state.opcoes[i].defaultChecked){
				this.state.selecionado = this.state.opcoes[i];
				break;
    		}
    	}
	}

	render(){
		return(
			<Conf 
				modificador={this.state}
				enabled={this.props.enabled}
			/>
		);
	}
}

export default Alinhamento;
