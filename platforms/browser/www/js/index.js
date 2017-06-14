/* global rnonce, username */


function getnonce() {
    jQuery.ajax({
                 type: "get",
                 url: "http://lemingonline.com/api/get_nonce/?controller=user&method=register",
                 dataType: "jsonp",
                 success: function (data) {     
                     if (data.status === 'ok') {
                          rnonce = data.nonce;
                          alert(rnonce);
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
        alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password === "")
    {
       alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

          jQuery.ajax({
                 type: "GET",
                 url: "https://lemingonline.com/api/user/generate_auth_cookie/?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
                 dataType: "jsonp",
                success: function (data) {                  
                      if (data.status ==='ok') {
                          window.location='index.html#mainpage';
                      }
                      else {
                           alert(data.error);
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
                 url: "https://www.lemingonline.com/api/user/register/?username=" + encodeURIComponent(rusername) + "&email=" + encodeURIComponent(remail) + "&first_name=" + encodeURIComponent(rnome) + "&last_name=" + encodeURIComponent(rapelido) + "&notify=both&user_pass=" + encodeURIComponent(rpassword) + "&nonce=" + encodeURIComponent(rnonce) + "&display_name=" + encodeURIComponent(rdisplay_name),
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


//navegaçao de páginas
jQuery(document).on("pageinit", "#mainpage", function(){   
    
    jQuery.ajax({
        

       url: 'https://lemingonline.com/api/get_recent_posts/',

       type: 'GET',

       dataType: 'jsonp',

       success: function(data){
           
         console.log(data);

            var items = [];

            $.each(data.posts, function(i, item) {

                   items.push('<li><a href="#contentpage" data-id="' + item.id + '">' + item.title + '</a></li>');

            });  // close each()

            $('#posts').append( items.join('') );

       },

       error: function(data){

         console.log(data);

       }

     });
     
    var pagina = $(this).data("id");
});


$(document).on('vclick', '#posts li a', function(){  
    pagina.id = $(this).attr('data-id');
    $.mobile.changePage( "#contentpage", { transition: "slide", changeHash: false });
});


//navegaçao de páginas
jQuery(document).on("pageinit", "#contentpage", function(){  
    console.log(id);
    
    jQuery.ajax({
        

       url: 'http://lemingonline.com/?json=get_post&post_id='+ data-id,

       type: 'GET',
       
       dataType: 'jsonp',

       success: function(data){
           
         console.log(data.posts.title);
         console.log(data.posts.title);
         
       },

       error: function(data){

         console.log(data);

       }

     });
});