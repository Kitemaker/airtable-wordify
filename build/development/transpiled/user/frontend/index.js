"use strict";

var _ui = require("@airtable/blocks/ui");

var _react = _interopRequireWildcard(require("react"));

var _blocks = require("@airtable/blocks");

var _settings = require("./settings");

var _SettingsForm = _interopRequireDefault(require("./SettingsForm"));

var _models = require("@airtable/blocks/models");

var _styles = require("@material-ui/core/styles");

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var tokenizer = require('wink-tokenizer');

var myTokenizer = tokenizer();

var wiktionary = require("wiktionary-node");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5)
      }
    }
  };
});

var cheerio = require('cheerio');

var stopWordList = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'I', "The", 'is', 'a', 'an', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]; // These values match the base for this example: https://airtable.com/shrIho8SB7RhrlUQL

var TABLE_NAME = 'Articles';
var TITLE_FIELD_NAME = 'Title';
var EXTRACT_FIELD_NAME = 'Extract';
var IMAGE_FIELD_NAME = 'Image'; // Airtable SDK limit: we can only update 50 records at a time. For more details, see
// https://github.com/Airtable/blocks/blob/master/packages/sdk/docs/guide_writes.md#size-limits--rate-limits

var MAX_RECORDS_PER_UPDATE = 50; // The API endpoint we're going to hit. For more details, see
// https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

var API_ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/page/summary';
var WIKTIONARY_API = 'https://en.wiktionary.org/w/api.php?action=query&titles=test';

function WikipediaEnrichmentBlock() {
  var _table$checkPermissio;

  var base = (0, _ui.useBase)();
  var table = base.getTableByName(TABLE_NAME);
  var titleField = table.getFieldByName(TITLE_FIELD_NAME);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSettingsOpen = _useState2[0],
      setIsSettingsOpen = _useState2[1]; // useSettingsButton(() => setIsSettingsOpen(!isSettingsOpen));


  var _useSettings = (0, _settings.useSettings)(),
      isValid = _useSettings.isValid,
      _useSettings$settings = _useSettings.settings,
      isEnforced = _useSettings$settings.isEnforced,
      urlTable = _useSettings$settings.urlTable; // load the records ready to be updated
  // we only need to load the word field - the others don't get read, only written to.


  var records = (0, _ui.useRecords)(table, {
    fields: [titleField]
  }); // keep track of whether we have up update currently in progress - if there is, we want to hide
  // the update button so you can't have two updates running at once.

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isUpdateInProgress = _useState4[0],
      setIsUpdateInProgress = _useState4[1]; // check whether we have permission to update our records or not. Any time we do a permissions
  // check like this, we can pass in undefined for values we don't yet know. Here, as we want to
  // make sure we can update the summary and image fields, we make sure to include them even
  // though we don't know the values we want to use for them yet.


  var permissionCheck = table.checkPermissionsForUpdateRecord(undefined, (_table$checkPermissio = {}, _defineProperty(_table$checkPermissio, EXTRACT_FIELD_NAME, undefined), _defineProperty(_table$checkPermissio, IMAGE_FIELD_NAME, undefined), _table$checkPermissio)); // Caches the currently selected record and field in state. If the user
  // selects a record and a preview appears, and then the user de-selects the
  // record (but does not select another), the preview will remain. This is
  // useful when, for example, the user resizes the blocks pane.

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedRecordId = _useState6[0],
      setSelectedRecordId = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedFieldId = _useState8[0],
      setSelectedFieldId = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      recordActionErrorMessage = _useState10[0],
      setRecordActionErrorMessage = _useState10[1]; // cursor.selectedRecordIds and selectedFieldIds aren't loaded by default,
  // so we need to load them explicitly with the useLoadable hook. The rest of
  // the code in the component will not run until they are loaded.


  (0, _ui.useLoadable)(_blocks.cursor); // Update the selectedRecordId and selectedFieldId state when the selected
  // record or field change.

  (0, _ui.useWatchable)(_blocks.cursor, ['selectedRecordIds', 'selectedFieldIds'], function () {
    // If the update was triggered by a record being de-selected,
    // the current selectedRecordId will be retained.  This is
    // what enables the caching described above.
    if (_blocks.cursor.selectedRecordIds.length > 0) {
      // There might be multiple selected records. We'll use the first
      // one.
      setSelectedRecordId(_blocks.cursor.selectedRecordIds[0]);
    }

    if (_blocks.cursor.selectedFieldIds.length > 0) {
      // There might be multiple selected fields. We'll use the first
      // one.
      setSelectedFieldId(_blocks.cursor.selectedFieldIds[0]);
    }
  }); // This watch deletes the cached selectedRecordId and selectedFieldId when
  // the user moves to a new table or view. This prevents the following
  // scenario: User selects a record that contains a preview url. The preview appears.
  // User switches to a different table. The preview disappears. The user
  // switches back to the original table. Weirdly, the previously viewed preview
  // reappears, even though no record is selected.

  (0, _ui.useWatchable)(_blocks.cursor, ['activeTableId', 'activeViewId'], function () {
    setSelectedRecordId(null);
    setSelectedFieldId(null);
  });
  var activeTable = base.getTableByIdIfExists(_blocks.cursor.activeTableId);
  (0, _react.useEffect)(function () {
    // Display the settings form if the settings aren't valid.
    if (!isValid && !isSettingsOpen) {
      setIsSettingsOpen(true);
    }
  }, [isValid, isSettingsOpen]); // activeTable is briefly null when switching to a newly created table.

  if (!activeTable) {
    return null;
  }

  function onButtonClick() {
    return _onButtonClick.apply(this, arguments);
  }

  function _onButtonClick() {
    _onButtonClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var recordUpdates;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsUpdateInProgress(true);
              _context.next = 3;
              return getExtractAndImageUpdatesAsync(table, titleField, records);

            case 3:
              recordUpdates = _context.sent;
              _context.next = 6;
              return updateRecordsInBatchesAsync(table, recordUpdates);

            case 6:
              setIsUpdateInProgress(false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _onButtonClick.apply(this, arguments);
  }

  function onFindWordClick() {
    return _onFindWordClick.apply(this, arguments);
  }

  function _onFindWordClick() {
    _onFindWordClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var recordUpdates;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsUpdateInProgress(true);
              _context2.next = 3;
              return getExtractAndImageUpdatesAsync(table, titleField, records);

            case 3:
              recordUpdates = _context2.sent;
              _context2.next = 6;
              return updateRecordsInBatchesAsync(table, recordUpdates);

            case 6:
              setIsUpdateInProgress(false);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _onFindWordClick.apply(this, arguments);
  }

  return /*#__PURE__*/_react.default.createElement(_ui.Box // center the button/loading spinner horizontally and vertically.
  , {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }, isUpdateInProgress ? /*#__PURE__*/_react.default.createElement(_ui.Loader, null) : /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Box, null, isSettingsOpen ? /*#__PURE__*/_react.default.createElement(_SettingsForm.default, {
    setIsSettingsOpen: setIsSettingsOpen
  }) : /*#__PURE__*/_react.default.createElement(RecordPreviewWithDialog, {
    activeTable: activeTable,
    selectedRecordId: selectedRecordId,
    selectedFieldId: selectedFieldId,
    setIsSettingsOpen: setIsSettingsOpen
  })), /*#__PURE__*/_react.default.createElement(_ui.Button, {
    variant: "primary",
    onClick: onButtonClick,
    disabled: !permissionCheck.hasPermission,
    marginBottom: 3
  }, "Extract Data from Wikipedia"), !permissionCheck.hasPermission && // when we don't have permission to perform the update, we want to tell the
  // user why. `reasonDisplayString` is a human-readable string that will
  // explain why the button is disabled.
  permissionCheck.reasonDisplayString));
} // Shows a preview, or a dialog that displays information about what
// kind of services (URLs) are supported by this block.


function RecordPreviewWithDialog(_ref) {
  var activeTable = _ref.activeTable,
      selectedRecordId = _ref.selectedRecordId,
      selectedFieldId = _ref.selectedFieldId,
      setIsSettingsOpen = _ref.setIsSettingsOpen;

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isDialogOpen = _useState12[0],
      setIsDialogOpen = _useState12[1]; // Close the dialog when the selected record is changed.
  // The new record might have a preview, so we don't want to hide it behind this dialog.


  (0, _react.useEffect)(function () {
    setIsDialogOpen(false);
  }, [selectedRecordId]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Box // position="absolute"
  , {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  }, /*#__PURE__*/_react.default.createElement(RecordPreview, {
    activeTable: activeTable,
    selectedRecordId: selectedRecordId,
    selectedFieldId: selectedFieldId,
    setIsSettingsOpen: setIsSettingsOpen
  })));
} // Shows a preview, or a message about what the user should do to see a preview.


function RecordPreview(_ref2) {
  var activeTable = _ref2.activeTable,
      selectedRecordId = _ref2.selectedRecordId,
      selectedFieldId = _ref2.selectedFieldId,
      setIsDialogOpen = _ref2.setIsDialogOpen,
      setIsSettingsOpen = _ref2.setIsSettingsOpen;

  var _useSettings2 = (0, _settings.useSettings)(),
      _useSettings2$setting = _useSettings2.settings,
      isEnforced = _useSettings2$setting.isEnforced,
      urlField = _useSettings2$setting.urlField,
      urlTable = _useSettings2$setting.urlTable;

  var _useState13 = (0, _react.useState)({
    word: '',
    definitions: {
      noun: [],
      verb: [],
      adjective: [],
      adverb: []
    }
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      wordData = _useState14[0],
      setWordData = _useState14[1];

  var table = isEnforced && urlTable || activeTable;

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      getDataInProgress = _useState16[0],
      setGetDataInProgress = _useState16[1];

  var classes = useStyles(); // We use getFieldByIdIfExists because the field might be deleted.

  var selectedField = selectedFieldId ? table.getFieldByIdIfExists(selectedFieldId) : null; // When using a specific field for previews is enabled and that field exists,
  // use the selectedField

  var previewField = isEnforced && urlField || selectedField; // Triggers a re-render if the record changes. Preview URL cell value
  // might have changed, or record might have been deleted.

  var selectedRecord = (0, _ui.useRecordById)(table, selectedRecordId ? selectedRecordId : '', {
    fields: [previewField]
  }); // Triggers a re-render if the user switches table or view.
  // RecordPreview may now need to render a preview, or render nothing at all.

  (0, _ui.useWatchable)(_blocks.cursor, ['activeTableId', 'activeViewId']); // This button is re-used in two states so it's pulled out in a constant here.
  // const viewSupportedURLsButton = (
  //     <TextButton size="small" marginTop={3} onClick={() => setIsDialogOpen(true)}>
  //         View supported URLs
  //     </TextButton>
  // );

  function onWordClicked(_x, _x2) {
    return _onWordClicked.apply(this, arguments);
  }

  function _onWordClicked() {
    _onWordClicked = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event, word) {
      var output;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setGetDataInProgress(true);
              console.log('event = ', event, 'Word = ', word);
              _context3.next = 4;
              return getExtractWiktionarysAsync(word);

            case 4:
              output = _context3.sent;
              setWordData(output);
              setGetDataInProgress(false);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _onWordClicked.apply(this, arguments);
  }

  if ( // If there is/was a specified table enforced, but the cursor
  // is not presently in the specified table, display a message to the user.
  // Exception: selected record is from the specified table (has been opened
  // via button field or other means while cursor is on a different table.)
  isEnforced && _blocks.cursor.activeTableId !== table.id && !(selectedRecord && selectedRecord.parentTable.id === table.id)) {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      paddingX: 3
    }, "Switch to the \u201C", table.name, "\u201D table to see results."), /*#__PURE__*/_react.default.createElement(_ui.TextButton, {
      size: "small",
      marginTop: 3,
      onClick: function onClick() {
        return setIsSettingsOpen(true);
      }
    }, "Settings"));
  } else if ( // activeViewId is briefly null when switching views
  selectedRecord === null && (_blocks.cursor.activeViewId === null || table.getViewById(_blocks.cursor.activeViewId).type !== _models.ViewType.GRID)) {
    return /*#__PURE__*/_react.default.createElement(_ui.Text, null, "Switch to a grid view to see results");
  } else if ( // selectedRecord will be null on block initialization, after
  // the user switches table or view, or if it was deleted.
  selectedRecord === null || // The preview field may have been deleted.
  previewField === null) {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, null, "Select a cell to see results"));
  } else {
    // Using getCellValueAsString guarantees we get a string back. If
    // we use getCellValue, we might get back numbers, booleans, or
    // arrays depending on the field type.
    var cellValue = selectedRecord.getCellValueAsString(previewField);

    if (!cellValue) {
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, null, "The \u201C", previewField.name, "\u201D field is empty"));
    } else {
      var wordList = getWords(cellValue);
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, getDataInProgress ? /*#__PURE__*/_react.default.createElement(_ui.Loader, null) : /*#__PURE__*/_react.default.createElement(_ui.Box, null, wordData.word !== "" ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Heading, null, wordData.word.toUpperCase()), wordData.definitions.noun.length > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
        size: "small"
      }, "Noun"), wordData.definitions.noun.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_ui.Text, {
          key: index
        }, "\xA0 ", index + 1, ".\xA0 ", item);
      })) : null, wordData.definitions.verb.length > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
        size: "small"
      }, "Verb"), wordData.definitions.verb.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_ui.Text, {
          key: index
        }, "\xA0 ", index + 1, ".\xA0", item);
      })) : null, wordData.definitions.adjective.length > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
        size: "small"
      }, "Adjective"), wordData.definitions.adjective.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_ui.Text, {
          key: index
        }, "\xA0 ", index + 1, ".\xA0", item);
      })) : null, wordData.definitions.adverb.length > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ui.Heading, {
        size: "small"
      }, "Adverb"), wordData.definitions.adverb.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_ui.Text, {
          key: index
        }, "\xA0 ", index + 1, ".\xA0", item);
      })) : null) : null), /*#__PURE__*/_react.default.createElement(_ui.Box, {
        marginTop: "10px"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: classes.root
      }, wordList.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_Chip.default, {
          label: item,
          clickable: true,
          onClick: function onClick(event) {
            return onWordClicked(event, item);
          },
          color: "primary"
        }) //  <Text>{item}</Text>
        ;
      }))));
    }
  }
}

function getWords(cellValueText) {
  if (!cellValueText) {
    return null;
  } else {
    var _ret = function () {
      var output = [];
      var tokens = myTokenizer.tokenize(cellValueText);

      var _loop = function _loop(i) {
        // check if word is already added
        if (output.findIndex(function (wrd) {
          return wrd === tokens[i].value;
        }) === -1) {
          if (tokens[i].tag === 'word' && stopWordList.findIndex(function (item) {
            return item === tokens[i].value;
          }) === -1 && tokens[i].value.length > 2) {
            output.push(tokens[i].value);
          }
        }
      };

      for (var i = 0; i < tokens.length; i++) {
        _loop(i);
      }

      return {
        v: output
      };
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  }
}

function getWikiPageSectionText(_x3, _x4) {
  return _getWikiPageSectionText.apply(this, arguments);
}

function _getWikiPageSectionText() {
  _getWikiPageSectionText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(word, index) {
    var requestOptions, requestUrl, response, result, html;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            requestOptions = {
              method: 'POST',
              redirect: 'follow',
              cors: true
            };
            requestUrl = "https://en.wiktionary.org/w/api.php?action=parse&format=json&page=" + word + "&prop=text&section=" + index + "&utf8=1&origin=*";
            console.log('requestUrl = ', requestUrl);
            _context4.next = 5;
            return fetch(requestUrl, requestOptions);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            result = _context4.sent;
            console.log('getWikiPageSectionText result = ', result);
            html = result.parse.text['*'];
            return _context4.abrupt("return", html);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getWikiPageSectionText.apply(this, arguments);
}

function getWikiSectionText(_x5, _x6) {
  return _getWikiSectionText.apply(this, arguments);
}

function _getWikiSectionText() {
  _getWikiSectionText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(word, sectionIndex) {
    var sectionText, $;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            sectionText = [];
            _context5.t0 = cheerio;
            _context5.next = 4;
            return getWikiPageSectionText(word, sectionIndex);

          case 4:
            _context5.t1 = _context5.sent;
            $ = _context5.t0.load.call(_context5.t0, _context5.t1);
            $('ol').find('li').each(function (i, elem) {
              sectionText[i] = $(this).text();
            });
            return _context5.abrupt("return", sectionText);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getWikiSectionText.apply(this, arguments);
}

function getExtractWiktionarysAsync(_x7) {
  return _getExtractWiktionarysAsync.apply(this, arguments);
}

function _getExtractWiktionarysAsync() {
  _getExtractWiktionarysAsync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(InputWord) {
    var recordUpdates, wordLowerCase, wordInfo, wordPosData, requestOptions, response, result, sections, section, listitem, noun, verb, adjective, adverb, _iterator, _step, posText, _posText, _posText2, _posText3;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            recordUpdates = [];
            wordLowerCase = InputWord.toLowerCase();
            wordInfo = {
              noun: [],
              verb: [],
              adjective: [],
              adverb: []
            };
            wordPosData = {
              word: "",
              definitions: wordInfo
            };
            _context6.prev = 4;
            requestOptions = {
              method: 'POST',
              redirect: 'follow'
            };
            _context6.next = 8;
            return fetch("https://en.wiktionary.org/w/api.php?action=parse&format=json&page=" + wordLowerCase + "&prop=sections&utf8=1&origin=*", requestOptions);

          case 8:
            response = _context6.sent;
            _context6.next = 11;
            return response.json();

          case 11:
            result = _context6.sent;
            sections = result.parse.sections;
            noun = [];
            verb = [];
            adjective = [];
            adverb = [];
            _iterator = _createForOfIteratorHelper(sections);
            _context6.prev = 18;

            _iterator.s();

          case 20:
            if ((_step = _iterator.n()).done) {
              _context6.next = 50;
              break;
            }

            section = _step.value;

            if (!(section.line === 'Noun')) {
              _context6.next = 29;
              break;
            }

            _context6.next = 25;
            return getWikiSectionText(wordLowerCase, section.index);

          case 25:
            posText = _context6.sent;
            wordInfo.noun = posText.slice(0, 5);
            _context6.next = 48;
            break;

          case 29:
            if (!(section.line === 'Verb')) {
              _context6.next = 36;
              break;
            }

            _context6.next = 32;
            return getWikiSectionText(wordLowerCase, section.index);

          case 32:
            _posText = _context6.sent;
            wordInfo.verb = _posText.slice(0, 5);
            _context6.next = 48;
            break;

          case 36:
            if (!(section.line === 'Adjective')) {
              _context6.next = 43;
              break;
            }

            _context6.next = 39;
            return getWikiSectionText(wordLowerCase, section.index);

          case 39:
            _posText2 = _context6.sent;
            wordInfo.adjective = _posText2.slice(0, 5);
            _context6.next = 48;
            break;

          case 43:
            if (!(section.line === 'Adverb')) {
              _context6.next = 48;
              break;
            }

            _context6.next = 46;
            return getWikiSectionText(wordLowerCase, section.index);

          case 46:
            _posText3 = _context6.sent;
            wordInfo.adverb = _posText3.slice(0, 5);

          case 48:
            _context6.next = 20;
            break;

          case 50:
            _context6.next = 55;
            break;

          case 52:
            _context6.prev = 52;
            _context6.t0 = _context6["catch"](18);

            _iterator.e(_context6.t0);

          case 55:
            _context6.prev = 55;

            _iterator.f();

            return _context6.finish(55);

          case 58:
            console.log('wordinfo = ', wordInfo); //const [wordData, setWordData] = useState({word:'',pos:'',definitions:[]});

            wordPosData = {
              word: InputWord,
              definitions: wordInfo
            };
            _context6.next = 65;
            break;

          case 62:
            _context6.prev = 62;
            _context6.t1 = _context6["catch"](4);
            console.log(_context6.t1);

          case 65:
            return _context6.abrupt("return", wordPosData);

          case 66:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 62], [18, 52, 55, 58]]);
  }));
  return _getExtractWiktionarysAsync.apply(this, arguments);
}

function getExtractAndImageUpdatesAsync(_x8, _x9, _x10) {
  return _getExtractAndImageUpdatesAsync.apply(this, arguments);
}

function _getExtractAndImageUpdatesAsync() {
  _getExtractAndImageUpdatesAsync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(table, titleField, records) {
    var recordUpdates, _iterator2, _step2, _fields, record, articleTitle, requestUrl, response, pageSummary;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            recordUpdates = [];
            _iterator2 = _createForOfIteratorHelper(records);
            _context7.prev = 2;

            _iterator2.s();

          case 4:
            if ((_step2 = _iterator2.n()).done) {
              _context7.next = 19;
              break;
            }

            record = _step2.value;
            // for each record, we take the article title and make an API request:
            articleTitle = record.getCellValueAsString(titleField);
            requestUrl = "".concat(API_ENDPOINT, "/").concat(encodeURIComponent(articleTitle), "?redirect=true");
            _context7.next = 10;
            return fetch(requestUrl, {
              cors: true
            });

          case 10:
            response = _context7.sent;
            _context7.next = 13;
            return response.json();

          case 13:
            pageSummary = _context7.sent;
            // then, we can use the result of that API request to decide how we want to update our
            // record. To update an attachment, you need an array of objects with a `url` property.
            recordUpdates.push({
              id: record.id,
              fields: (_fields = {}, _defineProperty(_fields, EXTRACT_FIELD_NAME, pageSummary.extract), _defineProperty(_fields, IMAGE_FIELD_NAME, pageSummary.originalimage ? [{
                url: pageSummary.originalimage.source
              }] : undefined), _fields)
            }); // out of respect for the wikipedia API, a free public resource, we wait a short time
            // between making requests. If you change this example to use a different API, you might
            // not need this.

            _context7.next = 17;
            return delayAsync(50);

          case 17:
            _context7.next = 4;
            break;

          case 19:
            _context7.next = 24;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](2);

            _iterator2.e(_context7.t0);

          case 24:
            _context7.prev = 24;

            _iterator2.f();

            return _context7.finish(24);

          case 27:
            return _context7.abrupt("return", recordUpdates);

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 21, 24, 27]]);
  }));
  return _getExtractAndImageUpdatesAsync.apply(this, arguments);
}

function updateRecordsInBatchesAsync(_x11, _x12) {
  return _updateRecordsInBatchesAsync.apply(this, arguments);
}

function _updateRecordsInBatchesAsync() {
  _updateRecordsInBatchesAsync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(table, recordUpdates) {
    var i, updateBatch;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // Fetches & saves the updates in batches of MAX_RECORDS_PER_UPDATE to stay under size limits.
            i = 0;

          case 1:
            if (!(i < recordUpdates.length)) {
              _context8.next = 8;
              break;
            }

            updateBatch = recordUpdates.slice(i, i + MAX_RECORDS_PER_UPDATE); // await is used to wait for the update to finish saving to Airtable servers before
            // continuing. This means we'll stay under the rate limit for writes.

            _context8.next = 5;
            return table.updateRecordsAsync(updateBatch);

          case 5:
            i += MAX_RECORDS_PER_UPDATE;
            _context8.next = 1;
            break;

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _updateRecordsInBatchesAsync.apply(this, arguments);
}

function delayAsync(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

(0, _ui.initializeBlock)(function () {
  return /*#__PURE__*/_react.default.createElement(WikipediaEnrichmentBlock, null);
});