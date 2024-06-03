const { normalizeURL, getURLsFromHTML } = require("./crawl.js")
const { test, expect } = require("@jest/globals")

// This is NormalizeURL:
// 'https://boot.dev'   ->  'boot.dev'
// 'http://boot.dev'    ->  'boot.dev'
// 'https://Boot.dev'   ->  'boot.dev'


  test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)                      // OUTPUT
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })

//   Grab all the URLs or links embedded in a HTML page.
  test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
  })

  // Relative => It will only include the path
  test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
  })

  test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Path One
            </a>
            <a href="/path2/">
                Boot.dev Blog Path Two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
  })

//   If we are given a BAD URL, we don't include it in the expected URLs:
  test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
  })