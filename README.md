# DjangoChat

## Getting Started

### API

To create your virtual env

```sh
cd api
python3 -m pip install virtualenv
virtualenv .ENV
source ./.ENV/bin/activate
```

To save the requirements from virtualenv:

```sh
pip3 freeze -l > requirements.txt  
```

And to install the defined requirements:

```
pip install -r requirements.txt
```

To migrate the first time your database:

```
python manage.py migrate
```

### Run api serveur

```sh
python3 ./api/djangochat/manage.py runserver 8080
```