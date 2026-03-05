"use strict";

// import Swiper from "swiper";
import * as devFunctions from "./modules/functions.js";

document.addEventListener("DOMContentLoaded", () => {
	// get utm params
	const urlParams = new URLSearchParams(window.location.search);
	const utm = {};
	urlParams.forEach((v, k) => {
		if (k.startsWith("utm_")) utm[k] = v;
	});
	if (Object.keys(utm).length)
		localStorage.setItem("savedUtm", JSON.stringify(utm));

	devFunctions.isWebp();
	devFunctions.OS();
	devFunctions.popup();
	devFunctions.cookies();
	devFunctions.formSubmit();
	devFunctions.mask();
	devFunctions.burger();
	devFunctions.footerYear();

	class MobileSwiper {
		constructor(sliderName, options, condition = 991.98) {
			this.slider = document.querySelector(sliderName);
			this.options = options;
			this.init = false;
			this.swiper = null;
			this.condition = condition;

			if (this.slider) {
				this.handleResize();
				window.addEventListener("resize", () => this.handleResize());
			}
		}

		handleResize() {
			if (window.innerWidth <= this.condition) {
				if (!this.init) {
					this.init = true;
					this.swiper = new Swiper(this.slider, this.options);
				}
			} else if (this.init) {
				this.swiper.destroy();
				this.swiper = null;
				this.init = false;
			}
		}
	}

	if (document.querySelector(".clients__slider")) {
		new Swiper(".clients__slider", {
			speed: 800,
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			autoplay: {
				delay: 1000,
			},
			navigation: {
				nextEl: ".clients__next",
				prevEl: ".clients__prev",
			},
			breakpoints: {
				575.98: {
					spaceBetween: 20,
					slidesPerView: 4,
				},
				991.98: {
					spaceBetween: 40,
					slidesPerView: 5,
				},
				1199.98: {
					spaceBetween: 40,
					slidesPerView: 6,
				},
			},
		});
	}

	if (document.querySelectorAll(".cases__item-slider")) {
		document.querySelectorAll(".cases__item-slider").forEach((slider) => {
			const prev = slider.querySelector(".cases__item-prev");
			const next = slider.querySelector(".cases__item-next");
			const pagination = slider.querySelector(".cases__item-pagination");

			new Swiper(slider, {
				speed: 800,
				slidesPerView: 1,
				spaceBetween: 5,
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
			});
		});
	}

	if (document.querySelectorAll(".presentation__slider")) {
		new Swiper(".presentation__slider", {
			speed: 800,
			slidesPerView: 1,
			navigation: {
				nextEl: ".presentation__slider-next",
				prevEl: ".presentation__slider-prev",
			},
		});
	}

	if (document.querySelector('.wms-cases__slider')) {
		new Swiper('.wms-cases__slider', {
			navigation: {
				nextEl: ".wms-cases__next",
				prevEl: ".wms-cases__prev"
			}
		})
	};

	if (document.querySelector('.features__slider')) {
		new MobileSwiper('.features__slider', {
			slidesPerView: 2,
			watchOverflow: true,
			spaceBetween: 12,
			pagination: {
				el: '.features__slider-pagination'
			}
		})
	};



	const headerElement = document.querySelector(".header");

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove("scroll");
		} else {
			headerElement.classList.add("scroll");
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);
});