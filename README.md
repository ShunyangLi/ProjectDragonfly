[![License](https://img.shields.io/badge/License-React-blue.svg)](https://angular.io/) [![License](https://img.shields.io/badge/License-Flask%20Restful%20API-blue.svg)](https://flask-restful.readthedocs.io/en/latest/) [![License](https://img.shields.io/badge/License-MongoDB-blue.svg)](https://www.sqlite.org/index.html) [![License](https://img.shields.io/badge/License-Python3-blue.svg)](https://www.python.org/) [![Contributor](https://img.shields.io/badge/Contributor-5-brightgreen)](https://github.com/ShunyangLi/ProjectDragonfly/graphs/contributors)

# Project Dragonfly

## Team members:

|      **Name**       | **ZID**  |              **Role**              |
| :-----------------: | :------: | :--------------------------------: |
|     Sam Lazarus     | z3291606 |  Scrum Master & developer backend  |
|     Shunyang Li     | z5139935 |        Developer full stack        |
|      Lihuan Li      | z5139949 |    Developer frontend, testing     |
| Zhuowei Gan (Peter) | z5180689 | Product Owner & developer frontend |
|       Xin Li        | z5203513 |     Developer backend, testing     |

# Team work

- ~~Download as pdf from div (Xin)~~
- Page & UI change (Peter)
- ~~Color picker (shunyang li)~~
- Language picker & upload (Lihuan)
- Text area highlight (Sam)

# The meaning of pos_tag in NLTK

- CC coordinating conjunction
- CD cardinal digit
- DT determiner
- EX existential there (like: “there is” … think of it like “there exists”)
- FW foreign word
- IN preposition/subordinating conjunction
- JJ adjective ‘big’
- JJR adjective, comparative ‘bigger’
- JJS adjective, superlative ‘biggest’
- LS list marker 1)
- MD modal could, will
- NN noun, singular ‘desk’
- NNS noun plural ‘desks’
- NNP proper noun, singular ‘Harrison’
- NNPS proper noun, plural ‘Americans’
- PDT predeterminer ‘all the kids’
- POS possessive ending parent’s
- PRP personal pronoun I, he, she
- PRP$ possessive pronoun my, his, hers
- RB adverb very, silently,
- RBR adverb, comparative better
- RBS adverb, superlative best
- RP particle give up
- TO, to go ‘to’ the store.
- UH interjection, errrrrrrrm
- VB verb, base form take
- VBD verb, past tense took
- VBG verb, gerund/present participle taking
- VBN verb, past participle taken
- VBP verb, sing. present, non-3d take
- VBZ verb, 3rd person sing. present takes
- WDT wh-determiner which
- WP wh-pronoun who, what
- WP$ possessive wh-pronoun whose
- WRB wh-abverb where, when

# How to use highlighter

1. We can define our own HTML tag in css, when the user choose the color then we can change the color dynamic

   ```css
   verbs {
       color: red;
       font-size: 40px;
   }
   ```

2. So we solve how to highlight

   ```html
   <html>
       <head>
           <style>
               verbs {
                   color: red;
                   font-size: 40px;
               }
           </style>
       </head>
   
       <body>
           <verbs>
               Hello world
           </verbs>
       </body>
       <script src="https://code.jquery.com/jquery-3.4.1.js" 
       integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
       crossorigin="anonymous"></script>
   
       <script>
           $('verbs').css('color','#2ec770');
       </script>
   </html>
   ```

3. Defalut color (create html tags)

   ```css
   adverb {
     color: #f2777a;
   }
   
   noun {
     color: #f99157;
   }
   
   adposition {
     color: #ffcc66;
   }
   
   determiner {
     color: #99cc99;
   }
   
   interjection {
     color: #66cccc;
   }
   
   particle {
     color: #6699cc;
   }
   
   punctuation {
     color: #f2f0ec;
   }
   
   verb {
     color: #cc99cc;
   }
   
   unknown {
     color: #d3d0c8;
   }
   
   numbers {
     color: #e8e6df;
   }
   
   conjunction {
     color: #d27b53;
   }
   
   adjective {
     color: #6699cc;
   }
   ```

   

