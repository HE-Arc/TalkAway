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


## Django Channels
![](./images/channels_schema.png)


<aside class="notes">
Sergiy
Dire que React est buildé côté serveur et servi aux clients à la première connexion
Dire qu'il y a un "consumer" par client connecté
Dire que les messages sont d'abord inséré dans db avec graphql et qu'ensuite ws est utilisé pour envoyer message à ceux qui ont le channel ouvert
Utilisation des ws pour notifier de changement de la GUI sans devoir recharger page
Utilisation des ws pour afficher toastr (notifications)
</aside>

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
