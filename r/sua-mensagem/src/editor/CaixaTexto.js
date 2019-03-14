import React, { Component } from 'react';
import './CaixaTexto.css';

class CaixaTexto extends Component {
	constructor(props){
	    super(props);
		this.state = {
			exibir_exemplos:false,
			contador:0,
			maximo_caracteres:280,
			texto:'',
    	};

    	this.handleClick = this.handleClick.bind(this);
    	this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleClick(e) {
		console.log(e.target);
		let newState = Object.assign({}, this.state);
		newState.exibir_exemplos = !newState.exibir_exemplos;
		this.setState(newState);

	}

	handleOnChange(e){
		let t = e.target.value;
		if(t.length > this.state.maximo_caracteres){
			t = t.substr(0,this.state.maximo_caracteres);
		}

		let texto = Object.assign({}, this.state.texto);
		let contador = Object.assign({}, this.state.contador);
		texto = t;
		contador = texto.length;
		this.setState({texto, contador})
	}
	render() {
		const contador = this.state.contador+'';
		const maximo_caracteres = this.state.maximo_caracteres;
		
		let classe_coisas_legais = 'u-full-width';
		let mensagem_det_coisas_legais = 'Clique aqui e veja o que da pra fazer de legal!';
		if(this.state.exibir_exemplos){
			classe_coisas_legais +=' coisas-legais';
			mensagem_det_coisas_legais = 'Bacana né? [clique aqui para esconder]';
		}else{
			classe_coisas_legais +=' coisas-legais-fechado';
		}

		return (

			<div className="CaixaTexto">
				<div class="row">
					<div class="caixa-texto">
						<textarea class="u-full-width" id="texto"
							placeholder="Comece escrevendo alguma coisa aqui" 
							onChange={this.handleOnChange}
							value={this.state.texto}/>
						<div id="contador" class="space_mono u-cf">{contador.concat('/', maximo_caracteres)}</div>
					</div>
		         
		        	<button id="det_coisas_legais" onClick={this.handleClick} class="exibir-exemplos">{mensagem_det_coisas_legais}</button>

					<div id="coisas_legais" name="coisas_legais" className={classe_coisas_legais}>
						<span class="exemplo">&lt;3 vira <span role="img" aria-label="Coração">&#10084;</span></span>
						<span class="exemplo">&lt;,3 se torna <span role="img" class="menor" aria-label="Coração partido">&#128148;</span></span>
						<span class="exemplo">:) <span role="img" aria-label="Carinha sorridente">&#128578;</span></span>
						<span class="exemplo">;) <span role="img" aria-label="Piscadinha">&#128521;</span></span>
						<span class="exemplo">=D <span role="img" aria-label="Sorrisão">&#128515;</span></span>
						<span class="exemplo">:( <span role="img" aria-label="Carinha triste">&#128577;</span></span>
						<p class="exemplo">Isso para computador. No celular pode adicionar qualquer emoji direto! <span role="img" aria-label="THUMBS UP">&#128077;</span></p>
						<p class="exemplo">Texto #entre# (cerquila) <span class="inverte">fica destacado assim</span>.</p>
						<p class="exemplo">Ah, e se tiver alinhando a esquerda ou direita e quiser centralizar só uma parte do texto, basta colocar entre %.</p>
					</div>
		        </div>
			</div>
		);
	}
}

export default CaixaTexto;
