"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ui = require("@airtable/blocks/ui");

var _settings = require("./settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SettingsForm(_ref) {
  var setIsSettingsOpen = _ref.setIsSettingsOpen;
  var globalConfig = (0, _ui.useGlobalConfig)();

  var _useSettings = (0, _settings.useSettings)(),
      isValid = _useSettings.isValid,
      message = _useSettings.message,
      _useSettings$settings = _useSettings.settings,
      isEnforced = _useSettings$settings.isEnforced,
      urlTable = _useSettings$settings.urlTable;

  return /*#__PURE__*/_react.default.createElement(_ui.Box, {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_ui.Box, {
    flex: "auto",
    padding: 4,
    paddingBottom: 2
  }, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
    marginBottom: 3
  }, "Settings"), /*#__PURE__*/_react.default.createElement(_ui.FormField, {
    label: ""
  }, /*#__PURE__*/_react.default.createElement(_ui.Switch, {
    "aria-label": "When enabled, the block will only show previews for the specified table and field, regardless of what field is selected.",
    value: isEnforced,
    onChange: function onChange(value) {
      globalConfig.setAsync(_settings.ConfigKeys.IS_ENFORCED, value);
    },
    label: "Use a specific field for previews"
  }), /*#__PURE__*/_react.default.createElement(_ui.Text, {
    paddingY: 1,
    textColor: "light"
  }, isEnforced ? 'The block will show previews for the selected record in grid view if the table has a supported URL in the specified field.' : 'The block will show previews if the selected cell in grid view has a supported URL.')), isEnforced && /*#__PURE__*/_react.default.createElement(_ui.FormField, {
    label: "Preview table"
  }, /*#__PURE__*/_react.default.createElement(_ui.TablePickerSynced, {
    globalConfigKey: _settings.ConfigKeys.URL_TABLE_ID
  })), isEnforced && urlTable && /*#__PURE__*/_react.default.createElement(_ui.FormField, {
    label: "Preview field"
  }, /*#__PURE__*/_react.default.createElement(_ui.FieldPickerSynced, {
    table: urlTable,
    globalConfigKey: _settings.ConfigKeys.URL_FIELD_ID,
    allowedTypes: _settings.allowedUrlFieldTypes
  }))), /*#__PURE__*/_react.default.createElement(_ui.Box, {
    display: "flex",
    flex: "none",
    padding: 3,
    borderTop: "thick"
  }, /*#__PURE__*/_react.default.createElement(_ui.Box, {
    flex: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 2
  }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
    textColor: "light"
  }, message)), /*#__PURE__*/_react.default.createElement(_ui.Button, {
    disabled: !isValid,
    size: "large",
    variant: "primary",
    onClick: function onClick() {
      return setIsSettingsOpen(false);
    }
  }, "Done")));
}

SettingsForm.propTypes = {
  setIsSettingsOpen: _propTypes.default.func.isRequired
};
var _default = SettingsForm;
exports.default = _default;