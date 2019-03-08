import React, { Component } from 'react';
import './CaixaTexto.css';

class CaixaTexto extends Component {
	render() {
		return (
			<div className="CaixaTexto">
				<div class="row">
					<div class="caixa-texto">
						<textarea class="u-full-width" id="texto" placeholder="Comece escrevendo alguma coisa aqui"></textarea>
						<div id="contador" class="space_mono u-cf"></div>
					</div>
		         
		        	<h6 class="descr">[<a href="#coisas_legais" id="det_coisas_legais">Ah, olha o que da pra fazer de legal!</a>]</h6>

					<div id="coisas_legais" name="coisas_legais" class="u-full-width">
						<span class="exemplo">&lt;3 vira <span class="menor" role="img" aria-label="Coração">&#9829;</span></span>
						<span class="exemplo">&lt;,3 se torna <span role="img" class="menor" aria-label="Coração partido">&#128148;</span></span>
						<span class="exemplo">:) <span class="menor" role="img" aria-label="Carinha sorridente">&#9786;</span></span>
						<span class="exemplo">:( <span class="menor" role="img" aria-label="Carinha triste">&#9785;</span></span>
						<p>O que estiver entre # (cerquila) <span class="inverte">#é destacado#</span></p>
						<p>Ah, e se tiver alinhando a esquerda ou direita e quiser centralizar só uma parte do texto, basta colocar entre %.</p>
					</div>
		        </div>
			</div>
		);
	}
}

export default CaixaTexto;
