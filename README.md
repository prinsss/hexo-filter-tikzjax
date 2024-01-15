# hexo-filter-tikzjax

[![Latest Version](https://badgen.net/npm/v/hexo-filter-tikzjax)](https://www.npmjs.com/package/hexo-filter-tikzjax)
[![License](https://badgen.net/github/license/prinsss/hexo-filter-tikzjax)](LICENSE)

Server side [PGF/Ti*k*Z](https://tikz.dev) renderer plugin for [Hexo](http://hexo.io).

Render graphs, figures, circuits, chemical diagrams, commutative diagrams, and more in your blog posts.

No client side JavaScript required. Woo-hoo! 🎉

## Installation

```bash
npm install hexo-filter-tikzjax
```

For the first run after installation, you need to run `hexo clean` to clean the cache.

## Configuration

Configure this plugin in your site's `_config.yml`. Default values:

```yml
tikzjax:
  # Enable TikZ rendering for all posts and pages.
  # Or you can enable it per post by adding `tikzjax: true` to the front-matter.
  every_page: false
  # Add CSS to pages which contain TikZ graphs.
  append_css: true
  # URL of the font CSS file.
  font_css_url: 'https://cdn.jsdelivr.net/npm/node-tikzjax@latest/css/fonts.css'
  # Additional options that will be passed to node-tikzjax.
  # See: https://github.com/prinsss/node-tikzjax/#usage
  # tikzjax_options:
  #   showConsole: false
```

## Usage

Add `tikzjax: true` to the [front-matter](https://hexo.io/docs/front-matter) of posts/pages that you would like to enable Ti*k*Z rendering.

Wrap you Ti*k*Z code in a Markdown code block with language `tikz`, and you are good to go!

````markdown
```tikz
\begin{document}
  \begin{tikzpicture}
    % Your code here...
  \end{tikzpicture}
\end{document}
```
````

Ti*k*Z code are rendered as static SVG images during the Hexo generation process. The SVG images are then embedded into the HTML pages so there is no client side JavaScript involved. The images will be updated automatically when you change the code.

> [!TIP]
> Run `hexo generate` or `hexo server` with `--debug` option to see the debug messages, including the console output of the TeX engine. To clear the internal SVG cache, run `rm -rf node_modules/hexo-filter-tikzjax/.cache`.

## Example

As this plugin is greatly inspired by [obsidian-tikzjax](https://github.com/artisticat1/obsidian-tikzjax), you can expect the same syntax, features and rendering results.

````markdown
---
title: 'Lorem Ipsum'
date: '2024/01/01 11:45:14'
mathjax: true
tikzjax: true
---

We love using $\LaTeX$ and Ti*k*Z in [Hexo](http://hexo.io)!

```tikz
\begin{document}
  \begin{tikzpicture}[domain=0:4,scale=1.1]
    \draw[very thin,color=gray] (-0.1,-1.1) grid (3.9,3.9);
    \draw[->] (-0.2,0) -- (4.2,0) node[right] {$x$};
    \draw[->] (0,-1.2) -- (0,4.2) node[above] {$f(x)$};
    \draw[color=red]    plot (\x,\x)             node[right] {$f(x) =x$};
    \draw[color=blue]   plot (\x,{sin(\x r)})    node[right] {$f(x) = \sin x$};
    \draw[color=orange] plot (\x,{0.05*exp(\x)}) node[right] {$f(x) = \frac{1}{20} \mathrm e^x$};
  \end{tikzpicture}
\end{document}
```

The above code will be rendered and embedded as an inline SVG image.
````

For more examples, please refer to the [node-tikzjax](https://github.com/prinsss/node-tikzjax/blob/main/demo).

![01-post-render](https://github.com/prinsss/hexo-filter-tikzjax/raw/main/docs/01-post-render.png)

## License

[MIT](LICENSE)
