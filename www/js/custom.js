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
  var blue=['#4f61ff', '#0f27ff','#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f','#4f61ff', '#0f27ff','#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f'];
  var red=[];
  var yellow=[];

  /* apply array to card .back */
  console.log(blue.length);
  $.each($('.carte .back'),function(){
    var rng = Math.floor((Math.random()*(blue.length)));
    $(this).css('background-color',blue[rng]);
    $(this).append(blue[rng]);
    blue.splice(rng,1);
  });

});
