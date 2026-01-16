README - Architecture CI/CD DevSecOps
Vue d'ensemble du projet
Ce projet implémente une chaîne CI/CD complète pour une application Node.js 18, intégrant les meilleures pratiques DevSecOps avec automatisation, sécurité et déploiement sur infrastructure cloud.
Architecture de la chaîne CI/CD complète
1. Gestion du code source (Version Control)

Outil : GitHub
Branches : main (production) et develop (développement)
Déclencheurs : Push et Pull Requests sur les branches principales

2. Pipeline d'Intégration Continue (CI)
Phase de Build et Test
GitHub → Checkout du code → Installation Node.js 18 → npm install → npm test → Linting
Étapes :

Récupération automatique du code source
Configuration de l'environnement Node.js version 18
Installation des dépendances du projet
Exécution des tests unitaires
Vérification de la qualité du code (linting)

Phase de Conteneurisation
Build Docker Image → Tag de l'image → Push vers DockerHub
Contrainte : Le déploiement sur DockerHub ne s'exécute que sur la branche main
3. Sécurité - Scan de vulnérabilités (DevSecOps)
Image Docker → Trivy Scanner → Détection vulnérabilités HIGH/CRITICAL → Rapport
Outil : Trivy

Scan automatique après la construction de l'image
Détection des vulnérabilités critiques et élevées
Génération de rapports de sécurité détaillés

4. Infrastructure as Code (IaC)
Terraform → Provisioning AWS → Instance EC2 (Ubuntu) → Security Group → Déploiement
Composants provisionnés :

Instance EC2 : t2.micro/t3.micro avec Ubuntu
Security Group : Ports 22 (SSH) et 8080 (Application)
Clé SSH : Pour connexion sécurisée
Configuration : Installation Docker + Déploiement du conteneur

5. Déploiement Continu (CD)
DockerHub → Pull Image sur EC2 → docker run (port 8080) → Application accessible
Flux complet de la chaîne CI/CD
┌─────────────────┐
│  Développeur    │
│   (Git Push)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   CI Job     │  │  Build Job   │  │  Security    │ │
│  │              │  │              │  │   Job        │ │
│  │ • Checkout   │→ │ • Docker     │→ │ • Trivy      │ │
│  │ • Node 18    │  │   Build      │  │   Scan       │ │
│  │ • npm install│  │ • Push to    │  │ • Rapport    │ │
│  │ • npm test   │  │   DockerHub  │  │              │ │
│  │ • Linting    │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│                    DockerHub Registry                    │
│              (Stockage des images Docker)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Infrastructure AWS                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │            Terraform Provisioning                   ││
│  │  • Création Instance EC2 (Ubuntu)                   ││
│  │  • Configuration Security Group (22, 8080)          ││
│  │  • Association clé SSH                              ││
│  └────────────────────────────────────────────────────┘│
│                          │                              │
│                          ▼                              │
│  ┌────────────────────────────────────────────────────┐│
│  │         Instance EC2 (Application Running)          ││
│  │  • Docker installé                                  ││
│  │  • Image pullée depuis DockerHub                    ││
│  │  • Conteneur en écoute sur port 8080                ││
│  └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Utilisateurs   │
│  (HTTP:8080)    │
└─────────────────┘
Technologies utilisées
CatégorieTechnologieRôleApplicationNode.js 18Runtime de l'applicationConteneurisationDockerPackaging et isolationCI/CDGitHub ActionsAutomatisation des workflowsRegistryDockerHubStockage des imagesSécuritéTrivyScan de vulnérabilitésIaCTerraformProvisioning infrastructureCloudAWS EC2Hébergement de l'application
Avantages de cette architecture
✅ Automatisation complète : Du commit au déploiement sans intervention manuelle
✅ Sécurité intégrée : Scan automatique des vulnérabilités avant déploiement
✅ Infrastructure reproductible : IaC avec Terraform pour des déploiements cohérents
✅ Isolation : Conteneurisation garantissant la portabilité
✅ Traçabilité : Chaque étape est loguée et vérifiable
Solution de scalabilité (Partie 4 - Bonus)
Pour scaler horizontalement et assurer la haute disponibilité :

AWS Auto Scaling Group : Ajuste automatiquement le nombre d'instances EC2 selon la charge
Elastic Load Balancer (ALB/NLB) : Distribue le trafic entre plusieurs instances
Multi-AZ Deployment : Répartition des instances sur plusieurs zones de disponibilité

Pourquoi scaler horizontalement ?
Le scaling horizontal augmente la capacité en ajoutant des instances plutôt qu'en augmentant la puissance d'une seule, offrant meilleure résilience, élimination des points de défaillance uniques et capacité à gérer des pics de charge importants sans interruption.

Projet réalisé dans le cadre de l'examen DevSecOps - Bachelor 3 - 2026
