'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJsFocusPlugin = require('draft-js-focus-plugin');

var _draftJsDndPlugin = require('draft-js-dnd-plugin');

var _draftJsToolbarPlugin = require('draft-js-toolbar-plugin');

var _draftJsAlignmentPlugin = require('draft-js-alignment-plugin');

var _draftJsResizeablePlugin = require('draft-js-resizeable-plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDisplayName = function getDisplayName(WrappedComponent) {
  var component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

var getComponent = function getComponent(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(BlockWrapper, _Component);

    function BlockWrapper(props) {
      _classCallCheck(this, BlockWrapper);

      var _this = _possibleConstructorReturn(this, (BlockWrapper.__proto__ || Object.getPrototypeOf(BlockWrapper)).call(this, props));

      _this.setEntityData = function (patch) {
        var _this$props = _this.props;
        var blockProps = _this$props.blockProps;
        var block = _this$props.block;
        var setEntityData = blockProps.setEntityData;

        setEntityData(patch);
        _this.setState(_extends({}, patch));
      };

      _this.state = {};
      return _this;
    }

    _createClass(BlockWrapper, [{
      key: 'render',
      value: function render() {
        var blockProps = this.props.blockProps;

        var readOnly = blockProps.pluginEditor.getReadOnly();
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, blockProps.entityData, this.state, { setEntityData: this.setEntityData, readOnly: readOnly }));
      }
    }]);

    return BlockWrapper;
  }(_react.Component), _class.displayName = 'BlockWrapper(' + getDisplayName(WrappedComponent) + ')', _class.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent, _temp;
};

exports.default = function (options) {
  return function (WrappedComponent) {
    var _ref = options || {};

    var resizeable = _ref.resizeable;
    var draggable = _ref.draggable;
    var focus = _ref.focus;
    var alignment = _ref.alignment;
    var toolbar = _ref.toolbar;

    var component = getComponent(WrappedComponent);
    if (toolbar !== false) {
      component = (0, _draftJsToolbarPlugin.ToolbarDecorator)(toolbar || {})(component);
    }
    if (alignment !== false) {
      component = (0, _draftJsAlignmentPlugin.AlignmentDecorator)(component);
    }
    if (focus !== false) {
      component = (0, _draftJsFocusPlugin.FocusDecorator)(component);
    }
    if (draggable !== false) {
      component = (0, _draftJsDndPlugin.DraggableDecorator)(component);
    }
    if (resizeable !== false) {
      component = (0, _draftJsResizeablePlugin.ResizeableDecorator)(resizeable || {})(component);
    }
    return component;
  };
};