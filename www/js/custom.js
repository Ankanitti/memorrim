$(document).ready(function(){
  console.log('jQuery correctly implemented...');

  console.log('There are '+ $('.carte').length + ' cards on the grid...');
  $.each($('.carte'),function(){
    var rng = Math.floor((Math.random()*(3)));
    if(rng == 0){
      $(this).addClass('bg-blue');
    }else if (rng == 1) {
      $(this).addClass('bg-orange');
    }else{
      $(this).addClass('bg-red');
    }
  });
});
