# Nepal Province Data

## Description

Nepal Province Data is Vanilla JavaScript plugin to filter province, district, municipality and ward data.

## About Dataset

All data are collected from wikipedia and various Nepal government sites.

## Basic Usage

- Link script.js file to your HTML document
- Create new instance as below:

```javascript
var init = new NepalProvinceData {
    language: 'en',
    provinceSelector: '#province',
    districtSelector: '#district',
    municipalitySelector: '#municipality',
}
```

- 'np' for Nepali language and 'en' for English.
- Define selector for province, district and muncipality.
