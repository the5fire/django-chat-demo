#!/usr/bin/env bash


PY_VER="python2.7"
PY_ENV="./vpy2env"


#如果文件夹不存在，创建文件夹
if [ ! -d ${PY_ENV} ]; then
  virtualenv --python=${PY_VER} --no-site-packages ${PY_ENV}
  echo "create python virtual env..."

  # PIP INSTALL
  source ${PY_ENV}/bin/activate
  pip2 install -r ./requirements.txt

  python2 manage.py syncdb     # 第一次执行
  deactivate

fi


source ${PY_ENV}/bin/activate

# run
python2 manage.py runserver 8000


