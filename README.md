[![Build Status](https://travis-ci.org/kaelzhang/next-css.svg?branch=master)](https://travis-ci.org/kaelzhang/next-css)
[![Coverage](https://codecov.io/gh/kaelzhang/next-css/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/next-css)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/next-css?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/next-css)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/@ostai/next-css.svg)](http://badge.fury.io/js/@ostai/next-css)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/@ostai/next-css.svg)](https://www.npmjs.org/package/@ostai/next-css)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/next-css.svg)](https://david-dm.org/kaelzhang/next-css)
-->

# @ostai/next-css

Import `.css` files in your Next.js project

This is a `@zeit/next-css` **FORK** which:

- uses `require.resolve` to get dependency `*-loader` so that there won't be environment issues
- is tested.
- fixes peer dependencies
- supports options only for `@ostai/next-css` plugin

## Installation

```
npm i @ostai/next-css
```

## Usage

The stylesheet is compiled to `.next/static/css`. Next.js will automatically add the css file to the HTML.
In production a chunk hash is added so that styles are updated when a new version of the stylesheet is deployed.

```js
const withCSS = require('@ostai/next-css')
```

### Without CSS modules

Create a `next.config.js` in the root of your project (next to pages/ and package.json)

```js
// next.config.js
module.exports = withCSS()
```

Create a CSS file `style.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import "../style.css"

export default () => <div className="example">Hello World!</div>
```

__Note: CSS files can _not_ be imported into your [`_document.js`](https://github.com/zeit/next.js#custom-document). You can use the [`_app.js`](https://github.com/zeit/next.js#custom-app) instead or any other page.__

### With CSS modules

```js
// next.config.js
module.exports = withCSS({
  cssModules: true
})
```

Create a CSS file `style.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import css from "../style.css"

export default () => <div className={css.example}>Hello World!</div>
```

### With `next-compose-plugins`

```js
const withPlugins = require('next-compose-plugins')
module.exports = withPlugins([
  withCSS
], {
  ...nextConfig
})
```

### With specific `css-loader` path

```js
const withPlugins = require('next-compose-plugins')
module.exports = withPlugins([
  withCSS.options({
    cssLoaderPath: require.resolve('/path/to/css-loader')
  })
], {
  ...nextConfig
})
```

#### withCSS.options(options)

- **options?** `Object`
  - **postCssLoaderPath?** `path` the `require.resolve()`d main entry of `postcss-loader`
  - **cssLoaderPath?** `path` the main entry of `css-loader`
  - **ignoreLoaderPath?** `path` the main entry of `ignore-loader`

Create a new `withCSS` plugin with preset options.

### With CSS modules and options

You can also pass a list of options to the `css-loader` by passing an object called `cssLoaderOptions`.

For instance, [to enable locally scoped CSS modules](https://github.com/css-modules/css-modules/blob/master/docs/local-scope.md#css-modules--local-scope), you can write:

```js
// next.config.js
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})
```

Create a CSS file `styles.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js` that imports your stylesheet and uses the hashed class name from the stylesheet

```js
import css from "../style.css"

const Component = props => {
  return (
    <div className={css.example}>
      ...
    </div>
  )
}

export default Component
```

Your exported HTML will then reflect locally scoped CSS class names.

For a list of supported options, [refer to the webpack `css-loader` README](https://github.com/webpack-contrib/css-loader#options).

### PostCSS plugins

Create a `next.config.js` in your project

```js
// next.config.js
module.exports = withCSS()
```

Create a `postcss.config.js`

```js
module.exports = {
  plugins: {
    // Illustrational
    'postcss-css-variables': {}
  }
}
```

Create a CSS file `style.css` the CSS here is using the css-variables postcss plugin.

```css
:root {
  --some-color: red;
}

.example {
  /* red */
  color: var(--some-color);
}
```

When `postcss.config.js` is not found `postcss-loader` will not be added and will not cause overhead.

You can also pass a list of options to the `postcss-loader` by passing an object called `postcssLoaderOptions`.

For example, to pass theme env variables to postcss-loader, you can write:

```js
// next.config.js
module.exports = withCSS({
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  }
})
```



### Configuring Next.js

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
module.exports = withCSS({
  webpack(config, options) {
    return config
  }
})
```


## License

[MIT](LICENSE)
