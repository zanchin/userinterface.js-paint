UserInterface.model({
	name: "canvas",
	method: UserInterface.appendChild,
	properties: {
		style: "background-color: white",
		tagName: "canvas"
	}
})

UserInterface.bind("canvas", async function(element, paint) {

	const context = element.getContext('2d')

	UserInterface.listen(paint, "new", (data) => {
		const prompt = window.confirm("Are you sure you want to clear the canvas ? (this action cannot be undone)")
		if(prompt === true) {
			paint.setFilename(null)
			UserInterface.announce(paint, "title set", null)
			context.clearRect(0, 0, element.width, element.height)
		}
	})

	UserInterface.listen(paint, "resizable set size", (size) => {
		const dataURL = element.toDataURL()
		element.width = size.width
		element.height = size.height
		const image = new Image()
		image.addEventListener("load", () => {
			context.drawImage(image, 0, 0)
			context.lineWidth = paint.getSize()
			context.strokeStyle = paint.getColor();
			context.fillStyle = paint.getColor();
		})
		image.src = dataURL;
	})

	UserInterface.listen(paint, "open", async () => {
		const inputFileNode = document.createElement("input")
		inputFileNode.type = "file"
		inputFileNode.style.display = "none"
		inputFileNode.addEventListener("input", (event) => {
			const file = inputFileNode.files[0]
			UserInterface.announce(paint, "title set", inputFileNode.value.substr("C:\\fakepath\\".length)) // TODO
			const image = new Image()
			const src = window.URL.createObjectURL(file)
			image.addEventListener("load", () => {
				context.clearRect(0, 0, element.width, element.height)
				context.drawImage(image, 0, 0)
				window.URL.revokeObjectURL(src)
			})
			image.src = src;
			inputFileNode.remove()
		})
		inputFileNode.click()
	})

	UserInterface.listen(paint, "save", async (prompt) => {
		let filename = paint.getFilename()
		if(filename === null || prompt === true) {
			filename = window.prompt("File name:", paint.getFilename() !== null ? paint.getFilename() : "")
		}
		if(typeof filename === "string" && filename !== "") {
			context.save()
			context.globalCompositeOperation = 'destination-over'
			context.fillStyle = "white"
			context.fillRect(0, 0, element.width, element.height)
			context.restore() // reset globalCompositeOperation and fillStyle
			const link = document.createElement("a")
			link.href = element.toDataURL()
			link.download = filename + ".png";
			link.click()
			paint.setFilename(filename)
			UserInterface.announce(paint, "title set", filename)
		}
	})

	UserInterface.listen(paint, "saveas", async (prompt) => {
		UserInterface.announce(paint, "save", true)
	})

	UserInterface.listen(paint, "color set", async (value) => {
		paint.setColor(value)
		context.strokeStyle = value;
		context.fillStyle = value;
	})

	UserInterface.listen(paint, "size set", (size) => {
		context.lineWidth = size
		paint.setSize(size)
	})

	UserInterface.listen(paint, "filled set", async (value) => {
		paint.setFilled(value === "yes")
	})

	element.addEventListener("mousemove", (event) => { // TODO
		const rect = element.getBoundingClientRect() // TODO
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if(paint.getAttribute("drawing") === true) {
			if(paint.getTool() === "eraser") {
				context.clearRect(x, y, context.lineWidth * ms_paint.Paint.prototype.MULTIPLIER_ERASER_LINE_WIDTH, context.lineWidth * ms_paint.Paint.prototype.MULTIPLIER_ERASER_LINE_WIDTH)
			} else if(paint.getTool() === "pencil") {
				context.lineTo(x, y)
				context.stroke()
			}
		}
	})

	element.addEventListener("mousedown", (event) => { // TODO
		const rect = element.getBoundingClientRect() // TODO
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const oldPosition = paint.getAttribute("oldPosition")

		if(paint.getTool() === "eraser") {
			paint.setAttribute("drawing", true)
		} else if(paint.getTool() === "pencil") {
			paint.setAttribute("drawing", true)
			context.beginPath()
			context.moveTo(x, y)
		} else if(paint.getTool() === "line") {
			if(paint.getAttribute("drawingShape") === true) {
				context.lineTo(x, y)
				context.stroke()
				paint.setAttribute("drawingShape", false)
			} else {
				context.beginPath()
				context.moveTo(x, y)
				paint.setAttribute("drawingShape", true)
			}
		} else if(paint.getTool() === "rectangle") {
			if(paint.getAttribute("drawingShape") === true) {
				context.beginPath()
				context.rect(oldPosition.x - x < 0 ? oldPosition.x : x, oldPosition.y - y < 0 ? oldPosition.y : y, Math.abs(oldPosition.x - x), Math.abs(y - oldPosition.y))
				if(paint.getFilled() === true) {
					context.fill()
				} else {
					context.stroke()
				}
				paint.setAttribute("drawingShape", false)
			} else {
				paint.setAttribute("drawingShape", true)
			}
		} else if(paint.getTool() === "circle") {
			if(paint.getAttribute("drawingShape") === true) {
				const negativeX = oldPosition.x - x < 0
				const negativeY = oldPosition.y - y < 0
				const diffX = Math.abs(oldPosition.x - x)
				const diffY = Math.abs(oldPosition.y - y)
				context.beginPath()
				const radius = (diffX > diffY ? diffX : diffY) / 2
				const posX = (negativeX ? (oldPosition.x + (diffX / 2)) : (oldPosition.x - (diffX / 2)))
				const posY = (negativeY ? (oldPosition.y + (diffY / 2)) : (oldPosition.y - (diffY / 2)))
				context.arc(posX, posY, radius, 0, 2 * Math.PI)
				if(paint.getFilled() === true) {
					context.fill()
				} else {
					context.stroke()
				}
				paint.setAttribute("drawingShape", false)
			} else {
				paint.setAttribute("drawingShape", true)
			}
		}
		paint.setAttribute("oldPosition", {x, y})
	})

	element.addEventListener("mouseup", (event) => {
		paint.setAttribute("drawing", false)
	})
	element.addEventListener("mouseout", (event) => {
		paint.setAttribute("drawing", false)
	})
	element.addEventListener("blur", (event) => {
		paint.setAttribute("drawing", false)
	})
	window.addEventListener("focus", () => {
		paint.setAttribute("drawing", false)
	})

})