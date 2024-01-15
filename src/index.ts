import { renderTikzjax } from './render-tikzjax';
import { insertSvg } from './insert-svg';
import { prependCss } from './prepend-css';
import { defaultConfig } from './common';

// Load plugin config.
hexo.config.tikzjax = Object.assign(defaultConfig, hexo.config.tikzjax);

// Extract TikZ code blocks from the post content and render them.
// Must be run before the Hexo's internal `backtick_code_block` filter.
hexo.extend.filter.register('before_post_render', renderTikzjax, 1);

// Insert generated SVGs into HTML of the post as inline tags.
hexo.extend.filter.register('after_post_render', insertSvg);

// Add CSS to pages which contain TikZ graphics.
hexo.extend.filter.register('after_render:html', prependCss);
