# Template Maker Toolkit
# Requirement
+ [NodeJS LTS](https://nodejs.org/en/)
# Quickstart
Run `npm i` to install all dependencies.</br>
Run `npm run build` to build server and cli.</br>
Run `npm run cli` to launch livereload on a specific template.</br>

```
npm run cli

? Select a template to livereload › - Use arrow-keys. Return to submit.
❯   example-1
    example-2
    example-3/subexample-3-1
    example-3/subexample-3-2
```
# Best Practices
## Performance and SEO
+ [Core Web Vitals](https://web.dev/learn-core-web-vitals/)
+ [Metrics](https://web.dev/metrics/)
+ [PageSpeed Insights](https://pagespeed.web.dev/)
+ [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
![](https://web-dev.imgix.net/image/admin/4j72CWywp2D88Xti8zBf.png?auto=format&w=1600)
## CSS
Use `tpl` (templates) for css class names, examples:  
```
.btn-tpl-primary {}
.btn-tpl-secondary {}
...etc
```
Check [caniuse](https://caniuse.com/) for browser support.
## Images
To reduce the size of images without losing quality:  
+ SVG: [SVGOMG](https://jakearchibald.github.io/svgomg/)
+ ALL: [SQUOOSH](https://squoosh.app/)  

Use modern image format:
+ WebP: [Images WebP](https://web.dev/i18n/es/serve-images-webp/)
## HTML HEAD
Check `<head>` order to identify blocking resources.
+ [csswizardry](https://github.com/csswizardry/ct)
# Roadmap
- [ ] Add image converter to WebP: [imagemin-webp](https://github.com/imagemin/imagemin-webp)

- [ ] Add Lighthouse reports in the pipeline: [NPM Lighthouse](https://www.npmjs.com/package/lighthouse)
