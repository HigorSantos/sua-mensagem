import React, { Component } from 'react';
import './Forca.css';
import Opcao from './Opcao';

class Forca extends Component {
	constructor(props){
	    super(props);
		this.state = {
			nome: 'Forca',
			value:'forca',
			opcoes:[
				{	nome:'Texto Normal',
					value:'forca_normal', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Texto em Negrito',
					value:'bem_forte', 
					defaultChecked:false,
					enabled:true,
				},
			],
			padrao:null
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

export default Forca;
