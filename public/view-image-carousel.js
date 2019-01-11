
const view =
{
	index: 0,
	overlay: null,
	modal: null,
	image_main: null,
	nav_prev: null,
	nav_next: null,
	nav_images: [],
	image_urls: [],
};

export function setup(overlay = null, modal = null)
{
	// Create the overlay if one is not provided.
	if (!overlay)
	{
		overlay = document.createElement('overlay');
		overlay.id = 'overlay_image_carousel';
		document.body.appendChild(overlay);
	}

	overlay.style.display = 'none';
	overlay.onclick = () =>
	{
		window.hideImageCarousel();
		return false;
	};

	// Create the modal if one is not provided.
	if (!modal)
	{
		modal = document.createElement('div');
		modal.id = 'modal_image_carousel';
		document.body.appendChild(modal);
	}

	modal.classList.add('image-carousel');
	modal.style.display = 'none';
	modal.onclick = () =>
	{
		return false;
	};
	let dom = view.genDom();
	modal.innerHTML = dom;

	view.overlay = overlay;
	view.modal = modal;

	view.image_main = document.getElementById('carousel_image_main');
	view.nav_prev = document.getElementById('carousel_nav_prev');
	view.nav_next = document.getElementById('carousel_nav_next');

	view.nav_images = [];
	for (let index_nav = 0; index_nav < 5; ++index_nav)
	{
		view.nav_images.push(document.getElementById(`carousel_nav_${index_nav}`));
	}

}

window.showImageCarousel = (elem) =>
{
	let id = elem.dataset.id;
	let group = data.groups[id];

	// Get all of the images into single list.
	view.image_urls = [];
	view.image_urls.push(group.hero.href);
	for (let index_image = 0; index_image < group.images.length; ++index_image)
	{
		let image = group.images[index_image];
		view.image_urls.push(image.href);
	}

	// Show the first image.
	view.index = 0;
	view.displayImage(view.index);

	// Show the modal.
	view.overlay.style.display = 'block';
	view.modal.style.display = 'block';
};


window.hideImageCarousel = () =>
{
	view.overlay.style.display = 'none';
	view.modal.style.display = 'none';
};

window.shiftCarousel = (shift) =>
{
	// Shift the current index and ensure it stays within range.
	view.index += shift;
	if (view.index < 0)
		view.index = 0;
	else
	if (view.index >= view.image_urls.length)
		view.index = view.image_urls.length - 1;

	// Display the current image.
	view.displayImage(view.index);
};

view.displayImage = (index) =>
{
	// Ensure index is within range.
	while (index < 0)
		index += view.image_urls.length;
	while (index >= view.image_urls.length)
		index -= view.image_urls.length;

	// Set the main image.
	view.image_main.src = view.image_urls[index];

	// Loop thru the image navs and populate them.
	let index_image = index - 2;
	for (let index_nav = 0; index_nav < view.nav_images.length; ++index_nav)
	{
		let elem_nav = view.nav_images[index_nav];
		let elem_image = elem_nav.getElementsByTagName('img')[0];

		// If the index is out of range, empty the nav.
		if (   index_image < 0
			|| index_image >= view.image_urls.length)
		{
			elem_nav.dataset.empty = true;
			elem_image.src = '';
		}
		// Otherwise, fill the nav.
		else
		{
			elem_nav.dataset.empty = false;
			elem_image.src = view.image_urls[index_image];
		}

		++index_image;
	}

	// We only need the arrow navs if we're not at the limits of the image list.
	view.nav_prev.dataset.empty = index <= 0;
	view.nav_next.dataset.empty = index >= view.image_urls.length - 1;
};

view.genDom = () =>
{
	let dom =
`<div class="main">
	<img id="carousel_image_main" src="" />
</div>
<pivot id="carousel_nav_prev" class="nav-prev" data-empty="false" onclick="shiftCarousel(-1); return false;">
	<nav>
		<span>&#x25B2;</span>
	</nav>
</pivot>
<pivot id="carousel_nav_0" class="nav-0" data-empty="false" onclick="shiftCarousel(-2); return false;">
	<nav>
		<img id="carousel_image_nav_0" src="" />
	</nav>
</pivot>
<pivot id="carousel_nav_1" class="nav-1" data-empty="false" onclick="shiftCarousel(-1); return false;">
	<nav>
		<img id="carousel_image_nav_1" src="" />
	</nav>
</pivot>
<pivot id="carousel_nav_2" class="nav-2" data-empty="false" data-selected="true" onclick="shiftCarousel(0); return false;">
	<nav>
		<img id="carousel_image_nav_2" src="" />
	</nav>
</pivot>
<pivot id="carousel_nav_3" class="nav-3" data-empty="false" onclick="shiftCarousel(1); return false;">
	<nav>
		<img id="carousel_image_nav_3" src="" />
	</nav>
</pivot>
<pivot id="carousel_nav_4" class="nav-4" data-empty="false" onclick="shiftCarousel(2); return false;">
	<nav>
		<img id="carousel_image_nav_4" src="" />
	</nav>
</pivot>
<pivot id="carousel_nav_next" class="nav-next" data-empty="false" onclick="shiftCarousel(1); return false;">
	<nav>
		<span>&#x25B6;</span>
	</nav>
</pivot>
<span class="close" onclick="hideImageCarousel(); return false;">&#x1F5D9;</span>`;

	return dom;
};