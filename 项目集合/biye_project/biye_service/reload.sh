# 3000, 8000, 5432
# 重新构建镜像
docker build -t vuenginxcontainer .
# 删除容器
docker rm -f vueServer
# 启动容器
docker run -t -d -p 8010:8010 --name vueServer vuenginxcontainer
