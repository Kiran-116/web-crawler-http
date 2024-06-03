const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // Relative URL:
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            }
            catch(err) {
                console.log(`Error with relative URL: ${err.message}`)
            }
        }
        else {
            // Absolute URL:
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }
            catch(err) {
                console.log(`Error with absolute URL: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1);               // Everything except the last char
    }

    return hostpath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}