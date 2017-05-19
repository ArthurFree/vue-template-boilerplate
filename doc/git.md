# git

## 设置git命令alias

```
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
```

还可以设置组合
```
git config --global alias.psm 'push origin master'
git config --global alias.plm 'pull origin master'
```

```
git log --graph --pretty=format:'%Cred%h%Creset - %C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
```

## 常用命令

- 把develop分支推送到远侧滑盖你仓库

```
git push origin develop
```

- 查看远程分支列表

```
git branch -r
```

- 删除本地分支

```
git branch -d develop
git branch -D develop (强制删除)
```

- 删除远程分支
```
git push origin :develop
```

- 将远程分支拉到本地
```
git checkout develop origin/develop
```

- 将远程分支拉到本地,并切换到此分支上
```
git checkout -b develop origin/develop
```

## Git Flow

主要分支:

- master    : 永远处在即将发布（production-ready）状态
- develop   : 最新的开发状态

辅助分支:
- feature   : 开发新功能的分支，基于develop, 完成后merge回develop
- release   : 准备要发布的版本的分支, 用来修复bug，基于develop，完成后merge回develop和master
- hotfix    : 修复master上的问题，等不及release版本就必须马上上线，基于master，完成后merge回master和develop
