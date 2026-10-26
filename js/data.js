/* ==========================================================================
   CONTENU DU PORTFOLIO
   Tout le texte qui change souvent est ici. Modifie ce fichier pour ajouter
   un poste, une certification ou une compétence : la page se met à jour seule.
   ========================================================================== */

window.PORTFOLIO = {

  /* ------------------------------------------------------------------------
     PARCOURS
     Le plus récent en premier. Pour ajouter un poste, copie ce modèle
     au début de la liste :

    {
      periode: "2026",
      type: "Stage",
      poste: "Intitulé du poste",
      entreprise: "Nom de l'entreprise",
      missions: [
        "Mission principale, en une phrase.",
        "Deuxième mission, avec l'outil utilisé (Purview, Defender XDR…).",
        "Résultat concret ou ce que tu as livré."
      ]
    },

     "missions" peut rester vide [] : la carte s'affiche alors sans liste.
     "lieu" est facultatif.
     ------------------------------------------------------------------------ */
  experiences: [
    {
      periode: "Sept. 2026 – aujourd'hui",
      type: "Alternance",
      poste: "Consultant junior en cybersécurité",
      entreprise: "Magellan",
      lieu: "Aix-en-Provence, en hybride",
      missions: []
    },
    {
      periode: "Avr. 2026 – juin 2026",
      type: "Stage",
      poste: "Stagiaire infrastructure et sécurité",
      entreprise: "Magellan",
      lieu: "Aix-en-Provence, sur site",
      missions: []
    }
  ],

  /* ------------------------------------------------------------------------
     FORMATION ACADÉMIQUE
     ------------------------------------------------------------------------ */
  formations: [
    {
      periode: "Sept. 2024 – juin 2027",
      poste: "BUT Réseaux et Télécommunications, parcours cybersécurité",
      entreprise: "Aix-Marseille Université",
      missions: [
        "Protocoles réseau, systèmes Linux et Windows, sécurité des infrastructures.",
        "Travaux pratiques sur des topologies d'entreprise grâce aux partenariats Cisco et Stormshield."
      ]
    },
    {
      periode: "Sept. 2021 – juin 2024",
      poste: "Baccalauréat technologique, sciences de l'ingénierie",
      entreprise: "Lycée du Rempart",
      missions: [
        "Spécialité SIN : systèmes d'information et numérique."
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     COMPÉTENCES CLÉS
     Les 12 points qui te différencient, regroupés par ce qu'ils permettent
     de faire. "sens" = l'explication en mots simples.
     ------------------------------------------------------------------------ */
  competencesCles: [
    {
      domaine: "Protéger les données",
      items: [
        { nom: "Microsoft Purview", sens: "Repérer, classer et gouverner les données sensibles d'une entreprise." },
        { nom: "Data Loss Prevention (DLP)", sens: "Empêcher qu'une information confidentielle sorte par e-mail, cloud ou clé USB." },
        { nom: "Labels de sensibilité et chiffrement", sens: "Étiqueter un fichier « Confidentiel » pour qu'il reste chiffré partout où il va." }
      ]
    },
    {
      domaine: "Détecter et enquêter",
      items: [
        { nom: "Microsoft Defender XDR", sens: "Corréler les alertes des postes, e-mails et identités pour voir une attaque en entier." },
        { nom: "Investigation d'incidents", sens: "Reconstituer la chronologie d'un incident, en mesurer l'impact et y répondre." },
        { nom: "MITRE ATT&CK", sens: "Nommer chaque technique d'attaque avec le référentiel commun aux équipes SOC." }
      ]
    },
    {
      domaine: "Contrôler identités et appareils",
      items: [
        { nom: "Microsoft Entra ID", sens: "Décider qui peut se connecter, à quoi, et avec quelle authentification." },
        { nom: "Microsoft Intune", sens: "Gérer les ordinateurs et téléphones de l'entreprise et y appliquer des règles de sécurité." },
        { nom: "EBIOS Risk Manager", sens: "Analyser les risques avec la méthode de l'ANSSI, en partant des scénarios d'attaque." }
      ]
    },
    {
      domaine: "Automatiser et tester",
      items: [
        { nom: "PowerShell", sens: "Écrire des scripts pour collecter, exporter et documenter sans tâches manuelles." },
        { nom: "Automatisation Microsoft 365", sens: "Industrialiser l'administration et les rapports d'un tenant M365." },
        { nom: "Laboratoires Azure et Microsoft Security", sens: "Reproduire un problème client dans un lab pour tester et valider une solution." }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     TOUTES LES COMPÉTENCES
     ------------------------------------------------------------------------ */
  competences: [
    {
      categorie: "Microsoft Security",
      items: [
        "Purview : DLP, labels de sensibilité, chiffrement",
        "Purview : Insider Risk Management",
        "Purview : Audit, eDiscovery, gouvernance",
        "Defender XDR : analyse, investigation, timeline, corrélation",
        "Intune : gestion, restrictions, stratégies, protection",
        "Entra ID : identités, accès, authentification"
      ]
    },
    {
      categorie: "Cybersécurité",
      items: [
        "Prévention des fuites de données (DLP)",
        "Classification et conformité",
        "Analyse, investigation et réponse aux incidents",
        "Blue Team",
        "Sécurité des endpoints",
        "Gestion des risques"
      ]
    },
    {
      categorie: "Méthodologies",
      items: [
        "MITRE ATT&CK",
        "EBIOS Risk Manager",
        "Cycle de réponse à incident",
        "Analyse de scénarios d'attaque",
        "Documentation de sécurité"
      ]
    },
    {
      categorie: "Laboratoire et tests",
      items: [
        "Labs Azure et Microsoft 365",
        "Reproduction de problèmes clients",
        "Validation de sécurité",
        "Tests fonctionnels",
        "Dépannage"
      ]
    },
    {
      categorie: "Développement et automatisation",
      items: [
        "PowerShell",
        "Automatisation Microsoft 365",
        "Collecte et export de données",
        "Génération de documentation",
        "Interfaces web d'administration"
      ]
    },
    {
      categorie: "Compétences professionnelles",
      items: [
        "Analyse des besoins",
        "Résolution de problèmes",
        "Rédaction technique",
        "Vulgarisation de la cybersécurité",
        "Conseil",
        "Communication avec clients et équipes"
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     CERTIFICATIONS
     "lien" (facultatif) : URL de vérification (Credly, Microsoft Learn…).
     ------------------------------------------------------------------------ */
  certifications: {
    officielles: [
      { nom: "Microsoft Certified: Security, Compliance, and Identity Fundamentals", code: "SC-900", emetteur: "Microsoft", lien: "" },
      { nom: "Certified Stormshield Network Administrator", code: "CSNA", emetteur: "Stormshield", lien: "" },
      { nom: "MOOC de l'ANSSI sur la sécurité du numérique", code: "SecNumacadémie", emetteur: "ANSSI", lien: "" },
      { nom: "Prévention et secours civiques", code: "PSC", emetteur: "Sécurité civile", lien: "" }
    ],
    cisco: [
      { nom: "CCNA: Introduction to Networks", code: "ITN" },
      { nom: "CCNA: Switching, Routing, and Wireless Essentials", code: "SRWE" },
      { nom: "CCNA: Enterprise Networking, Security, and Automation", code: "ENSA" },
      { nom: "Network Support and Security", code: "NSS" },
      { nom: "Introduction to Cybersecurity", code: "ICS" }
    ],
    learn: [
      {
        theme: "Classification et protection",
        modules: [
          "Protect sensitive data in a digital world",
          "Classify data for protection and governance",
          "Review and analyze data classification and protection",
          "Create and manage sensitive information types",
          "Create and configure sensitivity labels with Microsoft Purview",
          "Apply sensitivity labels for data protection",
          "Classify and protect on-premises data with Microsoft Purview",
          "Understand Microsoft 365 encryption",
          "Protect email with Microsoft Purview Message Encryption"
        ]
      },
      {
        theme: "Prévention des fuites (DLP)",
        modules: [
          "Understand and plan data loss prevention",
          "Create and manage data loss prevention policies",
          "Implement endpoint data loss prevention (DLP) with Microsoft Purview",
          "Configure DLP policies for Microsoft Defender for Cloud Apps and Power Platform",
          "Investigate and respond to Microsoft Purview Data Loss Prevention alerts"
        ]
      },
      {
        theme: "Risques internes",
        modules: [
          "Understand Microsoft Purview Insider Risk Management",
          "Prepare for Microsoft Purview Insider Risk Management",
          "Create and manage Insider Risk Management policies",
          "Investigate insider risk alerts and related activity",
          "Implement Adaptive Protection in Microsoft Purview"
        ]
      },
      {
        theme: "Audit et investigation",
        modules: [
          "Search and investigate with Microsoft Purview Audit",
          "Search for content with Microsoft Purview eDiscovery",
          "Investigate threats by using audit features in Microsoft Defender XDR and Microsoft Purview Standard"
        ]
      },
      {
        theme: "Sécurité de l'IA",
        modules: [
          "Understand How to Secure AI Data with Microsoft Purview",
          "Secure Microsoft 365 Copilot interactions with Microsoft Purview",
          "Secure enterprise and browser-based AI apps with Microsoft Purview",
          "Secure developer AI environments with Microsoft Purview"
        ]
      },
      {
        theme: "Rétention et conformité",
        modules: [
          "Introduction to information security and compliance in Microsoft Purview",
          "Understand retention in Microsoft Purview",
          "Implement and manage Microsoft 365 retention and recovery"
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------------
     PROJETS
     ------------------------------------------------------------------------ */
  projets: [
    {
      titre: "Supervision centralisée de serveurs DHCP",
      resume: "Un serveur central qui pilote plusieurs serveurs DHCP à distance, selon un cahier des charges technique.",
      details: [
        "6 machines virtuelles configurées et administrées.",
        "Scripts Python pour ajouter, supprimer, vérifier et afficher les réservations MAC/IP.",
        "SSH sécurisé avec filtrage des commandes en Bash et droits sudoers limités."
      ],
      outils: ["Python", "dnsmasq", "YAML", "SSH", "VLAN"]
    },
    {
      titre: "Cartographie d'un réseau domestique",
      resume: "Découvrir, analyser et documenter un réseau pour en comprendre la topologie et les services.",
      details: [
        "Inventaire des hôtes, adresses IP et MAC, identification des fabricants.",
        "Analyse avec Nmap, fping et Wireshark.",
        "Rapport structuré avec résultats et recommandations."
      ],
      outils: ["Nmap", "Wireshark", "fping", "Rédaction technique"]
    },
    {
      titre: "Poste et serveur GNU/Linux d'entreprise",
      resume: "Installer une station et une VM Linux, puis y déployer des services comme en entreprise.",
      details: [
        "Configuration réseau manuelle (ip addr, ip link, ifup/ifdown).",
        "Administration à distance par SSH.",
        "Mise en place d'une stack LAMP."
      ],
      outils: ["Debian", "SSH", "LAMP", "Bash"]
    }
  ],

  contact: {
    email: "contact@benomrane-yacine.com",
    linkedin: "https://www.linkedin.com/in/benomrane-yacine/",
    disponibilite: "Je suis en alternance chez Magellan. Je reste ouvert aux échanges sur la sécurité Microsoft, la protection des données et la réponse aux incidents."
  }
};
