$('.starRev span').click(function(){
  $(this).parent().children('span').removeClass('on');
  $(this).addClass('on').prevAll('span').addClass('on');

  let rating = $(this).parent().children('.on').length;

  $('#rating').val(rating);

  return false;
});

function showRating(rating) {
//    let stars = $('.static-star').children('span');
//
//    stars.removeClass('on');

    refreshStaticRating();

    for(var i = 0; i < rating; i++) {
        let star = $('.static-star').children('span')[i];
        star.classList.add('on')
    }
}

function editSetRating(rating) {
    refreshRating();

    for(var i = 0; i < rating; i++) {
        let star = $('.starRev').children('span')[i];
        star.classList.add('on')
    }
}

function refreshRating(){
    let stars = $('.starRev').children('span');

    stars.removeClass('on');
}

function refreshStaticRating() {
    let stars = $('.static-star').children('span');

    stars.removeClass('on');
}