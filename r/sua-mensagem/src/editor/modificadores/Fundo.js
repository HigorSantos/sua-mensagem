import React, { Component } from 'react';
import './Fundo.css';
import Conf from './Conf';

class Fundo extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'fundo',
			opcoes:[
				{	nome:'Não quero',
					value:'bg_nao_quero', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Circles Light',
					value:'bg_circles_light', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Seamless Paper',
					value:'bg_seamless_paper_texture', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Stardust',
					value:'bg_stardust', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Memphis Colorful',
					value:'bg_memphis_colorful', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Dark Embroidery',
					value:'bg_dark_embroidery', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Black Felt',
					value:'bg_black_felt', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Notebook',
					value:'bg_notebook', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Natal Escuro',
					value:'bg_christmas_black', 
					defaultChecked:false,
					enabled:false,
				},
				{	nome:'Natal Colorido',
					value:'bg_christmas_colour', 
					defaultChecked:false,
					enabled:false,
				},
				{	nome:'Doodles',
					value:'bg_doodles', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Comida',
					value:'bg_food', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Restaurante',
					value:'bg_restaurant_icons', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Sakura',
					value:'bg_sakura', 
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Wheat',
					value:'bg_wheat', 
					defaultChecked:false,
					enabled:true,
				},
			],
			selecionado:null,
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

export default Fundo;
