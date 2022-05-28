

# function start_child() {
#   cd "${1}"
#   logfile="${2}"
#   shift 2
#   nohup "${@}" > ${logfile} &
#   cd ..
# }

# start_child client /log/file1 yarn start
# start_child server /log/file2 yarn start
# echo "Go to your localhost and see your webapp working!!"

function realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

cdcommand="cd "`realpath`

# str1="cd "`realpath`
# str2=`realpath`
# str3=$str1$str2
# echo $str3
# echo $str1

osascript -e "tell app \"Terminal\" to do script \"$cdcommand"client"; npm start\""
osascript -e "tell app \"Terminal\" to do script \"$cdcommand"server"; source venv/bin/activate; python manage.py runserver\""

# (cd ./server ; python manage.py runserver) &
# (cd ./client ; npm run start) &&
# wait

# WINDOWS
# start "" /d "./server" python manage.py runserver
# start "" /d "./client" npm run start
