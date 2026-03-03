export const formSubmit = () => {


	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		form.addEventListener('submit', formSend);
	})

	async function formSend(e) {
		const form = e.target;
		e.preventDefault();


		// let error = 0;
		let error = formValidate(form);

		let formData = new FormData(form);

		formData.append('Заявка c формы', form.getAttribute('name') ? form.getAttribute('name') : "Без названия");
		formData.append('Страница', window.location);

		// for (let [name, value] of formData) {
		// 	console.log(`${name} = ${value}`);
		// }


		if (error === 0) {
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('succes sending');
						// if (form.classList.contains('popup__form')) {
						// 	form.innerHTML = `<div class="form__title">Ваша заявка успешно отправлена!</div><div class="form__subtitle">В ближайшее время с вами свяжется наш консультант</div><div class="form__succes"><img src="img/succes.svg" alt="succes" /></div>`
						// } else if (document.querySelector('#succes')) {
						// 	document.querySelector('#succes').classList.add("open");
						// 	document.body.classList.add('modal-lock');
						// }
						if (document.querySelector('.popup.open')) {
							document.querySelector('.popup.open').classList.remove('open')
						}
						document.querySelector('#succes').classList.add("open");
						document.body.classList.add('modal-lock');

					} else {
						console.log('fail send');



					}
				}
			}
			xhr.open('POST', 'send.php', true);

			xhr.send(formData);

			form.reset();
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll("[data-required]");

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.type == "text") {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			} else if (input.type == "tel") {
				if (!phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.type == "checkbox") {
				if (!input.checked) {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("error");
		input.classList.add("error");
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove("error");
		input.classList.remove("error");
	}


	function phoneTest(input) {
		let value = input.value.length > 0 ? input.value.match(/\d/g).join('') : input.value;

		return /^\d[\d\(\)\-]{4,14}\d$/g.test(value);
	}

}
