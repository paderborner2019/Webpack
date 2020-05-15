function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    const listener =() => counter++

    document.addEventListener('click',listener)

    return {
        getClicked() {
            if (isDestroyed) {
                return `Analytics is destroyed Total clics =${counter}`
            }
            return counter
        },

        destroy() {
            document.removeEventListener('click',listener)
            isDestroyed = true 
        }
    }
}

window.analytics = createAnalytics()