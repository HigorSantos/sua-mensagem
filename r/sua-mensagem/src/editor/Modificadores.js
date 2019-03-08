import React from 'react';
import './Modificadores.css';
import Alinhamento from './modificadores/Alinhamento';
import Fonte from './modificadores/Fonte';
import Forca from './modificadores/Forca';
import Escrita from './modificadores/Escrita';
import Borda from './modificadores/Borda';
/*import Fundo from './modificadores/Fundo';
import Formato from './modificadores/Formato';*/

function Modificadores() {
	return (
		<div class="row">
			<h6 class="descr">Clique nos <span class="btn_menor">botões</span> para editar</h6>
			<div class="row">
				<Alinhamento enabled="true"/>
				<Fonte enabled="true"/>
				<Forca enabled="true"/>
				<Escrita enabled="true"/>
				<Borda enabled="true"/>
			<div class="row">
			</div>
				{/*<Fundo enabled="true"/>
				<Formato enabled="true"/>*/}
			</div>
        </div>
	);
}
export default Modificadores;
