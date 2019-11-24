import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import reqwest from 'reqwest';
import reactCSS from 'reactcss';
import 'antd/dist/antd.css';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import { Button, Modal, Select, Upload, Icon, message, Input, Layout, Menu } from 'antd';

import "../index.css"

const {Content, Footer, Sider } = Layout;
const { Dragger } = Upload;
const { Option } = Select;
const { SubMenu } = Menu;
let timer = null;

// this is home page, we need contain the highlight part and tools part
class HomePage extends React.Component {

    constructor(props) {

        super(props);
        // console.log(props.location);
        this.handleLanguage = this.handleLanguage.bind(this);
        // now need to into the state then pass them into other two part
        this.state = {
            id: 1,
            res: [],
            text_input: "This is an English Syntax Highlighter.\n It uses Natural Language Proccessing to determine the part of speech. \n It works with tricky sentences as well: \n The man with a saw saw a saw.",
            email: "",
            remove_switchword: false,
            language: "english",
            reportText: false,
            bugText: "",
            adverb: {
                color: {
                    r: '242',
                    g: '119',
                    b: '122',
                    a: '1'
                },
                default_color: {
                    r: '242',
                    g: '119',
                    b: '122',
                    a: '1'
                },
            },
            noun: {
                color: {
                    r: '249',
                    g: '145',
                    b: '87',
                    a: '1'
                },
                default_color: {
                    r: '249',
                    g: '145',
                    b: '87',
                    a: '1'
                },
            },
            adposition: {
                color: {
                    r: '255',
                    g: '204',
                    b: '102',
                    a: '1'
                },
                default_color: {
                    r: '255',
                    g: '204',
                    b: '102',
                    a: '1'
                },
            },
            determiner: {
                color: {
                    r: '153',
                    g: '204',
                    b: '153',
                    a: '1'
                },
                default_color: {
                    r: '153',
                    g: '204',
                    b: '153',
                    a: '1'
                },
            },
            interjection: {
                color: {
                    r: '102',
                    g: '204',
                    b: '204',
                    a: '1'
                },
                default_color: {
                    r: '102',
                    g: '204',
                    b: '204',
                    a: '1'
                },
            },
            particle: {
                color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                },
                default_color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                },
            },
            punctuation: {
                color: {
                    r: '242',
                    g: '240',
                    b: '236',
                    a: '1'
                },
                default_color: {
                    r: '242',
                    g: '240',
                    b: '236',
                    a: '1'
                },
            },
            verb: {
                color: {
                    r: '204',
                    g: '153',
                    b: '204',
                    a: '1'
                },
                default_color: {
                    r: '204',
                    g: '153',
                    b: '204',
                    a: '1'
                },
            },
            unknown: {
                color: {
                    r: '211',
                    g: '208',
                    b: '200',
                    a: '1'
                },
                default_color: {
                    r: '211',
                    g: '208',
                    b: '200',
                    a: '1'
                },
            },
            conjunction: {
                color: {
                    r: '210',
                    g: '123',
                    b: '83',
                    a: '1'
                },
                default_color: {
                    r: '210',
                    g: '123',
                    b: '83',
                    a: '1'
                },
            },
            adjective: {
                color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                },
                default_color: {
                    r: '102',
                    g: '153',
                    b: '204',
                    a: '1'
                },
            },
            custom: {
                color: {
                    r: '0',
                    g: '0',
                    b: '0',
                    a: '1'
                },
                default_color: {
                    r: '0',
                    g: '0',
                    b: '0',
                    a: '1'
                },
            },
            black: {
                color: {
                    r: '255',
                    g: '255',
                    b: '255',
                    a: '1'
                },
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
            customDisplay: false,
            displayColorPicker: false,
            current_id: '',
            fileList: [],
            uploading: false,
            visible: false,
            confirmLoading: false,
            number_text: 0,

            tags: ['adverb', 'noun', 'adposition', 'determiner', 'interjection', 'particle', 'punctuation', 'verb', 'unknown', 'conjunction', 'adjective'],
            custom_tag: 'adverb',
            collapsed: false,
            colorpicker: false,
            lighttheme: false,
            emailvisible: false,
        };

        // this.AfterInit();
    }

    // show the upload file modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    // after init try to get the cookie's color
    componentDidMount = () => {
        // window.localStorage.setItem('id', 43);
        let id = window.localStorage.getItem('id');

        let parts = [];
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            parts[key] = value;
        });

        if (parts !== []) {
            let share_id = parts['id'];
            if (share_id !== undefined) {
                id = share_id;
            }
        }

        if (id !== undefined) {
            axios.get('http://127.0.0.1:5000/info/', {
                params: {
                    "id": id,
                }
            }).then(dataRes => {
                var arr = dataRes.data.res;
                // console.log(arr);
                var res = [];
                arr.forEach(function(el){
                    el.forEach(function(rl){
                        res.push(rl);
                    });
                });
                // console.log(res);
                this.setState({
                    res: res,
                    id: dataRes.data.id
                });
                // window.localStorage.setItem('id', dataRes.data.id);
                this.forceUpdate();
            }).catch(function (error) {
                console.log(error);
            });
        }


        let adverb = JSON.parse(window.localStorage.getItem('adverb'));
        let noun = JSON.parse(window.localStorage.getItem('noun'));
        let adposition = JSON.parse(window.localStorage.getItem('adposition'));
        let determiner = JSON.parse(window.localStorage.getItem('determiner'));
        let interjection = JSON.parse(window.localStorage.getItem('interjection'));
        let particle = JSON.parse(window.localStorage.getItem('particle'));
        let punctuation = JSON.parse(window.localStorage.getItem('punctuation'));
        let verb = JSON.parse(window.localStorage.getItem('verb'));
        let unknown = JSON.parse(window.localStorage.getItem('unknown'));
        let conjunction = JSON.parse(window.localStorage.getItem('conjunction'));
        let adjective = JSON.parse(window.localStorage.getItem('adjective'));

        if (adverb !== null) {
            this.setState({
                adverb: {
                    color: adverb,
                    default_color: adverb
                },
            });
        }

        if (noun !== null) {
            this.setState({
                noun: {
                    color: noun,
                    default_color: noun
                }
            })
        }

        if (adposition !== null) {
            this.setState({
                adposition: {
                    color: adposition,
                    default_color: adposition
                }
            })
        }

        if (determiner !== null) {
            this.setState({
                determiner: {
                    color: determiner,
                    default_color: determiner
                }
            })
        }

        if (interjection !== null) {
            this.setState({
                interjection: {
                    color: interjection,
                    default_color: interjection
                }
            })
        }

        if (particle !== null) {
            this.setState({
                particle: {
                    color: particle,
                    default_color: particle
                }
            })
        }

        if (punctuation !== null) {
            this.setState({
                punctuation: {
                    color: punctuation,
                    default_color: punctuation
                }
            })
        }

        if (verb !== null) {
            this.setState({
                verb: {
                    color: verb,
                    default_color: verb
                }
            })
        }

        if (unknown !== null) {
            this.setState({
                unknown: {
                    color: unknown,
                    default_color: unknown
                }
            })
        }

        if (conjunction !== null) {
            this.setState({
                conjunction: {
                    color: conjunction,
                    default_color: conjunction
                }
            })
        }

        if (adjective !== null) {
            this.setState({
                adjective: {
                    color: adjective,
                    default_color: adjective
                }
            })
        }
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
            remove_switchword: true
        });
        // You can use any AJAX library you like
        reqwest({
            url: 'http://127.0.0.1:5000/upload/',
            method: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            mimeTypes: "multipart/form-data",
            success: (res) => {
                let id = res.id;
                if (res.res.length * 2 > 2499) {
                    res.res = res.res.splice(0, 2499);
                }
                var arr = res.res;
                res = [];
                arr.forEach(function(el){
                    el.forEach(function(rl){
                        res.push(rl);
                    });
                });
                this.setState({
                    res: res,
                    id: id
                });
                console.log(id);
                window.localStorage.setItem('id', id);
            this.forceUpdate();
                this.setState({
                    fileList: [],
                    uploading: false,
                    visible: false,
                    res: res,
                    text_input: "",
                    remove_switchword: false,
                    id: id
                });
                window.localStorage.setItem('id', id);
                message.success('Your file upload success');
                this.setState({ res: res});
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

    // componentDidMount() {
    //     this._isMounted = true;
    // };
    //
    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

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
                color: color.rgb,
                default_color: color.rgb
            },
        });

        // because we need to store the color into the cookie, so we need to chanage here
        // the id is the name of color, and the color.rgb is the rgb of the color
        // console.log(JSON.stringify(color.rgb));
        window.localStorage.setItem(id, JSON.stringify(color.rgb));
    };

    sendEmail = () => {
        console.log(this.state.email);
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
                formData.append('email', this.state.email);

                // console.log(formData);

                reqwest({
                    url: 'http://127.0.0.1:5000/email/',
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false,
                    mimeTypes: "multipart/form-data",
                    success: (res) => {
                        //console.log(res);
                        message.success('Email was sent!');
                        this.handleCloseEmail();
                    },
                    error: () => {
                        message.error('Email failed');
                        this.handleCloseEmail();
                    },
                });
            });
    };

    // this function is handle the input in div
    // TODO need to fix
    handleEditor = (e) => {
        // console.log(e.key);
        // console.log(e.key);
        if (e.key === 'Meta' || e.key === 'Control') {
            return;
        }

        this.setState({
            number_text: e.target.textContent.length
        });
        // if get timer, then clear it
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            this.handleUpdate();
        }, 3000);

    };

    // this part is for limit the numbers of input
    handleKeyDown = (e) => {
        if (this.state.number_text > 49999) {
            if (e.key !== 'Backspace') {
                e.preventDefault();
            }
        }
    };

    updateText = (input_text) => {
        axios.get('http://127.0.0.1:5000/textarea/', {
            params: {
                "text": input_text,
                "language": this.state.language
            }
        }).then(dataRes => {
            var arr = dataRes.data.res;
            //console.log(arr);
            var res = [];
            arr.forEach(function (el) {
                el.forEach(function (rl) {
                    res.push(rl);
                });
            });
            // console.log(dataRes.data.id);
            this.setState({
                res: res,
                id: dataRes.data.id
            });
            window.localStorage.setItem('id', dataRes.data.id);
            this.forceUpdate();
        }).catch(function (error) {
            console.log(error);
        });
    };

    handleReset = () => {
        // reset the timer
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            this.handleUpdate();
        }, 3000);
        let html_input = document.getElementById('words').innerHTML;
        //console.log(html_input);
        html_input = html_input.replace(/<\/div\s*\\?>/g, "\n");
        html_input = html_input.replace(/<br\s*\\?>/g, "\n");
        let input_text = html_input.replace(/<[^>]*>?/gm, '');
        //console.log(input_text);
        this.setState({ remove_switchword: true });
        if (input_text !== "") {
            //console.log(this.state.res);
            this.setState({
                res: [],
                text_input: input_text
            });
        }
        this.updateText(input_text);
    };

    // this is sam's update functions
    handleUpdate = () => {
        let html_input = document.getElementById('words').innerHTML;
        //console.log(html_input);
        html_input = html_input.replace(/<\/div\s*\\?>/g, "\n");
        let input_text = html_input.replace(/<[^>]*>?/gm, '');
        //console.log(input_text);
        this.setState({ remove_switchword: true });
        this.setState({
            res: [],
            text_input: ""
        });
        document.getElementById('words').textContent = "";
        this.setState({ remove_switchword: false });
        this.updateText(input_text);
    };

    // this is handle download
    handleDownload = () => {
        // make the inout firstly
        // const input = document.getElementById('words');
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
        if (input_text.length > 49999) {
            input_text = input_text.substring(0, 50000);
            this.setState({
                number_text: 50000
            });
            message.error("You can only input 50000 characters");
        } else {
            this.setState({
                number_text: input_text.length
            });
        }

        this.setState({
            text_input: input_text,
            res: []
        });
        this.forceUpdate();
        this.updateText(this.state.text_input);
    };

    handleCloseModal = () => {
        this.setState({
            visible: false
        })
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value })
        //console.log(this.state.email);
    }

    // show text field when clicking "Report".
    showReport = () => {
        this.setState({
            reportText: true,
        })
    };

    handleCloseText = () => {
        this.setState({
            reportText: false,
            bugText: ""
        })
    };

    handleColorPicker = (e) => {
        //console.log(e.target.value);
        this.setState({ colorpicker: true });
    };

    handleClosePicker = () => {
        this.setState({
            colorpicker: false,

        })
    };

    handleCloseText = () => {
        this.setState({
            reportText: false,
            bugText: ""
        })
    };

    handleCloseEmail = () => {
        this.setState({
            emailvisible: false,
        })
    };

    handleOpenEmail = () =>{
        this.setState({
            emailvisible: true,
        })
    };

    handleBugText = (e) => {
        //console.log(e.target.value);
        this.setState({ bugText: e.target.value });
    };

    reportBug = () => {
        var formData = new FormData();
        formData.append('text', this.state.bugText);

        reqwest({
            url: 'http://127.0.0.1:5000/bugreport/',
            method: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            mimeTypes: "multipart/form-data",
            success: (res) => {
                //console.log(res);
                message.success('Bug report was sent!');
                this.handleCloseText();
            },
            error: () => {
                message.error('Email failed');
            },
        })
    };

    reportEditor = (e) => {
        this.setState({
            report_info: e.target.value
        });
    };

    handleReport = () => {
        // let theText = document.getElementById(('words')
        let report_info = this.state.report_info;
        if (report_info === "") {
            message.error("Please enter report information.");
            return;
        }
        axios.post('http://127.0.0.1:5000/report/', {
            params: {
                "info": report_info,
            }
        }).then(dataRes => {
            message.success("Report successfully!");
            this.setState({
                reportText: false
            });
        }).catch(function (error) {
            // console.log(error);
            message.error("Report error!");
        });
    };

    //change background color
    changeBackgroundColor = () => {
        this.setState({
            lighttheme: !this.state.lighttheme
        });

        if (document.getElementById('words').className === "word_container") {
            document.getElementById('words').className = "word_container2";
            this.setState({
                custom: {
                    color: {
                        r: '255',
                        b: '255',
                        g: '255',
                        a: '1'
                    }
                }
            });
        }
        else {
            document.getElementById('words').className = "word_container";
            this.setState({
                custom: {
                    color: {
                        r: '0',
                        b: '0',
                        g: '0',
                        a: '1'
                    }
                }
            });
        }
    };


    //clear content
    clearContent = () => {

        this.setState({ remove_switchword: true });
        this.setState({
            res: [],
            text_input: ""
        });
        //this.forceUpdate();
        this.updateText(this.state.text_input);

        this.setState({
            number_text: 0
        });

    };

    // handle share.
    handleTwitterShare = () => {
        let url = 'https://twitter.com/share?url=127.0.0.1:3000/?id=' + window.localStorage.getItem('id');
        window.open(url);
    };


    handleFBShare = () => {
        console.log(window.localStorage.getItem('id'));
        let url = 'https://www.facebook.com/sharer/sharer.php?u=127.0.0.1:3000/?id=' + window.localStorage.getItem('id');
        window.open(url);
    };

    handleCustomTag = (value) => {
        let id = value;
        this.setState({
            custom_tag: value
        });
        // this.handleCustomChangeColor(this.state.custom.color);
        this.setState({
            [id]: {
                color: this.state.custom.color,
                default_color: this.state[id].default_color
            }
        });

        this.convertColor(id);
    };

    handleCustomChangeColor = (color) => {
        // set for the selected color
        let id = this.state.custom_tag;
        this.setState({
            [id]: {
                color: color.rgb,
                default_color: this.state[id].default_color
            },
            custom: {
                color: color.rgb
            }
        });

        this.convertColor(id);
    };

    // handle reset all the color
    handleResetColor = () => {
        let others = this.state.tags;
        for (let i = 0; i < others.length; i++) {
            let tag = others[i];
            // console.log(tag, this.state[tag].default_color);
            this.setState({
                [tag]: {
                    color: this.state[tag].default_color,
                    default_color: this.state[tag].default_color
                }
            })
        }
    };


    convertColor = (id) => {
        // window.localStorage.setItem(id, JSON.stringify(color.rgb));
        // then change all the other color into black
        let others = this.state.tags;
        for (let i = 0; i < others.length; i++) {
            let tag = others[i];
            // console.log(this.state[tag].default_color);
            // console.log(tag);
            if (tag !== id) {
                this.setState({
                    [tag]: {
                        color: this.state.black.color,
                        default_color: this.state[tag].default_color
                    }
                });
            }
        }
    };

    render() {

        const {custom_tag} = this.state;
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

        // this is about bug report.
        const { TextArea } = Input;

        // this is about css
        const styles = reactCSS({
            'default': {
                adverb: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.adverb.color.r}, ${this.state.adverb.color.g}, ${this.state.adverb.color.b}, ${this.state.adverb.color.a})`,
                },
                noun: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.noun.color.r}, ${this.state.noun.color.g}, ${this.state.noun.color.b}, ${this.state.noun.color.a})`,
                },
                adposition: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.adposition.color.r}, ${this.state.adposition.color.g}, ${this.state.adposition.color.b}, ${this.state.adposition.color.a})`,
                },
                determiner: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.determiner.color.r}, ${this.state.determiner.color.g}, ${this.state.determiner.color.b}, ${this.state.determiner.color.a})`,
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
                    background: `rgba(${this.state.interjection.color.r}, ${this.state.interjection.color.g}, ${this.state.interjection.color.b}, ${this.state.interjection.color.a})`,
                },
                particle: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.particle.color.r}, ${this.state.particle.color.g}, ${this.state.particle.color.b}, ${this.state.particle.color.a})`,
                },
                punctuation: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.punctuation.color.r}, ${this.state.punctuation.color.g}, ${this.state.punctuation.color.b}, ${this.state.punctuation.color.a})`,
                },
                verb: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.verb.color.r}, ${this.state.verb.color.g}, ${this.state.verb.color.b}, ${this.state.verb.color.a})`,
                },
                unknown: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.unknown.color.r}, ${this.state.unknown.color.g}, ${this.state.unknown.color.b}, ${this.state.unknown.color.a})`,
                },
                conjunction: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.conjunction.color.r}, ${this.state.conjunction.color.g}, ${this.state.conjunction.color.b}, ${this.state.conjunction.color.a})`,
                },
                adjective: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.adjective.color.r}, ${this.state.adjective.color.g}, ${this.state.adjective.color.b}, ${this.state.adjective.color.a})`,
                },
                custom: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.custom.color.r}, ${this.state.custom.color.g}, ${this.state.custom.color.b}, ${this.state.custom.color.a})`,
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

        var switchword = this.state.remove_switchword ? this.state.text_input :
            this.state.res.map(function (words, index) {
                return <SwitchWord key={index}{...words} colors={styles} id={index} />
            });

        return (

            <div>
                <Layout>
                    <Sider theme={this.state.lighttheme ? "light" : "dark"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo" />
                        <Menu theme={this.state.lighttheme ? "light" : "dark"} mode="inline" defaultSelectedKeys={['4']}>

                            <Menu.Item key="colorpicker" onClick={this.handleColorPicker} >
                                <Icon type="highlight" />
                                <span className="nav-text">ColorPicker</span>

                            </Menu.Item>

                            <SubMenu key="langugage" title={
                                <span>
                                    <Icon type="global" />
                                    <span>Language</span>
                                </span>
                            }>
                                <Select defaultValue="English" style={{ width: 120 }} onChange={this.handleLanguage}>
                                    <Option value="english">English</Option>
                                    <Option value="spanish">Spanish</Option>
                                    <Option value="french">French</Option>
                                </Select>
                            </SubMenu>



                            <Modal title="Color Picker"
                                visible={this.state.colorpicker}
                                onCancel={this.handleClosePicker}
                                onOk={this.handleClosePicker}> <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.adverb} id="adverb" />
                                    </div>
                                    {this.state.adverbDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.adverb.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Adverb</font>
                                </div>

                                {/* noun */}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.noun} id="noun" />
                                    </div>
                                    {this.state.nounDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.noun.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Noun</font>
                                </div>

                                {/* adposition */}


                                {/*/!* determiner *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.determiner} id="determiner" />
                                    </div>
                                    {this.state.determinerDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.determiner.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Determiner</font>
                                </div>


                                {/*/!* interjection *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.interjection} id="interjection" />
                                    </div>
                                    {this.state.interjectionDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.interjection.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Interjection</font>
                                </div>

                                {/*/!* particle *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.particle} id="particle" />
                                    </div>
                                    {this.state.particleDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.particle.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Particle</font>
                                </div>

                                {/*/!* punctuation *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.punctuation} id="punctuation" />
                                    </div>
                                    {this.state.punctuationDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.punctuation.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Punctuation</font>
                                </div>

                                {/*/!* verb *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.verb} id="verb" />
                                    </div>
                                    {this.state.verbDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.verb.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Verb</font>
                                </div>

                                {/*/!* unknown *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.unknown} id="unknown" />
                                    </div>
                                    {this.state.unknownDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.unknown.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Unknown</font>
                                </div>

                                {/*/!* conjunction *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.conjunction} id="conjunction" />
                                    </div>
                                    {this.state.conjunctionDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.conjunction.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Conjunction</font>
                                </div>

                                {/*/!* adjective *!/*/}
                                <div>
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.adjective} id="adjective" />
                                    </div>
                                    {this.state.adjectiveDisplay ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                        <SketchPicker color={this.state.adjective.color} onChange={this.handleChange} />
                                    </div> : null}
                                    <font style={{ marginBottom: '100%', marginLeft: '2%' }}>Adjective</font>
                                </div>

                                <div>
                                    <Select defaultValue="Adverb" style={{ width: 120 }} onChange={this.handleCustomTag}>
                                        <Option value="adverb">Adverb</Option>
                                        <Option value="noun">Noun</Option>
                                        <Option value="adposition">Adposition</Option>
                                        <Option value="determiner">Determiner</Option>
                                        <Option value="interjection">Interjection</Option>
                                        <Option value="particle">Particle</Option>
                                        <Option value="punctuation">Punctuation</Option>
                                        <Option value="verb">Verb</Option>
                                        <Option value="unknown">Unknown</Option>
                                        <Option value="conjunction">Conjunction</Option>
                                        <Option value="adjective">Adjective</Option>
                                    </Select>

                                    {/*/!* custom *!/*/}
                                    <div>
                                        <div style={styles.swatch} onClick={this.handleClick}>
                                            <div style={styles.custom} id="custom" />
                                        </div>
                                        {this.state.customDisplay ? <div style={styles.popover}>
                                            <div style={styles.cover} onClick={this.handleClose} />
                                            <SketchPicker color={this.state.custom.color} onChange={this.handleCustomChangeColor} />
                                        </div> : null}
                                        <font style={{ marginBottom: '100%', marginLeft: '2%' }}>{custom_tag}</font>
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={this.handleResetColor} icon={"rest"} size={"large"}>Reset Color</Button>
                                </div>
                            </Modal>

                            {/*/!* report text form *!/*/}
                            <Modal
                                title="Please report issues here"
                                visible={this.state.reportText}
                                onOk={this.handleCloseText}
                                onCancel={this.handleCloseText}
                            >

                                <TextArea rows={4} onChange={this.reportEditor} />

                                <Button
                                    onClick={this.reportBug}
                                    style={{ marginTop: '2%', marginBottom: '2%', width: '150px' }}
                                    size={"small"}>
                                    Submit
                                </Button>

                            </Modal>

                            <Menu.Item key="download" onClick={this.handleDownload} >
                                <Icon type="download" />
                                <span className="nav-text">Download</span>
                            </Menu.Item>

                            <Menu.Item key="upload" onClick={this.showModal} >
                                <Icon type="upload" />
                                <span className="nav-text">Upload</span>
                            </Menu.Item>

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
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{ marginTop: 16, width: '100%' }}
                                >
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </Modal>


                            {/*/!* report text form *!/*/}
                            <Modal
                                title="Send Email to"
                                visible={this.state.emailvisible}
                                onOk={this.handleCloseEmail}
                                onCancel={this.handleCloseEmail}
                            >

                                <Input name = "email" value = {this.state.email} onChange={this.handleEmailChange.bind(this)} />
                                <Button onClick={this.sendEmail}>Send</Button>
                            </Modal>

                            <Menu.Item key="email" onClick={this.handleOpenEmail} >
             
                                    <Icon type="mail" />
                                    <span>Email PDF</span>
                        
                            </Menu.Item>

                            <Menu.Item key="background" onClick={this.changeBackgroundColor} >
                                <Icon type="bg-colors" />
                                <span className="nav-text">Background</span>
                            </Menu.Item>

                            <Menu.Item key="clear" onClick={this.clearContent} >
                                <Icon type="delete" />
                                <span className="nav-text">Clear</span>
                            </Menu.Item>

                            <SubMenu key="social" title={
                                <span><Icon type="share-alt" />
                                    <span>Share</span>
                                </span>
                            }>
                                <Menu.Item key="twitter" onClick={this.handleTwitterShare} >
                                    <Icon type="twitter" />
                                    <span className="nav-text">Twitter</span>
                                </Menu.Item>

                                <Menu.Item key="facebook" onClick={this.handleFBShare} >
                                    <Icon type="facebook" />
                                    <span className="nav-text">Facebook</span>
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="ReportBug" onClick={this.showReport} >
                                <Icon type="bug" />
                                <span className="nav-text">Report A Bug</span>
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: this.state.collapsed? 80: 200 }}>
                        <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
                            <div style={{ padding: 24, textAlign: 'left' }}>
                                <div id="downloads">
                                    <div id="words" className="word_container2" onPaste={this.handlePaste} contentEditable={true} suppressContentEditableWarning={true} onKeyDown={this.handleKeyDown} onKeyUp={this.handleEditor} onMouseDown={this.handleReset}>
                                        {switchword}
                                    </div>
                                </div>

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>English Syntax Highlighter ©2019 Created by Team Dragonfly</Footer>
                    </Layout>
                </Layout>



                {/*  The first part is word container  */}
            </div >

        );
    }

}

// this is switch the word type and color
var SwitchWord = (props) => {
    let type = props.type;
    let word = props.word;
    let color = props.colors;
    let space = props.space

    switch (type) {
        case (type.match(/^NEWLINE/) || {}).input:
            return (<br></br>);
        case (type.match(/^VB*/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.verb.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.verb.background }}>{word}</span>);
        case (type.match(/^NN*/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.noun.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.noun.background }}>{word}</span>);
        case (type.match(/^RB*/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.adverb.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.adverb.background }}>{word}</span>);
        case (type.match(/^DT/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.determiner.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.determiner.background }}>{word}</span>);
        case (type.match(/^UH/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.interjection.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.interjection.background }}>{word}</span>);
        case (type.match(/^RP/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.particle.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.particle.background }}>{word}</span>);
        case (type.match(/^CC/) || type.match(/^IN/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.conjunction.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.conjunction.background }}>{word}</span>);
        case (type.match(/^JJ*/) || {}).input:
            return (space === 1 ? <span id={props.id} style={{ color: color.adjective.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.adjective.background }}>{word}</span>);
        case (type.match(/,|\.|\?|\]|\[|\{|\}|-|=|\+|\(|\)|!/) || type.match(/^SENT/) || type.match(/^PUNCTUATION/) || {}).input:
            return (<span id={props.id} style={{ color: color.punctuation.background }}>{word}</span>);
        default:
            return (space === 1 ? <span id={props.id} style={{ color: color.unknown.background }}> {word}</span> :
                <span id={props.id} style={{ color: color.unknown.background }}>{word}</span>);
    }
};


export default HomePage;
