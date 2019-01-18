import Modal from './modal.js';
import ModalImageCarousel from './modal-image-carousel.js';

export default class ModalProductDetails extends Modal
{
	constructor(group, container = null)
	{
		super(group, container);

		// Populate the modal.
		let dom = this.genDom(group);
		this.content.innerHTML = dom;

		this.image_hero = this.content.getElementsByClassName('image-hero')[0];
		this.image_hero.onclick = () =>
		{
			new ModalImageCarousel(group);
		};
	}

	genDom(group)
	{
		let id = group.id;
		let name = group.name;
		let image_hero = group.hero.href;
		let price_reg_low   = group.priceRange.regular.low.toFixed(2);
		let price_reg_high  = group.priceRange.regular.high.toFixed(2);
		let price_sale_low  = group.priceRange.selling.low.toFixed(2);
		let price_sale_high = group.priceRange.selling.high.toFixed(2);

		let dom =
`<div class="product-details">
	<block class="name left">${name}</block>
	<block class="right">
		<div data-id="${id}" class="image-hero">
			<img src="${image_hero}" />
		</div>
		<div class="price">
			<div class="standard">
				<span>$${price_reg_low} - $${price_reg_high}</span>
			</div>
			<div class="sale">
				<span>SALE!: </span>
				<span>$${price_sale_low} - $${price_sale_high}</span>
			</div>
			<div>
				<button class="checkout" type="button">Add to Cart</button>
			</div>
		</div>
	</block>
	<block class="info left">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porttitor odio, sit amet convallis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vel dolor vel nulla aliquet volutpat ut sed turpis. Phasellus id malesuada eros, placerat ornare lacus. Vivamus tempor congue nisi, id rhoncus odio maximus eu. Sed sodales consequat tortor eget imperdiet. Nunc eget lacinia risus. Fusce consectetur, massa sed iaculis dignissim, justo elit fringilla purus, eu ultrices sapien lorem sit amet arcu. Integer tristique posuere enim, ut placerat tortor feugiat vel.
		</p>
		<p>
			Nunc efficitur accumsan ligula, id ultrices tortor cursus quis. Sed egestas sollicitudin libero, non malesuada ante egestas sed. Donec varius porttitor magna ut tincidunt. Vivamus lacus velit, commodo id sapien vitae, ornare feugiat ante. Sed porta id massa et ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur et ipsum a ex egestas tincidunt. Nulla facilisi. Etiam lacus justo, egestas eget justo rutrum, lobortis pharetra nibh.
		</p>
		<p>
			Mauris consequat malesuada risus eget congue. Sed eget magna ac mi dignissim lobortis vitae in mauris. Integer id varius tellus. Suspendisse potenti. Etiam molestie, arcu sed varius congue, justo tellus fringilla enim, id aliquam sapien turpis id velit. Curabitur maximus felis turpis, mollis porta magna maximus quis. Curabitur porta elit quis tortor sodales varius. Etiam malesuada malesuada velit, sit amet commodo tellus iaculis vitae. Aliquam sed scelerisque est.
		</p>
		<p>
			Sed ornare nibh id dignissim lacinia. Ut elementum massa imperdiet justo facilisis, eu interdum urna interdum. Nullam at odio eleifend, mattis dui eu, convallis sem. Phasellus dignissim augue dui, id hendrerit felis tincidunt ut. Donec sit amet tortor ut neque viverra laoreet. Pellentesque sed sapien eu enim condimentum luctus. Aenean vestibulum lectus a finibus aliquam. Suspendisse sodales ac erat id luctus. Sed ac leo a diam blandit viverra a at odio. Ut dapibus ac urna luctus mollis. Nulla blandit sem ut risus vestibulum, sit amet lobortis nunc eleifend. Nulla porttitor elit ac dolor cursus commodo. Fusce fermentum enim vitae auctor molestie. Cras sapien diam, consectetur quis efficitur sit amet, vehicula nec tortor. Sed enim odio, finibus ac est vitae, accumsan ornare mi.
		</p>
		<p>
			Suspendisse auctor pharetra mauris ac venenatis. Nam placerat fermentum nunc, eu sodales sem malesuada a. Vivamus eget massa at mauris iaculis congue vel vel urna. Aenean ut lacus magna. Maecenas feugiat arcu a erat suscipit, et fermentum dolor scelerisque. Sed mattis neque quam, nec ultrices tortor lobortis dapibus. Nulla viverra eget sem in pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non diam tellus. Vestibulum euismod turpis dapibus orci tincidunt, a laoreet metus ornare. Cras nunc nisl, iaculis vitae pretium ullamcorper, finibus vel justo. Nulla luctus leo quam.
		</p>
	</block>
</di>`;

		return dom;
	}

}