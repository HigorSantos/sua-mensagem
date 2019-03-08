import React, { Component } from 'react';
import CaixaTexto from './editor/CaixaTexto';
import Modificadores from './editor/Modificadores';

class Editor extends Component {
	render() {
		return (
			<div class="container">
				<div class="row">
				    <div class="eleven columns">
				    	<CaixaTexto />
				    	<Modificadores />
				    </div>
				</div>
			</div>
		);
	}
}

export default Editor;
