$(document).ready(function () {
	//calls functions
	mobileButtonsHandle();
	setNavItem();
	showList();
	swiperInit();
	mobileSearch();
});

$(window).on('load', function () {
	//calls functions
});

$(window).on('resize', function () {
	//calls functions
});

//functions
function mobileButtonsHandle () {
	if ($('.btn-burger').length) {
		$('.btn-burger').on('click', function () {
			$('.mobile-nav').css('display', 'block');
			$('.btn-search').css('display', 'none');
			$('.btn-burger').css('display', 'none');
			$('.btn-close').css('display', 'flex');
			$('body').css('overflow', 'hidden');
		});
	}

	if ($('.btn-close').length) {
		$('.btn-close').on('click', function (event) {
			$('.mobile-nav').css('display', 'none');
			if (!event.target.closest('.main-header')) {
				$('.btn-search').css('display', 'block');
			}
			$('.btn-burger').css('display', 'block');
			$('.btn-close').css('display', 'none');
			$('body').css('overflow', 'auto');
		});
	}
}

function setNavItem () {
	$('.nav-item').on('click', function() {

		const id = $(this).data('id');

		$('.nav-item').each(function() {
			if (id === +this.dataset.id) {
				$(this).addClass('active-nav');
			} else {
				$(this).removeClass('active-nav');
			}

		});

	})
}

function showList() {

	$('.input').on('click', function () {
		$('.search-list').addClass('search-list-active');
	});
	$(window).on('click', function(e) {

		if (!e.target.closest('.input') && !e.target.closest('.search-list')) {
			$('.search-list').removeClass('search-list-active');
		}

	})
}

function swiperInit() {
	if ($('.swiper').length) {
		const swiper = new Swiper('.swiper', {
			slidesPerView: 1.2,
			spaceBetween: 30,
			breakpoints: {
				1024: {
				  slidesPerView: 3
				}
			}

		});
	}
}

function mobileSearch() {
	$('.btn-search').on('click', function () {
		if (!$('.js-search-box').hasClass('active')) {
			$('.js-search-box').addClass('active');
		} else {
			$('.js-search-box').removeClass('active');
		}
	})
}