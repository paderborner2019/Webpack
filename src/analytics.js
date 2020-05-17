import * as $ from "jquery"

function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    const listener =() => counter++

    $(document).on('click',listener)

    return {
        getClicked() {
            if (isDestroyed) {
                return `Analytics is destroyed Total clics =${counter}`
            }
            return counter
        },

        destroy() {
            $(document).off('click',listener)
            isDestroyed = true 
        }
    }
}

window.analytics = createAnalytics()