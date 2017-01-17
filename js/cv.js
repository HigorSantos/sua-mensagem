/**
 * v0.40
 */
(function(){
"use strict";
	
	/*
	* Define o modo de execução
	 */
	var modo_debug = false;

	var iniciador = {
		fonte:"space_mono", 
		forca:"forca_normal", 
		escrita:"escrita_maiuscula"
	};

	if (modo_debug){
		iniciador = {
			fonte:"poiret_one", 
			forca:"forca_normal", 
			escrita:"escrita_maiuscula"
		};
	}

    var 
    	classe_fonte = iniciador.fonte,
    	classe_forca = iniciador.forca ,
    	classe_escrita = iniciador.escrita ,
    	classe_destaque_texto = "inverte" ,
    	//canvas_imagem = $("<canvas/>") ,
    	nome_arquivo = "imagem_fantastica.png" ,
		fntSz = 120,
		mm_contador = 180,
		fonte_diferenca_maior = 40,
		span_contator = $("#contador"),
		span_carregando = $("<span/>").append($("<em/>").text("Carregando...")).css("display","none");

	/* Inicia os elementos */
    $("#imagem_final").attr("src","");
    $("#bloco").removeClass();
    $("#bloco").addClass(classe_fonte).addClass(classe_forca).addClass(classe_escrita);
	$("#bloco").append(span_carregando);

    //Seleciona os radio box, de acordo com a inicialização
    $("#"+classe_fonte).attr("checked","checked");
    $("#"+classe_forca).attr("checked","checked");
    $("#"+classe_escrita).attr("checked","checked");

    span_contator.text("0/" + mm_contador);

    /* 
	*	Altera tamanho do texto sempre que necessáro
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

			var dif_fonte = 0;
     		var qtd_caracter_texto = $('textarea').val().length

			//Seta fonte diferenciada
			//para a fonte poiret one que é maior que as outras
			/*if(classe_fonte=="poiret_one" ){
				dif_fonte = fonte_diferenca_maior;
			}else if(qtd_caracter_texto > 150){
				dif_fonte = fonte_diferenca_maior+10;
			}*/

			while( bloco_interno.outerWidth() < winW  ){
				
				if (modo_debug){
					console.log("outerWidth < winH");
				}

				fntSz++;
				
				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
				
			}

			while( bloco_interno.outerHeight() > winW ){   /* never true? */
				

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
			while( bloco_interno.outerHeight() > winW ){
				if (modo_debug){
					console.log("fntSz--(2)");
				}

				fntSz--;

				bloco_externo.css( 'font-size', fntSz+"px" );
				bloco_interno.css( 'font-size', fntSz+"px" );
			}
		}

		if (modo_debug){
			console.log("FIM SCALE");
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

		if (txt.val()==""){
			return;
		}

		bloco.css("display","table-cell");

		/*Limpa o que existe e coloca novo texto*/
		onde.text("");

		var texto = txt.val();

		//Faz algumas substituições de texto para html
		texto = texto.replace(/\n/g,'<br/>');
		
		/*Destaca o texto entre cerquilha*/
		var primeira_ocor_cerquilha = texto.indexOf("#");
		var ultima_ocor_cerquilha = texto.lastIndexOf("#");

		//Verifica se sendo aberto e fechado
		if (primeira_ocor_cerquilha != ultima_ocor_cerquilha){
			//Inicia o texto e abre tag span
			var texto_auxiliar = texto.substring(0, primeira_ocor_cerquilha);
			texto_auxiliar += '<span class="' + classe_destaque_texto + '">';

			//Coloca o que estava entre as # e fecha tag span
			texto_auxiliar += texto.substring(primeira_ocor_cerquilha+1,ultima_ocor_cerquilha);
			texto_auxiliar += '</span>';
			texto_auxiliar += texto.substring(ultima_ocor_cerquilha+1,texto.length);

			//Substitui texto com o editado
			texto = texto_auxiliar;
		}
		
		//Aqui, coloco algumas coisas legais no texto
		texto = texto.replace(/<3/g,'&#9829;');
		texto = texto.replace(/<\/3/g,'&#128148;').replace(/<,3/g,'&#128148;');
		texto = texto.replace(/:\)/g,'&#9786;');
		texto = texto.replace(/:\(/g,'&#9785;');

		onde.html(texto);
		span_carregando.fadeIn();

		/*Deixa o texto do tamanho correto*/
		if (scaleText(bloco, onde)){ //Se der tudo certo, gera a imagem.

			/* Gera canvas pra pegar imagem */
			html2canvas(bloco, {
			  background: '#fff',
			  logging:modo_debug,
			  onrendered: function(canvas_imagem) {
			    canvas_imagem.id = "cv_imagem2";

			    $("#imagem_final").attr("src", canvas_imagem.toDataURL("image/jpeg",0.8) );
			   
			    if (!modo_debug){
			    	$("#imagem_final").css("display", "block");/*debug*/
			    }

				$("#comentario").fadeIn();
			  }
			});

		}//FIM:scale
		span_carregando.fadeOut();

		if (!modo_debug){
			bloco.css("display","none");/*debug*/
		}

	});//FIM:btn_gera_imagem(click)

	/* 
	* Trata os input.
	* Usado basicamente para a seleção
	* dos radio que estilizam as mensagens.
	*/
    $( "input" ).on( "click", function() {

    	//Limpa bloco de texto
    	$("#onde").text("");

    	/* Trada alteração na fonte */
		if ($(this).attr("name")=='fonte'){
		    classe_fonte = $(this).val();

		    $("#bloco").removeClass();

		    $("#bloco").addClass(classe_fonte).addClass(classe_forca).addClass(classe_escrita);
		 }

		/* Trata seleção do peso da fonte */
		if ($(this).attr("name")=='forca'){
			classe_forca = $(this).val();

			$("#bloco").removeClass();
			$("#bloco").addClass(classe_forca).addClass(classe_fonte).addClass(classe_escrita);
		}

		/* Trata alteração na forma como o texto é exibido */
		if ($(this).attr("name")=='escrita'){
			classe_escrita = $(this).val();

			$("#bloco").removeClass();
			$("#bloco").addClass(classe_escrita).addClass(classe_forca).addClass(classe_fonte);
		}
    });

    /*
    * Limita tamanho do texto no textarea
    */
    $('textarea').on( 'input', function(){
      var inputStr = $(this).val();

      if( inputStr.length > mm_contador ){
        inputStr = inputStr.slice(0, mm_contador);
        $(this).val( inputStr );

        span_contator.text("Sem textão!!")
        			.fadeOut(2000,function(){
        				span_contator.text(inputStr.length + "/" + mm_contador);
        			}).fadeIn();
      }else{
      	span_contator.text(inputStr.length + "/" + mm_contador);
      }

      
    });

    /*
    * Exibe coisas legais!
     */
    var esconde_coisas_legais = false;
    $( "#det_coisas_legais" ).on( "click", function() {

    	if (esconde_coisas_legais){
    		$("#coisas_legais").fadeOut();
    		$(this).text("Ah, olha o que da pra fazer de legal!");
    	}else{
    		$("#coisas_legais").fadeIn();
    		$(this).text("Bacana né? [clique aqui para esconder]");
    	}

    	esconde_coisas_legais = !esconde_coisas_legais;
    });

    /*
    * Salva a imagem em png
     */
    /*$( "#salva_imagem" ).on( "click", function() {

    	if (canvas_imagem){
	    	canvas_imagem.toBlobHD(function(blob) {
				saveAs(
						blob,
						nome_arquivo
				);
			}, "image/png");
		}
    });*/

    /*
    * Carrega as imagens de exemplo   
    * Ta aqui para o html não esperar
    * o download delas e não carregar o que importa 
     */
    (function(){
    	//O nome das imgens ta como ex*.png
    	//* é um número
    	var caminho = "img/";
    	var qtd_img = 4;
    	var i = 0;

    	for (i=1; i <= qtd_img; i++){
    		$(".img_ex"+i).attr("src",caminho + "ex" + i + ".png");
    	}
    })();

}(self));