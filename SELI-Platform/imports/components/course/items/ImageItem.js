import React from 'react';
import ItemFeedback from '../../accessibility/ItemFeedback';
import ResizableContent from './ResizableContent';
import DiscreteSlider from './DiscreteSlider';
import Grid from '@material-ui/core/Grid';
import CheckboxLabels from './CheckBox';
import { Editor, EditorState, convertFromRaw } from "draft-js";

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
      shortlongDescription: ''
    }
  }

  changeImageSize(){
    let image = document.getElementById(this.props.item.attributes.image._id+this.props.item.id);
    image.style.backgroundSize = `${image.clientWidth}px`;
    this.resizeText();
  }

  setImageSize(e, direction, ref, d){
    //let width = document.getElementById(this.props.item.attributes.image._id + this.props.item.id).clientWidth;
    let item = this.props.item;
    item.attributes.size.width = width,
    item.attributes.size.height = height,
    this.setState({
      width: this.props.item.attributes.size.width ,
      height: this.props.item.attributes.size.height,
    });
    this.resizeText();
  }

  resizeText(){
    let item = this.props.item;
    this.setState({
      changingSize: true,
    });
    if(this.props.item.attributes.description !== "" && (this.props.item.attributes.alignment === "row" || this.props.item.attributes.alignment === "row-reverse")){
      let image = document.getElementById(this.props.item.attributes.image._id+this.props.item.id);
      let text = document.getElementById(this.props.item.attributes.image._id + "description" + this.props.item.id);
      var style = image.currentStyle || window.getComputedStyle(image),
      width = image.offsetWidth, // or use style.width
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      let imageWidth = width + margin - padding + border + 30;
      this.props.item.attributes.descriptionWidth = `calc(100% - ${imageWidth}px)`;
    }
  }

  adjust=(width, height)=>{
    /* this.setState({
      width:width,
      height:height
    }) */
    this.props.item.attributes.size.width=width
    this.props.item.attributes.size.height=height
    this.setState({
      width: this.props.item.attributes.size.width ,
      height: this.props.item.attributes.size.height,
    });
    
    //this.resizeText();
  }

  checkBoxLabels=()=>{
    return(
      <div className="checkBoxItem">
        {
          this.props.item.attributes.accessibility.dataField===undefined?
            undefined
          :
            <div className="checkBoxItem"> 
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose!=undefined?
                  <div className="checkboxstyle">
                    <CheckboxLabels
                        language={this.props.language}
                        checkbox={this.checkbox}
                        type="shortLongDescription"
                        label={this.props.language.textAlternatives}
                    />
                  </div>
                  :
                  undefined
              }
            </div>
        }
      </div>
    )
  }

  checkbox=(event, name)=>{
   // console.log("event and name", event, name)
    if(event===true && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'shortlongDescription',
      })
    }
    else if(event===false && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'noshortlongDescription'
      })
    }
  }
  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  textAlternatives=()=>{
    return(
      <div>
        {//For text Alternatives
            this.state.shortlongDescription==='shortlongDescription'?
            <Grid container spacing={3}>
              <Grid item xs={6}>       
              {
                  this.props.item.attributes.accessibility.dataField.imagePurpose==='info'?
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_informative_label}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </div>
                  :
                  undefined
              }
              {
                  this.props.item.attributes.accessibility.dataField.imagePurpose==='deco'?
                  <h2>{this.props.language.image_a11y_purpose_decorative_label}</h2>
                  :
                  undefined
              }
              {
                  this.props.item.attributes.accessibility.dataField.imagePurpose==='txt'?
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_text}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </div>
                  :
                  undefined
              }
              {
                  this.props.item.attributes.accessibility.dataField.imagePurpose==='cplx'?
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_complex}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                    <Editor editorState={this.signalText()} readOnly={true}/>
                  </div>
                  :
                  undefined
              }
              </Grid>
              
            </Grid>
            :
            undefined
        }
      </div>
    )
  }

  render() {
    if(this.state.width != this.state.height){
      this.setState({
        width: 300,
        height: 300,
      });
    }
    return(
      <div className="content-box">
        {this.checkBoxLabels()}
        {
          this.props.item.attributes.accessibility.dataField != undefined ?
            <div>
              {
                this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='top'?
                  this.textAlternatives()
                :
                  undefined
              }
            </div>
          :
            undefined
        }
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <div>
              {this.props.fromProgram && <DiscreteSlider adjust={this.adjust}/>}
              <ResizableContent
                key={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.coordenada):(Math.random())}
                top={8}
                minWidth={10}
                minHeight={10}
                left={8}
                width={this.state.width}
                height={this.state.height}
                rotateAngle={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.coordenada):(Math.random())}
                //adjust={this.adjust}
                //coordenada={this.props.coordenada}
              //coordenadaCursos={this.coordenadaCursos}
              > 
                {/* <img  style={{ width: `${this.state.width}px`, height: `${this.state.height}px`, }}  src={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())}></img> */}
                <div 
                  style={{
                    width: `${this.state.width}px`, height: `${this.state.height}px`, 
                    backgroundImage: `url(${(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())})`
                  }} 
                  className="file-image-preview"
                ></div>
              </ResizableContent>
            </div>
            {/* {
              this.props.item.attributes.hasDescription ?
                <div
                  id={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image._id+"description"+this.props.item.id):(Math.random())}
                  style={{width: this.props.item.attributes.descriptionWidth}}
                  className={
                    this.props.item.attributes.alignment === "row" || this.props.item.attributes.alignment === "row-reverse" ?
                      "image-item-description"
                    :
                    "image-item-description-full"
                  }
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                >
                </div>
              :
                undefined
            } */}
          </div>
        </div>
        {
          this.props.item.attributes.accessibility.dataField!=undefined?
          <div>
            {
              this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='bottom'?
                this.textAlternatives()
              :
                undefined
            }
          </div>
          :
          undefined
        }
        {this.props.fromProgram && 
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
