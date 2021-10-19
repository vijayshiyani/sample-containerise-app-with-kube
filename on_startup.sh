#!/bin/sh

# do extra stuff e.g. npm run typeorm:migration:run;
echo $(pwd) 
echo $(ls) 
echo $(cat .git/$(cat .git/HEAD | cut -d' ' -f2)) > public/current_build_git_commit.txt;

exec "$@"
