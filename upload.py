import json
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.ssl.v20191205 import ssl_client, models

# ВАШИ ДАННЫЕ (возьмите из tccli configure list --profile eo-sub)
secret_id = "IKID2FMLLYrAKI4g7LTxHOK3byMiv0xmWCDq"
secret_key = "jNxVGVwPo5CB0hC3ugS5Xs483oOmyzpU"

try:
    cred = credential.Credential(secret_id, secret_key)
    httpProfile = HttpProfile()
    httpProfile.endpoint = "ssl.tencentcloudapi.com"

    clientProfile = ClientProfile()
    clientProfile.httpProfile = httpProfile
    
    # Важно: для международного аккаунта может потребоваться регион ap-singapore или ap-hongkong
    client = ssl_client.SslClient(cred, "ap-singapore", clientProfile)

    # Читаем файлы
    with open(r"C:\PS_Config\LE_PROD\3917849862\info.roses-crimea.ru\fullchain.cer", "r", encoding="utf-8") as f:
        cert_content = f.read()
    with open(r"C:\PS_Config\LE_PROD\3917849862\info.roses-crimea.ru\cert.key", "r", encoding="utf-8") as f:
        key_content = f.read()

    req = models.UploadCertificateRequest()
    params = {
        "CertificatePublicKey": cert_content,
        "CertificatePrivateKey": key_content,
        "CertificateType": "SVR",
        "Alias": "info-roses-crimea-le",
        "Repeatable": True
    }
    req.from_json_string(json.dumps(params))

    print("Отправка запроса...")
    resp = client.UploadCertificate(req)
    print("УСПЕХ! Ответ сервера:")
    print(resp.to_json_string())

except Exception as e:
    print("ОШИБКА:")
    print(e)