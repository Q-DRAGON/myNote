from routes import *
from models.post import Post

main = Blueprint('post', __name__)


@main.route('/post/explore', methods=['post'])
def explore():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    posts = Post.query.all()
    total = len(posts)
    currentPage = form.get('currentPage')
    pageSize = form.get('pageSize')
    startIndex = (currentPage - 1) * pageSize
    pagePosts = Post.query.order_by(Post.timestamp.desc()).all()
    pagePosts = pagePosts[startIndex:startIndex + pageSize]
    pagePosts = [{
        'content': post.content,
        'timestamp': post.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        'name': post.user.username,
    } for post in pagePosts]
    r = {
        'pagePosts': pagePosts,
        'total': total,
    }
    return api_response('0', r, '查询成功')


@main.route('/post/userPosts', methods=['post'])
def userPosts():
    u = current_user()
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    currentPage = form.get('currentPage')
    pageSize = form.get('pageSize')
    startIndex = (currentPage - 1) * pageSize
    if u is not None:
        posts = Post.query.filter_by(user_id=u.id).order_by(Post.timestamp.desc()).all()
        total = len(posts)
        pagePosts = posts[startIndex:startIndex + pageSize]
        pagePosts = [{
            'content': post.content,
            'timestamp': post.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        } for post in pagePosts]
        return api_response('0', {
            'pagePosts': pagePosts,
            'total': total,
        }, '查询成功')
    return api_response('-1', [], '查询失败')


@main.route('/post/addPost', methods=['post'])
def addPost():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    post = Post(form)
    post.save()
    return api_response('0', [], '提交成功')

