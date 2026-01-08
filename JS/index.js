(() => {
	const slides = Array.from(document.querySelectorAll('.slide'));
	const dots = Array.from(document.querySelectorAll('.dot'));
	const nextButton = document.querySelector('.btn.next');
	const prevButton = document.querySelector('.btn.prev');
	const card = document.querySelector('.slideshow-card');

	if (slides.length === 0 || dots.length === 0 || !nextButton || !prevButton) return;

	let index = 0;

	const setActive = (nextIndex) => {
		index = (nextIndex + slides.length) % slides.length;

		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});

		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
			dot.setAttribute('aria-current', i === index ? 'true' : 'false');
		});
	};

	nextButton.addEventListener('click', () => setActive(index + 1));
	prevButton.addEventListener('click', () => setActive(index - 1));

	dots.forEach((dot) => {
		dot.addEventListener('click', () => {
			const value = Number(dot.getAttribute('data-index'));
			if (Number.isFinite(value)) setActive(value);
		});
	});

	if (card) {
		card.addEventListener('click', (event) => {
			const target = event.target;
			if (target instanceof HTMLElement && (target.closest('button') || target.closest('a'))) return;
			const activeSlide = slides[index];
			const url = activeSlide?.getAttribute('data-url');
			if (url) window.location.href = url;
		});
	}
})();
