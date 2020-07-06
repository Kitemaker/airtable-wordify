"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSettings = useSettings;
exports.allowedUrlFieldTypes = exports.ConfigKeys = void 0;

var _ui = require("@airtable/blocks/ui");

var _models = require("@airtable/blocks/models");

var ConfigKeys = {
  IS_ENFORCED: 'isEnforced',
  URL_TABLE_ID: 'urlTableId',
  URL_FIELD_ID: 'urlFieldId'
};
exports.ConfigKeys = ConfigKeys;
var allowedUrlFieldTypes = [_models.FieldType.FORMULA, _models.FieldType.SINGLE_LINE_TEXT, _models.FieldType.MULTILINE_TEXT, _models.FieldType.URL];
/**
 * Return settings from GlobalConfig with defaults, and converts them to Airtable objects.
 * @param {object} globalConfig
 * @param {Base} base - The base being used by the block in order to convert id's to objects
 * @returns {{
 *     isEnforced: true | false,
 *     urlTable: Table | null,
 *     urlField: Field | null,
 * }}
 */

exports.allowedUrlFieldTypes = allowedUrlFieldTypes;

function getSettings(globalConfig, base) {
  var isEnforced = Boolean(globalConfig.get(ConfigKeys.IS_ENFORCED));
  var urlFieldId = globalConfig.get(ConfigKeys.URL_FIELD_ID);
  var urlTableId = globalConfig.get(ConfigKeys.URL_TABLE_ID);
  var urlTable = base.getTableByIdIfExists(urlTableId);
  var urlField = urlTable ? urlTable.getFieldByIdIfExists(urlFieldId) : null;
  return {
    isEnforced: isEnforced,
    urlField: urlField,
    urlTable: urlTable
  };
}
/**
 * Wraps the settings with validation information
 * @param {object} settings - The object returned by getSettings
 * @returns {{settings: *, isValid: boolean}|{settings: *, isValid: boolean, message: string}}
 */


function getSettingsValidationResult(settings) {
  var isEnforced = settings.isEnforced,
      urlTable = settings.urlTable,
      urlField = settings.urlField;
  var isValid = true;
  var message = null; // If the enforcement switch is set to "Yes"...

  if (isEnforced) {
    if (!urlTable) {
      // If table has not yet been selected...
      isValid = false;
      message = 'Please select a table for articles';
    } else if (!urlField) {
      // If a table has been selected, but no field...
      isValid = false;
      message = 'Please select a field for previews';
    } else if (!allowedUrlFieldTypes.includes(urlField.type)) {
      isValid = false;
      message = 'Please select a supported field for previews';
    }
  }

  return {
    isValid: isValid,
    message: message,
    settings: settings
  };
}
/**
 * A React hook to validate and access settings configured in SettingsForm.
 * @returns {{settings: *, isValid: boolean, message: string}|{settings: *, isValid: boolean}}
 */


function useSettings() {
  var base = (0, _ui.useBase)();
  var globalConfig = (0, _ui.useGlobalConfig)();
  var settings = getSettings(globalConfig, base);
  return getSettingsValidationResult(settings);
}