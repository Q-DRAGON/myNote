FROM chenworuo/wor_py3:20190709
ENV PYTHONPATH="/home/works/program/backend:${PYTHONPATH}"


WORKDIR /home/works/program/
COPY . /home/works/program/
# RUN pip install -r /home/works/program/requirements.txt  -i https://pypi.douban.com/simple/ --trusted-host pypi.douban.com
RUN pip install -r /home/works/program/requirements.txt  -i https://pypi.doubanio.com/simple/ --trusted-host pypi.doubanio.com

EXPOSE 8562
CMD ["python", "./main.py"]