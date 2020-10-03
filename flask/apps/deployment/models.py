from ext import db


# # 创建User用户，表名为user
# class User(db.Model):
#     __table__name = 'user'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=False, nullable=True)
#
#     def __repr__(self):
#         return '<User %r>' % self.username
