function ClassFormataTexto(tamanho_fonte, debug){
	const modo_debug = debug?true:false;
	let fntSz = tamanho_fonte?tamanho_fonte:120;

	/*
	* Define o tamanho do texto de acordo com tamanho do bloco onde ele está
	* @param bloco_externo contém o span com o textos.
	* @param bloco_interno span onde o texto de fato estará.
	*/
	function scaleText(bloco_externo, bloco_interno){
		const winW = bloco_externo.innerWidth();
		const winH = bloco_externo.innerHeight();

		const wRatio = bloco_interno.outerWidth() / winW;
		const hRatio = bloco_interno.outerHeight() / winH;

		if (wRatio==null || winW==null){
			alert("Eita, deu erro. :(");

			return false;
		}

		if (modo_debug){
			console.log	("winW: "  + winW);
			console.log	("wRatio: "  + wRatio);
			console.log	("outerWidth: "  + bloco_interno.outerWidth());
			console.log	("outerHeight: "  + bloco_interno.outerHeight());
		}

		if( wRatio <= 1 ){

			while( bloco_interno.outerWidth() < winW  ){
				
				if (modo_debug){
					console.log("outerWidth < winW");
				}

				fntSz++;
				
				bloco_externo.fontSize=fntSz+"px";
				bloco_interno.fontSize=fntSz+"px";
				
			}

			while( bloco_interno.outerHeight() > winH ){   /* never true? */
				
				if (modo_debug){
					console.log("outerHeight > winH");
				}

				fntSz--;
				bloco_externo.fontSize = fntSz+"px";
				bloco_interno.fontSize = fntSz+"px";
			}
		}else{
			while( bloco_interno.outerWidth() > winW ){
				if (modo_debug){
					console.log("fntSz--(1)");
				}

				fntSz--;

				bloco_externo.fontSize = fntSz+"px";
				bloco_interno.fontSize = fntSz+"px";

			}
			while( bloco_interno.outerHeight() > winH ){
				if (modo_debug){
					console.log("fntSz--(2)");
				}

				fntSz--;

				bloco_externo.fontSize = fntSz+"px";
				bloco_interno.fontSize = fntSz+"px";
			}
		}

		bloco_interno.top=((winH - bloco_interno.outerHeight()) / 2 )+'px';
		bloco_interno.left=((winW - bloco_interno.outerWidth()) / 2 )+'px';

		if (modo_debug){
			console.log("FIM SCALE");
		}

		return true;
	}//Fim: scale
}