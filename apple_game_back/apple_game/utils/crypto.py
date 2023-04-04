from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

def encrypt_data(data, secret_key):
    cipher = AES.new(secret_key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode('utf-8'), AES.block_size))
    iv = cipher.iv
    ct = base64.b64encode(iv + ct_bytes).decode('utf-8')
    return ct

def decrypt_data(encrypted_data, secret_key):
    try:
        ct = base64.b64decode(encrypted_data.encode('utf-8'))
        iv = ct[:AES.block_size]
        ct_bytes = ct[AES.block_size:]
        cipher = AES.new(secret_key, AES.MODE_CBC, iv)
        pt = unpad(cipher.decrypt(ct_bytes), AES.block_size).decode('utf-8')
        return pt
    except Exception as e:
        print(f"Error while decrypting data: {e}")
        return None