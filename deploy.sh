echo BUILDING NODEJS

rsync -z --exclude="node_modules" --exclude=".git" --exclude=".idea" -Pav -e "ssh -i AWS.pem" ./* ec2-user@54.210.71.125:chat-server

echo DEPLOY DONE
