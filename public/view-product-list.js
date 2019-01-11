
const view =
{
	grid: null
};

export function setup(grid = null)
{
	if (!grid)
	{
		grid = document.createElement('grid');
		document.body.appendChild(grid);
	}

	view.grid = grid;
	this.clear();
}

export function clear()
{
	view.grid.innerHTML = '';
}

export function fill()
{
	let dom = '';
	for (let id in data.groups)
	{
		let group = data.groups[id];

		dom += view.genCard(group);
	}

	view.grid.innerHTML = dom;
}

view.genCard = (group) =>
{
	let id = group.id;
	let thumbnail = group.thumbnail.href;
	let name = group.name;
	let price = group.priceRange.selling.high.toFixed(2);

	let dom =
`<card data-id="${id}" style="background-image: url('${thumbnail}')" onclick="showProductDetails(this);">
	<div class="price">
		<span>$${price}</span>
	</div>
	<div class="name">${name}</div>
</card>`;

	return dom;
};