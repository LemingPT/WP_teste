function contador()
{
		document.write("<div id='temporizador'>");
		document.write("<div class='container'>");
		document.write("<div id='minute'>00</div>");
		document.write("<div id='divider'>:</div>");
		document.write("<div id='second'>00</div>");
		document.write("</div>");
		document.write("<button id='btn-Iniciar'>Iniciar</button>");
		document.write("</div>");

	jQuery(document).ready(function(){

		var temporizador = {
			hora: 0,
			minuto: 0,
			segundo: 0
		};

		var iniciar_cronometro = null;

		jQuery("#btn-Iniciar").click(function(){
			if ( $(this).text() == 'Iniciar' )
			{
				$(this).text('Pausar');                        
				iniciar_cronometro = setInterval(function(){
					// Segundos
					temporizador.segundo++;
					if(temporizador.segundo >= 60)
					{
						temporizador.segundo = 0;
						temporizador.minuto++;
					}      


					$("#minute").text(temporizador.minuto < 10 ? '0' + temporizador.minuto : temporizador.minuto);
					$("#second").text(temporizador.segundo < 10 ? '0' + temporizador.segundo : temporizador.segundo);
				}, 1000);
			}
			else 
			{
				$(this).text('Iniciar');
				console.log(temporizador.minuto+":"+temporizador.segundo);
				clearInterval(iniciar_cronometro);
			}
		})
	})
};