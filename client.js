const wH = window.document.documentElement.clientHeight
const wW = window.document.documentElement.clientWidth

const client = io()
window.slider = {}

slider.itemsLength = window.itemsLength
slider.currentIndex = 0
slider.slideDOMs = document.querySelectorAll('.slide__item')

slider.select = index => {
	for (let i = 0, l = slider.slideDOMs.length; i < l; i++) {
		slider.slideDOMs[i].className = slider.slideDOMs[i].className.replace(' slide__item--show', '')
	}

	if (!slider.slideDOMs[index]) {
		return console.log('slide dom notfound')
	}

	slider.slideDOMs[index].className += ' slide__item--show'
}

client.on('select slide', index => {
	if (index < 0 || index >= slider.itemsLength) {
		return console.log('out of slides when seletect')
	}
	slider.select(+index)
})

client.on('next slide', () => {
	if (slider.currentIndex > slider.itemsLength - 2) {
		return console.log('out of slides when mext')
	}
	slider.select(++slider.currentIndex)
})

client.on('prev slide', () => {
	if (slider.currentIndex > slider.itemsLength - 2) {
		return console.log('out of slides when prev')
	}
	slider.select(--slider.currentIndex)
})

slider.select(0)

// client

const threshold = 77
let start = { x: 0, y: 0}


window.controls.addEventListener('touchstart', domEvent => {
	start.x = domEvent.pageX
	start.y = domEvent.pageY
})

window.controls.addEventListener('touchend', domEvent => {
	domEvent.preventDefault()

	const dV = domEvent.pageX - start.x
	const dX = domEvent.pageY - start.y

	if (Math.abs(dV) > Math.abs(dX)) {
		
	} else {

	}

})
