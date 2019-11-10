import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import reqwest from 'reqwest';
import reactCSS from 'reactcss';
import 'antd/dist/antd.css';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import { Button, Modal, Select, Upload, Icon, message } from 'antd';

const { Dragger } = Upload;
const { Option } = Select;

// this is home page, we need contain the highlight part and tools part
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleLanguage = this.handleLanguage.bind(this)
        // now need to into the state then pass them into other two part
        this.state = {
            id: 1,
            res: [],
            text_input: "",
            email: "",
            language: "english",
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
            confirmLoading: false
        }
    }

    // show the upload file modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // handle the upload file
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        formData.append('language', this.state.language);
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
                //console.log(res);
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

    handleLanguage(e) {
        this.setState({
            language: e
        })
    };

    componentDidMount() {
        this._isMounted = true;
    };
    
    componentWillUnmount() {
        this._isMounted = false;
    }
        
    // this is for handle open the color picker
    handleClick = (e) => {
        let id = e.target.id;
        //console.log(id);
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
    
    sendEmail = () => {
        var input = document.getElementById('words');
        html2canvas(input)
            .then((canvas) => {
                var imgData = canvas.toDataURL('image/png');
                var pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf = btoa(pdf.output());
                //console.log(pdf)
                // send to backend
                var formData = new FormData();
                formData.append('pdf', pdf);
                formData.append('email', this.state.email)
                //console.log(this.state.email)
                reqwest({
                    url: 'http://127.0.0.1:5000/email/',
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false,
                    mimeTypes:"multipart/form-data",
                    success: (res) => {
                        //console.log(res);
                        message.success('Email was sent!');
                    },
                    error: () => {
                        message.error('Email failed');
                    },
                });
            });
    }

    // this function is handle the input in div
    handleEditor = (e) => {
        // ctrl + a
        if (e.keyCode===65 && e.ctrlKey) {
            
        }
        this.setState({
            res: []
        });
        this.forceUpdate();
    };
    
    handleDown = (e) => {
        this.setState({
            res: []
        });
        this.forceUpdate();
    };
    
    
    handleTextClick = (e) => {
        if (this.justclicked === true) {
            this.justclicked = false;
            let html_input = document.getElementById('words').innerHTML;
            let input_text = html_input.replace(/<[^>]*>?/gm, '');
            this.setState({
                text_input: input_text,
                res: []
            });
            this.forceUpdate();
        }

    };

    getText = (input_text) => {
        return axios.get('http://127.0.0.1:5000/textarea/', {
            params: {
                "text": input_text,
                "language": this.state.language
            }
        }).then(res => {
           this.setState({
                res: res.data.res
           });
        }).catch(function (error) {
            console.log(error);
        });
    };

    // TODO this is sam's update functions
    handleUpdate = () => {
        this.justclicked = true;
        console.log(this.state.language);
        // save the text
        //var input_text = document.getElementById('words').innerText;
        let html_input = document.getElementById('words').innerHTML;
        let input_text = html_input.replace(/<[^>]*>?/gm, '');
        // clear the text
        if (input_text === "") {
            //console.log("here");
            this.setState({
                text_input: " "
            });
            input_text = " ";
        }
        this.getText(input_text);
        //console.log(this);
        this.setState({ key: Math.random() });
    };

    // this is handle download
    handleDownload = () => {
        // make the inout firstly
        var input = document.getElementById('words');
        html2canvas(input)
            .then((canvas) => {
                var imgData = canvas.toDataURL('image/png');
                var pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            });
    };

    // TODO this is try to handle paste
    handlePaste = (e) => {
        // avoid the paste info, because we need to convert
        e.preventDefault();
        let content = e.clipboardData.getData('Text');
        let html_input = document.getElementById('words').innerHTML;
        let input_text = html_input.replace(/<[^>]*>?/gm, '') + content;
        this.setState({
            text_input: input_text,
            res: []
        })
        this.forceUpdate();
    };
    
    handleCloseModal = () => {
        this.setState({
            visible: false
        })
    };
    
    handleEmailChange(event) {  
        this.setState({email: event.target.value})
        //console.log(this.state.email);
    }

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
              <Modal
                  title="Title"
                  visible={visible}
                  onOk={this.handleCloseModal}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCloseModal}
              >

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
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Adverb</font>
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

                  {/* adposition */ } 
                  

                  {/*/!* determiner *!/*/}
                  <div>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                          <div style={ styles.determiner } id="determiner"/>
                      </div>
                      { this.state.determinerDisplay ? <div style={ styles.popover }>
                          <div style={ styles.cover } onClick={ this.handleClose }/>
                          <SketchPicker color={ this.state.determiner.color } onChange={ this.handleChange } />
                      </div> : null }
                      <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Determiner</font>
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
                    
                  <Select defaultValue="English" style={{ width: 120 }} onChange={this.handleLanguage}>
                    <Option value="english">English</Option>
                    <Option value="spanish">Spanish</Option>
                    <Option value="french">French</Option>
                  </Select>  
                  
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
                  
                  <div>
                      <Button style={{marginTop:'2%', marginBottom: '2%', width: '150px'}} shape="round" icon="arrow-right" onClick={this.sendEmail} size="large">
                          Email
                      </Button>
                      <input type="text" name="email" value={this.state.email} 
                        onChange={this.handleEmailChange.bind(this)}/>
                  </div>
                  
              </div>


              {/*  The first part is word container  */}
              <div id="words" className="word_container" onPaste={this.handlePaste} contentEditable={true} suppressContentEditableWarning={true} onKeyUp={this.handleEditor} onKeyDown={this.handleDown} onMouseEnter={this.handleTextClick} >
                  {this.justclicked &&
                    this.state.res.map(words => (
                      <SwitchWord key={words.word} {...words} colors={styles}/>))
                    }
                  {!this.justclicked &&
                    this.state.text_input}
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
        case (type.match(/^VB*/) || type.match(/^VER*/)|| {}).input:
            return (<span style={{color: color.verb.background}}> {word}</span>);
        case (type.match(/^NN*/) || type.match(/^NOM/) || {}).input:
            return (<span style={{color: color.noun.background}}> {word}</span> );
        case (type.match(/^RB*/) || type.match(/^ADV*/) || {}).input:
            return (<span style={{color: color.adverb.background}}> {word}</span>);
        case (type.match(/^DT/) || type.match(/^DET*/) || {}).input:
            return (<span style={{color: color.determiner.background}}> {word}</span>);
        case (type.match(/^UH/) || type.match(/^INT*/) ||{}).input:
            return (<span style={{color: color.interjection.background}}> {word}</span>);
        case (type.match(/^RP/) || {}).input:
            return (<span style={{color: color.particle.background}}> {word}</span>);
        case (type.match(/^CC/) || type.match(/^KON*/) ||{}).input:
            return (<span style={{color: color.conjunction.background}}> {word}</span>);
        case (type.match(/^JJ*|^PR*/) || type.match(/^ADJ*/) || {}).input:
            return (<span style={{color: color.adjective.background}}> {word}</span>);
        case (type.match(/^TO*/) || type.match(/^PRP*/) || {}).input:
            return (<span style={{color: color.adposition.background}}> {word}</span>);
        case (type.match(/,|\.|\?|\]|\[|\{|\}|-|=|\+|\(|\)|!/) || {}).input:
            return (<span style={{color: color.unknown.background}}>{word}</span>);
        default:
            return (<span style={{color: color.unknown.background}}> {word}</span>)
    }
};


export default HomePage;
