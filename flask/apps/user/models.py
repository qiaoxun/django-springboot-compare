from flask_restful import fields

from ext import db


class User(db.Model):
    __tablename__ = 'my_user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=True)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=False)
    organization = db.relationship('Organization', backref='organization', lazy=True)

    def __repr__(self):
        return self.name


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    type = db.Column(db.String(20), default="company", nullable=True)
    pid = db.Column(db.Integer, db.ForeignKey('organization.id'))
    parent_org = db.relationship('Organization', remote_side=id)
    users = db.relationship('User', backref='user', lazy=True)

    def __repr__(self):
        return self.name
