from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class User(db.Model, SerializerMixin): 
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    simplifiedText = db.Column(db.Boolean)
    addCaptions = db.Column(db.Boolean)
    addImages = db.Column(db.Boolean)

    modifiedResource = db.relationship('ModifiedResource', backref='user', cascade='all')

    serialize_rules = ('-modifiedResource.user', '-_password_hash',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('permission denied')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Original(db.Model, SerializerMixin):
    __tablename__ = 'originals'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    url = db.Column(db.String, nullable=False)

    modifiedResource = db.relationship('ModifiedResource', backref='original', cascade='all')

    serialize_rules = ('-modifiedResource.original',)

class ModifiedResource(db.Model, SerializerMixin):
    __tablename__ = 'modifiedResources'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    originalId = db.Column(db.Integer, db.ForeignKey('originals.id'), nullable=False)

    text = db.relationship('Text', backref='modifiedResource', cascade='all')
    image = db.relationship('Image', backref='modifiedResource', cascade='all')

    serialize_rules = ('-user.modifiedResource', '-original.modifiedResource', '-text.modifiedResource', '-image.modifiedResource',)

class Text(db.Model, SerializerMixin):
    __tablename__ = 'text'

    id = db.Column(db.Integer, primary_key=True)
    modifiedId = db.Column(db.Integer, db.ForeignKey('modifiedResources.id'), nullable=False)
    text = db.Column(db.String, nullable=False)

    serialize_rules = ('-modifiedResource.text',)

class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    modifiedId = db.Column(db.Integer, db.ForeignKey('modifiedResources.id'), nullable=False)
    url = db.Column(db.String, nullable=False)
    location = db.Column(db.Integer)

    caption = db.relationship('Caption', backref='image', cascade='all')

    serialize_rules = ('-modifiedResource.image', '-caption.image')

class Caption(db.Model, SerializerMixin):
    __tablename__ = 'captions'

    id = db.Column(db.Integer, primary_key=True)
    imageId = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    text = db.Column(db.String, nullable=False)

    serialize_rules = ('-image.caption')