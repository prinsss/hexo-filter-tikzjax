import type Hexo from 'hexo';
import { PluginConfig, PostData, localStorage } from './common';

/**
 * Insert generated SVGs into HTML of the post as inline tags.
 *
 * We separate this function from `renderTikzjax` and run them in different filters,
 * since we need the Markdown source to render TikZ graphics (in `before_post_render`).
 * But insert SVGs into Markdown source will cause problems, so we wait until the Markdown
 * source is rendered into HTML, then insert SVGs into HTML (in `after_post_render`).
 */
export function insertSvg(this: Hexo, data: PostData): PostData | void {
  const config = this.config.tikzjax as PluginConfig;
  if (!data.tikzjax && !config.every_page) {
    return;
  }

  // Find all TikZ placeholders inserted by `renderTikzjax`.
  const regex = /<!-- tikzjax-placeholder-(\w+?) -->/g;
  const matches = data.content.matchAll(regex);
  const debug = (...args: any[]) => this.log.debug('[hexo-filter-tikzjax]', ...args);

  for (const match of matches) {
    const hash = match[1]?.trim();
    if (!hash) {
      continue;
    }

    const svg = localStorage.getItem(hash);
    debug('Looking for SVG in cache...', hash);

    if (svg) {
      data.content = data.content.replace(match[0], `<p><span class="tikzjax">${svg}</span></p>`);
      debug('SVG inserted!', hash);
    } else {
      debug('SVG not found in cache. Skipped.', hash);
    }
  }

  return data;
}
