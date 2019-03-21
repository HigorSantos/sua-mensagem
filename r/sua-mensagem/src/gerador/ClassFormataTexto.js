import $ from "jquery";
export default class{
	constructor(tamanhoFonte, debug) {
		this.modo_debug = debug?true:false;
		this.tamanhoFonte = tamanhoFonte?tamanhoFonte:120;
 	}

	scaleText(texto, bloco, blocoE, blocoI){
		/**
		* TODO: Verificar troca do jquery por window.getComputedStyle;
		* ver no link como faze-lo https://jsfiddle.net/api/mdn/
		* https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
		*/
		let bloco_fundo = $('#'+bloco);
		let bloco_externo = $('#'+blocoE);
		let bloco_interno = $("#"+blocoI);

		const marginTopBlocoE = this.getNumberCss(bloco_externo.css('margin-top'));
		const marginLeftBlocoE = this.getNumberCss(bloco_externo.css('margin-top'));
		bloco_externo.css('height', bloco_fundo.height()-(marginTopBlocoE*2));
		bloco_externo.css('width', bloco_fundo.width()-(marginLeftBlocoE*2));
		bloco_interno.css('top','0');


		//let conteudoNovo = document.createTextNode(texto);
		bloco_interno.text(texto);
		bloco_externo.append(bloco_interno);

		const winW = bloco_externo.innerWidth();
		const winH = bloco_externo.height();
		const wRatio = bloco_interno.outerWidth() / winW;
		const hRatio = bloco_interno.outerHeight() / winH;
		
		if (this.modo_debug){
			console.log	("winW: "  + winW);
			console.log	("winH: "  + winH);
			console.log	("wRatio: "  + wRatio);
			console.log	("(int)outerWidth: "  + bloco_interno.outerWidth());
			console.log	("(int)outerHeight: "  + bloco_interno.outerHeight());
			console.log("---------------------------------");
		}

		if (!wRatio || !winW){
			alert("Eita, deu erro. :(");

			return null;
		}

		let fntSz = this.tamanhoFonte;
		let cont = 0, parar=2000;

		if(wRatio <= 1 ){

			while( bloco_interno.outerWidth() < winW || bloco_interno.outerHeight() < winH ){

				fntSz++;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
				
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerWidth(): " + bloco_interno.outerWidth());
					console.log("winW: " + winW);
					console.log("outerWidth < winW\n------------------");
				}

				cont++;
				if (cont>parar) break;
				else continue;
			}
			while( bloco_interno.outerHeight() > winH ){   /* never true? */

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
				
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerHeight(): " + bloco_interno.outerHeight());
					console.log("winH: " + winH);
					console.log("outerHeight > winH");
				}

				cont++;
				if (cont>parar) break;
				else continue;
			}
		}else{
			while( bloco_interno.outerWidth() > winW ){

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
				
				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerWidth(): " + bloco_interno.outerWidth());
					console.log("winW: " + winW);
					console.log("fntSz--(w1)");
				}

				cont++;
				if (cont>parar) break;
				else continue;
			}
			while( bloco_interno.outerHeight() > winH ){

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

				if (this.modo_debug){
					console.log("fntSz: " + fntSz);
					console.log("bloco_interno.outerHeight(): " + bloco_interno.outerHeight());
					console.log("winH: " + winH);
					console.log("fntSz--(w2)");
				}

				cont++;
				if (cont>parar) break;
				else continue;
			}
		}

		const top = ((bloco_externo.height() - bloco_interno.outerHeight()) / 2 )+'px';
		const left = ((winW - bloco_interno.outerWidth()) / 2 )+'px';

		const retorno = {
			interno: {
				top: top,
				/*left: left,*/
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

	getNumberCss(el){
		return !el.includes('%') ? el.replace('px',''):0;
	}
}