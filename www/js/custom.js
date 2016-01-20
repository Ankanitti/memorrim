$(document).ready(function(){

  console.log('jQuery correctly implemented...');

  /* create .back and .front div for jqeury.flip() */
  var back = $('<div class="back"></div>');
  var front = $('<div class="front"></div>');
  $('.carte').append(front);
  $('.carte').append(back);

  /* add background to card .back */
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

  /* Color arrays for card .front */
  var blue =['#4f61ff', '#0f27ff','#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f','#4f61ff', '#0f27ff', '#0014c6', '#000e90', '#00063a', '#6f79d4', '#3641a1', '#1a8dd6', '#005286', '#12d9f6', '#65b2d9', '#26fcff', '#00898b', '#7182ff', '#08857e', '#0a222f'];
  var red =['#ff0000', '#ff3232', '#ff7676', '#ffa9a9', '#d20000', '#9e0000', '#750000', '#430000', '#280000', '#ff007e', '#c50061', '#7b003d', '#4c0026', '#ff3699', '#ff69b3', '#ff9bcc','#ff0000', '#ff3232', '#ff7676', '#ffa9a9', '#d20000', '#9e0000', '#750000', '#430000', '#280000', '#ff007e', '#c50061', '#7b003d', '#4c0026', '#ff3699', '#ff69b3', '#ff9bcc'];
  var yellow =['#fcff00', '#b7b900', '#737400', '#fdff55', '#feff9f', '#ffdf7d', '#ffcf3c', '#ffc000', '#c59400', '#846300', '#ffa200', '#a58142', '#e4ff00', '#d2ff00', '#62623a', '#ff4909','#fcff00', '#b7b900', '#737400', '#fdff55', '#feff9f', '#ffdf7d', '#ffcf3c', '#ffc000', '#c59400', '#846300', '#ffa200', '#a58142', '#e4ff00', '#d2ff00', '#62623a', '#ff4909'];
  var colorPalette = [blue,red,yellow];

  /* select a random array of colors */
  var randColor = Math.floor(Math.random()*colorPalette.length);

  /* apply array to card .front */
  $.each($('.carte .back'),function(){ /* iterate throw each el */
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



  /* CORE GAME VARs AND FUNCs */

  /* emplty array for matching verif */
  var picks = []; /* array to store rgb code of selected cards */
  var timers = []; /* array to sotre .now() in order to substract from score */
  var penalty = 0; /* score to be deducted from final score */
  var count = 0; /* counter to keep track of matching pairs */
  var finalScore = 100000; /* initial score */

  /* reset card to initial */
  function returnToInit(){
    $('.carte.selected').flip('toggle')
                        .toggleClass('selected');
  };

  /* lock cards to prevent mutiple flips */
  function lockAll(){
    $('.carte').addClass('locked'); /* 'locked' css class to prevent pointer-events and disable flip() */
  };

  /* unlock all cards after verif done */
  function unlockAll(){
    $('.carte').removeClass('locked'); /* un'locked' class to re-enable pointer-events and flip() */
  };

  /* empty BOTH picks AND timers arrays */
  function emptyArrays(){
    picks.splice(0,2);
    timers.splice(0,2);
  };

  /* flip event handler */
  $('.carte').on('click',function(){
    timers.push($.now()); /* GET time of click */
    $(this).flip('toggle'); /* flip clicked card */
    $(this).toggleClass('selected') /* add 'selected' class for better handling */
           .toggleClass('locked'); /* lock this card to prevent subsequent re-flipping */
    picks.push($(this).find('.back').css('background-color')); /* save the selected cards' color code for verif into picks array*/
    console.log(picks);
    if(picks.length==2){ /* condition to init verification */
      lockAll(); /* if 2 cards are 'selected' lock all the other cards */
      penalty += (timers[0]-timers[1]); /* add time spent to penalty pool */
      console.log('penalty is at : '+penalty);
      if(picks[0]!== picks[1]){ /* IF the color codes don't match... */
        console.log('No match... returning to init...');
        emptyArrays();  /* empty picks and timers array for following try */
        setTimeout(unlockAll,1000); /* unlock all locked cards to proceed, lowered from 1100ms */
        setTimeout(returnToInit,1000); /* return cards to initial position, lowered from 1100ms */
      } else { /* IF the color codes match... */
        count += 1; /* tracking the number of matched pairs */
        if(count == 16){
          console.log('All pairs matched... ending game...');
          console.log('Your final score is : '+finalScore+' !');
          finalScore += penalty;
        }else{
          console.log('Match!');
          $('.carte.selected').toggleClass('selected') /*remove selected class AND... */
                              .addClass('permaLock'); /* permanently lock them so that they may be flipped no longer */
          emptyArrays();
          setTimeout(unlockAll,1100); /* unlock all locked cards to proceed */
          console.log(count);
        };
      };
    };
  });

});
