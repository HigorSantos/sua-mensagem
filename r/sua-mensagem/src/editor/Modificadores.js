import React, { Component } from 'react';
import './Modificadores.css';
import Alinhamento from './modificadores/Alinhamento';
import Fonte from './modificadores/Fonte';
import Forca from './modificadores/Forca';
import Escrita from './modificadores/Escrita';
import Borda from './modificadores/Borda';
import Fundo from './modificadores/Fundo';
import Formato from './modificadores/Formato';

class Modificadores extends Component {

	render(){
		return (
			<div class="row">
				<h6 class="descr">Clique nas <span class="btn_menor modificador">propriedades</span> para editar</h6>
				<div class="row">
					<Alinhamento enabled="true"
							padrao={this.props.padrao.alinhamento}
							atualizaEstilos={this.props.atualizaEstilos}/>
					<Escrita enabled="true"
							padrao={this.props.padrao.escrita}
							atualizaEstilos={this.props.atualizaEstilos}/>
					<Forca enabled="true"
							padrao={this.props.padrao.forca}
							atualizaEstilos={this.props.atualizaEstilos}/>
					<Fundo enabled="true"
							padrao={this.props.padrao.fundo}
							atualizaEstilos={this.props.atualizaEstilos}/>
					<Fonte enabled="true"
							padrao={this.props.padrao.fonte}
							atualizaEstilos={this.props.atualizaEstilos}/>
				{/*<Borda enabled="true"
							padrao={this.props.padrao.borda}
							atualizaEstilos={this.props.atualizaEstilos}/>*/}
					<Formato enabled="true"
							padrao={this.props.padrao.formato}
							atualizaEstilos={this.props.atualizaEstilos}/>
				</div>
	        </div>
		);
	}
}
export default Modificadores;
