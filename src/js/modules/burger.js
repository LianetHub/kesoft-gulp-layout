export const burger = () => {

	const iconMenu = document.querySelector('.icon-menu');
	const menuBody = document.querySelector('.menu');
	const menuParents = document.querySelectorAll('.menu__link_parent');

	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {

			document.body.classList.toggle("lock");
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");

		});
	}

	if (menuParents.length > 0) {

		menuParents.forEach(menuParent => {
			menuParent.addEventListener('click', (e) => {
				if (document.body.classList.contains('_touch')) {
					getSubmenu(e)
				}
			})
		})
	}


	function getSubmenu(e) {
		e.preventDefault();
		e.target.parentNode.classList.toggle('open');
		e.target.nextElementSibling.classList.toggle('open');
	}
}


