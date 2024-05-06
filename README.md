# Revise Static Content

```
revise-static-content
```

Managing static documentation within your repository becomes effortless with this tool, which dynamically renders content into markdown files. [Why?](#why)

## Why?

Maintaining and synchronizing content across various files can be challenging, often leading to tedious copy-pasting tasks. Consequently, updating these files later becomes a nightmare, resulting in outdated documentation.

## How it works

The package introduces "directive" comments capable of rendering content within specified tags. Since the comments themselves remain intact, the content can be dynamically re-rendered.

```html
<!-- #directive: ... -->
some generated content
<!-- /directive -->
```

## Usage

Simply provide a glob pattern to the CLI. It will then render all dynamic content within the directives and overwrite the files accordingly.

```
revise-static-content **/README.md
```

## Directives

### Include

This directive allows for the inclusion of content (parts) from other markdown files. The included content also supports [template syntax](#templates).

<!-- prettier-ignore -->
```html
<!-- #include: docs/parts/intro.md -->
This code is automatically generated and should be edited elsewhere.
<!-- /include -->
```

### Insert

Inserts a [template](#template) specified inline in the directive paramater.

<!-- prettier-ignore -->
```html
<!-- #insert: Hello {{name}}! -->
Hello John!
<!-- /insert -->
```

## Templates

Templates are snippets of code whose ccontent can be overwritten. Templates can only be written in dynamic parts used by the [include directive](#include), or inline in the [insert directive](#insert). Templates allow you to insert values defined in the [frontmatter](https://jekyllrb.com/docs/front-matter/).

<!-- prettier-ignore -->
```
Hello {{name}}!
```
