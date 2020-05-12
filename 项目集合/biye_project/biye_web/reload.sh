# 3000, 8000, 5432
# 重新构建镜像
docker build -t webimage .
# 删除容器
docker rm -f vueApp
# 启动容器
docker run -d -p 9000:9000 --name vueApp webimage
