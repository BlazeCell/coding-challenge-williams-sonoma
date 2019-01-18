import Card from './card.js';
import ModalProductDetails from './modal-product-details.js';

export default class CardProduct extends Card
{
	constructor(group)
	{
		super(group);

		this.elem.innerHTML = this.genDom(group);
		this.elem.onclick = () =>
		{
			new ModalProductDetails(group);
		};
	}

	genDom(group)
	{
		let thumbnail = group.thumbnail.href;
		let name = group.name;
		let price = group.priceRange.selling.high.toFixed(2);

		let dom =
`<div class="product-card" style="background-image: url('${thumbnail}')">
	<div class="price">
		<span>$${price}</span>
	</div>
	<div class="name">${name}</div>
</div>`;

		return dom;
	}
}