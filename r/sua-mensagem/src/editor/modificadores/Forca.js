import React, { Component } from 'react';
import './Forca.css';
import Conf from './Conf';

class Forca extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'forca',
			opcoes:[
				{	nome:'Normal',
					value:'forca_normal', 
					defaultChecked:true,
					enabled:true,
				},

				{	nome:'Forte',
					value:'so_forte', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Bem Forte',
					value:'bem_forte', 
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

export default Forca;
