const { normalizeURL } = require("./crawl.js")
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