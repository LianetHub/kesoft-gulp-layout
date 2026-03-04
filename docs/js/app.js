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

	if (document.querySelector(".video-slider")) {
		new Swiper(".video-slider", {
			speed: 800,
			spaceBetween: 20,
			navigation: {
				nextEl: ".video__next",
				prevEl: ".video__prev",
			},
		});
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