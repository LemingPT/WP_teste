/* global rnonce, username */
document.addEventListener("deviceready", onDeviceReady, false);

function motion() {
    console.log(navigator.accelerometer);
}

function getnonce() {
    jQuery.ajax({
                 type: "get",
                 url: "https://laboratoriododesign.com/app/api/get_nonce/?controller=user&method=register",
                 dataType: "jsonp",
                 success: function (data) {     
                     if (data.status === 'ok') {
                          rnonce = data.nonce;
                      } else {
                           alert("Falha de comunicação com o Servidor");
                      }
                 }
                 
    });    

}


//Função login
function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username === "")
    {
        alert("Por Favor Coloque um Utilizador", null, "Username Missing", "OK");
        return;
    }

    if(password === "")
    {
       alert("Por Favor Coloque uma password", null, "Password Missing", "OK");  
        return;
    }

          jQuery.ajax({
                 type: "GET",
                 url: "https://laboratoriododesign.com/app/api/user/generate_auth_cookie/",
                 dataType: "jsonp",
				 data: {username: encodeURIComponent(username), password: encodeURIComponent(password) },
                success: function (data) {                  
                      if (data.status ==='ok') {
                          window.location='#mainmenu';
                      }
                      else {
						   console.log(data.error);
                           alert("Dados de Login Inválidos");
                      }
                 }
             });
	

}

//função registar
function registar()
{
    var rnonce='';
    // função para ir buscar o nonce
    getnonce();
    
    var remail = document.getElementById("remail").value;
    var rnome = document.getElementById("rnome").value;
    var rapelido = document.getElementById("rapelido").value;
    var rusername = document.getElementById("rusername").value;
    var rpassword = document.getElementById("rpassword").value;
    var rdisplay_name = rnome +" "+rapelido; 
    
    jQuery.ajax({
                 type: "GET",
                 url: "https://laboratoriododesign.com/app/api/user/register/?username=" + encodeURIComponent(rusername) + "&email=" + encodeURIComponent(remail) + "&first_name=" + encodeURIComponent(rnome) + "&last_name=" + encodeURIComponent(rapelido) + "&notify=both&user_pass=" + encodeURIComponent(rpassword) + "&nonce=" + encodeURIComponent(rnonce) + "&display_name=" + encodeURIComponent(rdisplay_name),
                 dataType: "jsonp",
                 success: function (data) {     
                     if (data.status ==='ok') {
                          alert("Utilizador Criado com Sucesso");
                          window.location='index.html';
                      } else {
                           alert(data.error);
                      }
                 }
                 
    });
}


//navegação de páginas
jQuery(document).on("pageinit", "#mainmenu", function(){   


			jQuery.ajax({
				

			   url: 'https://laboratoriododesign.com/app/api/get_recent_posts/',

			   type: 'GET',

			   dataType: 'jsonp',

			   success: function(data){
				   
				 console.log(data);

					var items = [];

					$.each(data.posts, function(i, item) {

						   items.push('<li><a href="#" data-id="' + item.id + '">' + item.title + '</a></li>');

					});  // close each()

					$('#posts').append( items.join('') );

			   },

			   error: function(data){

				 console.log(data);

			   }

			 });
			 
		/*jQuery(document).on('vclick', '#posts li a', function(){  
			//console.log($(this).attr("data-id"));
			var paginaid = $(this).attr("data-id");
			jQuery.mobile.changePage( "#contentpage", { transition: "slide", changeHash: false, data: paginaid });
		});*/
		
		jQuery(document).on('vclick', '#posts li a', function(e) {
			e.preventDefault();
			$.mobile.changePage('#contentpage', {
				data: {
					id: this.data-id
				}
			});
});
	 
    
	 
});



//navegação de Páginas
//jQuery(document).on('pagebeforeshow',"#contentpage", function(){ 
jQuery(document).on("pagebeforecreate", "#contentpage", function(){  
    console.log(id);

		jQuery.ajax({
			

		   url: 'https://laboratoriododesign.com/app/?json=get_post&post_id='+ id,

		   type: 'GET',
		   
		   dataType: 'jsonp',

		   success: function(data){
			   
			 console.log(data.posts.title);
			 
		   },

		   error: function(data){

			 console.log(data);

		   }

		 });
	 
});