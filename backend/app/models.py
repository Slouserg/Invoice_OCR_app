from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from enum import Enum
import string
import random

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


def generate_invite_code(length):
    letters_and_digits = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(random.choices(letters_and_digits, k=length))
        if not Organization.query.filter_by(invite_code=code).first():
            return code


class UserRole(Enum):
    ADMIN = "admin"
    OWNER = "owner"
    USER = "user"


user_organization = db.Table('user_organization', db.metadata,
    db.Column('user_id', db.String(32), db.ForeignKey('users.id')),
    db.Column('organization_id', db.String(32), db.ForeignKey('organizations.id'))
)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.USER)
    invoices = db.relationship("Invoice", backref="user")
    organizations = db.relationship(
        "Organization", secondary=user_organization, backref=db.backref('users', lazy='dynamic'))
    active_organization_id = db.Column(db.String(32), unique=True)


class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    invite_code = db.Column(db.String(5), unique=True,
                            default=lambda: generate_invite_code(5))
    invoices = db.relationship("Invoice", backref="organization")


class Invoice(db.Model):
    __tablename__ = "invoices"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey(
        'users.id'), nullable=False)
    organization_id = db.Column(db.String(32), db.ForeignKey(
        'organizations.id'))
    invoice_number = db.Column(db.String(100))
    var_symbol = db.Column(db.String(100))
    date_of_issue = db.Column(db.String(100))
    due_date = db.Column(db.String(100))
    delivery_date = db.Column(db.String(100))
    payment_method = db.Column(db.String(100))
    total_price = db.Column(db.String(100))
    bank = db.Column(db.String(100))
    swift = db.Column(db.String(100))
    iban = db.Column(db.String(100))
    supplier_ico = db.Column(db.String(100))
    supplier_name = db.Column(db.String(100))
    supplier_address = db.Column(db.String(100))
    supplier_psc = db.Column(db.String(100))
    supplier_city = db.Column(db.String(100))
    supplier_dic = db.Column(db.String(100))
    buyer_ico = db.Column(db.String(100))
    buyer_name = db.Column(db.String(100))
    buyer_psc = db.Column(db.String(100))
    buyer_address = db.Column(db.String(100))
    buyer_city = db.Column(db.String(100))
    buyer_dic = db.Column(db.String(100))
    text = db.Column(db.String(100000))    
    pdf_file = db.Column(db.LargeBinary)
    image_file = db.Column(db.LargeBinary)
    average_score = db.Column(db.Float)
    recognition_time = db.Column(db.Float)
    parsing_time = db.Column(db.Float)
    other_time = db.Column(db.Float)
    ocr_method = db.Column(db.String(100))
