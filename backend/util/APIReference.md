    You should specify OCR settings. See full description http://www.ocrwebservice.com/service/restguide
        
    Input parameters:
         
	[language]     - Specifies the recognition language. 
	   		This parameter can contain several language names separated with commas. 
                        For example "language=english,german,spanish".
			Optional parameter. By default:english
        
	[pagerange]    - Enter page numbers and/or page ranges separated by commas. 
			For example "pagerange=1,3,5-12" or "pagerange=allpages".
                        Optional parameter. By default:allpages
         
        [tobw]	      - Convert image to black and white (recommend for color image and photo). 
			For example "tobw=false"
                        Optional parameter. By default:false
         
        [zone]         - Specifies the region on the image for zonal OCR. 
			The coordinates in pixels relative to the left top corner in the following format: top:left:height:width. 
			This parameter can contain several zones separated with commas. 
		        For example "zone=0:0:100:100,50:50:50:50"
                        Optional parameter.
          
        [outputformat] - Specifies the output file format.
                        Can be specified up to two output formats, separated with commas.
			For example "outputformat=pdf,txt"
                        Optional parameter. By default:doc

        [gettext]	- Specifies that extracted text will be returned.
			For example "tobw=true"
                        Optional parameter. By default:false
        
        [description]  - Specifies your task description. Will be returned in response.
                        Optional parameter. 


	!!!!  For getting result you must specify "gettext" or "outputformat" !!!!  