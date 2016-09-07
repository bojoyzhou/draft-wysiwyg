'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJsPluginsEditorWysiwyg = require('draft-js-plugins/draft-js-plugins-editor-wysiwyg');

var _draftJsPluginsEditorWysiwyg2 = _interopRequireDefault(_draftJsPluginsEditorWysiwyg);

var _createPlugins = require('./create-plugins');

var _createPlugins2 = _interopRequireDefault(_createPlugins);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WysiwygEditor = function (_Component) {
  _inherits(WysiwygEditor, _Component);

  function WysiwygEditor(props) {
    _classCallCheck(this, WysiwygEditor);

    var _this = _possibleConstructorReturn(this, (WysiwygEditor.__proto__ || Object.getPrototypeOf(WysiwygEditor)).call(this, props));

    _initialiseProps.call(_this);

    _this.batch = batch(200);
    _this.plugins = (0, _createPlugins2.default)(props);
    _this.editorState = props.value ? _draftJs.EditorState.push(_draftJs.EditorState.createEmpty(), (0, _draftJs.convertFromRaw)(props.value)) : _draftJs.EditorState.createEmpty();

    _this.blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(_this.customBlockRendering(props));

    _this.state = {};
    return _this;
  }

  _createClass(WysiwygEditor, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      if (this.props.value !== props.value && this._raw !== props.value) {
        this.editorState = !props.value ? _draftJs.EditorState.createEmpty() : _draftJs.EditorState.push(this.editorState, (0, _draftJs.convertFromRaw)(props.value));
        return true;
      } else if (this.state.active !== state.active || this.state.readOnly !== state.readOnly || this.state.editorState !== state.editorState) {
        return true;
      } else if (this.props.readOnly !== props.readOnly || this.props.fileDrag !== props.fileDrag || this.props.uploading !== props.uploading || this.props.percent !== props.percent) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.editorState;
      var _props = this.props;
      var isDragging = _props.isDragging;
      var progress = _props.progress;
      var readOnly = _props.readOnly;


      return _react2.default.createElement(_draftJsPluginsEditorWysiwyg2.default, { readOnly: readOnly, editorState: editorState,
        plugins: this.plugins,
        blockRenderMap: this.blockRenderMap,
        blockRendererFn: this.blockRendererFn,
        onChange: this.onChange,
        ref: 'editor'
      });
    }
  }]);

  return WysiwygEditor;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (editorState) {
    if (_this2.unmounted) return;
    _this2.editorState = editorState;
    _this2.setState({ editorState: Date.now() });

    if (_this2.props.onChange) {
      _this2.batch(function () {
        _this2._raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
        _this2.props.onChange(_this2._raw, editorState);
      });
    }
  };

  this.focus = function () {
    _this2.refs.editor.focus();
  };

  this.blockRendererFn = function (contentBlock) {
    var blockTypes = _this2.props.blockTypes;

    var type = contentBlock.getType();
    return blockTypes && blockTypes[type] ? {
      component: blockTypes[type]
    } : undefined;
  };

  this.customBlockRendering = function (props) {
    var blockTypes = props.blockTypes;

    var newObj = {
      'paragraph': {
        element: 'div'
      },
      'unstyled': {
        element: 'div'
      },
      'block-image': {
        element: 'div'
      },
      'block-table': {
        element: 'div'
      }
    };
    for (var key in blockTypes) {
      newObj[key] = {
        element: 'div'
      };
    }
    return (0, _immutable.Map)(newObj);
  };
};

exports.default = WysiwygEditor;


var batch = function batch() {
  var limit = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];

  var _callback = null;
  return function (callback) {
    _callback = callback;
    setTimeout(function () {
      if (_callback === callback) {
        callback();
      }
    }, limit);
  };
};