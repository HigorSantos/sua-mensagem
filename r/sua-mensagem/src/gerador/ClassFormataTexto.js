import $ from "jquery";
export default class{
	constructor(alturaExterno, larguraExterno, estilos, tamanhoFonte, debug) {
    	this.alturaExterno = alturaExterno;
    	this.larguraExterno = larguraExterno;
		this.modo_debug = debug?true:false;
		this.tamanhoFonte = tamanhoFonte?tamanhoFonte:120;
		this.estilos = JSON.stringify(estilos);
 	}

	scaleText(texto, blocoE, blocoI){
		/**
		* TODO: Verificar troca do jquery por window.getComputedStyle;
		* ver no link como faze-lo https://jsfiddle.net/api/mdn/
		* https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
		*/
		let bloco_externo = $('#'+blocoE);
		let bloco_interno = $("#"+blocoI);

		let conteudoNovo = document.createTextNode(texto);
		bloco_interno.append(conteudoNovo);
		bloco_externo.append(bloco_interno);

		const winW = bloco_externo.innerWidth();
		const winH = bloco_externo.innerHeight();

		const wRatio = bloco_interno.outerWidth() / winW;
		const hRatio = bloco_interno.outerHeight() / winH;
		
		if (this.modo_debug){
			console.log	("winW: "  + winW);
			console.log	("wRatio: "  + wRatio);
			console.log	("outerWidth: "  + bloco_interno.outerWidth());
			console.log	("outerHeight: "  + bloco_interno.outerHeight());
			console.log("---------------------------------");
		}

		if (!wRatio || !winW){
			alert("Eita, deu erro. :(");

			return null;
		}

		let fntSz = this.tamanhoFonte;
		let cont = 0, parar=2000;

		if(wRatio <= 1 ){

			while( bloco_interno.outerWidth() < winW  ){
				
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerWidth(): " + bloco_interno.outerWidth());
					console.log("winW: " + winW);
					console.log("outerWidth < winW\n------------------");
				}

				fntSz++;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

				cont++;
				if (cont>parar) break;
				else continue;
			}
			cont = 0;
			while( bloco_interno.outerHeight() > winH ){   /* never true? */
				
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerHeight(): " + bloco_interno.outerHeight());
					console.log("winH: " + winH);
					console.log("outerHeight > winH");
				}

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

				cont++;
				if (cont>parar) break;
				else continue;
			}
		}else{
			while( bloco_interno.outerWidth() > winW ){
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("fntSz--(1)");
				}

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

				cont++;
				if (cont>parar) break;
				else continue;
			}
			while( bloco_interno.outerHeight() > winH ){
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("fntSz--(2)");
				}

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

				cont++;
				if (cont>parar) break;
				else continue;
			}
		}

		const top = ((winH - bloco_interno.outerHeight()) / 2 )+'px';
		const left = ((winW - bloco_interno.outerWidth()) / 2 )+'px';

		const retorno = {
			externo: {
				fontSize: bloco_externo.css('font-size'),
			},
			interno: {
				top: top,
				left: left,
				fontSize: bloco_interno.css('font-size'),
			},
			texto: texto,
		}

		if (this.modo_debug){
			//window.document.body.appendChild(bloco_externo);
			console.log(retorno);
			console.log("cont: "+cont);
			console.log("FIM SCALE");
		}
		return retorno;
	}//Fim: scale
}