$('.starRev span').click(function(){
  $(this).parent().children('span').removeClass('on');
  $(this).addClass('on').prevAll('span').addClass('on');

  let rating = $(this).parent().children('.on').length;

  $('#rating').val(rating);

  return false;
});