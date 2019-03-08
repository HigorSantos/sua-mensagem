import React, { Component } from 'react';
import Opcao from './Opcao';

class Alinhamento extends Component {
	constructor(props){
	    super(props);
		this.state = {
			nome: 'Alinhamento',
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
						<span class="escolhido" id={this.state.value+'_escolhido'}>{this.state.padrao.nome}</span>
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

export default Alinhamento;
