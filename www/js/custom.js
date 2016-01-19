$(document).ready(function(){
  
  console.log('jQuery correctly implemented...');

  /* create .back and .front div for jqeury.flip() */
  var back = $('<div class="back"></div>');
  var front = $('<div class="front"></div>');
  $('.carte').append(front);
  $('.carte').append(back);

  /* enable jquery.flip() */
  $('.carte').flip();

  /* add card backs */
  console.log('There are '+ $('.carte').length + ' cards on the grid...');
  $.each($('.carte .front'),function(){
    var rng = Math.floor((Math.random()*(3)));
    if(rng == 0){
      $(this).addClass('bg-blue');
    }else if (rng == 1) {
      $(this).addClass('bg-orange');
    }else{
      $(this).addClass('bg-red');
    }
  });

  /* Color arrays for card fronts */
  var blue=[];
  var red=[];
  var yellow=[];



});
