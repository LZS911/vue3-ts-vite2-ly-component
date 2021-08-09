
if [ $1 == 'update' ]
then
  git add .
  git commit -m $2
  git push
  echo '代码提交成功'
else
  echo '代码拉取成功'
fi