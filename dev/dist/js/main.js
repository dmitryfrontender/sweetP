$(document).ready(function () {
	//calls functions
	mobileButtonsHandle();
	setNavItem();
	showList();
	swiperInit();
	mobileSearch();
	desktopSearch();
	searchAutocomplete();
	userDropdown();
	signInModal();
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
  });
}

// Subscribe button functionality
function initSubscribeButtons() {
	const subscribeButtons = document.querySelectorAll('.subscribe-btn');
	
	subscribeButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			const isSubscribed = this.getAttribute('data-subscribed') === 'true';
			
			// Add click animation
			this.style.transform = 'scale(0.95)';
			this.style.transition = 'transform 0.1s ease';
			
			setTimeout(() => {
				this.style.transform = 'scale(1)';
				
				// Toggle subscription state after animation
				this.setAttribute('data-subscribed', !isSubscribed);
				
				// Update subscriber count
				const subscriberElement = this.closest('.thumb-models, .thumb-studio').querySelector('.subscriber-count');
				if (subscriberElement) {
					const baseCount = parseInt(subscriberElement.getAttribute('data-base-count')) || 765;
					const newCount = !isSubscribed ? baseCount + 1 : baseCount;
					
					// Animate the count change
					subscriberElement.style.transform = 'scale(0.9)';
					subscriberElement.style.opacity = '0.5';
					
					setTimeout(() => {
						subscriberElement.textContent = `${newCount} подписчиков`;
						subscriberElement.style.transform = 'scale(1)';
						subscriberElement.style.opacity = '1';
					}, 150);
				}
				
				// Add success animation for new subscription
				if (!isSubscribed) {
					this.classList.add('subscribe-success');
					setTimeout(() => {
						this.classList.remove('subscribe-success');
					}, 600);
					console.log('Subscribed to model');
				} else {
					console.log('Unsubscribed from model');
				}
			}, 100);
		});
	});
}

// Initialize subscribe buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	initSubscribeButtons();
});

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
	const $mobileSearchBtn = $('#mobile-search-btn');
	const $mobileSearchSection = $('.mobile-search-section');
	const $mobileSearchInput = $('#mobile-search-input-main');
	const $mobileSearchSuggestions = $('#mobile-search-suggestions');
	
	// Toggle mobile search section
	$mobileSearchBtn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		if ($mobileSearchSection.hasClass('active')) {
			// Close search
			$mobileSearchSection.removeClass('active');
			$mobileSearchInput.val('');
			$mobileSearchSuggestions.empty().hide();
			$mobileSearchInput.blur();
		} else {
			// Open search
			$mobileSearchSection.addClass('active');
			setTimeout(() => $mobileSearchInput.focus(), 100);
		}
	});
	
	// Handle escape key
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $mobileSearchSection.hasClass('active')) {
			$mobileSearchSection.removeClass('active');
			$mobileSearchInput.val('');
			$mobileSearchSuggestions.empty().hide();
			$mobileSearchInput.blur();
		}
	});
	
	// Close search when clicking outside
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.mobile-search-section').length && 
			!$(e.target).closest('#mobile-search-btn').length && 
			$mobileSearchSection.hasClass('active')) {
			$mobileSearchSection.removeClass('active');
			$mobileSearchInput.val('');
			$mobileSearchSuggestions.empty().hide();
			$mobileSearchInput.blur();
		}
	});
}

// New desktop search functionality
function desktopSearch() {
	const $searchBtn = $('#search-btn');
	const $searchInput = $('#search-input');
	const $mainNav = $('#main-nav');
	const $searchContainer = $('.search-container');
	
	// Toggle search mode
	$searchBtn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		if ($searchContainer.hasClass('search-active')) {
			// Exit search mode
			$searchContainer.removeClass('search-active');
			$mainNav.removeClass('nav-hidden');
			$searchInput.val('');
			$('#search-suggestions').empty().hide();
			$searchInput.blur();
		} else {
			// Enter search mode
			$searchContainer.addClass('search-active');
			$mainNav.addClass('nav-hidden');
			setTimeout(() => $searchInput.focus(), 100);
		}
	});
	
	// Handle search input focus
	$searchInput.on('focus', function() {
		if (!$searchContainer.hasClass('search-active')) {
			$searchContainer.addClass('search-active');
			$mainNav.addClass('nav-hidden');
		}
	});
	
	// Handle escape key
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $searchContainer.hasClass('search-active')) {
			$searchContainer.removeClass('search-active');
			$mainNav.removeClass('nav-hidden');
			$searchInput.val('');
			$('#search-suggestions').empty().hide();
			$searchInput.blur();
		}
	});
	
	// Close search when clicking outside
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.search-container').length && 
			!$(e.target).closest('#search-btn').length && 
			$searchContainer.hasClass('search-active')) {
			$searchContainer.removeClass('search-active');
			$mainNav.removeClass('nav-hidden');
			$searchInput.val('');
			$('#search-suggestions').empty().hide();
			$searchInput.blur();
		}
	});
}

// Autocomplete functionality
function searchAutocomplete() {
	const $searchInput = $('#search-input');
	const $mobileSearchInput = $('#mobile-search-input-main');
	const $suggestions = $('#search-suggestions');
	const $mobileSuggestions = $('#mobile-search-suggestions');
	
	// Sample search data - replace with your actual data
	const searchData = [
		{ title: 'Большие сиськи в масле', type: 'category', icon: 'icon-categories' },
		{ title: 'Дрочет на большие сиськи', type: 'category', icon: 'icon-categories' },
		{ title: 'Продемонстрировала свои большие сиськи', type: 'category', icon: 'icon-categories' },
		{ title: 'Брат увидел большие сиськи сестры', type: 'category', icon: 'icon-categories' },
		{ title: 'Обожает большие сиськи', type: 'category', icon: 'icon-categories' },
		{ title: 'Анал с большими сиськами', type: 'category', icon: 'icon-categories' },
		{ title: 'Блондинка с большими сиськами', type: 'model', icon: 'icon-models' },
		{ title: 'Брюнетка с большими сиськами', type: 'model', icon: 'icon-models' },
		{ title: 'Рыжая с большими сиськами', type: 'model', icon: 'icon-models' },
		{ title: 'МILF с большими сиськами', type: 'model', icon: 'icon-models' }
	];
	
	function showSuggestions(query, $input, $suggestionsContainer) {
		if (query.length < 1) {
			$suggestionsContainer.empty().hide();
			return;
		}
		
		const filtered = searchData.filter(item => 
			item.title.toLowerCase().includes(query.toLowerCase())
		).slice(0, 8); // Limit to 8 suggestions
		
		if (filtered.length > 0) {
			const suggestionsHtml = filtered.map(item => `
				<div class="suggestion-item" data-type="${item.type}" data-title="${item.title}">
					<svg class="svg-icon">
						<use xlink:href="#${item.icon}"></use>
					</svg>
					<span class="suggestion-text">${item.title}</span>
					<div class="suggestion-arrow">
						<svg class="svg-icon">
							<use xlink:href="#icon-arrow-right"></use>
						</svg>
					</div>
				</div>
			`).join('');
			
			$suggestionsContainer.html(suggestionsHtml).fadeIn(200);
		} else {
			$suggestionsContainer.empty().hide();
		}
	}
	
	// Desktop search input
	$searchInput.on('input', function() {
		const query = $(this).val();
		showSuggestions(query, $(this), $suggestions);
	});
	
	// Mobile search input
	$mobileSearchInput.on('input', function() {
		const query = $(this).val();
		showSuggestions(query, $(this), $mobileSuggestions);
	});
	
	// Handle suggestion clicks for desktop
	$suggestions.on('click', '.suggestion-item', function() {
		const title = $(this).data('title');
		const type = $(this).data('type');
		
		// Set the search input value
		$searchInput.val(title);
		
		// Hide suggestions
		$suggestions.empty().hide();
		
		// Here you would typically redirect to search results
		// For now, we'll just log the selection
		console.log(`Selected: ${title} (${type})`);
		
		// Example redirect (uncomment and modify as needed):
		// window.location.href = `search.html?q=${encodeURIComponent(title)}&type=${type}`;
	});
	
	// Handle suggestion clicks for mobile
	$mobileSuggestions.on('click', '.suggestion-item', function() {
		const title = $(this).data('title');
		const type = $(this).data('type');
		
		// Set the search input value
		$mobileSearchInput.val(title);
		
		// Hide suggestions
		$mobileSuggestions.empty().hide();
		
		// Here you would typically redirect to search results
		// For now, we'll just log the selection
		console.log(`Selected: ${title} (${type})`);
		
		// Example redirect (uncomment and modify as needed):
		// window.location.href = `search.html?q=${encodeURIComponent(title)}&type=${type}`;
	});
	
	// Hide suggestions when clicking outside
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.search-container').length && 
			!$(e.target).closest('#search-input').length) {
			$suggestions.empty().hide();
		}
		if (!$(e.target).closest('.mobile-search-section').length && 
			!$(e.target).closest('#mobile-search-input-main').length) {
			$mobileSuggestions.empty().hide();
		}
	});
}

// User dropdown functionality
function userDropdown() {
	const $userProfile = $('.user-profile');
	const $userBlock = $('.user-block');
	const $mobileUserBlock = $('.mobile-user-block');
	
	// Desktop user dropdown
	$userProfile.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		$userBlock.toggleClass('active');
	});
	
	// Mobile user dropdown
	$mobileUserBlock.find('.user-profile').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		$mobileUserBlock.toggleClass('active');
	});
	
	// Close dropdowns when clicking outside
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.user-block').length) {
			$userBlock.removeClass('active');
		}
		if (!$(e.target).closest('.mobile-user-block').length) {
			$mobileUserBlock.removeClass('active');
		}
	});
	
	// Handle dropdown item clicks
	$('.dropdown-item').on('click', function() {
		const text = $(this).find('span').text();
		console.log(`Clicked: ${text}`);
		// Here you would handle navigation or actions
		$userBlock.removeClass('active');
		$mobileUserBlock.removeClass('active');
	});
}

// Modal Functions
function signInModal() {
	// Login Modal Functions
	window.showLoginModal = function() {
		$('#loginModal').addClass('active');
		$('body').css('overflow', 'hidden');
	};
	
	window.closeLoginModal = function() {
		$('#loginModal').removeClass('active');
		$('body').css('overflow', 'auto');
	};
	
	// Registration Modal Functions
	window.showRegistrationModal = function() {
		$('#registrationModal').addClass('active');
		$('body').css('overflow', 'hidden');
	};
	
	window.closeRegistrationModal = function() {
		$('#registrationModal').removeClass('active');
		$('body').css('overflow', 'auto');
	};
	
	// Switch between modals
	window.switchToRegistration = function() {
		closeLoginModal();
		setTimeout(showRegistrationModal, 200);
	};
	
	window.switchToLogin = function() {
		closeRegistrationModal();
		setTimeout(showLoginModal, 200);
	};
	
	// Close modal when clicking outside
	$('#loginModal, #registrationModal').on('click', function(e) {
		if (e.target === this) {
			if (this.id === 'loginModal') {
				closeLoginModal();
			} else {
				closeRegistrationModal();
			}
		}
	});
	
	// Handle form submissions
	$('#loginForm').on('submit', function(e) {
		e.preventDefault();
		// Add your login logic here
		console.log('Login form submitted');
	});
	
	$('#registrationForm').on('submit', function(e) {
		e.preventDefault();
		// Add your registration logic here
		console.log('Registration form submitted');
	});
	
	// Password toggle functionality for modals
	$('.password-toggle').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const $input = $(this).siblings('.form-input');
		const $icon = $(this).find('use');
		const currentHref = $icon.attr('xlink:href');
		
		if ($input.attr('type') === 'password') {
			// Show password
			$input.attr('type', 'text');
			$icon.attr('xlink:href', '#icon-hide');
		} else {
			// Hide password
			$input.attr('type', 'password');
			$icon.attr('xlink:href', '#icon-show');
		}
	});

	// Password toggle functionality for profile page
	$('.input-field .password-toggle').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const $input = $(this).siblings('input');
		const $icon = $(this).find('use');
		
		if ($input.attr('type') === 'password') {
			// Show password
			$input.attr('type', 'text');
			$icon.attr('xlink:href', '#icon-show');
		} else {
			// Hide password
			$input.attr('type', 'password');
			$icon.attr('xlink:href', '#icon-hide');
		}
	});

	// Profile thumb delete button functionality
	$('.profile-thumb .delete-btn').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		// Add click animation
		$(this).css('transform', 'scale(0.95)');
		
		setTimeout(() => {
			$(this).css('transform', 'scale(1)');
			
			// Here you would typically make an API call to delete the item
			// For now, we'll just remove the thumb from the DOM
			const $thumb = $(this).closest('.profile-thumb');
			$thumb.fadeOut(300, function() {
				$(this).remove();
			});
			
			console.log('Deleted favorite item');
		}, 100);
	});

	// Subscriptions filter toggle functionality
	$('.filter-btn').on('click', function(e) {
		e.preventDefault();
		
		const filterType = $(this).data('filter');
		
		// Remove active class from all buttons
		$('.filter-btn').removeClass('active');
		
		// Add active class to clicked button
		$(this).addClass('active');
		
		// Here you would typically filter the content based on the selected type
		// For now, we'll just log the selection
		console.log(`Filter changed to: ${filterType}`);
		
		// Example: You could show/hide different content based on filter
		if (filterType === 'models') {
			// Show models content
			$('.thumbs-subscriptions').show();
			// Hide studios content if it exists
			$('.thumbs-studios').hide();
		} else if (filterType === 'studios') {
			// Show studios content
			$('.thumbs-studios').show();
			// Hide models content
			$('.thumbs-subscriptions').hide();
		}
	});

	// FAQ Accordion functionality
	$('.faq-item').on('click', function(e) {
		e.preventDefault();
		
		const $faqItem = $(this);
		const $answer = $faqItem.find('.faq-answer');
		const $arrow = $faqItem.find('.faq-arrow');
		
		// Close all other FAQ items
		$('.faq-item').not($faqItem).removeClass('active');
		$('.faq-item').not($faqItem).find('.faq-answer').slideUp(300);
		$('.faq-item').not($faqItem).find('.faq-arrow').css('transform', 'rotate(0deg)');
		
		// Toggle current FAQ item
		if ($faqItem.hasClass('active')) {
			$faqItem.removeClass('active');
			$answer.slideUp(300);
			$arrow.css('transform', 'rotate(0deg)');
		} else {
			$faqItem.addClass('active');
			$answer.slideDown(300);
			$arrow.css('transform', 'rotate(180deg)');
		}
	});

	// Support form submission
	$('.support-form').on('submit', function(e) {
		e.preventDefault();
		
		// Get form data
		const formData = {
			name: $(this).find('input[type="text"]').val(),
			email: $(this).find('input[type="email"]').val(),
			topic: $(this).find('select').val(),
			description: $(this).find('textarea').val()
		};
		
		// Here you would typically send the data to your server
		console.log('Support form submitted:', formData);
		
		// Show success message (you can customize this)
		alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в течение 15 минут.');
		
		// Reset form
		$(this)[0].reset();
	});
}