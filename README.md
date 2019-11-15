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

# Development Environment Setup

Clone the repository
```
git clone git@github.com:ShunyangLi/ProjectDragonfly.git
or
git clone https://github.com/ShunyangLi/ProjectDragonfly.git
cd ProjectDragonfly/
```

Install Nodejs v11
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install npm packages
```
cd frontend/
npm install
```

Install python venv (virtual environment)
```
sudo apt install python3-venv
```

Create new python venv in project root dir
```
cd ../
python3 -m venv venv
```

Active new venv
```
source venv/bin/activate
```

Install python modules
```
pip install -U flask
pip install -U flask-cors
pip install -U requests
pip install -U nltk
pip install -U flask_restplus
pip install -U pymongo
pip install flask_mail
pip install python-docx
```

Install mongodb
```
sudo apt install mongodb
```

Install treetagger
```
Follow the instructions here: https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/
Make sure to install English, French and Spanish parameter files
Once you have installed treetagger, go to file_handling.py and replace treetaggerPath with your install path
```

or you can use `install.sh` to install that

```shell
sh install.sh
```

Run backend

```
cd backend/
python run.py
```

Run frontend
```
cd ../frontend/
npm start
```


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
  

