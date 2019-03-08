import React, { Component } from 'react';
import './Escrita.css';
import Opcao from './Opcao';

class Escrita extends Component {
	constructor(props){
	    super(props);
		this.state = {
			nome: 'Escrita',
			value:'forca',
			opcoes:[
				{	nome:'MAIÚSCULO',
					value:'escrita_maiuscula', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Como digitado',
					value:'escrita_normal', 
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

export default Escrita;
