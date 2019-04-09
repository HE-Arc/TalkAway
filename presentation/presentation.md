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
<br/>

- Un "consumer" côté backend par client connecté
- Message inséré dans DB avec GraphQL, ensuite envoyé par WS
- WS pour notifier changement GUI
- WS pour notifications avec toastr

## React
TODO:

<aside class="notes">
Etienne ?
</aside>

## Redux
TODO:

<aside class="notes">
Bastien
</aside>

## Conclusion
<br/>
<br/>
<br/>

* Fonctionnel
* Difficulté principale: jongler avec/intégrer pleins de nouvelles technos

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
* ...

<aside class="notes">

</aside>

## Questions ?
![](./images/questions.jpg)
