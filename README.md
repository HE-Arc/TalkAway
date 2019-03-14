# TalkAway

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

Warning, if you want to upgrade all the dependencies:
```sh
pip3 list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip3 install -U --user
```
The flag `--user` might not be necessary depending on your local configuration.

To migrate the first time your database:

```sh
python3 manage.py migrate auth
python3 manage.py migrate api
```

To seed the database:
```
python manage.py loaddata api/fixtures/seed.json
```

#### Tips

For migrations, once edited models.py

```sh
python3 manage.py makemigrations api
python3 manage.py migrate api
```

For administration, don't forget to create a super user:

```sh
python3 manage.py createsuperuser
```

### Run api server

```sh
python3 ./api/djangochat/manage.py runserver 8080
```

Kill applications on port 8080:
netstat -nao | find "8080"
Taskkill /F /PID app_PID

Admin account name: `admin` , password : `admin`
Test users passwords: `qwertzui`

## App

### Install

Sources pour l'installation: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04

Prérequis

```sh
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh

sudo apt install nodejs
```

Vérification

```sh
nodejs -v
```

Output
```sh
v10.14.0
```

Et npm, qui est DEJA CONTENU DANS NodeJS, pas besoin d'installer un package supplémentaire.

```sh
npm -v
```

Output
```sh
6.4.1
```

ATTENTION, version requise pour nodejs > 10.0
ATTENTION, version requise pour npm > 6.0

### Run APP
Launche the following commande line from th the folder `app\djangochat`

```
npm start
```

## Extensions
Je vous recommande d'utiliser l'extension:
- https://addons.mozilla.org/fr/firefox/addon/react-devtools/?src=search


## GraphQL

Example of request available:
```js
mutation {
  tokenAuth(username: "username", password: "xxx") {
    token
  }
}
```

# Sources
- https://github.com/facebook/create-react-app
- https://docs.graphene-python.org/projects/django/en/latest/tutorial-plain/
- https://pypi.org/project/django-cors-headers/
- [Intégration de redux avec react](https://github.com/ohansemmanuel/fake-medium/commit/589c2e1fb429659ee20131ed1d7558b03c8bf3f9)
