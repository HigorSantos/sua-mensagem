import React, { Component } from 'react';
import './Fonte.css';
import Opcao from './Opcao';

class Fonte extends Component {
	constructor(props){
	    super(props);
		this.state = {
			nome: 'Fonte',
			value:'fonte',
			opcoes:[
				{	nome:'Oswald',
					value:'oswald',
					defaultChecked:false,
					enabled:true,
				},
				{	nome:'Work Sans',
					value:'work_sans',
					defaultChecked:true,
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
			]
    	};
    	this.state.padrao=this.state.opcoes[0];
	}

	renderOpcoes(){
		return this.state.opcoes.map(opc => (!opc.enabled) ? <span/> :
			<Opcao key={opc.value} value={opc} modificador={this.state.value}/>
		)
	}

	render(){
		if(this.props.enabled==="true"){
			return(
				<div class="conf">
					<span id={'conf_'+this.state.value} class="opc">
						{this.state.nome}:
						<span class={'escolhido '+this.state.padrao.value} id={this.state.value+'_escolhido'}>{this.state.padrao.nome}</span>
					</span>
					<div class={'conf_opc conf_'+this.state.value}>
						{this.renderOpcoes()}
					</div>
				</div>
			);
		}else{
			return(<div/>);
		}
	}
}
export default Fonte;