# JWT token validation for protected API calls
import jwt
import os
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend




def decode_auth_token(request):
    """
    Validates token and returns auth_id if success and False otherwise
    """
 
    try:
        # get stored certificate
        absolute_path = os.path.dirname(__file__)
        relative_path = "key.txt"
        full_path = os.path.join(absolute_path, relative_path)
        
        with open(full_path, "rb") as file:
            cert_str = file.read()
        
        # get public key
        cert_obj = load_pem_x509_certificate(cert_str, default_backend())
        public_key = cert_obj.public_key()

        # extract token from a request
        token = request.headers["Authorization"].split(" ")[1]
        algo = jwt.get_unverified_header(token).get("alg")
 
        # decode token
        payload = jwt.decode(
            token, 
            public_key, 
            algorithms = algo,
            audience = "http://localhost:3000"
            #options={"verify_signature": False}
        )
    
        # extract auth_id  - authentication id
        auth_id = payload["sub"]
        
        if auth_id:
            return auth_id

        else:
            return False
    
    except Exception as e:
        print("JWT token cannot be verified. ", str(e))
        return False
        
