import React from 'react';
import CaixaTexto from './editor/CaixaTexto';
import Modificadores from './editor/Modificadores';

function Editor() {
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

export default Editor;
