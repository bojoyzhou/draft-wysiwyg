import React, {Component, PropTypes} from "react";
import {
   Editor,
   EditorState,
   CompositeDecorator,
   ContentState,
   convertToRaw,
   convertFromRaw,
   Modifier,
   SelectionState,
   Entity,
   CharacterMetadata,
   ContentBlock,
   genKey,
   BlockMapBuilder
} from "draft-js";
import generateBlockKey from "draft-js/lib/generateBlockKey";
import {List, Repeat} from 'immutable';

const decorator = new CompositeDecorator([]);

export default class DragDropDraft extends Component {
   constructor(props) {
      super(props);

      var value = EditorState.createEmpty(decorator);
      if (props.value) {
         value = EditorState.push(value, ContentState.createFromBlockArray(convertFromRaw(props.value)));
      }

      this.state = {value};

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => {
         this.lastState = convertToRaw(editorState.getCurrentContent());
         if(props.updateValue){
            props.updateValue(this.lastState);
         }
         this.setState({value: editorState});
      };
   }

   shouldComponentUpdate(props, state) {
      if (props.value !== this.lastState) {
         if (!props.value) {
            this.setState({
               value: EditorState.createEmpty(decorator)
            });
         }
         else {
            this.setState({
               value: EditorState.push(
                  this.state.value,
                  ContentState.createFromBlockArray(convertFromRaw(props.value))
               )
            });
         }
         this.lastState = props.value;
         return false;
      }
      return true;
   }

   mouseUp(e){
      /*if(this.state.toolbox){
         return;
      }*/
      /*
       function getSelected(){
       var t = '';
       if(window.getSelection){
       t = window.getSelection();
       }else if(document.getSelection){
       t = document.getSelection();
       }else if(document.selection){
       t = document.selection.createRange().text;
       }
       return t;//.toString()
       }
       setTimeout(()=>{
         var selection = this.state.value.getSelection();
         console.log(getSelected());
         if(selection.isCollapsed()){
            return this.setState({toolbox: null});
         }
         else{
            this.setState({toolbox: selection.anchorKey});
         }
      }, 100)*/
   }

   setEntityData(block, data){
      var entityKey = block.getEntityAt(0);
      if(entityKey){
         Entity.mergeData(entityKey, {...data});
         this.onChange(EditorState.createWithContent(this.state.value.getCurrentContent(), decorator));
      }
      return {...data};
   }

   myBlockRenderer(contentBlock) {
      const entityKey = contentBlock.getEntityAt(0);
      let data = entityKey ? Entity.get(entityKey).data : {};

      if(this.props.renderBlock){
         return this.props.renderBlock(contentBlock, {
             ...data,
            setEntityData: this.setEntityData.bind(this)
         });
      }
   }

   render() {
      var drop = (e)=> {
         var blockKey = e.dataTransfer.getData("text");
         // Set timeout to allow cursor/selection to move to drop location
         setTimeout(()=> {
            // Get content, selection, block
            var block = this.state.value.getCurrentContent().getBlockForKey(blockKey);
            var editorStateAfterInsert = DragDropDraft.AddBlock(this.state.value, null, block.getType(), Entity.get(block.getEntityAt(0)).data);

            block = editorStateAfterInsert.getCurrentContent().getBlockForKey(blockKey);
            // Get block range and remove dragged block
            var targetRange = new SelectionState({
               anchorKey: block.getKey(),
               anchorOffset: 0,
               focusKey: block.getKey(),
               focusOffset: block.getLength()
            });
            var afterRemoval = Modifier.removeRange(editorStateAfterInsert.getCurrentContent(), targetRange, 'backward');

            // Workaround, revious removeRange removed entity, but not the block
            var rawContent = convertToRaw(afterRemoval);
            rawContent.blocks = rawContent.blocks.filter(x=>x.key!==block.getKey());
            var newState = EditorState.push(this.state.value, ContentState.createFromBlockArray(convertFromRaw(rawContent)), 'remove-range');
            this.setState({value: newState});
         }, 1);
      }

      // Set drag/drop handlers to outer div as editor won't fire those
      return (
         <div onClick={this.focus} onDrop={drop} onMouseUp={this.mouseUp.bind(this)} id="asd">
            <Editor editorState={this.state.value} onChange={this.onChange} ref="editor"  blockRendererFn={this.myBlockRenderer.bind(this)}/>
            {/*<ToolTip active={!!this.state.toolbox} position="top" arrow="center" parent={"span[data-offset-key='"+this.state.toolbox+"-0-0']"}>
               Hallo
            </ToolTip>*/}
         </div>
      );
   }
}

DragDropDraft.GenerateBlockKey = generateBlockKey;
DragDropDraft.AddBlock = function(editorState, selection, type, data, asJson){
   // Get editorstate
   // If none -> get empty
   if(!editorState){
      editorState = EditorState.createEmpty(decorator);
   }
   // If json -> convert to editorstate
   else if(asJson){
      editorState = EditorState.push(
          EditorState.createEmpty(decorator),
          ContentState.createFromBlockArray(convertFromRaw(editorState))
      );
   }

   var contentState = editorState.getCurrentContent(), selectionState = editorState.getSelection();

   // Convert selection from string
   if(typeof selection === 'string'){
      var blocks = contentState.getBlocksAsArray();
      if(selection === 'start' && blocks.length){
         selection = new SelectionState({
            anchorKey: blocks[0].getKey(),
            anchorOffset: 0,
            focusKey: blocks[0].getKey(),
            focusOffset: 0
         });
      }
      else if(selection === 'end' && blocks.length){
         selection = new SelectionState({
            anchorKey: blocks[blocks.length-1].getKey(),
            anchorOffset: blocks[blocks.length-1].getLength(),
            focusKey: blocks[blocks.length-1].getKey(),
            focusOffset: blocks[blocks.length-1].getLength()
         });
      }
   }
   if(selection !== null){
      selectionState = selection;
   }
   var insertionTarget, asMedia, selectedBlock = contentState.getBlockForKey(selectionState.anchorKey);

   // If dropped next to text
   if(selectionState.anchorKey === selectionState.focusKey && selectedBlock && !selectedBlock.text){
      insertionTarget = selectionState;
      asMedia = Modifier.setBlockType(contentState, insertionTarget, type);
   }
   // If dropped next to empty
   else{
      var afterRemoval = Modifier.removeRange(contentState, selectionState, 'backward');
      var targetSelection = afterRemoval.getSelectionAfter();
      var afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
      afterSplit = Modifier.splitBlock(afterSplit, targetSelection);

      //afterSplit = Modifier.insertText(afterSplit, afterSplit.getSelectionAfter(), ' ');

      insertionTarget = afterSplit.getSelectionAfter();
      asMedia = Modifier.setBlockType(afterSplit, insertionTarget, type);
   }

   // Create entity etc.
   var entityKey = Entity.create('TOKEN', 'IMMUTABLE', data);
   var charData = CharacterMetadata.create({entity: entityKey});
   var fragment = BlockMapBuilder.createFromArray([
      new ContentBlock({
         key: genKey(),
         type: type,
         text: ' ',
         characterList: List(Repeat(charData, 1))
      })
   ]);
   var withMedia = Modifier.replaceWithFragment(asMedia, insertionTarget, fragment);
   var newContent = withMedia.merge({
      selectionBefore: selectionState,
      selectionAfter: withMedia.getSelectionAfter().set('hasFocus', true),
   });

   // Push editorstate with new content
   editorState = EditorState.push(editorState, newContent, 'insert-fragment');

   if(asJson){
      // Return JSON
      return convertToRaw(editorState.getCurrentContent());
   }
   // Return default
   return editorState;
}