import type Hexo from 'hexo';
import { PluginConfig, TemplateLocals } from './common';

/**
 * Add CSS to pages which contain TikZ graphics.
 * Should be called in the `after_render:html` filter.
 */
export function prependCss(this: Hexo, html: string, locals: TemplateLocals): string | void {
  const config = this.config.tikzjax as PluginConfig;
  if (!config.append_css) {
    return;
  }

  const page = locals.page;
  const indexContains = page.__index && page.posts.toArray().find((post: any) => post.tikzjax);

  // The post contains TikZ, or it's an index page and one of the posts contains TikZ.
  if (config.every_page || page.tikzjax || indexContains) {
    return html.replace(/<head>(?!<\/head>).+?<\/head>/s, (str) =>
      str.replace(
        '</head>',
        `<link rel="stylesheet" type="text/css" href="${config.font_css_url}" />` +
          `<style>${config.inline_style}</style></head>`
      )
    );
  }

  return html;
}
