
export default class ViewBase
{
	constructor(container = null)
	{
		// Default the container to the body.
		if (!container)
			container = document.body;
		this.container = container;
	}

	destroy()
	{
		// Stub to be overriden by subclasses.
	}
}