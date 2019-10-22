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

   