/*
  TEST BUILD ONLY
  - No real payment is processed.
  - The test mode is intentionally isolated in the frontend.
  - Production must replace payment simulation with server-side
    PayPal/card webhooks + Supabase RLS.
*/
const TEST_MODE = true;
const photos = [
  {id:"photo-001", title:"Photo exclusive 01", price:5.00},
  {id:"photo-002", title:"Photo exclusive 02", price:8.00},
  {id:"photo-003", title:"Photo exclusive 03", price:12.00}
];
let state = {selected:null, testAccess:false};

const app = document.querySelector("#app");
const money = n => `$${n.toFixed(2)} USD`;

function layout(content){
  app.innerHTML = `<div class="shell">
    <header class="top"><div class="brand">Sephora jolie</div><button class="btn" onclick="showProfile()">Profil</button></header>
    ${content}
  </div>${TEST_MODE?'<div class="test-badge">MODE TEST — aucun paiement réel</div>':''}`;
}

function showProfile(){
  layout(`<section class="hero"><h1>Profil / Galerie</h1><p>Environnement de démonstration sécurisé.</p></section>
  <div class="notice"><b>Accès test :</b> toutes les photos peuvent être ouvertes sans email ni paiement réel.</div>
  <section class="gallery"><div class="grid">${photos.map(p=>`
    <article class="card">
      <div class="photo"><div class="lock">🔒</div></div>
      <div class="buy"><div><div class="exclusive">Buy to see</div><div class="price">${money(p.price)}</div></div>
      <button class="btn" onclick="openPhoto('${p.id}')">Voir</button></div>
    </article>`).join("")}</div></section>`);
}

function openPhoto(id){
  state.selected = photos.find(p=>p.id===id);
  const p = state.selected;
  layout(`<section class="panel">
    <button class="btn" onclick="showProfile()">← Galerie</button>
    <div class="hero"><div class="locked"><div class="lock" style="margin:auto">🔒</div><h1>Photo exclusive</h1><p>Aucun aperçu avant autorisation.</p><div class="amount">${money(p.price)}</div></div></div>
    <div class="notice"><b>Parcours réel :</b> le paiement doit être confirmé côté serveur avant que l'accès soit accordé.</div>
    <h2>Choisir un moyen de paiement</h2>
    <div class="methods">
      <button class="method" onclick="payment('PayPal')"><span class="logo">P</span>PayPal</button>
      <button class="method" onclick="payment('Visa')"><span class="logo">VISA</span>Visa</button>
      <button class="method" onclick="payment('Mastercard')"><span class="logo">MC</span>Mastercard</button>
    </div>
  </section>`);
}

function payment(method){
  const p = state.selected;
  layout(`<section class="panel">
    <button class="btn" onclick="openPhoto('${p.id}')">← Retour</button>
    <div class="hero"><h1>${method}</h1><p>Étape de paiement — environnement de test</p><div class="amount">${money(p.price)}</div></div>
    ${method==="PayPal" ? `
      <div class="field"><label>Email PayPal (simulation facultative)</label><input placeholder="non requis en mode test"></div>
      <div class="notice">En production, ce bouton redirigera vers le checkout PayPal officiel. Aucun mot de passe PayPal ne sera demandé par Sephora jolie.</div>`
    : `<div class="field"><label>Numéro de carte (simulation)</label><input placeholder="non requis en mode test"></div>
      <div class="field"><label>Expiration / CVV (simulation)</label><input placeholder="non requis en mode test"></div>
      <div class="notice">En production, les données carte seront saisies dans le checkout sécurisé du prestataire et ne seront pas stockées par Sephora jolie.</div>`}
    <button class="btn" style="width:100%;margin-top:12px;background:#0875e8;color:white" onclick="testConfirm()">Simuler un paiement confirmé</button>
    <p class="small">Ce bouton existe uniquement pour tester le cheminement sans transaction réelle.</p>
  </section>`);
}

function testConfirm(){
  state.testAccess = true;
  const p = state.selected;
  layout(`<section class="panel">
    <div class="success"><h1>Paiement confirmé — TEST</h1><p>Simulation uniquement. Aucune somme n'a été débitée.</p><p><b>Commande :</b> TEST-${Date.now()}</p><p><b>Photo :</b> ${p.title}</p><p><b>Montant :</b> ${money(p.price)}</p></div>
    <div class="hero"><h2>Photo déverrouillée</h2><div class="locked"><div style="font-size:70px">🖼️</div><p>Contenu de démonstration accessible en mode test.</p></div></div>
    <div class="row"><button class="btn" onclick="showProfile()">Retour galerie</button><button class="btn" onclick="openPhoto('${p.id}')">Voir le parcours</button></div>
  </section>`);
}

showProfile();
