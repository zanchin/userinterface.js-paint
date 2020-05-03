UserInterface.model({
	name: "window",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		style: "height: 100%; display: grid; grid-template-rows: auto 1fr auto",
		children: [
			{
				tagName: "div",
				className: "header"
			},
			{
				tagName: "div",
				className: "padding content",
				style: "background-color: #CFD8E7"
			},
			{
				tagName: "div",
				className: "footer",
				style: "position: relative"
			}
		]
	}
})

UserInterface.bind("window", async function(element) {

	const headerNode = element.querySelector(".header")
	const contentNode = element.querySelector(".content")
	const footerNode = element.querySelector(".footer")

	const paint = new ms_paint.Paint()

	await UserInterface.runModel("titlebar", { parentNode: headerNode, bindingArgs: [paint] })
	await UserInterface.runModel("toolbar", { parentNode: headerNode, bindingArgs: [paint] })
	await UserInterface.runModel("workspace", { parentNode: contentNode, bindingArgs: [paint] })
	await UserInterface.runModel("statusbar", { parentNode: footerNode, bindingArgs: [paint] })

	UserInterface.announce(paint, "tab set", "Home")
	UserInterface.announce(paint, "resizable set size", {width: 1000, height: 500}) // TODO: container can be smaller
	UserInterface.announce(paint, "tool set", ms_paint.Paint.prototype.DEFAULT_TOOL)
	UserInterface.announce(paint, "size set", ms_paint.Paint.prototype.DEFAULT_SIZE)
	UserInterface.announce(paint, "filled set", ms_paint.Paint.prototype.DEFAULT_FILLED)
	UserInterface.announce(paint, "color set", ms_paint.Paint.prototype.DEFAULT_COLOR)
	UserInterface.announce(paint, "statusbar toggle", true)

})