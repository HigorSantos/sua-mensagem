import React, { Component } from 'react';
import Opcao from './Opcao';

class Conf extends Component{
	constructor(props){
	    super(props);
	    this.state = {
	    	aberto:false,
	    };
    	this.handleClickExibir = this.handleClickExibir.bind(this);
	}

	handleClickExibir() {
		this.setState({
			aberto: !this.state.aberto,
		});

	}

	renderOpcoes(){
		return this.props.modificador.opcoes.map(opc => (!opc.enabled) ? '' :
			<Opcao key={opc.value} value={opc} modificador={this.props.modificador.value}/>
		)
	}

	render(){
		const value_modificador = this.props.modificador.value;
		const selecionado = this.props.modificador.selecionado;

		let classe_conf = 'conf_'+value_modificador;
		this.state.aberto ? 
			classe_conf +=' conf_opc_aberto' :
			classe_conf +=' conf_opc';
		

		if(this.props.enabled==="true"){
			return(
				<div class="conf">
					<span id={'conf_'+value_modificador} class="opc" onClick={this.handleClickExibir}>
						<span class="modificador">{value_modificador}:</span>
						<span class={'escolhido '+selecionado.value} id={value_modificador+'_escolhido'}>{selecionado.nome}</span>
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