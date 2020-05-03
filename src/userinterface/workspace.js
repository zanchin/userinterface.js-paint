UserInterface.model({
	name: "workspace",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "position-relative",
		children: [
			{
				tagName: "img",
				className: "tool",
				style: "width: auto; height: auto; position: absolute; pointer-events: none; display: none"
			}
		]
	}
})

UserInterface.bind("workspace", async function(element, paint) {

	const toolNode = element.querySelector(".tool")
	let resizing = false

	UserInterface.listen(paint, "tool set", async (name) => { // TODO
		paint.setTool(name)
		let url = ""
		if(name === "pencil") {
			url = "resource/image/pencil.png"
		} else if (name === "eraser") {
			url = "resource/image/eraser.png"
		}
		toolNode.src = url
	})

	UserInterface.listen(paint, "resizable end", (data) => {
		resizing = false
	})

	UserInterface.listen(paint, "resizable start", (data) => {
		resizing = true
		toolNode.style.display = "none"
	})


	UserInterface.listen(paint, "resizable set size", (size) => {
		element.style.width = size.width + "px"
		element.style.height = size.height + "px"
	})

	element.addEventListener("mousemove", (event) => {
		if(resizing === false) {
			const rect = element.getBoundingClientRect() // TODO
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			toolNode.style.left = x + "px"
			toolNode.style.top = (y - toolNode.width) + "px"
			if(toolNode.src !== "") {
				toolNode.style.display = "block"
			}
		}
	})

	element.addEventListener("mouseout", (event) => {
		toolNode.style.display = "none"
	})

	await UserInterface.runModel("canvas", {bindingArgs: [paint], parentNode: element})
	await UserInterface.runModel("collection.resizable", {bindingArgs: [paint, ["horizontal", "vertical", "diagonal"]], parentNode: element})
	await UserInterface.runModel("gridlines", {bindingArgs: [paint], parentNode: element})
})