import json
import requests
from flask_restplus import abort

LicenseCode = 'CC30EA1E-FFB6-46A9-BEC6-7E17749BC7F2'
UserName = 'CHARLES0812'

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
