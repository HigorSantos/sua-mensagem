function ClassFormataTexto(debug){
	
	/*
	* Define o tamanho do texto de acordo com tamanho do bloco onde ele está
	* @param bloco_externo contém o span com o textos.
	* @param bloco_interno span onde o texto de fato estará.
	*/
	function scaleText(bloco_externo, bloco_interno){
		var winW = bloco_externo.innerWidth();
		var winH = bloco_externo.innerHeight();

		var wRatio = bloco_interno.outerWidth() / winW;
		var hRatio = bloco_interno.outerHeight() / winH;

		if (wRatio==null || winW==null){
			alert("Eita, deu erro. :(");

			contador_erro++;
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
				
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
				
			}

			while( bloco_interno.outerHeight() > winH ){   /* never true? */
				

				if (modo_debug){
					console.log("outerHeight > winH");
				}

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
		}else{
			while( bloco_interno.outerWidth() > winW ){
				if (modo_debug){
					console.log("fntSz--(1)");
				}

				fntSz--;

				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );

			}
			while( bloco_interno.outerHeight() > winH ){
				if (modo_debug){
					console.log("fntSz--(2)");
				}

				fntSz--;

				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
		}

		bloco_interno.css( 'top', (winH - bloco_interno.outerHeight()) / 2 );
		bloco_interno.css( 'left', (winW - bloco_interno.outerWidth()) / 2 );

		if (modo_debug){
			console.log("FIM SCALE");
		}

		return true;
	}//Fim: scale
}