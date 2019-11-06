import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import reqwest from 'reqwest';
import reactCSS from 'reactcss';
import 'antd/dist/antd.css';
import html2canvas from 'html2canvas';
import Uploader from '../components/Uploader'
import { SketchPicker } from 'react-color';
import { Button, Modal, Select, Upload, Icon, message } from 'antd';

const { Dragger } = Upload;
const { Option } = Select;

// this is home page, we need contain the highlight part and tools part
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        // now need to into the state then pass them into other two part
        this.state = {
            id: 1,
            res: [],
            text_input: "",
            adverb: {
                color: {
                    r: '242',
                    g: '119',
                    b: '122',
                    a: '1'
                }
            },
            noun: {
                color: {
                    r: '249',
                    g: '145',
                    b: '87',
                    a: '1'
                }
            },
            adposition: {
                color: {
                    r: '255',
                    g: '204',
                    b: '102',
                    a: '1'
                }
            },
            determiner: {
                color: {
                    r: '153',
                    g: '204',
                    b: '153',
                    a: '1'
                }
            },
            interjection: {
                color: {
                    r: '102',
                    g: '204',
                    b: '204',
                    a: '1'
                }
            },
            particle: {
                color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                }
            },
            punctuation: {
                color: {
                    r: '242',
                    g: '240',
                    b: '236',
                    a: '1'
                }
            },
            verb: {
                color: {
                    r: '204',
                    g: '153',
                    b: '204',
                    a: '1'
                }
            },
            unknown: {
                color: {
                    r: '211',
                    g: '208',
                    b: '200',
                    a: '1'
                }
            },
            conjunction: {
                color: {
                    r: '210',
                    g: '123',
                    b: '83',
                    a: '1'
                }
            },
            adjective: {
                color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                }
            },
            adverbDisplay: false,
            nounDisplay: false,
            adpositionDisplay: false,
            determinerDisplay: false,
            interjectionDisplay: false,
            particleDisplay: false,
            punctuationDisplay: false,
            verbDisplay: false,
            unknownDisplay: false,
            conjunctionDisplay: false,
            adjectiveDisplay: false,
            displayColorPicker: false,
            current_id: '',
            fileList: [],
            uploading: false,
            visible: false,
            confirmLoading: false,
            select_value: "english"
        }
    }

    // show the upload file modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // this is handle the select value
    handleSelect = (value) => {
        this.setState({
            select_value: value
        });
        // console.log(`selected ${value}`);
    };

    // handle the upload file
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });

        formData.append('language', this.state.select_value.toString());

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: 'http://127.0.0.1:5000/upload/',
            method: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            mimeTypes:"multipart/form-data",
            success: (res) => {
                console.log(res);
                this.setState({
                    fileList: [],
                    uploading: false,
                    visible: false,
                    res: res.res
                });

                message.success('Your file upload success');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('Your file upload failed.');
            },
        });
    };

    // this function clears the textfield
    clearTextField() {
        document.getElementById('words').innerText = "";
        this.setState({
            text_input: ""
        });
    };

    // get the default text in the database
    componentDidMount() {
        this._isMounted = true;
        const axios = require('axios');
        axios.get('http://127.0.0.1:5000/info/', {
            params: {
                "id": this.state.id
            }
        }).then(res => {
            this.setState({
                res: res.data.res
            });
        }).catch(function (error) {
            console.log(error);
        });
    };
    
    componentWillUnmount() {
        this._isMounted = false;
    }
        
    // this is for handle open the color picker
    handleClick = (e) => {
        let id = e.target.id;
        id += 'Display';
        this.setState({
            [id]: !this.state.displayColorPicker,
            displayColorPicker: !this.state.displayColorPicker,
            current_id: e.target.id
        })
    };

    // set the color picker close
    handleClose = () => {
        let id = this.state.current_id;
        id += 'Display';
        this.setState({
            [id]: false,
            displayColorPicker: false
        })
    };

    // set the color of color picker
    handleChange = (color) => {
        let id = this.state.current_id;
        this.setState({
            [id]: {
                color: color.rgb
            }
        })
    };

    // this function is handle the input in div
    handleEditor = (e) => {
        
    };
    
    handleTextClick = (e) => {
        //console.log(document.getElementById('words').innerText);
        //console.log(e.currentTarget.textContent);
        //if (this._unchanged == true) {
        if (1 == 2) {
            console.log("wow");
            this._unchanged = false;
            let html_input = document.getElementById('words').innerHTML;
            console.log(html_input);
            let input_text = html_input.replace(/<[^>]*>?/gm, '');
            console.log(input_text);
            this.setState({
                text_input: input_text,
                res: []
            });
            this.forceUpdate();
        }
        
    };

    async getText(input_text) {
        return axios.get('http://127.0.0.1:5000/textarea/', {
            params: {
                "text": input_text
            }
        }).then(res => {
           this.state.res = res.data.res;
        }).catch(function (error) {
            console.log(error);
        });
    }

    // TODO this is sam's update functions
    handleUpdate = async event => {
        // send the text to backend!
        this.setState({
            text_input: "",
            res: []
        })
        // save the text
        //var input_text = document.getElementById('words').innerText;
        let html_input = document.getElementById('words').innerHTML;
        let input_text = html_input.replace(/<[^>]*>?/gm, '');
        // clear the text
        //document.getElementById('words').innerText = "";
        const promise = await this.getText(input_text);
        await promise;
        //this.setState({ state: this.state });
        if (document.getElementById('words') != null) {
            document.getElementById('words').innerText = "";
            this.forceUpdate();
        }
        
    };

    // this is handle download
    handleDownload = () => {
        // make the inout firstly
        const input = document.getElementById('words');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            });
    };

    generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    // TODO this is try to handle paste
    handlePaste = (e) => {
        // avoid the paste info, because we need to convert
       //e.preventDefault();

        // let content = e.clipboardData.getData('Text');
        // document.getElementById('words').append(content);
    };
    
    handleCloseModal = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        // this part is about upload
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        const { visible, confirmLoading } = this.state;

        // this is about css
        const styles = reactCSS({
            'default': {
                adverb: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.adverb.color.r }, ${ this.state.adverb.color.g }, ${ this.state.adverb.color.b }, ${ this.state.adverb.color.a })`,
                },
                noun: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.noun.color.r }, ${ this.state.noun.color.g }, ${ this.state.noun.color.b }, ${ this.state.noun.color.a })`,
                },
                adposition: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.adposition.color.r }, ${ this.state.adposition.color.g }, ${ this.state.adposition.color.b }, ${ this.state.adposition.color.a })`,
                },
                determiner: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.determiner.color.r }, ${ this.state.determiner.color.g }, ${ this.state.determiner.color.b }, ${ this.state.determiner.color.a })`,
                },
                swatch: {
                    padding: '2px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                interjection: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.interjection.color.r }, ${ this.state.interjection.color.g }, ${ this.state.interjection.color.b }, ${ this.state.interjection.color.a })`,
                },
                particle: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.particle.color.r }, ${ this.state.particle.color.g }, ${ this.state.particle.color.b }, ${ this.state.particle.color.a })`,
                },
                punctuation: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.punctuation.color.r }, ${ this.state.punctuation.color.g }, ${ this.state.punctuation.color.b }, ${ this.state.punctuation.color.a })`,
                },
                verb: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.verb.color.r }, ${ this.state.verb.color.g }, ${ this.state.verb.color.b }, ${ this.state.verb.color.a })`,
                },
                unknown: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.unknown.color.r }, ${ this.state.unknown.color.g }, ${ this.state.unknown.color.b }, ${ this.state.unknown.color.a })`,
                },
                conjunction: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.conjunction.color.r }, ${ this.state.conjunction.color.g }, ${ this.state.conjunction.color.b }, ${ this.state.conjunction.color.a })`,
                },
                adjective: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.adjective.color.r }, ${ this.state.adjective.color.g }, ${ this.state.adjective.color.b }, ${ this.state.adjective.color.a })`,
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
          <div>
              {/* upload files */}
              <Uploader/>
              <Modal
                  title="Title"
                  visible={visible}
                  onOk={this.handleCloseModal}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCloseModal}
              >

                  <Select defaultValue="english" style={{ width: '100%', marginBottom: '2%' }} onChange={this.handleSelect}>
                      <Option value="english">english</Option>
                      <Option value="chinese">chinese</Option>
                  </Select>

                  <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">
                          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                          band files
                      </p>
                  </Dragger>
                  <Button
                      size={"large"}
                      onClick={this.handleUpload}
                      disabled={fileList.length === 0 }
                      loading={uploading}
                      style={{ marginTop: 16, width: '100%' }}
                  >
                      {uploading ? 'Uploading' : 'Start Upload'}
                  </Button>
              </Modal>

              {/* The second part is tools container */}
              <div className="intro">
                  Hello this is the introduction about English highlight.
                  {/* This part is for adverb color picker */}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.adverb } id="adverb" />
                      </div>
                      { this.state.adverbDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.adverb.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>adverb</font>
                  </div>

                  {/* noun */}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.noun } id="noun" />
                      </div>
                      { this.state.nounDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.noun.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Noun</font>
                  </div>

                  {/*/!* adposition *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.adposition } id="adposition"/>
                      </div>
                      { this.state.adpositionDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.adposition.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Adposition</font>
                  </div>

                  {/*/!* determiner *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.determiner } id="determiner"/>
                      </div>
                      { this.state.determinerDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.determiner.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>determiner</font>
                  </div>


                  {/*/!* interjection *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.interjection } id="interjection" />
                      </div>
                      { this.state.interjectionDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.interjection.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Interjection</font>
                  </div>

                  {/*/!* particle *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.particle } id="particle" />
                      </div>
                      { this.state.particleDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.particle.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Particle</font>
                  </div>

                  {/*/!* punctuation *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.punctuation } id="punctuation" />
                      </div>
                      { this.state.punctuationDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.punctuation.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Punctuation</font>
                  </div>

                  {/*/!* verb *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.verb } id="verb" />
                      </div>
                      { this.state.verbDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.verb.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Verb</font>
                  </div>

                  {/*/!* unknown *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.unknown } id="unknown" />
                      </div>
                      { this.state.unknownDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.unknown.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Unknown</font>
                  </div>

                  {/*/!* conjunction *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.conjunction } id="conjunction" />
                      </div>
                      { this.state.conjunctionDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.conjunction.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Conjunction</font>
                  </div>

                  {/*/!* adjective *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.adjective } id="adjective" />
                      </div>
                      { this.state.adjectiveDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.adjective.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Adjective</font>
                  </div>

                  {/* add the download button */}

                  <div>
                      <Button style={{marginTop:'2%', marginBottom: '2%', width: '150px'}} onClick={this.handleDownload} shape="round" icon="download" size='large'>
                          Download
                      </Button>
                  </div>

                  <div>
                      <Button style={{marginTop:'2%', marginBottom: '2%', width: '150px'}} shape="round" icon="edit" onClick={this.handleUpdate} size="large">
                          Update
                      </Button>
                  </div>

                  <div>
                      <Button style={{marginTop:'2%', marginBottom: '2%', width: '150px'}} shape="round" icon="upload" onClick={this.showModal} size="large">
                          Upload
                      </Button>
                  </div>
              </div>


              {/*  The first part is word container  */}
              <div id="words" className="word_container" onPaste={this.handlePaste} contentEditable={true} suppressContentEditableWarning={true} onKeyUp={this.handleEditor} onMouseEnter={this.handleTextClick} >
                  {this.state.res.map(words => (
                      <SwitchWord key={words.word} {...words} colors={styles}/>))}
              </div>
          </div>
        );
    }

}

// this is switch the word type and color
const SwitchWord = (props) => {

    let type = props.type;
    let word = props.word;
    let color = props.colors;

    switch (type) {
        case (type.match(/^VB*/) || {}).input:
            return (<span style={{color: color.verb.background}}> {word}</span>);
        case (type.match(/^NN*/) || {}).input:
            return (<span style={{color: color.noun.background}}> {word}</span> );
        case (type.match(/^RB*/) || {}).input:
            return (<span style={{color: color.adverb.background}}> {word}</span>);
        case (type.match(/^DT/) || {}).input:
            return (<span style={{color: color.determiner.background}}> {word}</span>);
        case (type.match(/^UH/) || {}).input:
            return (<span style={{color: color.interjection.background}}> {word}</span>);
        case (type.match(/^RP/) || {}).input:
            return (<span style={{color: color.particle.background}}> {word}</span>);
        case (type.match(/^CC/) || {}).input:
            return (<span style={{color: color.conjunction.background}}> {word}</span>);
        case (type.match(/^JJ*|^PR*/) || {}).input:
            return (<span style={{color: color.adjective.background}}> {word}</span>);
        case (type.match(/^TO*/) || {}).input:
            return (<span style={{color: color.adposition.background}}> {word}</span>);
        case (type.match(/,|\.|\?|\]|\[|\{|\}|-|=|\+|\(|\)|!/) || {}).input:
            return (<span style={{color: color.unknown.background}}>{word}</span>);
        default:
            return (<span style={{color: color.unknown.background}}> {word}</span>)
    }
};


export default HomePage;
