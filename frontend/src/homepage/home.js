import React from 'react';

const Home = () =>{
    const colorState = {
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
        }
    }
    const [color, setColors] = useState(colorState);
    const [display, setDisplay] = useState(
        {
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
        }
    )
    const [visible,setVisible] = useState(false)
    const [selectValue, setSelectValue] = useState("English")
    
    return (
        
    )
}