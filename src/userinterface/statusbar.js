UserInterface.model({
	name: "statusbar",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "padding-xs",
		style: "display:none; grid-auto-flow: column; background-color: #F5F6F7",
		children: [
			{
				tagName: "div",
				className: "mousePosition grid-gap-xxs",
				style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content; place-items: center",
				children: [
					{
						tagName: "img",
						src: "./resource/image/move.png"
					},
					{
						tagName: "div"
					}
				]
			},
			{
				tagName: "div",
				className: "vertical-separator"
			},
			{
				tagName: "div",
				className: "shapeSize grid-gap-xxs",
				style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content; place-items: center",
				children: [
					{
						tagName: "img",
						src: "./resource/image/size.png"
					},
					{
						tagName: "div"
					}
				]
			},
			{
				tagName: "div",
				className: "vertical-separator"
			},
			{
				tagName: "div",
				className: "canvasSize grid-gap-xxs",
				style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content; place-items: center",
				children: [
					{
						tagName: "img",
						src: "./resource/image/size.png"
					},
					{
						tagName: "div"
					}
				]
			},
			{
				tagName: "div",
				className: "vertical-separator"
			}
		]
	}
})

UserInterface.bind("statusbar", async function(element, paint) {

	const canvasSizeNode = element.querySelector(".canvasSize")

	UserInterface.listen(paint, "resizable set size", (size) => {
		canvasSizeNode.children[1].textContent = `${size.width} x ${size.height}px`
	})

	UserInterface.listen(paint, "statusbar toggle", function(value) {
		if(value === true) {
			element.style.display = "grid"
		} else {
			element.style.display = "none"
		}
	})

})