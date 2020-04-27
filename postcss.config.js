var fs = require("fs")
var postcss = require("postcss")
var atImport = require("postcss-import")

// css to be processed
var css = fs.readFileSync("src/css/style.tailwind.css", "utf8")

// process css
postcss()
  .use(atImport())
  .process(css, {
    // `from` option is required so relative import can work from input dirname
    from: "src/css/style.tailwind.css"
  })
  .then(function (result) {
    var output = result.css

    // console.log(output)
  })

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    'src/*.html',
    // etc.
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : [],
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }),
  ],
};
