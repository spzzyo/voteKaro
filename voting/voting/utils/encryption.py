from cryptography.fernet import Fernet

SECRET_KEY = 'M7sEhpgEoPBEe_hJKbTNmcKCgrgImS8sX8CVFnv3bTw='

def encrypt_data(data):
    cipher_suite = Fernet(SECRET_KEY)
    encrypted_data = cipher_suite.encrypt(data.encode())
    return encrypted_data.decode()

def decrypt_data(encrypted_data):
    cipher_suite = Fernet(SECRET_KEY)
    decrypted_data = cipher_suite.decrypt(encrypted_data.encode())
    return decrypted_data.decode()
