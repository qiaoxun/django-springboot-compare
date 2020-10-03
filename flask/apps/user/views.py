from flask import Blueprint
from flask_restful import Resource, marshal_with, reqparse, fields, marshal
from ext import api, db
from .models import Organization, User

user_bp = Blueprint('user', __name__, url_prefix='api')

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('first_name')
parser.add_argument('last_name')
parser.add_argument('password')
parser.add_argument('email')
parser.add_argument('organization')
parser.add_argument('organization_id')
parser.add_argument('type')
parser.add_argument('pid')
parser.add_argument('page')
parser.add_argument('size')
parser.add_argument('ordering')


user_fields = {
    'id': fields.Integer,
    'organization_id': fields.Integer,
    'organization_name': fields.String,
    'name': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'password': fields.String,
    'email': fields.String,
}


organization_fields = {
    'id': fields.Integer,
    'pid': fields.Integer,
    'parent': fields.String,
    'name': fields.String,
    'type': fields.String,
    'type_meaning': fields.String,
    # 'users': fields.List,
}


class UserResourceList(Resource):

    # @marshal_with(user_fields)
    def get(self):
        args = parser.parse_args()
        organization_id = args.get('organization')
        page = int(args.get('page', '1'))
        per_page = int(args.get('size', '10'))
        user_paginate = User.query.filter_by(organization_id=organization_id).paginate(page, per_page=per_page, error_out=False)
        user_list = user_paginate.items
        for user in user_list:
            if user.organization:
                user.organization_name = user.organization.name

        res = {
            'count': user_paginate.total,
            'results': marshal(user_list, user_fields),
        }
        return res

    def post(self):
        args = parser.parse_args()
        name = args.get('name')
        first_name = args.get('first_name')
        last_name = args.get('last_name')
        password = args.get('password')
        email = args.get('email')
        organization_id = args.get('organization')
        user = User(name=name, first_name=first_name, last_name=last_name, password=password, email=email, organization_id=organization_id)
        db.session.add(user)
        db.session.commit()
        return {'result': 'OK'}


class UserResource(Resource):

    @marshal_with(user_fields)
    def get(self, uid):
        user = User.query.get(uid)
        return user

    def put(self, uid):
        args = parser.parse_args()
        name = args.get('name')
        first_name = args.get('first_name')
        last_name = args.get('last_name')
        password = args.get('password')
        email = args.get('email')
        organization_id = args.get('organization_id')
        user = User.query.get(uid)
        user.name = name
        user.first_name = first_name
        user.last_name = last_name
        user.password = password
        user.email = email
        user.organization_id = organization_id
        db.session.commit()
        return {'result': 'OK'}

    def delete(self, uid):
        user = User.query.get(uid)
        db.session.delete(user)
        db.session.commit()
        return {'result': 'OK'}


api.add_resource(UserResourceList, '/rbac/user/')
api.add_resource(UserResource, '/rbac/user/<int:uid>/')


class OrganizationResourceList(Resource):

    # @marshal_with(organization_fields)
    def get(self):
        args = parser.parse_args()
        page = int(args.get('page', '1'))
        per_page = int(args.get('size', '10'))
        org_paginate = Organization.query.paginate(page, per_page=per_page, error_out=False)

        org_list = org_paginate.items

        for org in org_list:
            if org.parent_org:
                org.parent = org.parent_org.name

            if org.type == 'customer':
                org.type_meaning = 'Customer'
            else:
                org.type_meaning = 'Company'

        res = {
            'count': org_paginate.total,
            'results': marshal(org_list, organization_fields),
        }
        return res

    def post(self):
        args = parser.parse_args()
        name = args.get('name')
        pid = args.get('pid')
        type = args.get('type')
        org = Organization(name=name, pid=pid, type=type)
        db.session.add(org)
        db.session.commit()
        return {'method': 'POST'}


class OrganizationResource(Resource):

    @marshal_with(organization_fields)
    def get(self, organization_id):
        org = Organization.query.get(organization_id)
        return org

    def put(self, organization_id):
        args = parser.parse_args()
        org = Organization.query.get(organization_id)
        name = args.get('name')
        pid = args.get('pid')
        type = args.get('type')
        org.name = name
        org.pid = pid
        org.type = type
        db.session.commit()
        return {'result': 'OK'}

    def delete(self, organization_id):
        org = Organization.query.get(organization_id)
        db.session.delete(org)
        db.session.commit()
        return {'result': 'OK'}


api.add_resource(OrganizationResourceList, '/rbac/org/')
api.add_resource(OrganizationResource, '/rbac/org/<int:organization_id>/')

