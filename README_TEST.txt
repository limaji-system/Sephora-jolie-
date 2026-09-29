SEPHORA JOLIE — BUILD DE TEST

Ce ZIP est un prototype de parcours de paiement, PAS un système de paiement réel.

MODE TEST :
- Aucun email n'est obligatoire.
- Aucun paiement réel n'est effectué.
- Aucun numéro de carte ni mot de passe PayPal n'est collecté.
- Le bouton « Simuler un paiement confirmé » donne immédiatement accès à la photo de démonstration.
- Le badge « MODE TEST — aucun paiement réel » est affiché en permanence.

PARCOURS TEST :
Galerie → Photo exclusive → PayPal/Visa/Mastercard → Simulation → Photo déverrouillée.

PRODUCTION :
1. Remplacer la simulation par un backend/serverless.
2. Créer les commandes côté serveur.
3. Créer les paiements côté serveur.
4. Utiliser PayPal Checkout/Orders API et webhooks.
5. Utiliser un prestataire carte (ex. Stripe Checkout/Payment Element) ; ne jamais stocker PAN/CVV.
6. Vérifier côté serveur le statut réel de la transaction avant de créer photo_access.
7. Protéger les fichiers originaux avec Supabase Storage privé + signed URLs.
8. Mettre en place RLS Supabase : un utilisateur ne peut lire que ses propres accès.
9. Ne jamais mettre de secret PayPal, clé privée ou service_role Supabase dans le frontend.
10. Les montants et l'identifiant de la photo doivent être validés côté serveur et non faire confiance aux valeurs du navigateur.

IMPORTANT :
Le mode test doit être supprimé ou désactivé avant toute mise en production.
