
def decode_flask_cookie(secret_key, cookie_str):
    import hashlib
    from itsdangerous import URLSafeTimedSerializer
    from flask.sessions import TaggedJSONSerializer
    salt = 'cookie-session'
    serializer = TaggedJSONSerializer()
    signer_kwargs = {
        'key_derivation': 'hmac',
        'digest_method': hashlib.sha1
    }
    s = URLSafeTimedSerializer(secret_key, salt=salt, serializer=serializer, signer_kwargs=signer_kwargs)
    return s.loads(cookie_str)


print(decode_flask_cookie("LOLOLOL_I_Am_So_Secret", ".eJw9Tk1rg0AU_Ctlzz1kV4VU6CFgDBbeE8NGeXsJGjV2dUNJU4wv5L936aGHYYaB-XiIdKrPIn6Il0bEolgNSaeKubFtj3qvQK4lKFyA275mjLBc35vJe8GH8uiNTb-ByzfxfBXHz_a_x9gNo6OAHDHxYZXvKMQqHcFtA9Kt50OILh2IYQZXDsA4kMpmqmgxFUij6Y68YdiBRB6VqbKI7GRzfZJ5UkSgTz5fhH7fgctC8DuoJ0tVaYG3gbGjxMo4skVEnC3ERYQOHSiaTeKV2k-gSmfs-f3v-1d3dfWlu9xEfLv-dM9fKWZcRg.CyTizg.Zy1kYeKHN-3ihXAgl_BT7nNyQnY"))
