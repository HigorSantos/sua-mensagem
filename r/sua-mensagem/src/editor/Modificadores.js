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
					<Forca enabled="true"/>
					<Escrita enabled="true"/>
					<Fundo enabled="true"/>
					<Alinhamento enabled="true"/>
					<Fonte enabled="true"/>
					<Borda enabled="true"/>
					<Formato enabled="true"/>
				</div>
	        </div>
		);
	}
}
export default Modificadores;
