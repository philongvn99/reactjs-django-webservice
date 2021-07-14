cd "server"
pip install django djangorestframework django-cors-headers psycopg2 
python manage.py migrate
cd ..
cd "client" 
npm update
npm install react-router-dom reactstrap
