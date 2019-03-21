import React, { Component } from 'react';
import './Fonte.css';
import Conf from './Conf';

class Fonte extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'fonte',
			opcoes:[
				{	nome:'Oswald',
					value:'oswald',
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Work Sans',
					value:'work_sans',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Space Mono',
					value:'space_mono',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Caveat',
					value:'caveat',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Poiret One',
					value:'poiret_one',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Bungee Shade',
					value:'bungee_shade',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Special Elite',
					value:'special_elite',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Cormorant',
					value:'cormorant',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Amatic SC',
					value:'amatic_sc',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Cabin Sketch',
					value:'cabin_sketch',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Fredericka the Great',
					value:'fredericka',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Vast Shadow',
					value:'vast_shadow',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Bungee',
					value:'bungee',
					defaultChecked:false,
					enabled:true,
				},
			],
    		aberto:false,
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
export default Fonte;