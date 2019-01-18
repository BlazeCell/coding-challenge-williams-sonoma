import Modal from './modal.js';

export default class ModalImageCarousel extends Modal
{
	constructor(group)
	{
		super();

		// Populate the modal.
		let dom = this.genDom();
		this.elem.classList.add('ghost');
		this.content.innerHTML = dom;

		// Click handler for the navs.
		let clickNavShift = (event) =>
		{
			let nav = event.currentTarget;
			let shift = parseInt(nav.dataset.shift);

			// Shift the carousel based ont the shift value.
			this.shift(shift);

			return false;
		};

		this.image_main = document.getElementById('carousel_image_main');
		this.nav_prev = document.getElementById('carousel_nav_prev');
		this.nav_prev.onclick = clickNavShift;
		this.nav_next = document.getElementById('carousel_nav_next');
		this.nav_next.onclick = clickNavShift;

		// Put all the navs into a list for easy access.
		this.nav_images = [];
		for (let index_nav = 0; index_nav < 5; ++index_nav)
		{
			let nav = document.getElementById(`carousel_nav_${index_nav}`);
			nav.onclick = clickNavShift;
			this.nav_images.push(nav);
		}

		// Extract all of the images into single list.
		this.image_urls = [];
		this.image_urls.push(group.hero.href);
		for (let index_image = 0; index_image < group.images.length; ++index_image)
		{
			let image = group.images[index_image];
			this.image_urls.push(image.href);
		}

		// Show the first image.
		this.index = 0;
		this.displayImage(this.index);
	}

	shift(shift)
	{
		// Shift the current index and ensure it stays within range.
		this.index += shift;
		if (this.index < 0)
			this.index = 0;
		else
		if (this.index >= this.image_urls.length)
			this.index = this.image_urls.length - 1;

		// Display the current image.
		this.displayImage(this.index);
	}

	displayImage(index)
	{
		// Ensure index is within range.
		while (index < 0)
			index += this.image_urls.length;
		while (index >= this.image_urls.length)
			index -= this.image_urls.length;

		// Set the main image.
		this.image_main.src = this.image_urls[index];

		// Loop thru the image navs and populate them.
		let index_image = index - 2;
		for (let index_nav = 0; index_nav < this.nav_images.length; ++index_nav)
		{
			let elem_nav = this.nav_images[index_nav];
			let elem_image = elem_nav.getElementsByTagName('img')[0];

			// If the index is out of range, empty the nav.
			if (   index_image < 0
				|| index_image >= this.image_urls.length)
			{
				elem_nav.dataset.empty = true;
				elem_image.src = '';
			}
			// Otherwise, fill the nav.
			else
			{
				elem_nav.dataset.empty = false;
				elem_image.src = this.image_urls[index_image];
			}

			++index_image;
		}

		// We only need the arrow navs if we're not at the limits of the image list.
		this.nav_prev.dataset.empty = index <= 0;
		this.nav_next.dataset.empty = index >= this.image_urls.length - 1;
	}

	genDom()
	{
		let dom =
`<div class="image-carousel">
	<div class="main">
		<img id="carousel_image_main" src="" />
	</div>
	<pivot id="carousel_nav_prev" class="nav-prev" data-shift="-1" data-empty="false">
		<nav>
			<span>&#x25B2;</span>
		</nav>
	</pivot>
	<pivot id="carousel_nav_0" class="nav-0" data-shift="-2" data-empty="false">
		<nav>
			<img id="carousel_image_nav_0" src="" />
		</nav>
	</pivot>
	<pivot id="carousel_nav_1" class="nav-1" data-shift="-1" data-empty="false">
		<nav>
			<img id="carousel_image_nav_1" src="" />
		</nav>
	</pivot>
	<pivot id="carousel_nav_2" class="nav-2" data-shift="0" data-empty="false" data-selected="true">
		<nav>
			<img id="carousel_image_nav_2" src="" />
		</nav>
	</pivot>
	<pivot id="carousel_nav_3" class="nav-3" data-shift="1" data-empty="false">
		<nav>
			<img id="carousel_image_nav_3" src="" />
		</nav>
	</pivot>
	<pivot id="carousel_nav_4" class="nav-4" data-shift="2" data-empty="false">
		<nav>
			<img id="carousel_image_nav_4" src="" />
		</nav>
	</pivot>
	<pivot id="carousel_nav_next" class="nav-next" data-shift="1" data-empty="false">
		<nav>
			<span>&#x25B6;</span>
		</nav>
	</pivot>
</div>`;

		return dom;
	}
}