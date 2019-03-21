import React, { Component } from 'react';
import './Escrita.css';
import Conf from './Conf';

class Escrita extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'escrita',
			opcoes:[
				{	nome:'MAIÚSCULO',
					value:'escrita_maiuscula', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Primeiras letras',
					value:'escrita_capitalize', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Como digitado',
					value:'escrita_normal', 
					defaultChecked:false,
					enabled:true,
				},
			],
			selecionado:null
    	};
    	this.state.selecionado = this.state.opcoes[0];
    	for(let i=0; i < this.state.opcoes.length; i++){
    		this.state.opcoes[i].defaultChecked = false;
    		if(props.padrao===this.state.opcoes[i].value){
    			this.state.opcoes[i].defaultChecked = true;
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
				atualizaEstilos={this.props.atualizaEstilos}
			/>
		);
	}
}

export default Escrita;
