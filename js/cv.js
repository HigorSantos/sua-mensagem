/**
 * v0.51
 */
(function(){
"use strict";
	
	/*
	* Define o modo de execução
	 */
	var modo_debug = false;
	var modo_debub_rapido = false;

	var iniciador = {
		fonte:"oswald", 
		forca:"forca_normal", 
		escrita:"escrita_maiuscula",
		sombra:"",
		background:"none",
		formato:"form_quadrado",
		borda:"borda_sem"
	};

	if (modo_debug){
		iniciador = {
			fonte:"oswald", 
			forca:"forca_normal", 
			escrita:"escrita_maiuscula",
			sombra:"sombra",
			background:"none",
			formato:"form_quadrado",
			borda:"borda_sem"
		};
	}

    var 
    	classe_fonte 			= iniciador.fonte,
    	classe_forca 			= iniciador.forca ,
    	classe_escrita 			= iniciador.escrita ,
    	classe_sombra 			= iniciador.sombra,
    	classe_destaque_texto	= "inverte",
    	classe_background 		= iniciador.background,
    	classe_formato 			= iniciador.formato,
    	classe_borda 			= iniciador.borda,
    	//canvas_imagem = $("<canvas/>") ,
    	canvas_url_data = "",
    	nome_arquivo 	= "imagem_fantastica.png" ,
		fntSz 			= 120,
		mm_contador		= 180,
		span_contator	= $("#contador"),
		span_carregando	= $("<span/>").append($("<em/>").text("Carregando...")).css("display","none"),
		contador_erro	= 0;

	/* Inicia os elementos */
    $("#imagem_final").attr("src","");
    //Adiciona classes padrões
    adiciona_classes_bloco();
	$("#bloco").append(span_carregando);

    //Seleciona os radio box, de acordo com a inicialização
    $("#"+classe_fonte).attr("checked","checked");
    $("#"+classe_forca).attr("checked","checked");
    $("#"+classe_escrita).attr("checked","checked");

    //Inicia campo que mostra o contador de caracteres
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

	/*
	* Lê texto estilizado
	* Gera a imagem.
	* Disponibiliza para o usuário
	*/
	$( "#btn_gera_imagem" ).on( "click", function() {
		var bloco = $("#bloco");
		var bloco_a = $("#bloco a");
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
		texto = texto.replace(/' '/g,'&nbsp;');
		texto = texto.replace(/-----/g,'<hr/>');

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
		if (scaleText(bloco_a, onde)){ //Se der tudo certo, gera a imagem.

			/* Gera canvas pra pegar imagem */
			if (!modo_debub_rapido){
				html2canvas(bloco, {
				  background: '#fff',
				  logging:modo_debug,

				  onrendered: function(canvas_imagem) {
				  	canvas_url_data = canvas_imagem.toDataURL("image/png",0.9);

				    $("#imagem_final").attr("src", canvas_url_data );
				   
				    if (!modo_debug){
				    	$("#imagem_final").css("display", "block");/*debug*/
				    }

					$("#comentario").fadeIn();
				  }
				});
			}
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
    	$("#bloco").removeClass();

    	/* Trada alteração na fonte */
		if ($(this).attr("name")=='fonte'){
		    classe_fonte = $(this).val();

		    adiciona_classes_bloco();
		    adiciona_classes_opc($("#fonte_escolhida"), classe_fonte);
		 }

		/* Trata seleção do peso da fonte */
		if ($(this).attr("name")=='forca'){
			classe_forca = $(this).val();

			adiciona_classes_bloco();

			adiciona_classes_opc($("#forca_escolhida"), classe_forca);
		}

		/* Trata alteração na forma como o texto é exibido */
		if ($(this).attr("name")=='escrita'){
			classe_escrita = $(this).val();

			adiciona_classes_bloco();

			adiciona_classes_opc($("#escrita_escolhida"), classe_escrita);
		}

		//background
		if ($(this).attr("name")=='background'){
			classe_background = $(this).val();

			adiciona_classes_bloco();

			adiciona_classes_opc($("#fundo_escolhida"), classe_background);
		}

		//Formato da imagem
		if ($(this).attr("name")=='formato'){
			classe_formato = $(this).val();
			$("#imagem_final").removeClass().addClass(classe_formato);

			adiciona_classes_bloco();

			adiciona_classes_opc($("#formato_escolhida"),classe_formato);
		}

		//Adiciona borda
		if ($(this).attr("name")=='borda'){
			classe_borda = $(this).val();

			adiciona_classes_especial($("#bloco a"), classe_borda);

			adiciona_classes_opc($("#borda_escolhida"),classe_borda);

			//Se tiver borda ativa um margin diferente para a marca
			if(classe_borda=="borda_com"){
				adiciona_classes_especial($("#marca"),"space_mono marca_com_borda");

				//Mostra mensagem
				$("#informa_borda").fadeIn().delay(8000).slideUp();
			}else{
				adiciona_classes_especial($("#marca"),"space_mono marca_sem_borda");
			}
		}

		/*--------------
		* Exibe / mostra URL como "marca" da imagem no canto inferior
		 */
		if ($(this).attr("name")=='exibe_marca'){

			if($(this).prop("checked")){
				$("#marca").hide();
			}else{
				$("#marca").show();
			}
		}
    });

    /*
    * Adiciona as classes que estilizam o texto
     */
    function adiciona_classes_bloco(){

		$("#bloco").removeClass();
		$("#bloco").addClass(classe_escrita)
					.addClass(classe_forca)
					.addClass(classe_fonte)
					.addClass(classe_sombra)
					.addClass(classe_background)
					.addClass(classe_formato);
    }

    /*Adiciona classes as opções selecionadas*/
    function adiciona_classes_opc(obj, classe){
		obj.text($("label."+classe).text())
	    	.removeClass()
	    	.addClass(classe)
	    	.addClass("escolhido");
    }

    /*
    * Adiciona as classes que estilizam algum outro elemento
     */
    function adiciona_classes_especial(obj,classe){

		obj.removeClass();
		obj.addClass(classe);
    }

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
    		$("#coisas_legais").slideUp();
    		$(this).text("Ah, olha o que da pra fazer de legal!");
    	}else{
    		$("#coisas_legais").slideDown();
    		$(this).text("Bacana né? [clique aqui para esconder]");
    	}

    	esconde_coisas_legais = !esconde_coisas_legais;
    });


    /**
    * CONTROLA EXIBIÇÃO DAS CONFIGURAÇÕES
    */
    $( ".opc" ).on( "click", function() {
    	var nome_opc = $(this).attr("id");

    	if ($("."+nome_opc).css("display")=="none"){
			$("."+nome_opc).slideDown();
		}else{
			$("."+nome_opc).slideUp();
		}

	});
    

    /*
    * Carrega as imagens de exemplo   
    * Ta aqui para o html não esperar
    * o download delas e não carregar o que importa 
     */
    (function(){
    	//O nome das imgens ta como ex*.png
    	//* é um número
    	var caminho = "img/";
    	var qtd_img = 2;
    	var i = 0;

    	for (i=1; i <= qtd_img; i++){
    		$(".img_ex"+i).attr("src",caminho + "ex" + i + ".jpg");
    	}
    })();

	/*
	* FIM
	*/

}(self));