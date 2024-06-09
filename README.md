# L'électricité en Suisse sur 25 ans




**INTRODUCTION**


Suite à la crise énergétique récente en Suisse, et aux enjeux actuels qu'imposent la société numérique, ce projet vise à étudier l'évolution de la production et de la consommation en électricité en Suisse. En effet, l'infrastructure électrique devenue cruciale dans le pays du fait de la digitalisation dans toutes les sphères économiques et sociétales, il devient risqué de dépendre de la fourniture énergétique d'autres pays. S'ajoute à cela des problématiques environnementales pour lesquelles la Suisse émet des objectifs en faveur du développement durable. 

Ainsi les questions posées dans le cadre de ce travail sont les suivantes :

Quelle réponse infrstucturale la Suisse apporte-t-elle aux défis environnementaux ?
Quelle est l'évolution de la consommation en électricité en Suisse sur 25 ans ?
A quel point le pays est-il déficitaire en énergie (et doit donc importer son électricité) ?




**SOURCES**


L'entièreté du projet s'appuie sur la base de données de l'OFEN (Office Fédéral de l'Energie) disponible ici : https://pubdb.bfe.admin.ch/de/suche?keywords=401.
Ce document répertorie les données de production nette, de consommation finale, d'importation et d'exportation d'électricité chaque mois sur la période janvier 1990 à mars 2024. On y trouve également des données sur la technologie utilisée pour produire cette énergie : centrale nucléaire, hydraulique ou thermique.

Nous avons choisi cette base de données car la fréquence mensuelle permet de ne pas souffrir d'un biais d'aggrégation annuel, et donc d'avoir une idée plus nette des évolutions, d'autant plus que les chiffres varient selon les saisons (demande plus forte en hiver).

Le nombre de champs pour lesquels des données ont été recueillies est limité. Cependant ces données ont été récoltées de manière consistante et précise sur une durée importante.


Ci-dessous la structure de la base de données, provenant d'une capture d'écran du fichier original :

<img width="783" alt="Capture d’écran données" src="https://github.com/RomaneChi/La-production-et-la-consommation-d-nergie-en-Suisse/assets/126593630/e32aba53-7485-4b2a-ba9a-164a040ad18a">




**OUTILS**


Afin de générer plusieurs visualisations en javascript, nous avons utilisé la libraire [d3.js](https://d3js.org/). 

Les données ne sont pas hébergées sur un serveur distant, pour lire le contenu il est donc nécessaire d'ouvrir un serveur live.



**CONTENU**


Ce travail a pour but d'obtenir une vue globale sur l'évolution de la consommation et de la production d'électricité en Suisse sur une durée étendue. 
D'une part, nous avons réalisé un graphique superposé, qui, par sa sobriété informationnelle, donne une visualisation directe sur la consommation et la production nette sur 24 ans, tout en gardant la précision des données mensuelles. Le but est d'aider à déterminer comment la production s'est adaptée, notamment en fonction de la numérisation de la société qui laisse supposer une hausse de la consommation depuis les années 2000.


<img width="1298" alt="Capture d’écran 2024-06-09 à 23 34 33" src="https://github.com/RomaneChi/La-production-et-la-consommation-d-nergie-en-Suisse/assets/126593630/19093052-621c-478e-8f45-9cd415da0f2c">


D'autre part, nous avons généré un piechart présentant les pourcentages d'utilisation des différentes techniques de production (hydraulique, nucléaire, thermique) par an pour une vue détaillée. Celle-ci vient compléter un diagramme en barres empilées ayant pour but de saisir l'évolution dans l'usage des différentes techniques de production.


<img width="810" alt="Capture d’écran 2024-06-09 à 23 34 01" src="https://github.com/RomaneChi/La-production-et-la-consommation-d-nergie-en-Suisse/assets/126593630/a60d2167-8601-4656-bbd1-f7b7f8b95dc8">

<img width="1356" alt="Capture d’écran 2024-06-09 à 23 34 16" src="https://github.com/RomaneChi/La-production-et-la-consommation-d-nergie-en-Suisse/assets/126593630/40f06c51-0782-4a6d-87be-857351f87fdd">


**AUTEURS**

Cecchinelli Bastien & Chilla Romane 
pour le cours "Visualisation de données" dipensé à l'UNIL par le Professeur I.Pante
Année 2024

