% ­&nbsp;&nbsp;&nbsp;&nbsp;
% Sergiy Goloviatinski, Etienne Hüsler & Bastien Wermeille
% 10 Avril 2019

## Sommaire
<br/>

* Projet
* Buts
* Démonstration
* GraphQl
* Django Channels
* React
* Redux

## Le projet
<br/>
<br/>
<br/>
<br/>
Création d'un chat, inspiré de Discord

## Buts
<br/>
Apprendre de nouvelles technologies

* Django
* Django channels
* GraphQL
* React
* Redux
* JWT

<aside class="notes">

</aside>

## Démonstration
<br/>
<br/>
<br/>
<br/>
[https://djangochat.srvz-webapp.he-arc.ch](https://djangochat.srvz-webapp.he-arc.ch)

<aside class="notes">

</aside>

## GraphQl
![GraphQL structure](./images/graphql_schema.png)

<aside class="notes">
Bastien,

Présenter graphql avec ses avantages / inconvénients
</aside>


## Django Channels (1)
![](./images/channels_schema.png)


<aside class="notes">
Sergiy
Dire que React est buildé côté serveur et servi aux clients à la première connexion
</aside>

## Django Channels (2)
<br/>

- Authentification en passant JWT par cookie à la connexion WS
- Un "consumer" côté backend par utilisateur connecté
    - tous les consumers dans le même "groupe", mais filtrage côté backend avant d'envoyer au client
- Message inséré dans DB avec GraphQL, ensuite envoyé par WS
- WS pour mettre à jour GUI
- WS pour notifications avec toastr

## React (1)
<br/>

* Bibliothèque Javascript libre
* Developpée par Facebook et une communauté de développeurs indépendants
* Faciliter la création d'applications web monopage
* Composants générant une partie ou la totalité d'une page web
* Utilisée par Netflix, WhatsApp, Yahoo ...
* Vue du modèle MVC

<aside class="notes">
Etienne
</aside>

## React (2)

## React (3)

## React (4)

## Redux (1)
<br/>
<br/>
<br/>

* Bibliothèque Javascript libre
* Utilisée principalement avec React et Angular
* Petite bibliothèque, simple d'utilisation
* Conteneur d'état de l'application

## Redux (2)

## Redux (3)
<br/>

* (+) Etat "immuable"
* (+) Modifications temporelles (undo, redo ...)
* (+) Très léger (~ 2 ko) sans nos classes
* (-) Pas intuitif pour des habitués de la POO
* (-) Beaucoup de code nécessaire
* (-) Références compliquées (actions hors composants)

## Conclusion
<br/>
<br/>
<br/>

* L'application est fonctionelle
* Difficulté principale: intégrer et combiner une multitude de nouvelles technologies
* Pas pu implémenter tout ce qui était prévu par manque de temps et à cause de la complexité du projet

<aside class="notes">

</aside>

## Améliorations
<br/>

* Effacer messages/channels/serveur/amis
* Interface mobile
* Gestion et mise en place des droits
* Bannir
* Accepter invitation ami
* Notifications avec bulles quand nouveau message sur autre channel/serveur
* Réactions

<aside class="notes">

</aside>

## Questions ?
![](./images/questions.jpg)
