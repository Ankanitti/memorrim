$(document).ready(function(){

  console.log('jQuery correctly implemented...');

  /* create .back and .front div for jqeury.flip() */
  var back = $('<div class="back"></div>');
  var front = $('<div class="front"></div>');
  $('.carte').append(front);
  $('.carte').append(back);

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
  var blue =['#4f61ff', '#0f27ff','#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f','#4f61ff', '#0f27ff', '#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f'];
  var red =['#ff0000', '#ff3232', '#ff7676', '#ffa9a9', '#d20000', '#9e0000', '#750000', '#430000', '#280000', '#ff007e', '#c50061', '#7b003d', '#4c0026', '#ff3699', '#ff69b3', '#ff9bcc','#ff0000', '#ff3232', '#ff7676', '#ffa9a9', '#d20000', '#9e0000', '#750000', '#430000', '#280000', '#ff007e', '#c50061', '#7b003d', '#4c0026', '#ff3699', '#ff69b3', '#ff9bcc'];
  var yellow =['#fcff00', '#b7b900', '#737400', '#fdff55', '#feff9f', '#ffdf7d', '#ffcf3c', '#ffc000', '#c59400', '#846300', '#ffa200', '#a58142', '#e4ff00', '#d2ff00', '#62623a', '#ff4909','#fcff00', '#b7b900', '#737400', '#fdff55', '#feff9f', '#ffdf7d', '#ffcf3c', '#ffc000', '#c59400', '#846300', '#ffa200', '#a58142', '#e4ff00', '#d2ff00', '#62623a', '#ff4909'];
  var colorPalette = [blue,red,yellow];

  /* select a random array of colors */
  var randColor = Math.floor(Math.random()*colorPalette.length);

  /* apply array to card .back */
  $.each($('.carte .back'),function(){
    var color = colorPalette[randColor];
    var rng = Math.floor((Math.random()*(color.length)));
    $(this).css('background-color',color[rng]);
    $(this).append(color[rng]);
    color.splice(rng,1);
  });

  /* enable card flip(); */
  $('.carte').flip({
    trigger : 'manual'
  });

  var picks = [];

  function returnToInit(){
    $('.carte.selected').flip('toggle')
                        .toggleClass('selected');
  };

  function lockAll(){
    $('.carte').addClass('locked');
  };

  function unlockAll(){
    $('.carte').removeClass('locked');
  };




  $('.carte').on('click',function(){

    $(this).flip('toggle');
    $(this).toggleClass('selected')
           .toggleClass('locked');
    picks.push($(this).find('.back').css('background-color'));
    console.log(picks);
    if(picks.length==2){
      lockAll();
      console.log('Array has 2 values, matching...');
      if(picks[0]!== picks[1]){
        console.log('No match... returning to init...');
        setTimeout(returnToInit,1100);
        picks.splice(0,2);
        setTimeout(unlockAll,1100);
      }else{
        console.log('Match!');
        $('.carte.selected').toggleClass('selected')
                            .addClass('permaLock');
        picks.splice(0,2);
        setTimeout(unlockAll,1100);
      };
    };
  });

  /* score calc */

});
