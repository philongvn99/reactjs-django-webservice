call cd "./env/Scripts/"
call ./activate
cd ..
cd ..
start "" /d "./server" python manage.py runserver
start "" /d "./client" npm run start
