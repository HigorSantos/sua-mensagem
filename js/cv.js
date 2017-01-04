$(function(){
    var fonte = "space_mono";
    var forca = "forca_normal"; 
    var escrita = "escrita_maiuscula";

	var fntSz = 100;

	/* Limpa imagem se houver alteração */
    $("#imagem_final").attr("src","");


    /* 
	*	Altera tamanho do texto sempre que necessário
    */
	function scaleText(bloco_externo, bloco_interno){

		var winW = bloco_externo.innerWidth();
		var winH = bloco_externo.innerHeight();

		var wRatio = bloco_interno.outerWidth() / winW;
		var hRatio = bloco_interno.outerHeight() / winH;

		if (wRatio==null || winW==null){
			alert("Eita que deu erro. :(")
			return false;
		}

		if( wRatio <= 1 ){

			while( bloco_interno.outerWidth() < winW ){

				fntSz++;

				bloco_interno.css( 'font-size', fntSz+"px" );
			}

			while( bloco_interno.outerHeight() > winH ){   /* never true? */

				fntSz--;
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
		}else{
			while( bloco_interno.outerWidth() > winW ){
				fntSz--;
				
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
			while( bloco_interno.outerHeight() > winH ){

				fntSz--;
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
		}

		return true;
	}//Fim: scale

	/*
	* Lê texto estilizado
	* Gera a imagem.
	* Disponibiliza para o usuário
	*/
	$( "#btn_gera_imagem" ).on( "click", function() {
		var bloco = $("#bloco");
		var onde = $("#onde");
		var txt = $("#texto");

		bloco.css("display","table-cell");

		/*Limpa o que existe e coloca novo texto*/
		onde.text("");
		onde.text(txt.val());

		/*Deixa o texto do tamanho correto*/
		if (scaleText(bloco, onde)){ //Se der tudo certo, gera a imagem.

			/* Gera canvas pra pegar imagem */
			html2canvas(bloco, {
			  background: '#fff',
			  onrendered: function(canvas) {
			    canvas.id = "imagem";

			    $("#imagem_final").attr("src", canvas.toDataURL("image/jpeg",1.0) );
			    $("#imagem_final").css("display", "block");
			    //document.body.appendChild(canvas);
			  }
			});
		}

		$("#comentario").css("display", "block");
		
		bloco.css("display","none");
		
	});//FIM:vai

	/* 
	* Trata os input.
	* Usado basicamente para a seleção
	* dos radio que estilizam as mensagens.
	*/
    $( "input" ).on( "click", function() {

    	/* Trada alteração na fonte */
		if ($(this).attr("name")=='fonte'){
		    fonte = $(this).val();

		    $("#bloco").removeClass();

		    $("#bloco").addClass(fonte).addClass(forca).addClass(escrita);
		 }

		/* Trata seleção do peso da fonte */
		if ($(this).attr("name")=='forca'){
			forca = $(this).val();

			$("#bloco").removeClass();
			$("#bloco").addClass(forca).addClass(fonte).addClass(escrita);
		}

		/* Trata alteração na forma como o texto é exibido */
		if ($(this).attr("name")=='escrita'){
			escrita = $(this).val();

			$("#bloco").removeClass();
			$("#bloco").addClass(escrita).addClass(forca).addClass(fonte);
		}

    });

    /*
    * Limita tamanho do texto no textarea
    */
    $('textarea').on( 'input', function(){
      var inputStr = $(this).val();

      if( inputStr.length > 50 ){
        inputStr = inputStr.slice(0, 50);
      }
      $(this).val( inputStr );
    });
});