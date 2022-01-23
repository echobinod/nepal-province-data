(function (root, factory) {
  var pluginName = "NepalProvinceData";

  if (typeof define === "function" && define.amd) {
    define([], factory(pluginName));
  } else if (typeof exports === "object") {
    module.exports = factory(pluginName);
  } else {
    root[pluginName] = factory(pluginName);
  }
})(this, function (pluginName) {
  "use strict";

  var defaults = {
    language: "en",
    provinceSelector: "#province",
    districtSelector: "#district",
    municipalitySelector: "#municipality",
    wardSelector: "#ward",
  };

  var extend = function (target, options) {
    var prop,
      extended = {};
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  };

  /**
     * Helper Functions
     @private
     */
  var privateFunction = function () {
    // Helper function, not directly accessible by instance object
  };

  /**
   * Plugin Object
   * @param {Object} options User options
   * @constructor
   */
  function Plugin(options) {
    this.options = extend(defaults, options);
    this.init(); // Initialization code here
  }

  /**
   * Plugin prototype
   * @public
   * @constructor
   */
  Plugin.prototype = {
    selectedLang: '',

    init: function () {
      this.setProvince();
      this.setDistrict();
      this.setMunicipality();
    },
    setProvince: function () {
      this.selectedLang = (this.options.language.toLowerCase() === 'np') ? "np" : "en";
      const response = fetch(`data/${this.selectedLang}/provinces.json`)
        .then(res => res.json())
        .then(data => {
          data.forEach(province => {
            let select = document.querySelector(this.options.provinceSelector);
            let option = document.createElement("option");
            option.text = province.name;
            option.value = province.id;
            select.add(option);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      let provSel = document.querySelector(this.options.provinceSelector);
      provSel.addEventListener('change', function () {
        sessionStorage.setItem('selectedProvince', provSel.value);
      });
    },
    setDistrict: function () {
      let lang = this.selectedLang;
      let districtSel = document.querySelector(this.options.districtSelector);
      districtSel.addEventListener("click", function () {
        const response = fetch(`data/${lang}/districts.json`)
          .then(res => res.json())
          .then(data => {
            let provDistricts = data.filter(district => district.province_id == sessionStorage.getItem('selectedProvince'));
            provDistricts.forEach(district => {
              let select = districtSel;
              let option = document.createElement("option");
              option.text = district.name;
              option.value = district.id;
              select.add(option);
            });
          })
        sessionStorage.setItem('selectedDistrict', districtSel.value);
      }, { once: true });
    },
    setMunicipality: function () {
      let lang = this.selectedLang;
      let distSel = this.options.districtSelector;
      let muncipalitySel = document.querySelector(this.options.municipalitySelector);
      muncipalitySel.addEventListener("click", function () {
        let selectedDist = document.querySelector(distSel).value;
        const response = fetch(`data/${lang}/municipalities.json`)
          .then(res => res.json())
          .then(data => {
            let distMunicies = data.filter(mun => mun.district_id == selectedDist);
            distMunicies.forEach(mun => {
              let select = muncipalitySel;
              let option = document.createElement("option");
              option.text = mun.name;
              option.value = mun.name;
              select.add(option);
            })
          });
      }, { once: true });
    }
  };
  return Plugin;
});
