/**
 *  A compatible solution for pictures with bleeding areas on the mobile terminal
 *  Written by https://github.com/wztscau
 */
!(function (window, factory) {
    if (!(window instanceof Window)) {
      throw Error('Cannot run in non-window environment.')
    }
    if (typeof module === 'object' && module.exports) {
        module.exports = factory.call(window)
    } else {
        window.BleedingImage = factory.call(window)
    }
}(typeof self !== 'undefined' ? self : this, function () {
    let window = this
    let document = window.document

    const DATA_ATTR = 'bleeding'

    let fn = function (selector) {
        // default
        let imgNodeList = document.querySelectorAll(`img[data-${DATA_ATTR}]`)
        // user parameter
        if (selector instanceof NodeList) {
            imgNodeList = selector
        } else if (selector instanceof Node) {
            imgNodeList = [selector]
        } else {
            if (selector) {
                imgNodeList = document.querySelectorAll(selector)
            }
        }
        Array.from(imgNodeList).forEach(function (img) {
            // cache src
            let src = img.dataset[DATA_ATTR] || img.src
            if (!src) {
                return
            }
            // img.src must be reset, or onload will not be invoked. After addEventLister, img.src can be settled.
            img.dataset[DATA_ATTR] = img.src = ''
            Object.assign(img.style, {
                position: 'absolute',
                width: '100vw',
                left: 0,
                top: 0
            })
            img.addEventListener('load', function (e) {
                img = e.target
                let h = parseFloat(getComputedStyle(img).height)
                img.style.top = (document.documentElement.clientHeight / 2 - h / 2) + 'px'
            })
            img.src = src
        })
    }

    window.addEventListener('load', e => fn(null))
    
    return fn
}));