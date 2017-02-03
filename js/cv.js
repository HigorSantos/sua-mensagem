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
	var modo_debug_compart = true;

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

	var conversions = {
	  stringToBinaryArray: function(string) {
	    return Array.prototype.map.call(string, function(c) {
	      return c.charCodeAt(0) & 0xff;
	    });
	  },
	  base64ToString: function(b64String) {
	    return atob(b64String);
	  }
	};

    var 
    	classe_fonte 			= iniciador.fonte,
    	classe_forca 			= iniciador.forca ,
    	classe_escrita 			= iniciador.escrita ,
    	classe_sombra 			= iniciador.sombra,
    	classe_destaque_texto	= "inverte",
    	classe_background 		= iniciador.background,
    	classe_formato 			= iniciador.formato,
    	classe_borda 			= iniciador.borda,
    	//canvas_imagem = $("<canvas/>").attr("id","canvas_imagem") ,
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

		//Função que esconde os objetos que compratilharm a imagem
		// no facebook
		esconde_compartilha_facebook(true);

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

		//Vai para a imagem
		if (!modo_debug){
			console.log("Posição imagem: " + $( "#ponto_imagem" ).offset().top);
		}

	    $('html, body').animate({
	        scrollTop: $( "#ponto_imagem" ).offset().top
	    }, 500);

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

    /**
	* Esconde os objetos utilizados
	* usados para compartilhar imagem no facebook
    */
    function esconde_compartilha_facebook(parcial){

    	$("#descricao_imagem_fb").val();
    	$("#objetos_compartilha").slideUp();

    	if (parcial==true){
    		$("#comentario").slideUp();
    	}
    }


    /**
	* Exibe os objetos utilizados
	* usados para compartilhar imagem no facebook
    */
    $( "#inicia_compartilhar_facebook" ).on( "click", function() {
    	$("#objetos_compartilha").slideDown();
    });


    /*
	* Exibe 
    */

    /*
    * -----------------
    * Carrega as coisas do facebook
    */
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '1241288265961400',
		  version: 'v2.8' // or v2.1, v2.2, v2.3, ...
		});     
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		//FB.getLoginStatus(updateStatusCallback);
	});

	$( "#envia_imagem_facebook" ).on( "click", function() {

		//Onde serão exibidas as mensagens
		var sp_info_compartilha = $("#informa_compartilha");
		var sp_informa_msg = $("#informa_msg");

		FB.login(function(response) {

			if (response.authResponse) {
				if(modo_debug_compart){
					console.log('Logado. Pegando informações');
				}

				FB.api('/me', function(response) {
					var nome_usuario = response.name;

					if(modo_debug_compart){
						console.log(response);
						console.log('Olá, ' + response.name + '.');
					}

					var auth_response = FB.getAuthResponse();

					//Verifica se a autorização permite postar
					if(auth_response != null){
						//Chama por callback lá no final
						var envia_imagem = function(){
							if (auth_response.grantedScopes.search(/publish_actions/)!=-1){

								var data_image = canvas_url_data.replace(/^data:image\/(png|jpe?g);base64,/, '');
								var str_base64_image = conversions.base64ToString(data_image);
								var txt_descricao_imagem = "";

								if ($("#descricao_imagem_fb")){
									txt_descricao_imagem = $("#descricao_imagem_fb").val();
								}

								var DEFAULT_CALL_OPTS = {
									url: 'https://graph.facebook.com/me/photos',
									type: 'POST',
									cache: false,
									success: function(response) {
												if (modo_debug_compart){
													console.log(response);
												}
											},
									error: function(e) {
												if(modo_debug_compart){
													console.error(e);
												}
											},
									// Os dados serão processados na função lá embaixo
									processData: false,
									/**
									*  Sobreescreve a função envia binario (não existem mais no navegador)
									*/
									xhr: function() {
										var xhr = $.ajaxSettings.xhr();
										xhr.send = function(string) {
											var bytes = conversions.stringToBinaryArray(string);
											XMLHttpRequest.prototype.send.call(this, new Uint8Array(bytes).buffer);
										};
										return xhr;
									}
								};

								/**
								* Cria um POST com os dados, de acordo com os padrões HTTP
								* Dados processado aqui!
								*/
								var composeMultipartData = function(fields, boundary) {
									var data = '';
									$.each(fields, function(key, value) {
										data += '--' + boundary + '\r\n';

										if (value.dataString) { // file upload
											data += 'Content-Disposition: form-data; name=\'' + key + '\'; ' +'filename=\'' + value.name + '\'\r\n';
											data += 'Content-Type: ' + value.type + '\r\n\r\n';
											data += value.dataString + '\r\n';
										} else {
											data += 'Content-Disposition: form-data; name=\'' + key + '\';' + '\r\n\r\n';
											data += value + '\r\n';
										}
									});

									data += '--' + boundary + '--';
									return data;
								};

								/**
								* It sets the multipart form data & contentType
								*/
								var setupData = function(callObj, opts) {
								// custom separator for the data
								var boundary = 'separator de campo ' + Math.random();

								// set the data
								callObj.data = composeMultipartData(opts.fb, boundary);

								// .. and content type
								callObj.contentType = 'multipart/form-data; boundary=' + boundary;
								};

								//Metodo que chama o post
								var postImage = function(opts) {

									// create the callObject by combining the defaults with the received ones
									var callObj = $.extend({}, DEFAULT_CALL_OPTS, opts.call);

									// append the access token to the url
									callObj.url += '?access_token=' + opts.fb.accessToken;

									// set the data to be sent in the post (callObj.data = *Magic*)
									setupData(callObj, opts);

									// POST the whole thing to the defined FB url
									$.ajax(callObj);
								};

								postImage({
									fb: { // data to be sent to FB
										caption: txt_descricao_imagem,
										/* place any other API params you wish to send. Ex: place / tags etc.*/
										accessToken: FB.getAccessToken(),
										file: {
											name: 'sua_mensagem.png',
											type: 'image/png',
											dataString: str_base64_image
										}
									},
									call: { // options of the $.ajax call
										url: 'https://graph.facebook.com/me/photos',
										success: function(dados){//resposta final aqui
											exibe_mensagem(
												"Imagem compartilhada!!",
												sp_info_compartilha,
												"informa",
												8000
												);

											//Esconde os campos de compartilhamento
											esconde_compartilha_facebook(false);

											if (modo_debug_compart){
												console.log(dados);
											}
										},
										error: function(e){
											exibe_mensagem(
												"Ocorreu um erro ao compartilhar. :( Se estiver no celular, clique e segure na imagem para compartilhar diretamente pelo celular.",
												sp_info_compartilha,
												"informa_erro",
												15000
												);

											if (modo_debug_compart){
												console.log(e);
											}
										},
									}
								});

							}else{
								exibe_mensagem(
									"Você não autorizou o Sua Mensagem a postar no seu perfil. Se desejar, clique novamente em Compartilhar Imagem.",
									sp_info_compartilha,
									"informa_atencao",
									12000
									);
							}
						};//FIM envia_imagem()

						/*Exibe o aguarde e chama função de envio acima*/
						exibe_mensagem(
							"Enviando imagem para o Facebook. Aguarde, por favor.",
							sp_informa_msg,
							"informa_msg",
							0,
							envia_imagem
							);
					}else{
						exibe_mensagem(
							"Você não autorizou o Sua Mensagem a postar no seu perfil. Se desejar, clique novamente em Compartilhar Imagem.",
							sp_info_compartilha,
							"informa_atencao",
							12000
							);
					}

				});//FIM FB.api('/me'
				
			} else {
				exibe_mensagem(
					"Você não está logado no Facebook. Se desejar, clique novamente em Compartilhar Imagem.",
					sp_info_compartilha,
					"informa_atencao",
					12000
					);
			}

			//Some com mensagem de aguarde.
			/*sp_informa_msg.text("");
			sp_informa_msg.slideUp()*/
		}, {
			scope: 'publish_actions',
			return_scopes: true
		});
  
	});//FIM função
	
	/*
	* Exibe uma mensagem
	* @param texto A mensagem
	* @param onde O objeto jQuery. Não pode ser campo de form
	* @param classe A(s) classe(s) que devem ser adicionadas
					se mais de uma, separar por virgula
	* @param delay Em milisegundos quando tempo para desaparecer.
					Se zero, não desaparece
	*/
	function exibe_mensagem(texto, onde, classe, delay, callback){
		
		if(callback!=null){
			onde
				.removeClass()
				.text(texto)
				.addClass(classe)
				.slideDown(200, 
							callback());
		}else{
			onde
				.removeClass()
				.text(texto)
				.addClass(classe)
				.slideDown();

			if (delay>0){
				onde.delay(delay)
					.slideUp();
			}
		}

	}
}(self));