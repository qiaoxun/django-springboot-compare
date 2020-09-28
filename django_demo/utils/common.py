from rest_framework.pagination import PageNumberPagination


class CommonPagination(PageNumberPagination):
    '''
    分页设置
    '''
    page_size = 10
    page_size_query_param = 'size'
