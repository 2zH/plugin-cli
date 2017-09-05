# docs

## {{namespace}}

## api

### Events:
Name | Desc
-----|-----
{{#each events}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

### Methods:
Name | Desc
-----|-----
{{#each methods}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

{{#if classes}}
### Classes:
Name | Desc
-----|-----
{{#each classes}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

{{/if}}

## version
Version: {{version}}