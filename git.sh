
# if [ $1 == 'update' ]
# then
  git add .
  git commit -m $1
  git push
  echo '代码提交成功'
# elif [ $1 == 'pull' ]
# then
#   git pull
#   echo '代码拉取成功'
# elif [ $1 == 'stash' ]
# then
#   git stash save $2
#   echo '提交暂存成功'
# elif [ $1 == 'pop' ]
# then
#   git stash pop $2
#   echo '提交弹出成功'
# elif [ $1 == 'apply' ]
# then
#   git stash apply $2
#   echo '提交恢复成功'
# fi