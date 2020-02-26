# 页面结构分析
'''
url:
https://movie.douban.com/top250?start=0&filter=
https://movie.douban.com/top250?start=25&filter=
https://movie.douban.com/top250?start=50&filter=
...
https://movie.douban.com/top250?start=225&filter=

movie-div-item:
<div class="item"></div>

name:
<span class="title"></span>[0]

director:
<p class=""></p>

rating:
<span class="rating_num" property="v:average">9.6</span>

quote:
<p class="quote">
    <span class="inq">风华绝代。</span>
</p>

img:
<img alt="肖申克的救赎" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" class="" width="100">
<img alt="霸王别姬" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" class="" width="100">
'''

# 实例:
import socket
import ssl
import time
from lxml import html
import requests


def log(*args, **kwargs):
    value = time.localtime(int(time.time()))
    dt = time.strftime('%Y/%m/%d %H:%M:%S', value)
    print(dt, *args, **kwargs)


class Model(object):
    def __repr__(self):
        name = self.__class__.__name__
        propertites = (u'{}=({})'.format(k, v) for k, v in self.__dict__.items())
        r = '<{}:\n{}>'.format(name, '\n'.join(propertites))
        return r


class Movie(Model):
    def __init__(self):
        self.name = ''
        self.rating = ''
        self.quote = ''
        self.img_url = ''


def socket_by_protocol(protocol):
    if protocol == 'http':
        s = socket.socket()
    else:
        s = ssl.wrap_socket(socket.socket())
    return s


def parsed_by_url(url):
    '''
    :param url: https://movie.douban.com/top250?start=0&filter=
    :return protocol, host, port, path:
    '''
    port_dict = {
        'http': 80,
        'https': 443,
    }
    protocol = 'http'
    if url[:7] == 'http://':
        url = url.split('://')[1]
    elif url[:8] == 'https://':
        protocol = 'https'
        url = url.split('://')[1]
    else:
        url = url
    index = url.find('/')
    if index != -1:
        host = url[:index]
        path = url[index:]
    else:
        host = u
        path = '/'
    port = port_dict[protocol]
    if host.find(':') != -1:
        h = host.split(':')
        host = h[0]
        port = int(h[1])
    return protocol, host, port, path


def response_by_socket(s):
    response = b''
    while True:
        r = s.recv(1023)
        if len(r) == 0:
            break
        response += r
    return response


def parsed_response(r):
    header, body = r.split('\r\n\r\n', 1)
    h = header.split('\r\n')
    status_code = int(h[0].split()[1])
    headers = {}
    for line in h[1:]:
        k, v = line.split(': ')
        headers[k] = v
    return status_code, headers, body


def get(url):
    protocol, host, port, path = parsed_by_url(url)
    s = socket_by_protocol(protocol)
    s.connect((host, port))
    # Cookie:q_c1=f1db8beb2b3d416fb0a56b93bcd8b697|1525076388000|1496486038000; d_c0="ACACBON02wuPTjtwVAXwaOVZalZdz6ep7pY=|1496486043"; __utma=51854390.964355823.1521019768.1521019768.1525076384.2; __utmz=51854390.1525076384.2.2.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _zap=78865d42-c76f-4fd8-8fcf-895efa9a19e5; z_c0=Mi4xUENPRUF3QUFBQUFBSUFJRTQzVGJDeGNBQUFCaEFsVk5nZEpWV3dETG92eHQ3bDU2TzRLMThTU0FmSC0yemNSQm9n|1516799105|0c69abd129a15abb283b02cfe307e57db7123be2; __utmv=51854390.100--|2=registration_date=20160930=1^3=entry_date=20160930=1; _xsrf=2ae97636-e182-4a4e-91a2-089a66180e3e; __utmb=51854390.0.10.1525076384; __utmc=51854390'
    request = "GET {} HTTP/1.1\r\nhost: {}\r\nConnection: close\r\n" \
              "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0\r\n\r\n".format(path,
                                                                                                                 host)
    s.send(request.encode(encoding='utf-8'))
    response = response_by_socket(s)
    r = response.decode('utf-8')
    status_code, headers, body = parsed_response(r)
    # log('status:{}data:{}'.format(status_code, body))
    if status_code == 301:
        url = headers['Location']
        return get(url)
    return status_code, headers, body


def movie_from_div(m):
    '''
    self.name = ''
    self.rating = ''
    self.quote = ''
    self.img_url = ''
    '''
    movie = Movie()
    names = m.xpath('.//span[@class="title"]/text()')
    movie.name = ''.join(names)
    movie.quote = m.xpath('.//span[@class="inq"]/text()')
    movie.rating = m.xpath('.//span[@class="rating_num"]')[0].text
    movie.img_url = m.xpath('.//img[@class=""]/@src')[0]
    return movie


def movies_from_url(url):
    _, _, page = get(url)
    root = html.fromstring(page)
    movie_divs = root.xpath('//div[@class="item"]')
    movies = [movie_from_div(m) for m in movie_divs]
    return movies


def download_covers(movies):
    for m in movies:
        image_url = m.img_url
        r = requests.get(image_url)
        path = 'covers/' + m.name.split('/ ')[0] + '.jpg'
        # log('path', path, 'test', m.name.split('/ ')[0])
        with open(path, 'wb') as f:
            f.write(r.content)


def main():
    # https://movie.douban.com/top250?start=0&filter=
    # https://movie.douban.com/top250?start=25&filter=
    base_url = 'https://movie.douban.com/top250'
    movies = []
    for i in range(10):
        index = i * 25
        url = base_url + '?start={}&filter='.format(index)
        movies_item = movies_from_url(url)
        movies += movies_item
    log('movies', [m for m in movies])
    # download_covers(movies)

if __name__ == '__main__':
    main()



# def write_csv(movies):
#     csv_file = open("log/rent.csv", 'w')
#     csv_writer = csv.writer(csv_file, delimiter=",")
#     for m in movies:
#         csv_writer.writerow([m.name, m.quote, m.rating, m.img_url])
#
#     csv_writer.close()