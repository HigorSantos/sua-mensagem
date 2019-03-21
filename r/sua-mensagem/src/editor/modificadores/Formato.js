import React, { Component } from 'react';
import './Formato.css';
import Conf from './Conf';

class Formato extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'formato',
			opcoes:[
				{	nome:'Quadrado',
					value:'form_quadrado', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Retangular',
					value:'form_retangular', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Vertical',
					value:'form_vertical', 
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

export default Formato;
