import React, { Component } from 'react';
import Opcao from './Opcao';

class Conf extends Component{
	constructor(props){
	    super(props);
	    this.state = {
	    	aberto:false,
	    	selecionado:this.props.modificador.selecionado,
	    };
    	this.handleClickExibir = this.handleClickExibir.bind(this);
    	this.handleOpcaoSelecionada = this.handleOpcaoSelecionada.bind(this);
	}

	handleClickExibir() {
		this.setState({
			aberto: !this.state.aberto,
		});

	}

	handleOpcaoSelecionada(opcao){
		this.alteraOpcaoSelecionada(opcao);
	}

	alteraOpcaoSelecionada(opc){
		let selecionado = Object.assign({}, this.state.selecionado);
		selecionado = opc;
		
		this.setState({selecionado});
	}

	renderOpcoes(){
		return this.props.modificador.opcoes.map(opc => (!opc.enabled) ? '' :
			<Opcao 
				key={opc.value} 
				value={opc} 
				modificador={this.props.modificador.value}
				onClick={()=>this.handleOpcaoSelecionada(opc)}/>
		)
	}

	render(){
		const value_modificador = this.props.modificador.value;

		let classe_conf = 'conf_'+value_modificador;
		this.state.aberto ? 
			classe_conf +=' conf_opc_aberto' :
			classe_conf +=' conf_opc';
		
		if(this.props.enabled==="true"){
			return(
				<div class="conf">
					<span id={'conf_'+value_modificador} class="opc" onClick={this.handleClickExibir}>
						<span class="modificador">{value_modificador}:</span>
						<span class={'escolhido '+this.state.selecionado.value} id={value_modificador+'_escolhido'}>{this.state.selecionado.nome}</span>
					</span>
					<div className={classe_conf}>
						{this.renderOpcoes()}
					</div>
				</div>
			);
		}else{
			return('');
		}
	}
}
export default Conf;