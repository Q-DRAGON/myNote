import socket
import ssl
from lxml import etree
import json


def log(*args, **kwargs):
    print(*args, **kwargs)


class Model(object):
    def __repr__(self):
        name = self.__class__.__name__
        propertites = (u'{}=({})'.format(k, v) for k, v in self.__dict__.items())
        r = '<{}:\n{}>'.format(name, '\n'.join(propertites))
        return r


class Course(Model):
    def __init__(self):
        self.type = ''
        self.img = ''
        self.title = ''
        self.follow = 0


def socket_by_protocol(protocol):
    if protocol == 'http':
        s = socket.socket()
    else:
        s = ssl.wrap_socket(socket.socket())
    return s


def parsed_by_url(url):
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
              "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36" \
              "\r\n\r\n".format(path, host)
    s.send(request.encode(encoding='utf-8'))
    response = response_by_socket(s)
    r = response.decode('utf-8')
    status_code, headers, body = parsed_response(r)
    # log('status:{}data:{}'.format(status_code, body))
    if status_code == 301:
        url = headers['Location']
        log('url', url)
        return get(url)
    return status_code, headers, body


def course_from_div(c, t):
    course = Course()
    course.type = t
    course.img = c.xpath('.//*[@class="course-item"]//img/@src')[0]
    course.title = c.xpath('.//*[@class="course-item"]//*[@class="course-name"]')[0].text.strip()
    course.follow = c.xpath('.//*[@class="course-item"]//*[@class="students-count"]/span')[0].text
    return course


def course_from_type(t):
    tp = t.xpath('./div[@class=" clearfix text-center path-title-box"]/span[2]/text()')[0]
    cs_s = t.xpath('./div[@class="row"]//div[@class="course-item-box"]')
    cs = [course_from_div(c, tp) for c in cs_s]
    return cs

def courses_from_url(url):
    _, _, page = get(url)
    root = etree.HTML(page)
    # root = etree.tostring(html)
    types = root.xpath('//div[@class="tab-detail-item"]')
    typeCourses = [course_from_type(t) for t in types]
    return typeCourses

def nomarlize(url):
    arr = courses_from_url(url)
    obj = {}
    for index, items in enumerate(arr):
        for (j, item) in enumerate(items):
            obj = {
                'type': item.type,
                'img': item.img,
                'title': item.title,
                'follow': item.follow,
            }
            items[j] = obj
        arr[index] = items
    s = json.dumps(arr, indent=2, ensure_ascii=False)
    return s

def save(data, path):
    with open(path, 'w+', encoding='utf-8') as f:
        f.write(data)


url = 'https://www.shiyanlou.com/paths/14/'
path = './nodeJs.json'
save(nomarlize(url), path)