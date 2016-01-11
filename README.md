使用backbone.js和django做的一个小练习，体验下backbone开发项目的感觉，虽然只是练习。


## 项目依赖:

- python2.7
- django1.3.1
- backbone.js


## 使用 virtualenv 运行项目:

- 更新: 只需要 执行 本目录下 run_server.sh 脚本,即可自动初始化项目,并运行.
- 需要先安装 virtualenv 工具. (pip install virtualenv)


```bash

virtualenv --python=python2.7 --no-site-packages ./py2env

source ./py2env/bin/activate

pip2 install django==1.3.1


```


## bugfix:

- 2016.01.11 fix issues:
    - Error: No module named webchat.chat

