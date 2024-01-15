import { join } from 'path';
import { createHash } from 'crypto';
import { LocalStorage } from 'node-localstorage';
import { TeXOptions, SvgOptions } from 'node-tikzjax';

export const defaultConfig = {
  append_css: true,
  inline_style: '.tikzjax { display: block; text-align: center; }',
  font_css_url: 'https://cdn.jsdelivr.net/npm/node-tikzjax@latest/css/fonts.css',
  every_page: false,
  tikzjax_options: {} as TeXOptions & SvgOptions,
};

/**
 * A local storage for caching rendered SVGs.
 */
export const localStorage = new LocalStorage(join(__dirname, '../.cache'));

/**
 * Calculate the MD5 hash of a string. Used for cache key.
 */
export function md5(content: string) {
  const hash = createHash('md5');
  hash.update(content);
  return hash.digest('hex');
}

export type PluginConfig = typeof defaultConfig;

export type PostData = { content: string; [key: string]: any };

export type TemplateLocals = {
  page: {
    [key: string]: any;
  };
};
