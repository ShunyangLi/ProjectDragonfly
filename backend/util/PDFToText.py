import json
import requests
from flask_restplus import abort

LicenseCode = '4633FB51-5B96-4003-B06E-AD5F7B615D74'
UserName = 'THEPROFESSOR'

RequestUrl = "http://www.ocrwebservice.com/restservices/processDocument?gettext=true&language=chinesesimplified"

def get_text(data):
    r = requests.post(
        RequestUrl,
        data=data,
        auth=(UserName, LicenseCode)
    )
    if r.status_code == 401:
        # Please provide valid username and license code
        abort(401, "Unauthorized request")
    res = json.loads(r.content)
    print(res['OCRText'])
    return res['OCRText'][0][0]
