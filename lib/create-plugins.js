'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditorWysiwyg = require('draft-js-plugins-editor-wysiwyg');

var _draftJsPluginsEditorWysiwyg2 = _interopRequireDefault(_draftJsPluginsEditorWysiwyg);

var _draftJsCleanupEmptyPlugin = require('draft-js-cleanup-empty-plugin');

var _draftJsCleanupEmptyPlugin2 = _interopRequireDefault(_draftJsCleanupEmptyPlugin);

var _draftJsEntityPropsPlugin = require('draft-js-entity-props-plugin');

var _draftJsEntityPropsPlugin2 = _interopRequireDefault(_draftJsEntityPropsPlugin);

var _draftJsFocusPlugin = require('draft-js-focus-plugin');

var _draftJsFocusPlugin2 = _interopRequireDefault(_draftJsFocusPlugin);

var _draftJsDndPlugin = require('draft-js-dnd-plugin');

var _draftJsDndPlugin2 = _interopRequireDefault(_draftJsDndPlugin);

var _draftJsToolbarPlugin = require('draft-js-toolbar-plugin');

var _draftJsToolbarPlugin2 = _interopRequireDefault(_draftJsToolbarPlugin);

var _draftJsAlignmentPlugin = require('draft-js-alignment-plugin');

var _draftJsAlignmentPlugin2 = _interopRequireDefault(_draftJsAlignmentPlugin);

var _draftJsResizeablePlugin = require('draft-js-resizeable-plugin');

var _draftJsResizeablePlugin2 = _interopRequireDefault(_draftJsResizeablePlugin);

var _draftJsImagePlugin = require('draft-js-image-plugin');

var _draftJsImagePlugin2 = _interopRequireDefault(_draftJsImagePlugin);

var _draftJsTablePlugin = require('draft-js-table-plugin');

var _draftJsTablePlugin2 = _interopRequireDefault(_draftJsTablePlugin);

require('draft-js-alignment-plugin/lib/plugin.css');

require('draft-js-focus-plugin/lib/plugin.css');

require('draft-js-image-plugin/lib/plugin.css');

require('draft-js-table-plugin/lib/plugin.css');

require('draft-js-toolbar-plugin/lib/plugin.css');

var _addBlock = require('draft-js-dnd-plugin/lib/modifiers/addBlock');

var _addBlock2 = _interopRequireDefault(_addBlock);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// Blocks


// Styles


// Utils


var image = (0, _draftJsResizeablePlugin.ResizeableDecorator)({
  resizeSteps: 10,
  handles: true,
  vertical: 'auto'
})((0, _draftJsDndPlugin.DraggableDecorator)((0, _draftJsFocusPlugin.FocusDecorator)((0, _draftJsAlignmentPlugin.AlignmentDecorator)((0, _draftJsToolbarPlugin.ToolbarDecorator)()((0, _draftJsImagePlugin.imageCreator)({ theme: _draftJsImagePlugin.imageStyles }))))));
var table = (0, _draftJsFocusPlugin.FocusDecorator)((0, _draftJsDndPlugin.DraggableDecorator)((0, _draftJsToolbarPlugin.ToolbarDecorator)()((0, _draftJsTablePlugin.tableCreator)({ theme: _draftJsTablePlugin.tableStyles, Editor: _draftJsPluginsEditorWysiwyg2.default }))));

// Init Plugins

exports.default = function (_ref) {
  var handleUpload = _ref.handleUpload;
  var handleDefaultData = _ref.handleDefaultData;
  var _ref$plugins = _ref.plugins;
  var plugins = _ref$plugins === undefined ? function () {} : _ref$plugins;
  var _ref$toolbar = _ref.toolbar;
  var toolbar = _ref$toolbar === undefined ? { disableItems: [], textActions: [] } : _ref$toolbar;
  return [plugins, (0, _draftJsCleanupEmptyPlugin2.default)({
    types: ['block-image', 'block-table']
  }), (0, _draftJsEntityPropsPlugin2.default)({}), (0, _draftJsToolbarPlugin2.default)({
    __toolbarHandler: {
      add: function add(props) {
        return console.log('Add toolbar', props);
      },
      remove: function remove(props) {
        return console.log('Remove toolbar', props);
      }
    }, textActions: [].concat(_toConsumableArray([{
      button: _react2.default.createElement(
        'span',
        null,
        'H1'
      ),
      key: 'H1',
      label: 'Header 1',
      active: function active(block, editorState) {
        return block.get('type') === 'header-1';
      },
      toggle: function toggle(block, action, editorState, setEditorState) {
        return setEditorState(_draftJs.RichUtils.toggleBlockType(editorState, 'header-1'));
      }
    }, {
      button: _react2.default.createElement(
        'span',
        null,
        'H2'
      ),
      key: 'H2',
      label: 'Header 2',
      active: function active(block, editorState) {
        return block.get('type') === 'header-2';
      },
      toggle: function toggle(block, action, editorState, setEditorState) {
        return setEditorState(_draftJs.RichUtils.toggleBlockType(editorState, 'header-2'));
      }
    }, {
      button: _react2.default.createElement(
        'span',
        null,
        'H3'
      ),
      key: 'H3',
      label: 'Header 3',
      active: function active(block, editorState) {
        return block.get('type') === 'header-3';
      },
      toggle: function toggle(block, action, editorState, setEditorState) {
        return setEditorState(_draftJs.RichUtils.toggleBlockType(editorState, 'header-3'));
      }
    }, {
      button: _react2.default.createElement(
        'span',
        null,
        'H4'
      ),
      key: 'H4',
      label: 'Header 4',
      active: function active(block, editorState) {
        return block.get('type') === 'header-4';
      },
      toggle: function toggle(block, action, editorState, setEditorState) {
        return setEditorState(_draftJs.RichUtils.toggleBlockType(editorState, 'header-4'));
      }
    }, {
      button: _react2.default.createElement(
        'span',
        null,
        'H5'
      ),
      key: 'H5',
      label: 'Header 5',
      active: function active(block, editorState) {
        return block.get('type') === 'header-4';
      },
      toggle: function toggle(block, action, editorState, setEditorState) {
        return setEditorState(_draftJs.RichUtils.toggleBlockType(editorState, 'header-5'));
      }
    }].filter(function (toolbarItem) {
      return !toolbar.disableItems.includes(toolbarItem.key);
    })), _toConsumableArray(toolbar.textActions))
  }), (0, _draftJsFocusPlugin2.default)({}), (0, _draftJsAlignmentPlugin2.default)({}), (0, _draftJsDndPlugin2.default)({
    allowDrop: true,
    handleUpload: handleUpload,
    handleDefaultData: handleDefaultData,
    handlePlaceholder: function handlePlaceholder(state, selection, data) {
      var type = data.type;

      if (type.indexOf('image/') === 0) {
        return 'block-image';
      } else if (type.indexOf('text/') === 0 || type === 'application/json') {
        return 'placeholder-github';
      }return undefined;
    }, handleBlock: function handleBlock(state, selection, data) {
      var type = data.type;

      if (type.indexOf('image/') === 0) {
        return 'block-image';
      } else if (type.indexOf('text/') === 0 || type === 'application/json') {
        return 'block-text';
      }return undefined;
    }
  }), (0, _draftJsResizeablePlugin2.default)({}),
  // Blocks
  (0, _draftJsImagePlugin2.default)({ component: image }), (0, _draftJsTablePlugin2.default)({ component: table, Editor: _draftJsPluginsEditorWysiwyg2.default })];
};