$(document).ready(function(){

  $('form#add').on('submit', function(e){



      var item = $('form#add input');
      var data = {'add': item.val()};

      $.ajax({
        type: 'POST',
        url: '/profile',
        data: data,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});