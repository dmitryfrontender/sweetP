$(document).ready(function(){
	//calls functions
});



$('.btn-burger').on('click', function () {

	$('.mobile-nav').css('display', 'block');
	$('.btn-search').css('display', 'none');
	$('.btn-burger').css('display', 'none');
	$('.btn-close').css('display', 'block');
	$('body').css('overflow', 'hidden');






	// $('.mobile-nav').addClass('mobile-nav-active');


});

$('.btn-close').on('click', function () {

	$('.mobile-nav').css('display', 'none');
	$('.btn-search').css('display', 'block');
	$('.btn-burger').css('display', 'block');
	$('.btn-close').css('display', 'none');
	$('body').css('overflow', 'auto');





});

$(window).on('load', function () {
	//calls functions
});

$(window).on('resize', function () {
	//calls functions
	// $('.mobile-nav').css('display', 'none');

});

$(window).load(function() {
	//calls functions
});

$(window).scroll(function() {
	//calls functions
});

//functions