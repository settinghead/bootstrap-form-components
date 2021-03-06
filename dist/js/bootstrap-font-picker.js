var CONFIG = {};

if(typeof TEMPLATES === 'undefined') {var TEMPLATES = {};}
TEMPLATES['font-picker-template.html'] = "<!-- Font Family -->\n" +
    "<!-- Can't use an HTML select because the items in the drop-down need to be\n" +
    "     styled individually. -->\n" +
    "<div class=\"bfh-selectbox\">\n" +
    "  <input class=\"font-family\" type=\"hidden\" value=\"\">\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle font-select-btn\"\n" +
    "    data-toggle=\"bfh-selectbox\">\n" +
    "    <span class=\"bfh-selectbox-option\"></span>\n" +
    "    <span class=\"caret selectbox-caret\"></span>\n" +
    "  </button>\n" +
    "  <div class=\"bfh-selectbox-options\">\n" +
    "    <div role=\"listbox\">\n" +
    "      <ul role=\"option\"></ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Google Fonts -->\n" +
    "<div class=\"google-fonts modal fade\" tabindex=\"-1\" role=\"dialog\"\n" +
    "  aria-hidden=\"true\" data-backdrop=\"false\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button class=\"close\" type=\"button\" aria-hidden=\"true\"\n" +
    "          data-dismiss=\"modal\">\n" +
    "          <span>&times;</span><span class=\"sr-only\">Close</span>\n" +
    "        </button>\n" +
    "        <h2 class=\"modal-title\">Google Fonts</h2>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        <div class=\"list-group bfh-googlefontlist\"></div>\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\">\n" +
    "          <span data-i18n=\"cancel\">Cancel</span> <i class=\"fa fa-times fa-white icon-right\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Custom Font -->\n" +
    "<div class=\"custom-font modal fade\" tabindex=\"-1\" role=\"dialog\"\n" +
    "  aria-hidden=\"true\" data-backdrop=\"false\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button class=\"close\" type=\"button\" aria-hidden=\"true\"\n" +
    "          data-dismiss=\"modal\">\n" +
    "          <span>&times;</span><span class=\"sr-only\">Close</span>\n" +
    "        </button>\n" +
    "        <h2 class=\"modal-title\">Custom Font</h2>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        <div class=\"custom-font-error alert alert-danger\">\n" +
    "          Unable to validate the URL entered. Please un-check \"Validate URL\" to bypass validation.\n" +
    "        </div>\n" +
    "        <div class=\"url-field\"></div>\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"save-custom-font btn btn-success btn-fixed-width\" >\n" +
    "          <span data-i18n=\"select\">Select</span> <i class=\"fa fa-check fa-white icon-right\"></i>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\">\n" +
    "          <span data-i18n=\"cancel\">Cancel</span> <i class=\"fa fa-times fa-white icon-right\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    ""; 
var RiseVision = RiseVision || {};

RiseVision.Common = RiseVision.Common || {};

RiseVision.Common.Validation = (function() {
	"use strict";

	/*
	Defining the regular expressions being used
	 */
	var urlRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
      numericRegex = /^(\-|\+)?([0-9]+|Infinity)$/,
			decimalRegex = /^\-?[0-9]*\.?[0-9]+$/;

	function greaterThan(element, param) {
		var value = element.value.trim();

		if (!decimalRegex.test(value)) {
			return false;
		}

		return (parseFloat(value) > parseFloat(param));
	}

	function lessThan(element, param) {
		var value = element.value.trim();

		if (!decimalRegex.test(value)) {
			return false;
		}

		return (parseFloat(value) < parseFloat(param));
	}

	function numeric(element){
		var value = element.value.trim();

		/*
		 Regexp being used is stricter than parseInt. Using regular expression as
		 mentioned on mozilla
		 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
		 Global_Objects/parseInt
		 */
		return numericRegex.test(value);
	}

	function required(element){
		var value = element.value.trim(),
				valid = false;

		if (element.type === "checkbox" || element.type === "radio") {
			if(element.checked === true) {
				valid = true;
			}
		} else {
			if (value !== null && value !== '') {
				valid = true;
			}
		}

		return valid;
	}

	function url(element){
		var value = element.value.trim();

    // Add http:// if no protocol parameter exists
    if (value.indexOf("://") === -1) {
      value = "http://" + value;
    }
		/*
		 Discussion
		 http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-
		 with-links#21925491

		 Using
     https://gist.github.com/dperini/729294
     Reasoning
     http://mathiasbynens.be/demo/url-regex

		 */
		return urlRegExp.test(value);
	}

	return {
		isGreaterThan: greaterThan,
		isLessThan: lessThan,
		isValidRequired: required,
		isValidURL: url,
		isValidNumber: numeric
	};
})();

RiseVision.Common.Utilities = (function() {
	function loadCustomFont(family, url, contentDocument) {
		var sheet = null;
		var rule = "font-family: " + family + "; " + "src: url('" + url + "');";

		if (contentDocument == null) {
			contentDocument = document;
		}

		sheet = contentDocument.styleSheets[0];

		if (sheet !== null) {
			sheet.addRule("@font-face", rule);
		}
	}

	function loadGoogleFont(family, contentDocument) {
		if (contentDocument == null) {
			contentDocument = document;
		}

		var stylesheet = document.createElement("link");

		stylesheet.setAttribute("rel", "stylesheet");
		stylesheet.setAttribute("type", "text/css");
		stylesheet.setAttribute("href", "https://fonts.googleapis.com/css?family=" +
			family);

		if (stylesheet !== null) {
			contentDocument.getElementsByTagName("head")[0].appendChild(stylesheet);
		}
	}

	return {
		loadCustomFont: loadCustomFont,
		loadGoogleFont: loadGoogleFont,
	};
})();
/*  Copyright © 2014 Rise Vision Incorporated.
 *  Use of this software is governed by the GPLv3 license
 *  (reproduced in the LICENSE file).
 */

 ;(function ($, window, document, TEMPLATES, CONFIG, undefined) {
  "use strict";

  var _pluginName = "fontPicker";
  var CUSTOM_FONT_TEXT = "Use Custom Font";

  function Plugin(element, options) {
    var utils = RiseVision.Common.Utilities,
      $element = $(element),
      $selectBox = null,
      $family = null,
      $customFont = null,
      $customFontUrlField = null,
      $customFontError = null,
      contentDocument = null,
      currentFont = "",
      customFontURL = "";

    options = $.extend({}, {
      "blank":            false,
      "font":             "Arial",
      "font-url":         "",
      "load":             null,
      "showCustom":       true,
      "showMore":         true,
    }, options);

    /*
     *  Private Methods
     */
    function _init() {
      // Get the HTML markup from the template.
      $element.append(TEMPLATES['font-picker-template.html']);

      $selectBox = $element.find(".bfh-selectbox");
      $family = $element.find(".font-family");
      $customFont = $element.find(".custom-font");
      $customFontUrlField = $customFont.find(".url-field");
      $customFontError = $element.find(".custom-font-error");

      // Initialize font list.
      $selectBox.bfhfonts(options);

      // Initialize Google font list.
      $element.find(".bfh-googlefontlist").bfhgooglefontlist();

      // Initialize custom font.
      $customFontUrlField.urlField({
        url: options["font-url"]
      });
      $customFontUrlField = $customFontUrlField.data("plugin_urlField");

      customFontURL = options["font-url"];

      _loadFont();
      _bind();

      if (typeof options.load === "function") {
        options.load.call($element);
      }
    }

    /*
     *  Load the selected font if necessary.
     */
    function _loadFont() {
      var found = false;

      currentFont = $family.val();

      // Custom font
      if (customFontURL !== "") {
        utils.loadCustomFont(currentFont, customFontURL, contentDocument);
        currentFont = CUSTOM_FONT_TEXT;
      }
      else if (currentFont !== null) {
        // Standard font
        $selectBox.find(".bfh-selectbox-options a").each(function(index) {
          if ($(this).text() === currentFont) {
            found = true;
            return false;
          }
        });

        // Google font
        if (!found) {
          addGoogleFont(currentFont, true);
        }
      }
    }

    /*
     *  Add event handlers.
     */
    function _bind() {
      var $googleFonts = $element.find(".google-fonts");

      // Item is selected from dropdown.
      $selectBox.on("change.bfhselectbox", function(e) {
        if (e.target.value === "More Fonts...") {
          $googleFonts.modal("show");
        }
        else if (e.target.value === CUSTOM_FONT_TEXT) {
          currentFont = $family.val();
          $customFontError.hide();
          $customFont.modal("show");
        }
        else {
          currentFont = $family.val();

          $selectBox.trigger("standardFontSelected", [currentFont,
            $element.find("a[data-option='" + currentFont + "']")
              .css("font-family")]);
        }
      });

      // Custom font URL is saved.
      $element.find(".save-custom-font").on("click", function() {
        var fontFamily = "";

        customFontURL = $customFontUrlField.getUrl();
        fontFamily = _getCustomFontName();

        if ($customFontUrlField.validateUrl()) {
          utils.loadCustomFont(fontFamily, customFontURL, contentDocument);
          $customFont.modal("hide");
          $selectBox.trigger("customFontSelected", [fontFamily, customFontURL]);
        }
        else {
          $customFontError.show();
        }
      });

      // Google font is selected.
      $googleFonts.on("select", function(e, family) {
        addGoogleFont(family, true);
        $googleFonts.modal("hide");

        currentFont = $family.val();

        $selectBox.trigger("googleFontSelected", family);
      });

      // Google font dialog is closed.
      $googleFonts.find(".close").on("click", function() {
        // No Google font was selected; revert to previous selection.
        $selectBox.find(".bfh-selectbox-option").data("option", currentFont)
          .html(currentFont);
        $family.val(currentFont);
      });
    }

    /*
     *  Create a unique name for a custom font by extracting the name
     *  from its URL.
     */
    function _getCustomFontName() {
      return customFontURL.split("/").pop().split(".")[0];
    }

    /*
     *  Sort the drop-down.
     */
    function _sortFontList() {
      // Don't sort "Use Custom Font" or "More Fonts...".
      var length = $selectBox.find("[role=option]" + " li").length,
        customFont = $selectBox.find("[role=option]" + " li:nth-last-child(2)"),
        moreFonts = $selectBox.find("[role=option]" + " li:last"),
        sortedFonts = $selectBox.find("[role=option]" + " li")
          .slice(0, length - 2).sort(
            function(a, b) {
              var first = $(a).find("a").text(),
                second = $(b).find("a").text();

              return first == second ? 0 : first < second ? -1 : 1;
            });

      $selectBox.find("[role=option]").html(sortedFonts).append(customFont)
        .append(moreFonts);
    }

    /*
     *  Public Methods
     */
    function getFont() {
      if (customFontURL !== "") {
        return _getCustomFontName();
      }
      else {
        return $family.val();
      }
    }

    function getFontStyle() {
      return $element.find("a[data-option='" + $family.val() + "']")
        .css("font-family");
    }

    function getFontURL() {
      return $customFontUrlField.getUrl();
    }

    /*
     * Set the selected font in the dropdown.
     *
     * @param    string    family    Font family.
     */
    function setFont(family) {
      var font = family.split(",");
      var $elem = null;

      // Remove quotes so that a match can be found.
      if (font.length > 0) {
        font = font[0].replace(/'/g, "");
      }

      $elem = $selectBox.find("a[data-option='" + font + "']");

      // This is a standard or Google font.
      if ($elem.length === 1) {
        $selectBox.find(".bfh-selectbox-option").text($elem.text())
          .data("option", font);
        $family.val(font);
      }
      // This must be a custom font.
      else {
        $selectBox.find(".bfh-selectbox-option").text(CUSTOM_FONT_TEXT)
          .data("option", CUSTOM_FONT_TEXT);
        $family.val(CUSTOM_FONT_TEXT);
      }
    }

    /*
     * Set the content document.
     *
     * @param    object    contentDoc    Content document
     */
    function setContentDocument(contentDoc) {
      contentDocument = contentDoc;
    }

    /*
     * Load the selected Google font and add it to the drop-down.
     *
     * @param   string    family        Font family
     * @param   boolean   isSelected    Whether to set this font as the
     *                                  currently selected font.
     */
    function addGoogleFont(family, isSelected) {
      var $options = $selectBox.find("[role=option]");

      // Load it.
      utils.loadGoogleFont(family, contentDocument);

      // Remove previous Google font, if applicable, and add the new one.
      //$options.find("li.google-font").remove();
      $options.prepend("<li class='google-font'><a tabindex='-1' href='#' " +
        "style='font-family: Google' data-option='" + family + "'>" + family +
        "</a></li>");

      // Set Google font as default and sort.
      if (isSelected) {
        $selectBox.find(".bfh-selectbox-option").data("option", family)
          .html(family);
        $selectBox.find(".font-family").val(family);
      }

      _sortFontList();
    }

    _init();

    return {
      getFont: getFont,
      getFontStyle: getFontStyle,
      getFontURL: getFontURL,
      setFont: setFont,
      setContentDoc: setContentDocument,
      addGoogleFont: addGoogleFont,
    };
  }

  /*
   *  A lightweight plugin wrapper around the constructor that prevents
   *  multiple instantiations.
   */
  $.fn.fontPicker = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + _pluginName)) {
        $.data(this, "plugin_" + _pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document, TEMPLATES, CONFIG);
