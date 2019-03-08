import React, { Component } from 'react';
import './Rodape.css';

class Rodape extends Component {
	render() {
		return (
			<footer className="Rodape">
			    <p>
			      Ei, siga a página <a href="https://www.facebook.com/suamensagemlinda/">Sua Mensagem no facebook.</a>
			    </p>
			    <p>
			      Mas, você pode compartilhar só o site com os amigos.
			      <span role="img" aria-label="Carinha sorridente"> &#9786; </span>
			      <span class="fb-share-button" data-href="http://higorsantos.github.io/sua-mensagem/" data-layout="button" data-size="large" data-mobile-iframe="true">
			      	<a class="fb-xfbml-parse-ignore" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fhigorsantos.github.io%2Fsua-mensagem%2F&amp;src=sdkpreparse">Compartilhar</a>
			      </span>
			    </p>

			    <p>Quem fez tudo isso? Eu, <a href="https://twitter.com/higorsantos_" target="_blank" rel="noopener noreferrer">Higor Santos</a> do <a href="http://hinfos.com" target="_blank" rel="noopener noreferrer">Hinfos.com</a>.</p>
			    
			    <p class="creditos">Alguns créditos:</p>
			    <p>As imagens de fundo que deixam tudo ainda mais bonito, são do site <a href="https://subtlepatterns.com" target="_blank" rel="noopener noreferrer">Subtle Patterns</a>.</p>
			    <p>Mais algumas coisas que utilizei, junto com o código disso aqui, você consegue no <a href="https://github.com/HigorSantos/sua-mensagem">meu GitHub</a>. Pode ir lá, uso "The MIT License". :)</p>
			    <p><em>Ah, caso você esteja usando um navegador antigo e alguma coisa saia fora do controle, peço que use algo mais novo para aproveitar todo o nosso potencial. =D</em></p>
			    
			    <pre>Sua Mensage - Alpha r0.1</pre>
			</footer>
		);
	}
}

export default Rodape;
