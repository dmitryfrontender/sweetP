$(document).ready(function () {
	//calls functions
	mobileButtonsHandle();
	setNavItem();
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
			$('.btn-close').css('display', 'block');
			$('body').css('overflow', 'hidden');
		});
	}

	if ($('.btn-close').length) {
		$('.btn-close').on('click', function () {
			$('.mobile-nav').css('display', 'none');
			$('.btn-search').css('display', 'block');
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
