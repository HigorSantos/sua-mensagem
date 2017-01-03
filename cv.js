var fntSz = 100;

function scaleText(){

		var winW = $('#bloco').innerWidth();
		var winH = $('#bloco').innerHeight();

		var wRatio = $('#onde').outerWidth() / winW;
		var hRatio = $('#onde').outerHeight() / winH;

/*console.log('winW: ' + winW);
console.log('winW: ' + winH);

console.log('outerWidth: ' + $('#onde').outerWidth());
console.log('outerHeight: ' + $('#onde').outerHeight());

console.log('wRatio: ' + wRatio);
console.log('hRatio: ' + hRatio);*/

		if( wRatio <= 1 ){
			j=1
			while( $('#onde').outerWidth() < winW ){
			/*	console.log('outerWidth: ' + $('#onde').outerWidth());
				console.log('winW: ' + winW);
*/

				fntSz++;

				$('#onde').css( 'font-size', fntSz+"px" );

				/*console.log('## > '+$('#onde').outerWidth());
				console.log('## > '+winW);*/
			}
			/*console.log('___ '+fntSz);*/
			while( $('#onde').outerHeight() > winH ){   /* never true? */

				fntSz--;
				$('#bloco').css( 'font-size', fntSz+"px" );
				$('#onde').css( 'font-size', fntSz+"px" );

				/*console.log('#- > '+$('#onde').outerHeight());
				console.log('#- > '+ winH);*/
			}
		
		}else{
			/*console.log('+* > '+$('#onde').outerWidth());
			console.log('+* > '+winW);*/

			while( $('#onde').outerWidth() > winW ){
				/*console.log('___ '+fntSz);*/
				fntSz--;
				
				$('#onde').css( 'font-size', fntSz+"px" );

				/*console.log('** > '+$('#onde').outerWidth());
				console.log('** > '+winW);*/
			}
			while( $('#onde').outerHeight() > winH ){

				fntSz--;
				$('#onde').css( 'font-size', fntSz+"px" );

				/*console.log('-* > '+$('#onde').outerWidth());
				console.log('-* > '+winW);*/
			}
		}

		//$('#onde').css( 'top', (winH - $('#onde').outerHeight()) / 2 );

}