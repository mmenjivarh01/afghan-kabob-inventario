/* ============================================================
   Afghan Kabob & Grill — Sistema de Inventario
   app.js — Logica principal de la aplicacion
   Incluye: idioma, datos, inventario, render, modales, print
============================================================ */

(function() {
  "use strict";

  /* ===== TRANSLATIONS ===== */
  var T = {
    es: {
      logoSub:"Inventario", btnLang:"EN", btnPrint:"Imprimir / PDF", invLabel:"Inventario",
      invA:"Materia Prima", invB:"Producto Terminado",
      sTotal:"Productos", sLow:"Bajo stock", sOut:"Agotados",
      search:"Buscar producto...",
      thNombre:"Producto", thCat:"Categoria", thStock:"Stock",
      thMin:"Minimo", thDiff:"Diferencia", thUnit:"Unidad", thStatus:"Estado",
      modalAdd:"Agregar Producto", modalEdit:"Editar Producto",
      lNombreES:"Nombre en Espanol", lNombreEN:"Name in English",
      lCat:"Categoria", lUnit:"Unidad",
      lCantidad:"Cantidad actual", lMin:"Stock minimo",
      cancel:"Cancelar", save:"Guardar", confirm:"Confirmar",
      btnAdd:"Agregar", btnCat:"Categorias", btnUnit:"Unidades",
      adjTitle:"Ajustar Stock", adjCurrent:"Stock actual:",
      tabIn:"+ Entrada", tabOut:"- Salida", tabSet:"= Fijar",
      adjLabelIn:"Cantidad a agregar", adjLabelOut:"Cantidad a retirar", adjLabelSet:"Nueva cantidad total",
      adjPrompt:"Ingresa una cantidad", adjNegErr:"El resultado no puede ser negativo",
      delTitle:"Eliminar producto", delMsg1:"Estas seguro de eliminar",
      delMsg2:"Esta accion no se puede deshacer.", delConfirm:"Si, eliminar",
      catMgrTitle:"Gestionar Categorias", catExisting:"Categorias - clic para renombrar",
      catAdd:"Agregar categoria", catSave:"Guardar cambios",
      unitMgrTitle:"Gestionar Unidades", unitExisting:"Unidades - clic para renombrar",
      unitAdd:"Agregar unidad", unitSave:"Guardar cambios",
      allFilter:"Todos", empty:"sin resultados",
      noCats:"Sin categorias", noUnits:"Sin unidades",
      previewTitle:"Vista previa del informe", previewClose:"Cerrar",
      previewPDF:"Descargar PDF", previewPrint:"Imprimir",
      reportTitle:"Informe de Inventario",
      reportDate:"Fecha:", reportTime:"Hora:",
      reportTotal:"Total:", reportLow:"Bajo stock:", reportOut:"Agotados:",
      ppNormal:"Normal", ppLow:"Bajo stock", ppOut:"Agotado",
      ppLegend:"Normal | Bajo stock | Agotado",
      toastUpdated:"Producto actualizado", toastAdded:"Producto agregado",
      toastDeleted:"eliminado", toastCatUpdated:"Categorias actualizadas",
      toastUnitUpdated:"Unidades actualizadas",
      toastNegStock:"El stock no puede quedar negativo",
      toastInvalid:"Ingresa una cantidad valida", toastFields:"Completa todos los campos",
      toastCatExists:"Esa categoria ya existe", toastUnitExists:"Esa unidad ya existe",
      toastMinOne:"Debe haber al menos una", toastPDF:"Descargando informe...",
      gcDelCatTitle:"Eliminar Categoria", gcDelUnitTitle:"Eliminar Unidad",
      gcDelMsg1Cat:"Deseas eliminar la categoria", gcDelMsg1Unit:"Deseas eliminar la unidad",
      gcDelMsg2NoUse:"Esta accion no se puede deshacer.",
      gcDelMsg2Use:"Los productos afectados seran reasignados. Esta accion no se puede deshacer.",
      lSubcat:"Almacenamiento", allSubcats:"Todo",
      thSubcat:"Almacenamiento",
      rFilterAll:"Todos los productos", rFilterLow:"Solo bajo stock / agotados",
      rSubcatAll:"Todo el almacenamiento", rCatAll:"Todas las categorias",
      rPreviewClose:"Cerrar", rPreviewPDF:"Descargar PDF", rPreviewPrint:"Imprimir",
      guestBanner:"👁 Modo Invitado — solo lectura",
      btnLogout:"↩ Cerrar sesión", btnChangePassLabel:"🔑 Cambiar contraseña",
      btnAdminPanelLabel:"⚙️ Panel de Admin",
      histTitle:"🕐 Historial de cambios", histSubtitle:"Últimos 200 registros",
      histFilterAll:"Todos", histFilterStock:"📦 Stock", histFilterEdit:"✏️ Ediciones"
    },
    en: {
      logoSub:"Inventory", btnLang:"ES", btnPrint:"Print / PDF", invLabel:"Inventory",
      invA:"Raw Materials", invB:"Finished Goods",
      sTotal:"Products", sLow:"Low stock", sOut:"Out of stock",
      search:"Search product...",
      thNombre:"Product", thCat:"Category", thStock:"Stock",
      thMin:"Minimum", thDiff:"Difference", thUnit:"Unit", thStatus:"Status",
      modalAdd:"Add Product", modalEdit:"Edit Product",
      lNombreES:"Nombre en Espanol", lNombreEN:"Name in English",
      lCat:"Category", lUnit:"Unit",
      lCantidad:"Current quantity", lMin:"Minimum stock",
      cancel:"Cancel", save:"Save", confirm:"Confirm",
      btnAdd:"Add", btnCat:"Categories", btnUnit:"Units",
      adjTitle:"Adjust Stock", adjCurrent:"Current stock:",
      tabIn:"+ In", tabOut:"- Out", tabSet:"= Set",
      adjLabelIn:"Quantity to add", adjLabelOut:"Quantity to remove", adjLabelSet:"New total quantity",
      adjPrompt:"Enter a quantity", adjNegErr:"Result cannot be negative",
      delTitle:"Delete product", delMsg1:"Are you sure you want to delete",
      delMsg2:"This action cannot be undone.", delConfirm:"Yes, delete",
      catMgrTitle:"Manage Categories", catExisting:"Categories - click to rename",
      catAdd:"Add category", catSave:"Save changes",
      unitMgrTitle:"Manage Units", unitExisting:"Units - click to rename",
      unitAdd:"Add unit", unitSave:"Save changes",
      allFilter:"All", empty:"no results",
      noCats:"No categories", noUnits:"No units",
      previewTitle:"Report preview", previewClose:"Close",
      previewPDF:"Download PDF", previewPrint:"Print",
      reportTitle:"Inventory Report",
      reportDate:"Date:", reportTime:"Time:",
      reportTotal:"Total:", reportLow:"Low stock:", reportOut:"Out of stock:",
      ppNormal:"Normal", ppLow:"Low stock", ppOut:"Out of stock",
      ppLegend:"Normal | Low stock | Out of stock",
      toastUpdated:"Product updated", toastAdded:"Product added",
      toastDeleted:"deleted", toastCatUpdated:"Categories updated",
      toastUnitUpdated:"Units updated",
      toastNegStock:"Stock cannot go negative",
      toastInvalid:"Enter a valid quantity", toastFields:"Fill in all fields",
      toastCatExists:"That category already exists", toastUnitExists:"That unit already exists",
      toastMinOne:"At least one required", toastPDF:"Downloading report...",
      gcDelCatTitle:"Delete Category", gcDelUnitTitle:"Delete Unit",
      gcDelMsg1Cat:"Delete the category", gcDelMsg1Unit:"Delete the unit",
      gcDelMsg2NoUse:"This action cannot be undone.",
      gcDelMsg2Use:"Affected products will be reassigned. This action cannot be undone.",
      lSubcat:"Storage type", allSubcats:"All",
      thSubcat:"Storage",
      rFilterAll:"All products", rFilterLow:"Low stock & out of stock only",
      rSubcatAll:"All storage types", rCatAll:"All categories",
      rPreviewClose:"Close", rPreviewPDF:"Download PDF", rPreviewPrint:"Print",
      guestBanner:"👁 Guest mode — read only",
      btnLogout:"↩ Sign out", btnChangePassLabel:"🔑 Change password",
      btnAdminPanelLabel:"⚙️ Admin panel",
      histTitle:"🕐 Change history", histSubtitle:"Last 200 records",
      histFilterAll:"All", histFilterStock:"📦 Stock", histFilterEdit:"✏️ Edits"
    }
  };

  var lang = localStorage.getItem("inv_lang") || "es";
  function tr(k) { return (T[lang] && T[lang][k]) ? T[lang][k] : k; }

  /* ===== SUBCATEGORÍAS FIJAS (Nivel 2) ===== */
  var SUBCATS = [
    { id: "congelados",  iconES: "🧊", labelES: "Congelados",          labelEN: "Frozen" },
    { id: "refrigerados",iconES: "❄️", labelES: "Refrigerados",        labelEN: "Refrigerated" },
    { id: "secos",       iconES: "🌾", labelES: "Secos",               labelEN: "Dry Goods" },
    { id: "limpieza",    iconES: "🧹", labelES: "Productos de Limpieza",labelEN: "Cleaning Products" }
  ];
  function subcatIcon(id) {
    var s = SUBCATS.find(function(x){ return x.id === id; });
    return s ? s.iconES : "";
  }
  function subcatLabel(id) {
    var s = SUBCATS.find(function(x){ return x.id === id; });
    if (!s) { return id; }
    return lang === "es" ? s.labelES : s.labelEN;
  }

  /* ===== AUTH CONFIG ===== */
  var ADMIN_EMAIL   = "mmenjivar29@gmail.com";
  var DOMAIN        = "imenjivar.com";
  var currentUser   = null;
  var isGuest       = false;
  var authReady     = false;

  /* ===== CORE STATE — declared early so AUTH module can reference them ===== */
  var activeInv     = localStorage.getItem("inv_active") || "a";
  var db            = null;
  var state         = { a: null, b: null };
  var filterSubcat  = "todos", filterCats = [], filterStatus = "todos";
  var sortField     = null, sortAsc = true;
  var adjId         = null, adjMode = "entrada", pendingDel = null;

  /* ===== AUDIT LOG ===== */
  function logAudit(action, details) {
    if (!db || isGuest) { return; }
    var who = currentUser ? currentUser.username : "Sistema";
    var entry = {
      accion:    action,
      detalles:  details,
      usuario:   who,
      uid:       currentUser ? currentUser.uid : null,
      inv:       activeInv === "a" ? "Materia Prima" : "Producto Terminado",
      ts:        Date.now()
    };
    db.ref("historial").push(entry).catch(function(e) {
      console.error("[Audit] Error guardando:", e);
    });
  }

  /* Datos predeterminados en ESPAÑOL */
  var DEFAULTS_ES = {
    a: {
      productos: [
        {id:1,nombre:"Pechuga de pollo",  subcategoria:"congelados",  categoria:"Carnes",         cantidad:8, minimo:5, unidad:"kg"},
        {id:2,nombre:"Res molida",         subcategoria:"congelados",  categoria:"Carnes",         cantidad:3, minimo:4, unidad:"kg"},
        {id:3,nombre:"Jitomate",           subcategoria:"refrigerados",categoria:"Verduras",       cantidad:12,minimo:6, unidad:"kg"},
        {id:4,nombre:"Cebolla blanca",     subcategoria:"refrigerados",categoria:"Verduras",       cantidad:5, minimo:3, unidad:"kg"},
        {id:5,nombre:"Queso manchego",     subcategoria:"refrigerados",categoria:"Lacteos",        cantidad:2, minimo:3, unidad:"kg"},
        {id:6,nombre:"Leche entera",       subcategoria:"refrigerados",categoria:"Lacteos",        cantidad:0, minimo:6, unidad:"L"},
        {id:7,nombre:"Arroz blanco",       subcategoria:"secos",       categoria:"Granos",         cantidad:15,minimo:10,unidad:"kg"},
        {id:8,nombre:"Frijol negro",       subcategoria:"secos",       categoria:"Granos",         cantidad:7, minimo:5, unidad:"kg"},
        {id:9,nombre:"Aceite vegetal",     subcategoria:"secos",       categoria:"Otros",          cantidad:4, minimo:3, unidad:"L"}
      ],
      categorias:["Carnes","Verduras","Lacteos","Bebidas","Granos","Otros"],
      unidades:  ["kg","g","L","ml","piezas","cajas","bolsas"]
    },
    b: {
      productos: [
        {id:1,nombre:"Caldo de pollo",    subcategoria:"refrigerados",categoria:"Sopas",          cantidad:20,minimo:10,unidad:"L"},
        {id:2,nombre:"Salsa roja",         subcategoria:"refrigerados",categoria:"Salsas",         cantidad:5, minimo:8, unidad:"L"},
        {id:3,nombre:"Pan de mesa",        subcategoria:"secos",       categoria:"Panaderia",      cantidad:0, minimo:12,unidad:"piezas"},
        {id:4,nombre:"Tortillas maiz",     subcategoria:"secos",       categoria:"Panaderia",      cantidad:50,minimo:30,unidad:"piezas"},
        {id:5,nombre:"Agua embotellada",   subcategoria:"secos",       categoria:"Bebidas",        cantidad:48,minimo:24,unidad:"piezas"}
      ],
      categorias:["Sopas","Salsas","Panaderia","Bebidas","Platos fuertes","Postres"],
      unidades:  ["piezas","L","kg","porciones","cajas","bolsas"]
    }
  };

  /* Datos predeterminados en INGLES */
  var DEFAULTS_EN = {
    a: {
      productos: [
        {id:1,nombre:"Chicken breast",    subcategoria:"congelados",  categoria:"Meats",          cantidad:8, minimo:5, unidad:"kg"},
        {id:2,nombre:"Ground beef",        subcategoria:"congelados",  categoria:"Meats",          cantidad:3, minimo:4, unidad:"kg"},
        {id:3,nombre:"Tomato",             subcategoria:"refrigerados",categoria:"Vegetables",     cantidad:12,minimo:6, unidad:"kg"},
        {id:4,nombre:"White onion",        subcategoria:"refrigerados",categoria:"Vegetables",     cantidad:5, minimo:3, unidad:"kg"},
        {id:5,nombre:"Manchego cheese",    subcategoria:"refrigerados",categoria:"Dairy",          cantidad:2, minimo:3, unidad:"kg"},
        {id:6,nombre:"Whole milk",         subcategoria:"refrigerados",categoria:"Dairy",          cantidad:0, minimo:6, unidad:"L"},
        {id:7,nombre:"White rice",         subcategoria:"secos",       categoria:"Grains",         cantidad:15,minimo:10,unidad:"kg"},
        {id:8,nombre:"Black beans",        subcategoria:"secos",       categoria:"Grains",         cantidad:7, minimo:5, unidad:"kg"},
        {id:9,nombre:"Vegetable oil",      subcategoria:"secos",       categoria:"Other",          cantidad:4, minimo:3, unidad:"L"}
      ],
      categorias:["Meats","Vegetables","Dairy","Beverages","Grains","Other"],
      unidades:  ["kg","g","L","ml","pieces","boxes","bags"]
    },
    b: {
      productos: [
        {id:1,nombre:"Chicken broth",     subcategoria:"refrigerados",categoria:"Soups",          cantidad:20,minimo:10,unidad:"L"},
        {id:2,nombre:"Red sauce",          subcategoria:"refrigerados",categoria:"Sauces",         cantidad:5, minimo:8, unidad:"L"},
        {id:3,nombre:"Table bread",        subcategoria:"secos",       categoria:"Bakery",         cantidad:0, minimo:12,unidad:"pieces"},
        {id:4,nombre:"Corn tortillas",     subcategoria:"secos",       categoria:"Bakery",         cantidad:50,minimo:30,unidad:"pieces"},
        {id:5,nombre:"Bottled water",      categoria:"Beverages",      cantidad:48,minimo:24,unidad:"pieces"}
      ],
      categorias:["Soups","Sauces","Bakery","Beverages","Main dishes","Desserts"],
      unidades:  ["pieces","L","kg","portions","boxes","bags"]
    }
  };

  /* Devuelve los defaults del idioma activo */
  function DEFAULTS(inv) {
    return lang === "en" ? DEFAULTS_EN[inv] : DEFAULTS_ES[inv];
  }

  /*
    Mapa de traduccion entre nombres predeterminados ES <-> EN.
    Solo se usan para identificar si un item es predeterminado
    y traducirlo automaticamente al cambiar idioma.
  */
  var TRANSLATE_A = {
    productos: {
      "Pechuga de pollo":"Chicken breast",   "Chicken breast":"Pechuga de pollo",
      "Res molida":"Ground beef",             "Ground beef":"Res molida",
      "Jitomate":"Tomato",                    "Tomato":"Jitomate",
      "Cebolla blanca":"White onion",         "White onion":"Cebolla blanca",
      "Queso manchego":"Manchego cheese",     "Manchego cheese":"Queso manchego",
      "Leche entera":"Whole milk",            "Whole milk":"Leche entera",
      "Arroz blanco":"White rice",            "White rice":"Arroz blanco",
      "Frijol negro":"Black beans",           "Black beans":"Frijol negro",
      "Aceite vegetal":"Vegetable oil",       "Vegetable oil":"Aceite vegetal"
    },
    categorias: {
      "Carnes":"Meats",       "Meats":"Carnes",
      "Verduras":"Vegetables","Vegetables":"Verduras",
      "Lacteos":"Dairy",      "Dairy":"Lacteos",
      "Bebidas":"Beverages",  "Beverages":"Bebidas",
      "Granos":"Grains",      "Grains":"Granos",
      "Otros":"Other",        "Other":"Otros"
    },
    unidades: {
      "piezas":"pieces","pieces":"piezas",
      "cajas":"boxes",  "boxes":"cajas",
      "bolsas":"bags",  "bags":"bolsas"
    }
  };

  var TRANSLATE_B = {
    productos: {
      "Caldo de pollo":"Chicken broth",  "Chicken broth":"Caldo de pollo",
      "Salsa roja":"Red sauce",           "Red sauce":"Salsa roja",
      "Pan de mesa":"Table bread",        "Table bread":"Pan de mesa",
      "Tortillas maiz":"Corn tortillas",  "Corn tortillas":"Tortillas maiz",
      "Agua embotellada":"Bottled water", "Bottled water":"Agua embotellada"
    },
    categorias: {
      "Sopas":"Soups",              "Soups":"Sopas",
      "Salsas":"Sauces",            "Sauces":"Salsas",
      "Panaderia":"Bakery",         "Bakery":"Panaderia",
      "Bebidas":"Beverages",        "Beverages":"Bebidas",
      "Platos fuertes":"Main dishes","Main dishes":"Platos fuertes",
      "Postres":"Desserts",         "Desserts":"Postres"
    },
    unidades: {
      "piezas":"pieces","pieces":"piezas",
      "porciones":"portions","portions":"porciones",
      "cajas":"boxes",  "boxes":"cajas",
      "bolsas":"bags",  "bags":"bolsas"
    }
  };

  /* Traduce los datos predeterminados al cambiar idioma */
  function translateDefaultData() {
    ["a","b"].forEach(function(inv) {
      var map = inv === "a" ? TRANSLATE_A : TRANSLATE_B;

      state[inv].productos.forEach(function(p) {
        /* If product has bilingual fields, switch the displayed name */
        if (p.nombreES && p.nombreEN) {
          p.nombre = lang==="es" ? p.nombreES : p.nombreEN;
        } else if (map.productos[p.nombre]) {
          /* Default product without bilingual fields — translate via map */
          var tradNombre = map.productos[p.nombre];
          if (lang==="es") {
            p.nombreEN = p.nombre;
            p.nombreES = tradNombre;
          } else {
            p.nombreES = p.nombre;
            p.nombreEN = tradNombre;
          }
          p.nombre = tradNombre;
        }

        /* Translate category */
        if (map.categorias[p.categoria]) {
          p.categoria = map.categorias[p.categoria];
        }

        /* Translate unit */
        if (map.unidades[p.unidad]) {
          p.unidad = map.unidades[p.unidad];
        }
      });

      /* Translate category list */
      state[inv].categorias = state[inv].categorias.map(function(c) {
        return map.categorias[c] || c;
      });

      /* Translate unit list */
      state[inv].unidades = state[inv].unidades.map(function(u) {
        return map.unidades[u] || u;
      });

      saveState(inv);
    });

    /* Reset category filter if no longer exists */
    filterCats = filterCats.filter(function(c){ return cs().indexOf(c) >= 0; });
  }

  /* ===== AUTH MODULE ===== */

  var auth = firebase.auth();

  /* Helper: username -> email */
  function toEmail(username) {
    var u = username.trim().toLowerCase().replace(/\s+/g, "");
    /* Admin uses their real Gmail */
    if (u === "admin") { return ADMIN_EMAIL; }
    return u + "@" + DOMAIN;
  }

  /* Show/hide login screen */
  function showLogin() {
    var lo = document.getElementById("loadingOverlay");
    if (lo) { lo.classList.add("hidden"); setTimeout(function(){ lo.style.display="none"; }, 400); }
    var ls = document.getElementById("loginScreen");
    if (ls) { ls.style.display = ""; }
    var app = document.getElementById("appHeader");
    if (app) { app.classList.add("hidden-initially"); app.style.display = "none"; }
    var nav = document.querySelector(".inv-switcher");
    if (nav) { nav.classList.add("hidden-initially"); nav.style.display = "none"; }
    var main = document.querySelector("main.container");
    if (main) { main.classList.add("hidden-initially"); main.style.display = "none"; }
    var gb = document.getElementById("guestBanner");
    if (gb) { gb.style.display = "none"; }
    /* Apply login labels in English */
    var lUser = document.querySelector("label[for='loginUser']");
    var lPass = document.querySelector("label[for='loginPass']");
    var lRemember = document.querySelector("label[for='rememberUser']");
    var btnLogin = document.getElementById("btnLogin");
    var btnGuest = document.getElementById("btnGuest");
    if (lUser)    { lUser.textContent = "Username"; }
    if (lPass)    { lPass.textContent = "Password"; }
    if (lRemember){ lRemember.textContent = "Remember me"; }
    if (btnLogin) { btnLogin.textContent = "Sign In"; }
    if (btnGuest) { btnGuest.innerHTML = "👁 Enter as Guest"; }
    var loginUser = document.getElementById("loginUser");
    var loginPass = document.getElementById("loginPass");
    if (loginUser) { loginUser.placeholder = "E.g.: Admin"; }
    if (loginPass) { loginPass.placeholder = "••••••••"; }
    prefillLoginUser();
  }

  function hideLogin() {
    var ls = document.getElementById("loginScreen");
    if (ls) { ls.style.display = "none"; }
    var app = document.getElementById("appHeader");
    if (app) { app.classList.remove("hidden-initially"); app.style.display = ""; }
    var nav = document.querySelector(".inv-switcher");
    if (nav) { nav.classList.remove("hidden-initially"); nav.style.display = ""; }
    var main = document.querySelector("main.container");
    if (main) { main.classList.remove("hidden-initially"); main.style.display = ""; }
  }

  /* Apply guest/user/admin mode to UI */
  function applyUserMode() {
    var body = document.body;
    body.classList.remove("guest-mode");
    if (isGuest) {
      body.classList.add("guest-mode");
    }
    /* Header user label */
    var hu = document.getElementById("headerUser");
    if (hu) {
      hu.textContent = isGuest ? "👁 Invitado" : (currentUser ? currentUser.username : "");
    }
    /* User menu button */
    var um = document.getElementById("btnUserMenu");
    if (um) { um.style.display = ""; }
    var hun = document.getElementById("headerUserName");
    if (hun) { hun.textContent = isGuest ? "Invitado" : (currentUser ? currentUser.username : ""); }
    /* Hide the separate headerUser span — now shown inside button */
    var hu = document.getElementById("headerUser");
    if (hu) { hu.style.display = "none"; }
    /* Historial button — visible to all logged-in users (not guest) */
    var hb = document.getElementById("btnHistorial");
    if (hb) { hb.style.display = isGuest ? "none" : ""; }
    /* Admin panel button in dropdown */
    var ap = document.getElementById("btnAdminPanel");
    if (ap) {
      if (currentUser && currentUser.role === "admin") {
        ap.classList.remove("hidden-initially");
        ap.style.display = "";
      } else {
        ap.style.display = "none";
      }
    }
    /* Change password button — hide for guest */
    var cp = document.getElementById("btnChangePass");
    if (cp) { cp.style.display = isGuest ? "none" : ""; }
    /* Dropdown name/role */
    var dn = document.getElementById("dropdownUserName");
    var dr = document.getElementById("dropdownUserRole");
    if (dn) { dn.textContent = isGuest ? "Invitado" : (currentUser ? currentUser.username : ""); }
    if (dr) { dr.textContent = isGuest ? "Solo lectura" : (currentUser ? currentUser.role : ""); }
  }

  /* ===== RECORDAR USUARIO ===== */
  function saveRememberedUser(username) {
    try { localStorage.setItem("inv_remembered_user", username); } catch(e) {}
  }
  function loadRememberedUser() {
    try { return localStorage.getItem("inv_remembered_user") || ""; } catch(e) { return ""; }
  }
  function clearRememberedUser() {
    try { localStorage.removeItem("inv_remembered_user"); } catch(e) {}
  }

  /* Pre-fill username on login screen */
  function prefillLoginUser() {
    var remembered = loadRememberedUser();
    var userEl = document.getElementById("loginUser");
    var rememberEl = document.getElementById("rememberUser");
    if (remembered && userEl) {
      userEl.value = remembered;
      if (rememberEl) { rememberEl.checked = true; }
      /* Focus password directly */
      setTimeout(function() {
        var passEl = document.getElementById("loginPass");
        if (passEl) { passEl.focus(); }
      }, 100);
    }
  }

  /* Login with username + password */
  function doLogin() {
    var username  = document.getElementById("loginUser").value.trim();
    var password  = document.getElementById("loginPass").value;
    var remember  = document.getElementById("rememberUser");
    var errEl     = document.getElementById("loginError");
    var btnLogin  = document.getElementById("btnLogin");
    if (!username) { errEl.textContent = "Ingresa tu usuario"; return; }
    if (!password) { errEl.textContent = "Ingresa tu contraseña"; return; }
    errEl.textContent = "";
    btnLogin.disabled = true;
    btnLogin.textContent = "Ingresando...";

    /* Save or clear remembered user */
    if (remember && remember.checked) {
      saveRememberedUser(username);
    } else {
      clearRememberedUser();
    }

    var email = toEmail(username);
    auth.signInWithEmailAndPassword(email, password)
      .then(function(cred) {
        return loadUserProfile(cred.user.uid, username, email);
      })
      .catch(function(err) {
        btnLogin.disabled = false;
        btnLogin.textContent = "Ingresar";
        if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
          errEl.textContent = "Usuario o contraseña incorrectos";
        } else {
          errEl.textContent = "Error al ingresar. Intenta de nuevo.";
        }
      });
  }

  /* Load or create user profile in DB */
  function loadUserProfile(uid, username, email) {
    return db.ref("usuarios/" + uid).once("value").then(function(snap) {
      var profile = snap.val();
      if (!profile) {
        /* First login — create profile */
        var role = email === ADMIN_EMAIL ? "admin" : "usuario";
        var uname = email === ADMIN_EMAIL ? "Admin" : username;
        profile = { username: uname, email: email, role: role, activo: true };
        db.ref("usuarios/" + uid).set(profile);
      }
      currentUser = { uid: uid, username: profile.username, email: profile.email, role: profile.role };
      isGuest = false;
      onLoginSuccess();
    });
  }

  /* Guest login */
  function doGuestLogin() {
    isGuest = true;
    currentUser = null;
    onLoginSuccess();
  }

  /* After successful login */
  function onLoginSuccess() {
    hideLogin();
    applyUserMode();
    applyLang(); /* Apply correct language immediately */
    if (!isGuest) { resetInactivityTimer(); }
    if (!authReady) {
      authReady = true;
      listenFirebase();
    } else {
      render();
    }
  }

  /* Logout */
  function doLogout() {
    stopInactivityTimer();
    closeUserDropdown();
    if (isGuest) {
      isGuest = false;
      currentUser = null;
      showLogin();
      prefillLoginUser();
      return;
    }
    auth.signOut().then(function() {
      currentUser = null;
      isGuest = false;
      showLogin();
      prefillLoginUser();
    });
  }

  /* ===== AUTO-LOGOUT POR INACTIVIDAD ===== */
  var INACTIVITY_MS      = 15 * 60 * 1000; /* 15 minutos */
  var WARN_BEFORE_MS     = 60 * 1000;       /* Aviso 1 minuto antes */
  var inactivityTimer    = null;
  var inactivityWarnTimer = null;
  var inactivityWarnEl   = null;

  function resetInactivityTimer() {
    if (isGuest || !currentUser) { return; }
    clearTimeout(inactivityTimer);
    clearTimeout(inactivityWarnTimer);
    hideInactivityWarning();

    /* Warning 1 minute before logout */
    inactivityWarnTimer = setTimeout(function() {
      showInactivityWarning();
    }, INACTIVITY_MS - WARN_BEFORE_MS);

    /* Auto logout */
    inactivityTimer = setTimeout(function() {
      hideInactivityWarning();
      doLogout();
      toast("Sesión cerrada por inactividad");
    }, INACTIVITY_MS);
  }

  function stopInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearTimeout(inactivityWarnTimer);
    hideInactivityWarning();
  }

  function showInactivityWarning() {
    var el = document.getElementById("inactivityWarning");
    if (el) { el.style.display = "flex"; }
    /* Countdown */
    var secs = Math.round(WARN_BEFORE_MS / 1000);
    var countEl = document.getElementById("inactivityCountdown");
    if (countEl) { countEl.textContent = secs; }
    var countDown = setInterval(function() {
      secs--;
      if (countEl) { countEl.textContent = secs; }
      if (secs <= 0) { clearInterval(countDown); }
    }, 1000);
  }

  function hideInactivityWarning() {
    var el = document.getElementById("inactivityWarning");
    if (el) { el.style.display = "none"; }
  }

  /* Listen for user activity */
  var activityEvents = ["click","touchstart","keydown","scroll","mousemove"];
  activityEvents.forEach(function(evt) {
    document.addEventListener(evt, function() {
      if (currentUser && !isGuest) { resetInactivityTimer(); }
    }, { passive: true });
  });

  /* ===== USER DROPDOWN ===== */
  var dropdownOpen = false;
  function toggleUserDropdown() {
    var dd = document.getElementById("userDropdown");
    dropdownOpen = !dropdownOpen;
    if (dropdownOpen) {
      dd.classList.remove("hidden-initially");
      dd.style.display = "";
    } else {
      dd.style.display = "none";
    }
  }
  function closeUserDropdown() {
    var dd = document.getElementById("userDropdown");
    if (dd) { dd.style.display = "none"; }
    dropdownOpen = false;
  }
  document.addEventListener("click", function(e) {
    if (!e.target.closest("#userDropdown") && !e.target.closest("#btnUserMenu")) {
      closeUserDropdown();
    }
  });

  /* ===== CHANGE PASSWORD ===== */
  function openChpass() {
    closeUserDropdown();
    document.getElementById("chpassCurrent").value = "";
    document.getElementById("chpassNew").value = "";
    document.getElementById("chpassConfirm").value = "";
    document.getElementById("chpassError").textContent = "";
    document.getElementById("chpassOverlay").classList.add("open");
  }
  function closeChpass() { document.getElementById("chpassOverlay").classList.remove("open"); }

  function saveChpass() {
    var cur  = document.getElementById("chpassCurrent").value;
    var nw   = document.getElementById("chpassNew").value;
    var conf = document.getElementById("chpassConfirm").value;
    var errEl = document.getElementById("chpassError");
    if (!cur || !nw || !conf) { errEl.textContent = "Completa todos los campos"; return; }
    if (nw.length < 6) { errEl.textContent = "La nueva contraseña debe tener al menos 6 caracteres"; return; }
    if (nw !== conf) { errEl.textContent = "Las contraseñas no coinciden"; return; }
    errEl.textContent = "";
    var user = auth.currentUser;
    /* Re-authenticate first */
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, cur);
    user.reauthenticateWithCredential(cred)
      .then(function() { return user.updatePassword(nw); })
      .then(function() { closeChpass(); toast("Contraseña actualizada"); })
      .catch(function(err) {
        if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
          errEl.textContent = "La contraseña actual es incorrecta";
        } else {
          errEl.textContent = "Error al cambiar contraseña";
        }
      });
  }

  /* ===== ADMIN PANEL ===== */
  function openAdminPanel() {
    closeUserDropdown();
    showAdminTab("usuarios");
    loadAdminUserList();
    document.getElementById("adminOverlay").classList.add("open");
  }
  function closeAdminPanel() { document.getElementById("adminOverlay").classList.remove("open"); }

  function showAdminTab(tab) {
    document.querySelectorAll(".admin-tab").forEach(function(t) {
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    document.getElementById("adminPanelUsers").style.display = tab === "usuarios" ? "" : "none";
    var panelNew = document.getElementById("adminPanelNew");
    if (tab === "nuevo") { panelNew.classList.remove("hidden-initially"); panelNew.style.display = ""; }
    else { panelNew.classList.add("hidden-initially"); panelNew.style.display = "none"; }
    if (tab === "nuevo") {
      document.getElementById("newUsername").value = "";
      document.getElementById("newUserPass").value = "";
      document.getElementById("newUserError").textContent = "";
    }
  }

  function loadAdminUserList() {
    var list = document.getElementById("adminUserList");
    list.innerHTML = "<div style='text-align:center;padding:1rem;color:var(--muted);font-family:DM Mono,monospace;font-size:0.8rem'>Cargando...</div>";
    db.ref("usuarios").once("value").then(function(snap) {
      var users = snap.val() || {};
      var h = "";
      /* Guest entry */
      h += "<div class='admin-user-item'>";
      h += "<div class='admin-user-avatar guest'>G</div>";
      h += "<div class='admin-user-info'><div class='admin-user-name'>Invitado</div><div class='admin-user-email'>Sin contraseña — solo lectura</div></div>";
      h += "<span class='admin-user-role role-invitado'>Invitado</span>";
      h += "</div>";

      Object.keys(users).forEach(function(uid) {
        var u = users[uid];
        var initial   = (u.username || "?")[0].toUpperCase();
        var isAdmin   = u.role === "admin";
        var isSelf    = uid === (currentUser && currentUser.uid);
        var roleClass = isAdmin ? "role-admin" : "role-usuario";
        var roleLabel = isAdmin ? "admin" : "usuario";

        h += "<div class='admin-user-item'>";
        h += "<div class='admin-user-avatar'>" + initial + "</div>";
        h += "<div class='admin-user-info'>";
        h += "<div class='admin-user-name'>" + escapeHTML(u.username || "") + "</div>";
        h += "<div class='admin-user-email'>" + escapeHTML(u.email || "") + "</div>";
        h += "</div>";
        h += "<span class='admin-user-role " + roleClass + "'>" + roleLabel + "</span>";
        h += "<div class='admin-user-actions'>";
        if (!isSelf) {
          /* Role toggle button */
          var newRole  = isAdmin ? "usuario" : "admin";
          var roleIcon = isAdmin ? "⬇️" : "⬆️";
          var roleTitle = isAdmin ? "Cambiar a Usuario" : "Cambiar a Admin";
          h += "<button class='admin-action-btn' title='" + roleTitle + "' data-uid='" + uid + "' data-role='" + newRole + "' data-action='role'>" + roleIcon + "</button>";
          /* Reset password button */
          h += "<button class='admin-action-btn' title='Resetear contraseña' data-uid='" + uid + "' data-action='reset'>🔑</button>";
        }
        h += "</div></div>";
      });

      list.innerHTML = h || "<div style='text-align:center;padding:1rem;color:var(--muted)'>Sin usuarios</div>";

      list.querySelectorAll("[data-action='reset']").forEach(function(btn) {
        btn.addEventListener("click", function() { adminResetPassword(btn.dataset.uid); });
      });
      list.querySelectorAll("[data-action='role']").forEach(function(btn) {
        btn.addEventListener("click", function() { adminChangeRole(btn.dataset.uid, btn.dataset.role); });
      });
    });
  }

  function adminChangeRole(uid, newRole) {
    db.ref("usuarios/" + uid).once("value").then(function(snap) {
      var u = snap.val();
      if (!u) { toast("Usuario no encontrado"); return; }
      var label = newRole === "admin" ? "Admin" : "Usuario";
      openGC({
        icon: "👤",
        title: "Cambiar rol",
        msg1: "¿Cambiar el rol de",
        name: u.username,
        msg2: "a " + label + "? Aplica en el próximo login.",
        confirmLabel: "Cambiar",
        onConfirm: function() {
          db.ref("usuarios/" + uid + "/role").set(newRole).then(function() {
            toast(u.username + " ahora es " + label);
            loadAdminUserList();
          }).catch(function() {
            toast("Error al cambiar el rol");
          });
        }
      });
    });
  }

  function adminResetPassword(uid) {
    db.ref("usuarios/" + uid).once("value").then(function(snap) {
      var u = snap.val();
      if (!u) { toast("Usuario no encontrado"); return; }
      var newPass = prompt("Nueva contraseña para " + u.username + "\n(mínimo 6 caracteres):");
      if (newPass === null) { return; } /* cancelled */
      if (!newPass || newPass.length < 6) { toast("Contraseña inválida — mínimo 6 caracteres"); return; }
      db.ref("pendingReset/" + uid).set({ newPass: newPass, by: currentUser.uid, at: Date.now() })
        .then(function() { toast("✓ Contraseña reseteada — aplicará en el próximo login de " + u.username); });
    });
  }

  function createUser() {
    var username = document.getElementById("newUsername").value.trim();
    var role     = document.getElementById("newUserRole").value;
    var pass     = document.getElementById("newUserPass").value;
    var errEl    = document.getElementById("newUserError");
    if (!username) { errEl.textContent = "Ingresa un nombre de usuario"; return; }
    if (pass.length < 6) { errEl.textContent = "La contraseña debe tener al menos 6 caracteres"; return; }
    var email = toEmail(username);
    errEl.textContent = "";
    document.getElementById("btnCreateUser").disabled = true;

    /* Create in Firebase Auth, then save profile */
    /* We use a secondary app instance to avoid logging out the current admin */
    var secondaryApp;
    try {
      secondaryApp = firebase.app("secondary");
    } catch(e) {
      secondaryApp = firebase.initializeApp(firebase.app().options, "secondary");
    }
    var secondaryAuth = secondaryApp.auth();
    secondaryAuth.createUserWithEmailAndPassword(email, pass)
      .then(function(cred) {
        var uid = cred.user.uid;
        var displayName = username.charAt(0).toUpperCase() + username.slice(1);
        return db.ref("usuarios/" + uid).set({
          username: displayName, email: email, role: role, activo: true
        }).then(function() {
          return secondaryAuth.signOut();
        });
      })
      .then(function() {
        document.getElementById("btnCreateUser").disabled = false;
        toast("Usuario creado: " + username + "@imenjivar.com");
        showAdminTab("usuarios");
        loadAdminUserList();
      })
      .catch(function(err) {
        document.getElementById("btnCreateUser").disabled = false;
        if (err.code === "auth/email-already-in-use") {
          errEl.textContent = "Ese usuario ya existe";
        } else {
          errEl.textContent = "Error: " + err.message;
        }
      });
  }

  /* ===== WIRE AUTH EVENTS ===== */
  /* Login screen */
  var loginUserEl  = document.getElementById("loginUser");
  var loginPassEl  = document.getElementById("loginPass");
  var btnLoginEl   = document.getElementById("btnLogin");
  var btnGuestEl   = document.getElementById("btnGuest");
  var btnShowPass  = document.getElementById("btnShowPass");

  if (btnLoginEl)  { btnLoginEl.addEventListener("click", doLogin); }
  if (btnGuestEl)  { btnGuestEl.addEventListener("click", doGuestLogin); }
  if (loginPassEl) { loginPassEl.addEventListener("keydown", function(e){ if(e.key==="Enter"){ doLogin(); } }); }
  if (loginUserEl) { loginUserEl.addEventListener("keydown", function(e){ if(e.key==="Enter"){ document.getElementById("loginPass").focus(); } }); }
  if (btnShowPass) {
    btnShowPass.addEventListener("click", function() {
      var inp = document.getElementById("loginPass");
      inp.type = inp.type === "password" ? "text" : "password";
      btnShowPass.textContent = inp.type === "password" ? "👁" : "🙈";
    });
  }

  /* Header user menu */
  var btnUserMenu = document.getElementById("btnUserMenu");
  if (btnUserMenu) { btnUserMenu.addEventListener("click", toggleUserDropdown); }
  var btnLogout = document.getElementById("btnLogout");
  if (btnLogout) { btnLogout.addEventListener("click", doLogout); }
  var btnChangePass = document.getElementById("btnChangePass");
  if (btnChangePass) { btnChangePass.addEventListener("click", openChpass); }
  var btnAdminPanel = document.getElementById("btnAdminPanel");
  if (btnAdminPanel) { btnAdminPanel.addEventListener("click", openAdminPanel); }

  /* ===== FIREBASE AUTH STATE OBSERVER ===== */
  /* Show login screen while waiting */
  showLogin();

  /* Safety timeout — if auth takes too long on iOS PWA, show login anyway */
  var authTimeout = setTimeout(function() {
    if (!authReady && !isGuest) {
      console.warn("[Inventario] Auth timeout — mostrando login");
      showLogin();
    }
  }, 8000);

  auth.onAuthStateChanged(function(user) {
    clearTimeout(authTimeout);
    if (user) {
      /* Check for pending password reset */
      if (db) {
        db.ref("pendingReset/" + user.uid).once("value").then(function(snap) {
          var reset = snap.val();
          if (reset && reset.newPass) {
            return user.updatePassword(reset.newPass).then(function() {
              return db.ref("pendingReset/" + user.uid).remove();
            });
          }
        }).catch(function(){});
      }
      loadUserProfile(user.uid, user.displayName || user.email.split("@")[0], user.email)
        .catch(function() {
          currentUser = { uid: user.uid, username: user.email.split("@")[0], email: user.email, role: "usuario" };
          isGuest = false;
          onLoginSuccess();
        });
    } else {
      if (!isGuest) { showLogin(); }
    }
  });

  /* ===== END AUTH MODULE ===== */

  /* ===== FIREBASE DATABASE REFERENCE ===== */
  if (!window.firebase || !window.firebase.database) {
    console.error("[Inventario] Firebase no cargo correctamente.");
    /* Don't block — show login anyway, user will see error when trying to load data */
    showLogin();
  } else {
    try {
      db = firebase.database();
    } catch(e) {
      console.error("[Inventario] Error al inicializar Firebase:", e);
    }
  }

  function dbRef(inv, key) {
    return db.ref("inventario/" + inv + "/" + key);
  }

  /* Load initial state from Firebase, fall back to defaults if empty */
  function loadState(inv) {
    var def = DEFAULTS(inv);
    return {
      productos:  def.productos.map(function(x){return Object.assign({},x);}),
      categorias: def.categorias.slice(),
      unidades:   def.unidades.slice()
    };
  }

  /* Save to Firebase — use objects keyed by ID, not arrays */
  function saveState(inv) {
    if (!db) { console.error("[Inventario] Firebase no disponible"); return; }

    var prodsObj = {};
    if (state[inv].productos.length === 0) {
      prodsObj["__empty__"] = true;
    } else {
      state[inv].productos.forEach(function(p) {
        prodsObj["id_" + p.id] = p;
      });
    }

    /* Use zero-padded keys so Firebase returns them in correct order */
    var catsObj = {};
    state[inv].categorias.forEach(function(c, i) {
      catsObj["c" + String(i).padStart(4,"0")] = c;
    });

    var unitsObj = {};
    state[inv].unidades.forEach(function(u, i) {
      unitsObj["u" + String(i).padStart(4,"0")] = u;
    });

    /* Save everything in one atomic update */
    var update = {};
    update["inventario/" + inv + "/productos"]  = prodsObj;
    update["inventario/" + inv + "/categorias"] = catsObj;
    update["inventario/" + inv + "/unidades"]   = unitsObj;
    update["inventario/" + inv + "/cattrans"]   = catTransCache[inv]  || {};
    update["inventario/" + inv + "/caticons"]   = catIconsCache[inv]  || {};
    update["inventario/" + inv + "/unittrans"]  = unitTransCache[inv] || {};

    db.ref().update(update).catch(function(e) {
      console.error("[Inventario] Error guardando:", e);
      toast("Error al guardar. Verifica tu conexion.");
    });
  }

  /* Save unit translations to Firebase */
  function saveUnitTransFB(inv, map) {
    if (!db) { return; }
    db.ref("inventario/" + inv + "/unittrans").set(map).catch(function(e) {
      console.error("[Inventario] Error guardando traducciones de unidades:", e);
    });
  }

  var fullyLoaded = false;

  /* Listen for real-time changes from other users */
  function listenFirebase() {
    var loaded = { a: false, b: false };

    function hideLoading() {
      var overlay = document.getElementById("loadingOverlay");
      if (overlay) {
        overlay.classList.add("hidden");
        setTimeout(function() { overlay.style.display = "none"; }, 400);
      }
    }

    function checkAllLoaded() {
      if (loaded.a && loaded.b) {
        fullyLoaded = true;
        applyLang(); /* re-apply language after data is loaded to translate everything */
        hideLoading();
      }
    }

    ["a","b"].forEach(function(inv) {
      db.ref("inventario/" + inv).on("value", function(snapshot) {
        var data = snapshot.val();

        if (!data) {
          /* Node never existed — initialize with defaults */
          var def = DEFAULTS(inv);
          var prodsObj = {};
          def.productos.forEach(function(p) { prodsObj["id_" + p.id] = Object.assign({}, p); });
          var catsObj  = {};
          def.categorias.forEach(function(c, i) { catsObj["c" + String(i).padStart(4,"0")] = c; });
          var unitsObj = {};
          def.unidades.forEach(function(u, i)   { unitsObj["u" + String(i).padStart(4,"0")] = u; });
          db.ref("inventario/" + inv).set({
            productos:  prodsObj,
            categorias: catsObj,
            unidades:   unitsObj,
            cattrans:   {},
            unittrans:  {},
            caticons:   {}
          });
          loaded[inv] = true;
          checkAllLoaded();
          return;
        }

        /* Convert productos object back to sorted array */
        if (data.productos) {
          if (data.productos["__empty__"]) {
            state[inv].productos = [];
          } else {
            var prodsArr = [];
            Object.keys(data.productos).forEach(function(k) {
              var p = data.productos[k];
              if (p && typeof p === "object" && p.id) { prodsArr.push(p); }
            });
            prodsArr.sort(function(a, b) { return a.id - b.id; });
            state[inv].productos = prodsArr;
          }
        } else {
          state[inv].productos = [];
        }

        /* Convert categorias object back to array */
        if (data.categorias && typeof data.categorias === "object") {
          var catsArr = [];
          Object.keys(data.categorias).sort().forEach(function(k) {
            var c = data.categorias[k];
            if (c && typeof c === "string") { catsArr.push(c); }
          });
          if (catsArr.length) { state[inv].categorias = catsArr; }
        }

        /* Convert unidades object back to array */
        if (data.unidades && typeof data.unidades === "object") {
          var unitsArr = [];
          Object.keys(data.unidades).sort().forEach(function(k) {
            var u = data.unidades[k];
            if (u && typeof u === "string") { unitsArr.push(u); }
          });
          if (unitsArr.length) { state[inv].unidades = unitsArr; }
        }

        if (data.cattrans)  { catTransCache[inv]  = data.cattrans; }
        if (data.unittrans) { unitTransCache[inv] = data.unittrans; }
        if (data.caticons)  { catIconsCache[inv]  = data.caticons; }

        /* === NORMALIZATION ===
           Build EN→ES lookup from cattrans/unittrans regardless of direction stored */
        var rawCT = catTransCache[inv]  || {};
        var rawUT = unitTransCache[inv] || {};

        /* Build EN→ES maps covering both directions */
        var cEN2ES = {};
        var uEN2ES = {};

        /* Current categories and units as reference for what's stored */
        var storedCats  = state[inv].categorias;
        var storedUnits = state[inv].unidades;

        Object.keys(rawCT).forEach(function(k) {
          var v = rawCT[k];
          if (!v) { return; }
          /* If k is in stored cats → k is primary, v is translation */
          /* If v is in stored cats → v is primary, k is translation */
          var kInCats = storedCats.some(function(c){ return c.toLowerCase() === k.toLowerCase(); });
          var vInCats = storedCats.some(function(c){ return c.toLowerCase() === v.toLowerCase(); });
          if (kInCats && !vInCats) {
            /* k is primary (could be ES or EN), v is the other */
            /* We can't know which is ES without checking — but if v is already Spanish (in reverse), skip */
            cEN2ES[v.toLowerCase()] = k; /* treat v as EN, k as ES */
          } else if (vInCats && !kInCats) {
            cEN2ES[k.toLowerCase()] = v; /* k is EN, v is ES */
          } else {
            /* Both or neither in cats — store both directions */
            cEN2ES[v.toLowerCase()] = k;
            cEN2ES[k.toLowerCase()] = v;
          }
        });

        Object.keys(rawUT).forEach(function(k) {
          var v = rawUT[k];
          if (!v) { return; }
          var kInUnits = storedUnits.some(function(u){ return u.toLowerCase() === k.toLowerCase(); });
          var vInUnits = storedUnits.some(function(u){ return u.toLowerCase() === v.toLowerCase(); });
          if (kInUnits && !vInUnits) {
            uEN2ES[v.toLowerCase()] = k;
          } else if (vInUnits && !kInUnits) {
            uEN2ES[k.toLowerCase()] = v;
          } else {
            uEN2ES[v.toLowerCase()] = k;
            uEN2ES[k.toLowerCase()] = v;
          }
        });

        /* Normalize categories and units to their canonical stored form */
        /* We want the version that appears in cattrans/unittrans as a KEY (primary language) */
        /* Actually: just ensure displayCat/displayUnit can find translations */
        /* The real fix: rebuild cattrans to always be ES→EN format */
        var newCT = {};
        var newUT = {};
        var catsChanged  = false;
        var unitsChanged = false;

        /* For categories: find which side is EN by checking cEN2ES */
        storedCats.forEach(function(c) {
          var esVer = cEN2ES[c.toLowerCase()];
          if (esVer && esVer !== c) {
            /* c is EN, esVer is ES — we should store esVer */
            catsChanged = true;
          }
        });

        state[inv].categorias = storedCats.map(function(c) {
          var esVer = cEN2ES[c.toLowerCase()];
          return (esVer && esVer !== c) ? esVer : c;
        });

        state[inv].unidades = storedUnits.map(function(u) {
          var esVer = uEN2ES[u.toLowerCase()];
          if (esVer && esVer !== u) { unitsChanged = true; return esVer; }
          return u;
        });

        state[inv].productos.forEach(function(p) {
          if (p.categoria) {
            var esC = cEN2ES[p.categoria.toLowerCase()];
            if (esC && esC !== p.categoria) { p.categoria = esC; catsChanged = true; }
          }
          if (p.unidad) {
            var esU = uEN2ES[p.unidad.toLowerCase()];
            if (esU && esU !== p.unidad) { p.unidad = esU; unitsChanged = true; }
          }
        });

        /* Rebuild cattrans/unittrans as ES→EN using current normalized state */
        state[inv].categorias.forEach(function(esC) {
          /* Find EN translation */
          Object.keys(rawCT).forEach(function(k) {
            var v = rawCT[k];
            if (k.toLowerCase() === esC.toLowerCase() && v) { newCT[esC] = v; }
            else if (v && v.toLowerCase() === esC.toLowerCase() && k) { newCT[esC] = k; }
          });
        });
        state[inv].unidades.forEach(function(esU) {
          Object.keys(rawUT).forEach(function(k) {
            var v = rawUT[k];
            if (k.toLowerCase() === esU.toLowerCase() && v) { newUT[esU] = v; }
            else if (v && v.toLowerCase() === esU.toLowerCase() && k) { newUT[esU] = k; }
          });
        });

        /* Update caches with normalized ES→EN maps */
        if (Object.keys(newCT).length)  { catTransCache[inv]  = newCT; }
        if (Object.keys(newUT).length)  { unitTransCache[inv] = newUT; }

        /* Persist if anything changed */
        if (catsChanged || unitsChanged) {
          saveState(inv);
        }

        if (!loaded[inv]) {
          loaded[inv] = true;
          checkAllLoaded();
        } else {
          if (inv === activeInv) {
            filterCats = filterCats.filter(function(c){ return cs().indexOf(c) >= 0; });
            render();
            /* If product modal is open, refresh its category and unit selectors */
            var modalOpen = document.getElementById("modalOverlay");
            if (modalOpen && modalOpen.classList.contains("open")) {
              renderCatSelect(document.getElementById("fCategoria").value);
              renderUnitSelect(document.getElementById("fUnidad").value);
            }
          }
        }
      }, function(error) {
        console.error("[Inventario] Error de conexion Firebase:", error);
        var lt = document.getElementById("loadingText");
        if (lt) {
          lt.textContent = "Error de conexion. Verifica tu internet y recarga.";
          lt.style.color = "#c0392b";
        }
        var ov = document.getElementById("loadingOverlay");
        if (ov) { ov.style.display = "flex"; ov.classList.remove("hidden"); }
      });
    });
  }

  state = { a: loadState("a"), b: loadState("b") };
  function S()  { return state[activeInv]; }
  function ps() { return S().productos; }
  function cs() { return S().categorias; }
  function us() { return S().unidades; }
  function save() { saveState(activeInv); }
  function nextId() {
    var ids = ps().map(function(p){return p.id;});
    return ids.length ? Math.max.apply(null,ids)+1 : 1;
  }

  var PAL = [
    {bg:"#fdecea",color:"#9b2226"},{bg:"#e6f4ec",color:"#1a6e3a"},
    {bg:"#e8f0fb",color:"#1a4a8a"},{bg:"#f0ebfb",color:"#5a2a8a"},
    {bg:"#fef3e2",color:"#7a4a10"},{bg:"#f3f4f6",color:"#4b5563"},
    {bg:"#fce4ec",color:"#880e4f"},{bg:"#e0f2f1",color:"#00695c"},
    {bg:"#fff8e1",color:"#f57f17"},{bg:"#ede7f6",color:"#4527a0"}
  ];
  function catStyle(cat) {
    var i = cs().indexOf(cat);
    var p = PAL[(i>=0?i:0) % PAL.length];
    return "background:" + p.bg + ";color:" + p.color;
  }

  /* ===== XSS PROTECTION ===== */
  function escapeHTML(str) {
    return String(str === null || str === undefined ? "" : str)
      .replace(/&/g,  "&amp;")
      .replace(/</g,  "&lt;")
      .replace(/>/g,  "&gt;")
      .replace(/"/g,  "&quot;")
      .replace(/'/g,  "&#039;");
  }

  var now = new Date();

  /* ===== SWITCH INVENTORY ===== */
  function switchInventory(inv) {
    activeInv=inv; filterSubcat="todos"; filterCats=[]; filterStatus="todos"; sortField=null;
    localStorage.setItem("inv_active",inv);
    document.getElementById("tabA").className = "inv-tab" + (inv==="a"?" active-a":"");
    document.getElementById("tabB").className = "inv-tab" + (inv==="b"?" active-b":"");
    applyLang();
  }
  window.switchInventory = switchInventory;

  /* ===== LANGUAGE ===== */
  function applyLang() {
    document.documentElement.lang = lang;
    var m = {
      hLogoSub:"logoSub", btnLang:"btnLang",
      btnPrint:"btnPrint",
      tabALabel:"invLabel", tabBLabel:"invLabel", tabAName:"invA", tabBName:"invB",
      sLabelTotal:"sTotal", sLabelLow:"sLow", sLabelOut:"sOut",
      thNombre:"thNombre", thCategoria:"thCat", thCantidad:"thStock",
      thMinimo:"thMin", thDiff:"thDiff", thUnidad:"thUnit", thEstado:"thStatus",
      hBtnAdd:"btnAdd", hBtnCat:"btnCat", hBtnUnit:"btnUnit",
      lNombreES:"lNombreES", lNombreEN:"lNombreEN",
      lSubcat:"lSubcat",
      lCategoria:"lCat", lUnidad:"lUnit",
      lCantidad:"lCantidad", lMinimo:"lMin",
      btnModalCancel:"cancel", btnModalSave:"save",
      adjTitle:"adjTitle", tabEntrada:"tabIn", tabSalida:"tabOut", tabFijar:"tabSet",
      btnAdjCancel:"cancel", btnAdjConfirm:"confirm",
      delTitle:"delTitle", delMsg1:"delMsg1", delMsg2:"delMsg2",
      btnDelCancel:"cancel", btnDelConfirm:"delConfirm",
      catMgrTitle:"catMgrTitle", catMgrExisting:"catExisting", catMgrAdd:"catAdd",
      btnCatCancel:"cancel", btnCatSave:"catSave",
      unitMgrTitle:"unitMgrTitle", unitMgrExisting:"unitExisting", unitMgrAdd:"unitAdd",
      btnUnitCancel:"cancel", btnUnitSave:"unitSave",
      gcBtnCancel:"cancel",
      hPreviewTitle:"previewTitle", hPreviewClose:"previewClose",
      hPreviewPDF:"previewPDF", hPreviewPrint:"previewPrint"
    };
    Object.keys(m).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) { el.textContent = tr(m[id]); }
    });
    document.getElementById("searchInput").placeholder = tr("search");
    /* Update loading text language */
    var lt = document.getElementById("loadingText");
    if (lt) { lt.textContent = lang === "es" ? "Cargando inventario..." : "Loading inventory..."; }
    /* Update report filter options */
    var rAll = document.getElementById("rFilterAll");
    var rLow = document.getElementById("rFilterLow");
    if (rAll) { rAll.textContent = tr("rFilterAll"); }
    if (rLow) { rLow.textContent = tr("rFilterLow"); }
    /* Update aria-labels that contain translatable text */
    var btnPrint = document.getElementById("btnPrint");
    if (btnPrint) { btnPrint.setAttribute("aria-label", tr("btnPrint")); }
    var loc = lang==="es"?"es-MX":"en-US";
    document.getElementById("headerDate").textContent =
      now.toLocaleDateString(loc,{weekday:"long",day:"numeric",month:"long",year:"numeric"});
    renderFilterBtns();
    render();

    /* Rebuild reportSubcat options in current language */
    var reportSubcat = document.getElementById("reportSubcat");
    if (reportSubcat) {
      var currentVal = reportSubcat.value;
      var sh = "<option value=\"todos\">" + tr("rSubcatAll") + "</option>";
      SUBCATS.forEach(function(s) {
        sh += "<option value=\"" + s.id + "\">" + s.iconES + " " + (lang === "es" ? s.labelES : s.labelEN) + "</option>";
      });
      reportSubcat.innerHTML = sh;
      reportSubcat.value = currentVal;
    }

    /* Translate dropdown items */
    var btnLogoutEl = document.getElementById("btnLogout");
    if (btnLogoutEl) { btnLogoutEl.textContent = tr("btnLogout"); }
    var btnChangePassEl = document.getElementById("btnChangePass");
    if (btnChangePassEl) { btnChangePassEl.textContent = tr("btnChangePassLabel"); }
    var btnAdminPanelEl = document.getElementById("btnAdminPanel");
    if (btnAdminPanelEl) { btnAdminPanelEl.textContent = tr("btnAdminPanelLabel"); }

    /* Translate guest banner */
    var gbEl = document.getElementById("guestBanner");
    if (gbEl) { gbEl.textContent = tr("guestBanner"); }

    /* Translate freshness legend */
    var flToday = document.getElementById("flToday");
    if (flToday) { flToday.textContent = lang === "es" ? "Hoy" : "Today"; }
    var histTitle = document.getElementById("historialTitle");
    if (histTitle) { histTitle.textContent = tr("histTitle"); }
    var histSubtitle = document.querySelector(".historial-subtitle");
    if (histSubtitle) { histSubtitle.textContent = tr("histSubtitle"); }

    /* Translate historial filter buttons */
    document.querySelectorAll(".hist-filter-btn").forEach(function(btn) {
      if (btn.dataset.filter === "todos")   { btn.textContent = tr("histFilterAll"); }
      if (btn.dataset.filter === "stock")   { btn.textContent = tr("histFilterStock"); }
      if (btn.dataset.filter === "edicion") { btn.textContent = tr("histFilterEdit"); }
    });
  }
  function toggleLang() {
    lang = lang==="es"?"en":"es";
    localStorage.setItem("inv_lang",lang);
    applyLang();
  }
  window.toggleLang = toggleLang;

  /* ===== HELPERS ===== */
  function stockStatus(p) {
    if (p.cantidad===0) { return "danger"; }
    if (p.cantidad<p.minimo) { return "warn"; }
    return "ok";
  }
  function statusEl(st) {
    var cls={ok:"status-ok",warn:"status-warn",danger:"status-danger"}[st];
    var lbl={ok:tr("ppNormal"),warn:tr("ppLow"),danger:tr("ppOut")}[st];
    return "<span class=\"" + cls + "\">" + lbl + "</span>";
  }
  function barClr(st) { return st==="ok"?"#5aad7a":st==="warn"?"#e8b84b":"#d94f4f"; }

  /* ===== STATS ===== */
  function updateStats() {
    var p = ps();
    document.getElementById("statTotal").textContent = p.length;
    document.getElementById("statLow").textContent   = p.filter(function(x){return x.cantidad>0&&x.cantidad<x.minimo;}).length;
    document.getElementById("statOut").textContent   = p.filter(function(x){return x.cantidad===0;}).length;
    document.getElementById("cardTotal").className = "stat-card"+(filterStatus==="todos"?" active-filter-total":"");
    document.getElementById("cardLow").className   = "stat-card"+(filterStatus==="warn"?" active-filter-warn":"");
    document.getElementById("cardOut").className   = "stat-card"+(filterStatus==="danger"?" active-filter-danger":"");
  }
  function setStatusFilter(s) {
    filterStatus = (filterStatus===s&&s!=="todos")?"todos":s;
    render();
  }
  window.setStatusFilter = setStatusFilter;

  /* ===== FILTER BUTTONS — 2 levels ===== */
  function renderFilterBtns() {
    renderSubcatTabs();
    renderCatFilterBtns();
  }

  /* Level 2: subcategory tabs */
  function renderSubcatTabs() {
    var wrap = document.getElementById("subcatTabs");
    if (!wrap) { return; }

    /* Always count from the FULL product list, ignoring active filters */
    var allProds = ps();
    var counts = {};
    SUBCATS.forEach(function(s) { counts[s.id] = 0; });

    /* Only show counts after fully loaded to avoid wrong numbers */
    if (fullyLoaded) {
      allProds.forEach(function(p) {
        if (p.subcategoria && counts[p.subcategoria] !== undefined) {
          counts[p.subcategoria]++;
        }
      });
    }

    var h = "<button class=\"subcat-all-btn" + (filterSubcat === "todos" ? " active" : "") + "\" id=\"subcatAll\">" + tr("allSubcats");
    if (fullyLoaded) { h += " <span class=\"subcat-tab-count\" style=\"background:var(--surface2);color:var(--muted)\">" + allProds.length + "</span>"; }
    h += "</button>";

    SUBCATS.forEach(function(s) {
      var isActive = filterSubcat === s.id;
      var cnt = counts[s.id];
      h += "<button class=\"subcat-tab" + (isActive ? " active" : "") + "\" data-subcat=\"" + s.id + "\">";
      h += "<span class=\"subcat-tab-icon\">" + s.iconES + "</span>";
      h += (lang === "es" ? s.labelES : s.labelEN);
      if (fullyLoaded) { h += "<span class=\"subcat-tab-count\">" + cnt + "</span>"; }
      h += "</button>";
    });
    wrap.innerHTML = h;

    document.getElementById("subcatAll").addEventListener("click", function() {
      filterSubcat = "todos"; filterCats = []; renderFilterBtns(); render();
    });
    wrap.querySelectorAll(".subcat-tab").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var id = btn.dataset.subcat;
        filterSubcat = (filterSubcat === id) ? "todos" : id;
        filterCats = [];
        renderFilterBtns(); render();
      });
    });
  }

  /* Level 3: category multi-select filter */
  function renderCatFilterBtns() {
    var wrap = document.getElementById("filterBtns");
    if (!wrap) { return; }

    /* Get categories that actually exist in the active subcat */
    var allProds = ps();
    var subcatProds = filterSubcat === "todos"
      ? allProds
      : allProds.filter(function(p) { return p.subcategoria === filterSubcat; });

    /* Build ordered unique category list from matching products */
    var catsInView = [];
    /* Preserve cs() order where possible */
    cs().forEach(function(c) {
      var hasProds = subcatProds.some(function(p) { return p.categoria === c; });
      if (hasProds && catsInView.indexOf(c) < 0) { catsInView.push(c); }
    });
    /* Also catch any categories not in cs() (edge case) */
    subcatProds.forEach(function(p) {
      if (p.categoria && catsInView.indexOf(p.categoria) < 0) { catsInView.push(p.categoria); }
    });

    /* Clean up filterCats — remove any that don't exist in this view */
    filterCats = filterCats.filter(function(c) { return catsInView.indexOf(c) >= 0; });

    if (!catsInView.length) { wrap.innerHTML = ""; return; }

    var h = "";
    catsInView.forEach(function(c) {
      var isActive = filterCats.indexOf(c) >= 0;
      var icon = catIcon(c);
      h += "<button class=\"filter-btn" + (isActive ? " active" : "") + "\" data-cat=\"" + escapeHTML(c) + "\">" + (icon ? icon + " " : "") + escapeHTML(displayCat(c)) + "</button>";
    });
    wrap.innerHTML = h;

    wrap.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var cat = btn.dataset.cat;
        var idx = filterCats.indexOf(cat);
        if (idx >= 0) { filterCats.splice(idx, 1); }
        else { filterCats.push(cat); }
        renderCatFilterBtns(); render();
      });
    });
  }

  function renderCatSelect(sel) {
    var h=""; cs().forEach(function(c){h+="<option"+(c===sel?" selected":"")+">"+c+"</option>";});
    document.getElementById("fCategoria").innerHTML=h;
  }
  function renderUnitSelect(sel) {
    var h=""; us().forEach(function(u){h+="<option"+(u===sel?" selected":"")+">"+u+"</option>";});
    document.getElementById("fUnidad").innerHTML=h;
  }

  /* Freshness color based on updatedAt timestamp */
  function freshnessStyle(p) {
    if (!p.updatedAt) { return "background:rgba(150,150,150,0.08)"; }
    /* Use local date strings to avoid timezone issues */
    var now    = new Date();
    var upd    = new Date(p.updatedAt);
    var nowStr = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    var updStr = upd.getFullYear()+"-"+(upd.getMonth()+1)+"-"+upd.getDate();
    if (nowStr === updStr) { return "background:rgba(40,180,80,0.10)"; }
    /* Days elapsed using local midnight boundaries */
    var nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var updMid = new Date(upd.getFullYear(), upd.getMonth(), upd.getDate()).getTime();
    var days   = Math.round((nowMid - updMid) / 86400000);
    if (days === 1){ return "background:rgba(60,120,220,0.09)"; }  /* blue   — 1 day  */
    if (days === 2){ return "background:rgba(230,120,30,0.10)";  }  /* orange — 2 days */
    if (days === 3){ return "background:rgba(220,190,40,0.10)"; }  /* yellow — 3 days */
    return "background:rgba(150,150,150,0.08)";
  }

  function freshnessNameStyle(p) {
    if (!p.updatedAt) { return "color:#6b1a2a;font-weight:700"; }
    var days = Math.floor((Date.now() - p.updatedAt) / 86400000);
    return days >= 30 ? "color:#6b1a2a;font-weight:700" : "";
  }
  function getList() {
    var q = document.getElementById("searchInput").value.toLowerCase();
    var list = ps().filter(function(p) {
      var st = stockStatus(p);
      var matchSubcat = filterSubcat === "todos" || p.subcategoria === filterSubcat;
      var matchCat    = filterCats.length === 0 || filterCats.indexOf(p.categoria) >= 0;
      var matchStatus = filterStatus === "todos" || st === filterStatus;
      var matchSearch = displayName(p).toLowerCase().indexOf(q) >= 0;
      return matchSubcat && matchCat && matchStatus && matchSearch;
    });
    if (sortField) {
      list = list.slice().sort(function(a,b) {
        var av=a[sortField], bv=b[sortField];
        if (typeof av==="string"){av=av.toLowerCase();bv=bv.toLowerCase();}
        return sortAsc?(av>bv?1:-1):(av<bv?1:-1);
      });
    } else {
      /* Default: sort by updatedAt ascending — oldest first, most recently updated last */
      list = list.slice().sort(function(a,b) {
        return (a.updatedAt || 0) - (b.updatedAt || 0);
      });
    }
    return list;
  }
  function render() { var l=getList(); updateStats(); renderTable(l); renderCards(l); }

  function renderTable(list) {
    var body=document.getElementById("tableBody");
    if (!list.length) { body.innerHTML="<tr><td colspan=\"8\"><div class=\"empty-state\">-- "+tr("empty")+" --</div></td></tr>"; return; }
    var lblDiff = lang==="es" ? "Diferencia" : "Difference";
    var h="";
    list.forEach(function(p) {
      var st  = stockStatus(p);
      var pct = p.minimo>0 ? Math.min(100,(p.cantidad/(p.minimo*2))*100) : 100;
      var diff      = p.cantidad - p.minimo;
      var diffSign  = diff > 0 ? "+" : "";
      var diffClass = diff > 0 ? "ok-color" : diff === 0 ? "" : "danger-color";
      h+="<tr class=\"draggable-row\" style=\""+freshnessStyle(p)+"\">";
      h+="<td class=\"drag-handle\" title=\""+(lang==="es"?"Arrastrar para reordenar":"Drag to reorder")+"\">&#8597;</td>";
      h+="<td><strong style=\""+freshnessNameStyle(p)+"\">"+escapeHTML(displayName(p))+"</strong></td>";
      h+="<td><div class=\"cat-cell\">";
      if (p.subcategoria) { h+="<span class=\"subcat-icon\" title=\""+escapeHTML(subcatLabel(p.subcategoria))+"\">"+subcatIcon(p.subcategoria)+"</span>"; }
      var cIcon = catIcon(p.categoria);
      if (cIcon) { h+="<span class=\"subcat-icon\" title=\""+escapeHTML(displayCat(p.categoria))+"\">"+cIcon+"</span>"; }
      else { h+="<span class=\"cat-badge\" style=\""+catStyle(p.categoria)+"\">"+escapeHTML(displayCat(p.categoria))+"</span>"; }
      h+="</div></td>";
      h+="<td><div class=\"stock-cell\">";
      h+="<div class=\"bar-bg\"><div class=\"bar-fill\" style=\"width:"+pct+"%;background:"+barClr(st)+"\"></div></div>";
      h+="<span class=\"stock-num "+st+"-color\">"+escapeHTML(p.cantidad)+"</span>";
      h+="</div></td>";
      h+="<td class=\"mono-cell\">"+escapeHTML(p.minimo)+"</td>";
      h+="<td class=\"mono-cell diff-cell "+diffClass+"\">"+diffSign+diff+"</td>";
      h+="<td class=\"mono-cell small-cell unit-cell\">"+escapeHTML(displayUnit(p.unidad))+"</td>";
      h+="<td class=\"status-cell\">"+statusEl(st)+"</td>";
      h+="<td class=\"ctx-cell\">";
      h+="<div class=\"ctx-wrap\">";
      h+="<button class=\"btn-adj\" data-id=\""+p.id+"\" data-action=\"adj\" aria-label=\"Ajustar stock\">"+(lang==="es"?"⊙ Ajustar":"⊙ Adjust")+"</button>";
      h+="<button class=\"ctx-btn\" data-id=\""+p.id+"\" data-action=\"ctx\" aria-label=\"Opciones\" aria-haspopup=\"true\">&#8943;</button>";
      h+="<div class=\"ctx-menu\" id=\"ctx-"+p.id+"\">";
      h+="<button class=\"ctx-item\" data-id=\""+p.id+"\" data-action=\"edit\">✏️ "+(lang==="es"?"Editar":"Edit")+"</button>";
      h+="<button class=\"ctx-item\" data-id=\""+p.id+"\" data-action=\"info\">ℹ️ "+(lang==="es"?"Información":"Info")+"</button>";
      h+="<button class=\"ctx-item ctx-item-del\" data-id=\""+p.id+"\" data-action=\"del\">🗑️ "+(lang==="es"?"Eliminar":"Delete")+"</button>";
      h+="</div></div></td>";
      h+="</tr>";
    });
    body.innerHTML=h;
    initDragDrop();
  }

  function renderCards(list) {
    var cl=document.getElementById("cardList");
    if (!list.length) { cl.innerHTML="<div class=\"empty-state\">-- "+tr("empty")+" --</div>"; return; }
    var lblS    = lang==="es" ? "Stock actual"  : "Current stock";
    var lblM    = lang==="es" ? "Stock minimo"  : "Min. stock";
    var lblDiff = lang==="es" ? "Diferencia"    : "Difference";
    var h="";
    list.forEach(function(p) {
      var st   = stockStatus(p);
      var diff = p.cantidad - p.minimo;
      var diffSign  = diff > 0 ? "+" : "";
      var diffClass = diff > 0 ? "ok-color" : diff === 0 ? "" : "danger-color";
      h+="<div class=\"inv-card\" style=\""+freshnessStyle(p)+"\">";
      h+="<div class=\"card-header\">";
      h+="<div>";
      h+="<div class=\"card-name\" style=\""+freshnessNameStyle(p)+"\">"+escapeHTML(displayName(p))+"</div>";
      h+="<div class=\"cat-cell\" style=\"margin-top:0.3rem\">";
      if (p.subcategoria) { h+="<span class=\"subcat-icon\" title=\""+escapeHTML(subcatLabel(p.subcategoria))+"\">"+subcatIcon(p.subcategoria)+"</span>"; }
      var cIcon = catIcon(p.categoria);
      if (cIcon) { h+="<span class=\"subcat-icon\" title=\""+escapeHTML(displayCat(p.categoria))+"\">"+cIcon+"</span>"; }
      else { h+="<span class=\"cat-badge\" style=\""+catStyle(p.categoria)+"\">"+escapeHTML(displayCat(p.categoria))+"</span>"; }
      h+="</div>";
      h+="</div>";
      h+="<div style=\"display:flex;align-items:center;gap:0.5rem;\">";
      h+=statusEl(st);
      h+="<span class=\"drag-handle-card\" title=\""+(lang==="es"?"Arrastrar":"Drag")+"\">&#8597;</span>";
      h+="</div></div>";
      h+="<div class=\"card-body\">";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblS+"</span><span class=\"card-field-value "+st+"-color\">"+p.cantidad+" "+displayUnit(p.unidad)+"</span></div>";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblM+"</span><span class=\"card-field-value\" style=\"color:var(--muted)\">"+p.minimo+" "+displayUnit(p.unidad)+"</span></div>";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblDiff+"</span><span class=\"card-field-value "+diffClass+"\">"+diffSign+diff+" "+displayUnit(p.unidad)+"</span></div>";
      h+="</div>";
      h+="<div class=\"card-actions\">";
      h+="<button class=\"card-btn-adj\" data-id=\""+p.id+"\" data-action=\"adj\" aria-label=\"Ajustar stock\">"+(lang==="es"?"⊙ Ajustar":"⊙ Adjust")+"</button>";
      h+="<div class=\"ctx-wrap\">";
      h+="<button class=\"ctx-btn\" data-id=\""+p.id+"\" data-action=\"ctx\" aria-label=\"Opciones\">&#8943;</button>";
      h+="<div class=\"ctx-menu\" id=\"ctx-"+p.id+"\">";
      h+="<button class=\"ctx-item\" data-id=\""+p.id+"\" data-action=\"edit\">✏️ "+(lang==="es"?"Editar":"Edit")+"</button>";
      h+="<button class=\"ctx-item\" data-id=\""+p.id+"\" data-action=\"info\">ℹ️ "+(lang==="es"?"Información":"Info")+"</button>";
      h+="<button class=\"ctx-item ctx-item-del\" data-id=\""+p.id+"\" data-action=\"del\">🗑️ "+(lang==="es"?"Eliminar":"Delete")+"</button>";
      h+="</div></div>";
      h+="</div></div>";
    });
    cl.innerHTML=h;
    initCardDragDrop();

    /* Attach direct listeners to ctx buttons — iOS Safari requires this */
    cl.querySelectorAll(".ctx-btn").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        openCtxMenu(btn);
      });
      /* Also touchend for iOS */
      btn.addEventListener("touchend", function(e) {
        e.preventDefault();
        e.stopPropagation();
        openCtxMenu(btn);
      }, { passive: false });
    });
  }

  function sortBy(f) { sortAsc=(sortField===f)?!sortAsc:true; sortField=f; render(); }
  window.sortBy=sortBy;

  /* ===== SORTABLEJS — drag & drop (iOS Safari compatible) ===== */
  var sortableTable = null;
  var sortableCards = null;

  function reorderByIndex(oldIndex, newIndex) {
    var prods = S().productos;
    var moved = prods.splice(oldIndex, 1)[0];
    prods.splice(newIndex, 0, moved);
    prods.forEach(function(p, i) { p.id = i + 1; });
    sortField = null;
    save();
    render();
  }

  function initDragDrop() {
    var tbody = document.getElementById("tableBody");
    if (!tbody || typeof Sortable === "undefined") { return; }
    if (sortableTable) { sortableTable.destroy(); }
    sortableTable = Sortable.create(tbody, {
      animation:   150,
      handle:      ".drag-handle",
      ghostClass:  "drag-ghost",
      chosenClass: "drag-chosen",
      onEnd: function(evt) {
        reorderByIndex(evt.oldIndex, evt.newIndex);
      }
    });
  }

  function initCardDragDrop() {
    var cl = document.getElementById("cardList");
    if (!cl || typeof Sortable === "undefined") { return; }
    if (sortableCards) { sortableCards.destroy(); }
    sortableCards = Sortable.create(cl, {
      animation:   150,
      handle:      ".drag-handle-card",
      ghostClass:  "drag-ghost",
      chosenClass: "drag-chosen",
      onEnd: function(evt) {
        reorderByIndex(evt.oldIndex, evt.newIndex);
      }
    });
  }

  /* ===== PRODUCT MODAL ===== */
  function openModal(p) {
    p=p||null;
    document.getElementById("modalTitle").textContent = p?tr("modalEdit"):tr("modalAdd");
    document.getElementById("editId").value      = p ? p.id : "";
    document.getElementById("fNombreES").value   = p ? (p.nombreES || (lang==="es"?p.nombre:"")) : "";
    document.getElementById("fNombreEN").value   = p ? (p.nombreEN || (lang==="en"?p.nombre:"")) : "";
    document.getElementById("fNombreES").placeholder = "Ej: Pechuga de pollo";
    document.getElementById("fNombreEN").placeholder = "E.g.: Chicken breast";
    /* Render subcat selector */
    var subcatSel = document.getElementById("fSubcat");
    if (subcatSel) {
      var sh = "";
      SUBCATS.forEach(function(s) {
        var label = lang === "es" ? s.labelES : s.labelEN;
        var sel   = (p && p.subcategoria === s.id) ? " selected" : "";
        sh += "<option value=\"" + s.id + "\"" + sel + ">" + s.iconES + " " + label + "</option>";
      });
      subcatSel.innerHTML = sh;
    }
    renderCatSelect(p?p.categoria:cs()[0]);
    renderUnitSelect(p?p.unidad:us()[0]);
    document.getElementById("fCantidad").value   = p ? p.cantidad : "";
    document.getElementById("fMinimo").value     = p ? p.minimo   : "";
    document.getElementById("modalOverlay").classList.add("open");
    setTimeout(function() {
      document.getElementById(lang==="es"?"fNombreES":"fNombreEN").focus();
    }, 150);
  }
  function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }
  /* modalOverlay: NO cierra al hacer clic en el fondo — usar X o Cancelar */

  function guardarProducto() {
    var nombreES  = document.getElementById("fNombreES").value.trim();
    var nombreEN  = document.getElementById("fNombreEN").value.trim();
    var subcatEl  = document.getElementById("fSubcat");
    var subcategoria = subcatEl ? subcatEl.value : "secos";
    var categoria = document.getElementById("fCategoria").value;
    var unidad    = document.getElementById("fUnidad").value;
    var cantidad  = parseFloat(document.getElementById("fCantidad").value);
    var minimo    = parseFloat(document.getElementById("fMinimo").value);

    var nombreActual = lang==="es" ? nombreES : nombreEN;
    if (!nombreActual || isNaN(cantidad) || isNaN(minimo)) { toast(tr("toastFields")); return; }

    if (!nombreES) { nombreES = nombreEN; }
    if (!nombreEN) { nombreEN = nombreES; }
    var nombre = lang==="es" ? nombreES : nombreEN;

    var id = document.getElementById("editId").value;
    if (id) {
      var idx = S().productos.findIndex(function(p){return p.id==id;});
      var anterior = S().productos[idx];
      S().productos[idx] = {
        id:parseInt(id,10), nombre:nombre,
        nombreES:nombreES, nombreEN:nombreEN,
        subcategoria:subcategoria,
        categoria:categoria, unidad:unidad, cantidad:cantidad, minimo:minimo,
        updatedAt: Date.now(),
        updatedBy: currentUser ? currentUser.username : "Sistema"
      };
      logAudit("✏️ Editado", nombre +
        (anterior.cantidad !== cantidad ? " | Stock: " + anterior.cantidad + " → " + cantidad + " " + unidad : "") +
        (anterior.categoria !== categoria ? " | Categoría: " + anterior.categoria + " → " + categoria : "") +
        (anterior.subcategoria !== subcategoria ? " | Almacén: " + subcatLabel(anterior.subcategoria) + " → " + subcatLabel(subcategoria) : "")
      );
      toast(tr("toastUpdated"));
    } else {
      S().productos.push({
        id:nextId(), nombre:nombre,
        nombreES:nombreES, nombreEN:nombreEN,
        subcategoria:subcategoria,
        categoria:categoria, unidad:unidad, cantidad:cantidad, minimo:minimo,
        updatedAt: Date.now(),
        updatedBy: currentUser ? currentUser.username : "Sistema"
      });
      logAudit("➕ Agregado", nombre + " | " + subcatLabel(subcategoria) + " / " + categoria + " | Stock inicial: " + cantidad + " " + unidad);
      toast(tr("toastAdded"));
    }
    save(); closeModal(); renderFilterBtns(); render();
  }
  function editarProducto(id) { openModal(ps().find(function(x){return x.id===id;})); }
  window.openModal=openModal; window.closeModal=closeModal;
  window.guardarProducto=guardarProducto; window.editarProducto=editarProducto;

  /* ===== DELETE MODAL ===== */
  function abrirDelModal(id) {
    pendingDel=id;
    var p=ps().find(function(x){return x.id===id;});
    document.getElementById("delProductName").textContent = '"'+escapeHTML(displayName(p))+'"?';
    document.getElementById("delOverlay").classList.add("open");
  }
  function closeDelModal() { document.getElementById("delOverlay").classList.remove("open"); pendingDel=null; }
  function confirmarEliminar() {
    if (pendingDel===null) { return; }
    var p=ps().find(function(x){return x.id===pendingDel;});
    logAudit("🗑️ Eliminado", displayName(p) + " | " + (p.categoria||"") + " | Stock al eliminar: " + p.cantidad + " " + p.unidad);
    S().productos=S().productos.filter(function(x){return x.id!==pendingDel;});
    save(); render(); closeDelModal();
    toast('"'+escapeHTML(displayName(p))+'" '+tr("toastDeleted"));
  }
  document.getElementById("delOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){closeDelModal();}});
  window.abrirDelModal=abrirDelModal; window.closeDelModal=closeDelModal; window.confirmarEliminar=confirmarEliminar;

  /* ===== ADJUST STOCK ===== */
  function openAdj(id) {
    adjId=id; adjMode="entrada";
    var p=ps().find(function(x){return x.id===id;});
    document.getElementById("adjName").textContent = escapeHTML(displayName(p));
    document.getElementById("adjCurrent").textContent = tr("adjCurrent")+" "+escapeHTML(p.cantidad)+" "+escapeHTML(displayUnit(p.unidad));
    document.getElementById("adjQty").value="";
    document.getElementById("adjPreview").classList.add("hidden-initially");
    setAdjMode("entrada");
    document.getElementById("adjOverlay").classList.add("open");
    setTimeout(function(){document.getElementById("adjQty").focus();},150);
  }
  function closeAdj() { document.getElementById("adjOverlay").classList.remove("open"); }
  /* adjOverlay: NO cierra al hacer clic en el fondo — usar X o Cancelar */
  function setAdjMode(mode) {
    adjMode=mode;
    document.querySelectorAll(".adj-tab").forEach(function(t){t.classList.toggle("active",t.dataset.mode===mode);});
    var lbl={entrada:tr("adjLabelIn"),salida:tr("adjLabelOut"),directo:tr("adjLabelSet")};
    document.getElementById("adjLabel").textContent=lbl[mode];
    /* Don't clear the value — user may have already typed the amount */
    updatePreview();
  }
  function updatePreview() {
    var p=ps().find(function(x){return x.id===adjId;});
    var val=document.getElementById("adjQty").value;
    var qty=parseFloat(val);
    var el=document.getElementById("adjPreview");
    if (!val||isNaN(qty)) { el.classList.add("hidden-initially"); return; }
    el.classList.remove("hidden-initially");
    var nuevo;
    if (adjMode==="entrada") { nuevo=p.cantidad+qty; }
    else if (adjMode==="salida") { nuevo=p.cantidad-qty; }
    else { nuevo=qty; }
    if (nuevo<0) { el.textContent=tr("adjNegErr"); return; }
    el.innerHTML=p.cantidad+" "+displayUnit(p.unidad)+" &rarr; <span>"+Math.round(nuevo*100)/100+" "+displayUnit(p.unidad)+"</span>";
  }
  function confirmarAjuste() {
    /* Blur active input first to prevent scroll jump on mobile */
    if (document.activeElement) { document.activeElement.blur(); }
    var p=ps().find(function(x){return x.id===adjId;});
    var qty=parseFloat(document.getElementById("adjQty").value);
    if (isNaN(qty)) { toast(tr("toastInvalid")); return; }
    var anterior = p.cantidad;
    var nuevo;
    if (adjMode==="entrada") { nuevo=p.cantidad+qty; }
    else if (adjMode==="salida") { nuevo=p.cantidad-qty; }
    else { nuevo=qty; }
    if (nuevo<0) { toast(tr("toastNegStock")); return; }
    p.cantidad=Math.round(nuevo*100)/100;
    p.updatedAt = Date.now();
    p.updatedBy = currentUser ? currentUser.username : "Sistema";
    var tipoAdj = adjMode==="entrada" ? "📦 Entrada" : adjMode==="salida" ? "📤 Salida" : "🔧 Ajuste directo";
    logAudit(tipoAdj, displayName(p) + " | " + anterior + " → " + p.cantidad + " " + p.unidad);
    save(); render(); closeAdj();
    toast('"'+escapeHTML(displayName(p))+'": '+escapeHTML(p.cantidad)+" "+escapeHTML(displayUnit(p.unidad)));
  }
  window.openAdj=openAdj; window.closeAdj=closeAdj;
  window.setAdjMode=setAdjMode; window.updatePreview=updatePreview; window.confirmarAjuste=confirmarAjuste;

  /* ===== GENERIC CONFIRM ===== */
  var gcCb=null;
  function openGC(opts) {
    document.getElementById("gcIcon").textContent       = opts.icon||"!";
    document.getElementById("gcTitle").textContent      = opts.title||"";
    document.getElementById("gcMsg1").textContent       = opts.msg1||"";
    document.getElementById("gcName").textContent       = opts.name||"";
    document.getElementById("gcMsg2").textContent       = opts.msg2||"";
    document.getElementById("gcBtnConfirm").textContent = opts.confirmLabel||tr("delConfirm");
    document.getElementById("gcBtnCancel").textContent  = opts.cancelLabel||tr("cancel");
    gcCb=opts.onConfirm||null;
    document.getElementById("gcOverlay").classList.add("open");
  }
  function closeGC() { document.getElementById("gcOverlay").classList.remove("open"); gcCb=null; }
  document.getElementById("gcBtnConfirm").addEventListener("click",function(){if(gcCb){gcCb();} closeGC();});
  /* gcOverlay: NO cierra al hacer clic en el fondo — usar X o Cancelar */
  window.closeGC=closeGC;

  /* ===== CATEGORY MANAGER ===== */
  /*
    Categories are stored as plain strings (the name in the active language).
    A parallel map catTrans[inv] stores { "nombre_es": "nombre_en" } for
    user-created categories, enabling translation on language switch.
  */
  var tempCats = [];
  var tempCatTrans = {}; /* { nameES: nameEN } for new entries being built */

  var catTransCache  = { a: {}, b: {} };
  var catIconsCache  = { a: {}, b: {} }; /* { "Carnes": "🥩", "Verduras": "🥦" } */
  function loadCatTrans(inv)  { return catTransCache[inv]  || {}; }
  function loadCatIcons(inv)  { return catIconsCache[inv]  || {}; }
  function displayName(p) {
    if (!p) { return ""; }
    if (lang === "es" && p.nombreES) { return p.nombreES; }
    if (lang === "en" && p.nombreEN) { return p.nombreEN; }
    return p.nombre || "";
  }

  /* Find the translation pair for a word, regardless of map direction.
     Returns {es, en} or null if not found. */
  function findPair(word, transMap) {
    if (!word || !transMap) { return null; }
    var wLow = word.toLowerCase();
    var keys = Object.keys(transMap);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]; var v = transMap[k];
      if (!v) { continue; }
      if (k.toLowerCase() === wLow) { return { a: k, b: v }; }
      if (v.toLowerCase()  === wLow) { return { a: v, b: k }; }
    }
    return null;
  }

  function displayCat(cat) {
    if (!cat) { return ""; }
    if (lang === "es") { return cat; } /* State is always in Spanish */
    var trans = loadCatTrans(activeInv);
    var pair  = findPair(cat, trans);
    if (!pair) { return cat; }
    /* Return whichever side is NOT the stored value */
    return pair.a.toLowerCase() === cat.toLowerCase() ? pair.b : pair.a;
  }

  function displayUnit(unit) {
    if (!unit) { return ""; }
    if (lang === "es") { return unit; } /* State is always in Spanish */
    var trans = loadUnitTrans(activeInv);
    var pair  = findPair(unit, trans);
    if (!pair) { return unit; }
    return pair.a.toLowerCase() === unit.toLowerCase() ? pair.b : pair.a;
  }
  function catIcon(cat) {
    var icons = loadCatIcons(activeInv);
    if (icons[cat]) { return icons[cat]; }
    var trans   = loadCatTrans(activeInv);
    var reverse = {};
    Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
    var other = trans[cat] || reverse[cat];
    if (other && icons[other]) { return icons[other]; }
    return "";
  }

  /* On language switch, apply user-category translations */
  function translateUserCats() {
    ["a","b"].forEach(function(inv) {
      var trans = loadCatTrans(inv);
      if (!Object.keys(trans).length) { return; }

      /* Build reverse map */
      var reverse = {};
      Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

      state[inv].categorias = state[inv].categorias.map(function(c) {
        if (lang === "en" && trans[c])    { return trans[c]; }
        if (lang === "es" && reverse[c])  { return reverse[c]; }
        return c;
      });

      state[inv].productos.forEach(function(p) {
        if (lang === "en" && trans[p.categoria])   { p.categoria = trans[p.categoria]; }
        if (lang === "es" && reverse[p.categoria]) { p.categoria = reverse[p.categoria]; }
      });
      /* NOTE: no saveState here — translation is UI-only, not persisted */
    });
    filterCats = filterCats.filter(function(c){ return cs().indexOf(c) >= 0; });
  }

  var tempCats     = [];
  var tempCatTrans = {};
  var tempCatIcons = {};

  function openCatMgr() {
    tempCats = cs().slice();
    /* Normalize tempCatTrans to always be ES→EN */
    var rawTrans = loadCatTrans(activeInv);
    var normalizedTrans = {};
    var tempCatsLower = tempCats.map(function(c) { return c.toLowerCase(); });
    Object.keys(rawTrans).forEach(function(k) {
      var v = rawTrans[k];
      var isKeyES = tempCatsLower.indexOf(k.toLowerCase()) >= 0;
      if (isKeyES) {
        normalizedTrans[k] = v; /* already ES→EN */
      } else {
        /* k is EN, v is ES — swap to ES→EN */
        if (v) { normalizedTrans[v] = k; }
      }
    });
    tempCatTrans = normalizedTrans;
    tempCatIcons = Object.assign({}, loadCatIcons(activeInv));
    renderCatMgrList();
    var iconEl = document.getElementById("catNewIcon");
    if (iconEl) { iconEl.value = ""; }
    document.getElementById("catNewNameES").value = "";
    document.getElementById("catNewNameEN").value = "";
    document.getElementById("catMgrOverlay").classList.add("open");
    setTimeout(function() {
      document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
    }, 150);
  }
  function closeCatMgr() { document.getElementById("catMgrOverlay").classList.remove("open"); }
  /* catMgrOverlay: NO cierra al hacer clic en el fondo */

  function renderCatMgrList() {
    var list = document.getElementById("catManagerList");
    if (!tempCats.length) {
      list.innerHTML = "<div style=\"text-align:center;color:var(--muted);padding:1rem 0\">" + tr("noCats") + "</div>";
      return;
    }
    var trans   = tempCatTrans;
    var reverse = {};
    Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

    var h = "";
    for (var i = 0; i < tempCats.length; i++) {
      var p         = PAL[i % PAL.length];
      var c         = tempCats[i];
      var icon      = tempCatIcons[c] || "";
      var otherName = trans[c] || reverse[c] || "";
      var flagOther = lang === "es" ? "🇬🇧" : "🇪🇸";

      h += "<div class=\"mgr-item mgr-item-view\" data-rowid=\"" + i + "\">";
      /* VIEW mode */
      h += "<span class=\"mgr-icon-view\">" + (icon || "🏷️") + "</span>";
      h += "<div class=\"mgr-dot\" style=\"background:" + p.color + "\"></div>";
      h += "<div class=\"mgr-names-view\">";
      h += "<span class=\"mgr-name-main\">" + escapeHTML(c) + "</span>";
      if (otherName) { h += "<span class=\"mgr-name-other\">" + flagOther + " " + escapeHTML(otherName) + "</span>"; }
      h += "</div>";
      h += "<div class=\"mgr-row-actions\">";
      h += "<button class=\"mgr-edit-btn\" data-editidx=\"" + i + "\" title=\"Editar\">✏️</button>";
      h += "<button class=\"mgr-del\" data-delidx=\"" + i + "\">&#10005;</button>";
      h += "</div>";
      h += "</div>";
    }
    list.innerHTML = h;

    /* Edit button — opens edit panel below list */
    list.querySelectorAll(".mgr-edit-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var idx       = parseInt(btn.dataset.editidx, 10);
        var c         = tempCats[idx];
        var icon      = tempCatIcons[c] || "";
        var otherName = lang === "es"
          ? (tempCatTrans[c] || "")
          : (function(){ var r={}; Object.keys(tempCatTrans).forEach(function(k){ r[tempCatTrans[k]]=k; }); return r[c]||""; }());
        var flagOther = lang === "es" ? "🇬🇧" : "🇪🇸";
        var placeholderOther = lang === "es" ? "English" : "Español";
        var titleEdit = lang === "es" ? "Editar categoría" : "Edit category";
        var lblCancel = lang === "es" ? "Cancelar" : "Cancel";
        var lblSave   = lang === "es" ? "✓ Guardar" : "✓ Save";

        /* Remove existing panel */
        var existing = list.parentNode.querySelector(".mgr-edit-panel");
        if (existing) { existing.remove(); }
        list.querySelectorAll(".mgr-item-view").forEach(function(r){ r.classList.remove("mgr-item-selected"); });
        btn.closest(".mgr-item-view").classList.add("mgr-item-selected");

        var panel = document.createElement("div");
        panel.className = "mgr-edit-panel";
        panel.innerHTML =
          "<div class=\"mgr-edit-panel-title\">" + titleEdit + "</div>" +
          "<div class=\"mgr-edit-row\">" +
            "<input class=\"cat-icon-field\" type=\"text\" id=\"epIcon\" value=\"" + escapeHTML(icon) + "\" placeholder=\"🏷️\" maxlength=\"4\">" +
            "<input class=\"mgr-edit-input\" type=\"text\" id=\"epName\" value=\"" + escapeHTML(c) + "\" placeholder=\"Nombre\">" +
          "</div>" +
          "<input class=\"mgr-edit-input\" type=\"text\" id=\"epOther\" value=\"" + escapeHTML(otherName) + "\" placeholder=\"" + flagOther + " " + placeholderOther + "\">" +
          "<div class=\"mgr-edit-actions\">" +
            "<button class=\"mgr-edit-cancel\">" + lblCancel + "</button>" +
            "<button class=\"mgr-save-btn mgr-edit-save\">" + lblSave + "</button>" +
          "</div>";

        list.parentNode.insertBefore(panel, list.nextSibling);
        document.getElementById("epName").focus();

        panel.querySelector(".mgr-edit-cancel").addEventListener("click", function() {
          panel.remove();
          btn.closest(".mgr-item-view").classList.remove("mgr-item-selected");
        });
        panel.querySelector(".mgr-edit-save").addEventListener("click", function() {
          var newName  = document.getElementById("epName").value.trim();
          var newOther = document.getElementById("epOther").value.trim();
          var newIcon  = document.getElementById("epIcon").value.trim();
          if (!newName) { return; }
          var oldName = tempCats[idx];

          /* Always normalize to Spanish as primary key */
          var newES, newEN;
          if (lang === "es") {
            newES = newName;
            newEN = newOther;
          } else {
            newES = newOther || newName; /* if no Spanish provided, use English as fallback */
            newEN = newName;
          }
          if (!newES) { newES = newEN; }

          /* Update primary key in tempCats */
          tempCats[idx] = newES;

          /* Update icon — keyed by Spanish */
          var reverse2 = {};
          Object.keys(tempCatTrans).forEach(function(es) { reverse2[tempCatTrans[es]] = es; });
          var oldES = (reverse2[oldName] || oldName);
          if (newIcon) { tempCatIcons[newES] = newIcon; } else { delete tempCatIcons[newES]; }
          if (newES !== oldES) { delete tempCatIcons[oldES]; }

          /* Update translation — always ES → EN */
          delete tempCatTrans[oldES];
          if (newEN && newEN !== newES) { tempCatTrans[newES] = newEN; }

          /* Close panel and re-render */
          panel.remove();
          list.querySelectorAll(".mgr-item-view").forEach(function(r){ r.classList.remove("mgr-item-selected"); });
          renderCatMgrList();
          toast(lang === "es" ? "Categoría actualizada" : "Category updated");
        });
      });
    });

    list.querySelectorAll(".mgr-del").forEach(function(btn) {
      btn.addEventListener("click", function() {
        eliminarTempCat(parseInt(btn.dataset.delidx, 10));
      });
    });
  }

  function eliminarTempCat(idx) {
    var cat      = tempCats[idx];
    var affected = ps().filter(function(p) { return p.categoria === cat; });
    var count    = affected.length;
    var otherCats = tempCats.filter(function(c, i) { return i !== idx; });

    if (count === 0) {
      /* No products — delete directly */
      openGC({
        icon: "🗑️", title: tr("gcDelCatTitle"),
        msg1: tr("gcDelMsg1Cat"), name: '"' + escapeHTML(displayCat(cat)) + '"?',
        msg2: tr("gcDelMsg2NoUse"),
        confirmLabel: tr("delConfirm"), cancelLabel: tr("cancel"),
        onConfirm: function() {
          var trans   = tempCatTrans;
          var reverse = {};
          Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
          if (trans[cat])   { delete trans[cat]; }
          if (reverse[cat]) { delete trans[reverse[cat]]; }
          delete tempCatIcons[cat];
          tempCats.splice(idx, 1);
          renderCatMgrList();
        }
      });
      return;
    }

    /* Products exist — show selector for destination category */
    if (otherCats.length === 0) {
      toast(lang === "es"
        ? "No puedes eliminar la única categoría"
        : "Cannot delete the only category");
      return;
    }

    /* Build a mini-modal inside the manager */
    var existing = document.querySelector(".cat-del-confirm");
    if (existing) { existing.remove(); }

    var destDefault = otherCats[0];
    var panel = document.createElement("div");
    panel.className = "mgr-edit-panel cat-del-confirm";
    var titleEl  = lang === "es" ? "⚠️ Eliminar categoría" : "⚠️ Delete category";
    var msgEl    = lang === "es"
      ? count + " producto(s) serán reasignados a:"
      : count + " product(s) will be reassigned to:";
    var lblCancel = lang === "es" ? "Cancelar" : "Cancel";
    var lblDel    = lang === "es" ? "🗑️ Eliminar" : "🗑️ Delete";

    var opts = otherCats.map(function(c) {
      var icon = catIcon(c) || "";
      return "<option value=\"" + escapeHTML(c) + "\">" + (icon ? icon + " " : "") + escapeHTML(displayCat(c)) + "</option>";
    }).join("");

    panel.innerHTML =
      "<div class=\"mgr-edit-panel-title\" style=\"color:var(--red)\">" + titleEl + "</div>" +
      "<div style=\"font-size:0.85rem;color:var(--text);margin-bottom:0.4rem\">" + msgEl + "</div>" +
      "<select id=\"catDelDest\" style=\"width:100%;font-size:16px;padding:0.5rem;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);box-sizing:border-box\">" + opts + "</select>" +
      "<div class=\"mgr-edit-actions\" style=\"margin-top:0.75rem\">" +
        "<button class=\"mgr-edit-cancel cat-del-cancel\">" + lblCancel + "</button>" +
        "<button class=\"mgr-save-btn cat-del-confirm-btn\" style=\"background:var(--red);border-color:var(--red)\">" + lblDel + "</button>" +
      "</div>";

    /* Insert after the list */
    var list = document.getElementById("catManagerList");
    list.parentNode.insertBefore(panel, list.nextSibling);

    panel.querySelector(".cat-del-cancel").addEventListener("click", function() {
      panel.remove();
    });

    panel.querySelector(".cat-del-confirm-btn").addEventListener("click", function() {
      var dest = document.getElementById("catDelDest").value;
      /* Reassign products */
      ps().forEach(function(p) {
        if (p.categoria === cat) { p.categoria = dest; }
      });
      /* Remove from trans maps */
      var trans   = tempCatTrans;
      var reverse = {};
      Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
      if (trans[cat])   { delete trans[cat]; }
      if (reverse[cat]) { delete trans[reverse[cat]]; }
      delete tempCatIcons[cat];
      tempCats.splice(idx, 1);
      panel.remove();
      renderCatMgrList();
      toast((lang === "es" ? count + " productos reasignados a " : count + " products reassigned to ") + displayCat(dest));
    });
  }

  function agregarCategoria() {
    var iconEl   = document.getElementById("catNewIcon");
    var icon     = iconEl ? iconEl.value.trim() : "";
    var nameES   = document.getElementById("catNewNameES").value.trim();
    var nameEN   = document.getElementById("catNewNameEN").value.trim();

    /* Require at least the current language name */
    var nameActive = lang === "es" ? nameES : nameEN;
    if (!nameActive) {
      document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
      return;
    }

    /* If only one language filled, use it as fallback for both */
    if (!nameES) { nameES = nameEN; }
    if (!nameEN) { nameEN = nameES; }

    /* Always store Spanish as primary key */
    var primaryKey = nameES;

    var exists = tempCats.some(function(c) { return c.toLowerCase() === primaryKey.toLowerCase(); });
    if (exists) { toast(tr("toastCatExists")); return; }

    tempCats.push(primaryKey);
    if (icon) { tempCatIcons[primaryKey] = icon; }
    if (nameES !== nameEN) {
      tempCatTrans[nameES] = nameEN; /* always ES → EN */
    }
    if (iconEl) { iconEl.value = ""; }
    document.getElementById("catNewNameES").value = "";
    document.getElementById("catNewNameEN").value = "";
    renderCatMgrList();
    document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
  }

  function guardarCategorias() {
    /* Changes are committed per-row via the ✓ button — no need to capture inputs here */
    document.querySelectorAll("#catManagerList .mgr-icon-input").forEach(function(inp) {
      var i    = parseInt(inp.dataset.iconidx, 10);
      var cat  = tempCats[i];
      var icon = inp.value.trim();
      if (cat) {
        if (icon) { tempCatIcons[cat] = icon; }
        else { delete tempCatIcons[cat]; }
      }
    });

    /* Deduplicate */
    var seen = {};
    tempCats = tempCats.filter(function(c) {
      var k = c.toLowerCase();
      if (seen[k]) { return false; }
      seen[k] = true; return true;
    });
    if (!tempCats.length) { toast(tr("toastMinOne")); return; }

    /* Reassign products whose category was removed */
    var old = cs().slice();
    ps().forEach(function(p) {
      if (tempCats.indexOf(p.categoria) < 0) {
        var i = old.indexOf(p.categoria);
        p.categoria = (i >= 0 && tempCats[i]) ? tempCats[i] : tempCats[0];
      }
    });

    /* Commit to state and save everything in one shot */
    S().categorias = tempCats;
    catTransCache[activeInv] = tempCatTrans;
    catIconsCache[activeInv] = tempCatIcons;
    save(); /* calls saveState which now does one atomic update including caticons */

    filterCats = filterCats.filter(function(c){ return S().categorias.indexOf(c) >= 0; });
    renderFilterBtns(); render(); closeCatMgr(); toast(tr("toastCatUpdated"));
  }
  window.openCatMgr = openCatMgr; window.closeCatMgr = closeCatMgr;
  window.agregarCategoria = agregarCategoria; window.guardarCategorias = guardarCategorias;

  /* ===== UNIT MANAGER ===== */
  var tempUnits = [];
  var tempUnitTrans = {};

  var unitTransCache = { a: {}, b: {} };
  function loadUnitTrans(inv) { return unitTransCache[inv] || {}; }

  function translateUserUnits() {
    ["a","b"].forEach(function(inv) {
      var trans = loadUnitTrans(inv);
      if (!Object.keys(trans).length) { return; }
      var reverse = {};
      Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

      state[inv].unidades = state[inv].unidades.map(function(u) {
        if (lang === "en" && trans[u])   { return trans[u]; }
        if (lang === "es" && reverse[u]) { return reverse[u]; }
        return u;
      });

      state[inv].productos.forEach(function(p) {
        if (lang === "en" && trans[p.unidad])   { p.unidad = trans[p.unidad]; }
        if (lang === "es" && reverse[p.unidad]) { p.unidad = reverse[p.unidad]; }
      });
      /* NOTE: no saveState here — translation is UI-only, not persisted */
    });
  }

  function openUnitMgr() {
    tempUnits     = us().slice();
    tempUnitTrans = Object.assign({}, loadUnitTrans(activeInv));
    renderUnitMgrList();
    document.getElementById("unitNewNameES").value = "";
    document.getElementById("unitNewNameEN").value = "";
    document.getElementById("unitMgrOverlay").classList.add("open");
    setTimeout(function() {
      document.getElementById(lang === "es" ? "unitNewNameES" : "unitNewNameEN").focus();
    }, 150);
  }
  function closeUnitMgr() { document.getElementById("unitMgrOverlay").classList.remove("open"); }
  /* unitMgrOverlay: NO cierra al hacer clic en el fondo */

  function renderUnitMgrList() {
    var list = document.getElementById("unitManagerList");
    if (!tempUnits.length) {
      list.innerHTML = "<div style=\"text-align:center;color:var(--muted);padding:1rem 0\">" + tr("noUnits") + "</div>";
      return;
    }
    var trans   = tempUnitTrans;
    var reverse = {};
    Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

    var h = "";
    for (var i = 0; i < tempUnits.length; i++) {
      var u = tempUnits[i];
      /* Look up translation in both directions */
      var otherName = trans[u] || reverse[u] || "";
      var flagOther = lang === "es" ? "🇬🇧" : "🇪🇸";

      h += "<div class=\"mgr-item mgr-item-view\" data-rowid=\"" + i + "\">";
      h += "<div class=\"mgr-dot\" style=\"background:var(--gold)\"></div>";
      h += "<div class=\"mgr-names-view\">";
      h += "<span class=\"mgr-name-main\">" + escapeHTML(u) + "</span>";
      if (otherName) { h += "<span class=\"mgr-name-other\">" + flagOther + " " + escapeHTML(otherName) + "</span>"; }
      h += "</div>";
      h += "<div class=\"mgr-row-actions\">";
      h += "<button class=\"mgr-edit-btn\" data-editidx=\"" + i + "\" title=\"Editar\">✏️</button>";
      h += "<button class=\"mgr-del\" data-delidx=\"" + i + "\">&#10005;</button>";
      h += "</div></div>";
    }
    list.innerHTML = h;

    list.querySelectorAll(".mgr-edit-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var idx       = parseInt(btn.dataset.editidx, 10);
        var u         = tempUnits[idx];
        var otherName = lang === "es"
          ? (tempUnitTrans[u] || "")
          : (function(){ var rev={}; Object.keys(tempUnitTrans).forEach(function(k){ rev[tempUnitTrans[k]]=k; }); return rev[u]||""; }());
        var flagOther        = lang === "es" ? "🇬🇧" : "🇪🇸";
        var placeholderOther = lang === "es" ? "English" : "Español";
        var titleEdit = lang === "es" ? "Editar unidad" : "Edit unit";
        var lblCancel = lang === "es" ? "Cancelar" : "Cancel";
        var lblSave   = lang === "es" ? "✓ Guardar" : "✓ Save";

        var existing = list.parentNode.querySelector(".mgr-edit-panel");
        if (existing) { existing.remove(); }
        list.querySelectorAll(".mgr-item-view").forEach(function(r){ r.classList.remove("mgr-item-selected"); });
        btn.closest(".mgr-item-view").classList.add("mgr-item-selected");

        var panel = document.createElement("div");
        panel.className = "mgr-edit-panel";
        panel.innerHTML =
          "<div class=\"mgr-edit-panel-title\">" + titleEdit + "</div>" +
          "<input class=\"mgr-edit-input\" type=\"text\" id=\"epUnitName\" value=\"" + escapeHTML(u) + "\" placeholder=\"Nombre\">" +
          "<input class=\"mgr-edit-input\" type=\"text\" id=\"epUnitOther\" value=\"" + escapeHTML(otherName) + "\" placeholder=\"" + flagOther + " " + placeholderOther + "\">" +
          "<div class=\"mgr-edit-actions\">" +
            "<button class=\"btn-cancel mgr-edit-cancel\">" + lblCancel + "</button>" +
            "<button class=\"mgr-save-btn mgr-edit-save\">" + lblSave + "</button>" +
          "</div>";

        list.parentNode.insertBefore(panel, list.nextSibling);
        document.getElementById("epUnitName").focus();

        panel.querySelector(".mgr-edit-cancel").addEventListener("click", function() {
          panel.remove();
          btn.closest(".mgr-item-view").classList.remove("mgr-item-selected");
        });
        panel.querySelector(".mgr-edit-save").addEventListener("click", function() {
          var newName  = document.getElementById("epUnitName").value.trim();
          var newOther = document.getElementById("epUnitOther").value.trim();
          if (!newName) { return; }
          var oldName = tempUnits[idx];

          /* Always normalize to Spanish as primary key */
          var newES, newEN;
          if (lang === "es") {
            newES = newName;
            newEN = newOther;
          } else {
            newES = newOther || newName;
            newEN = newName;
          }
          if (!newES) { newES = newEN; }

          tempUnits[idx] = newES;

          var reverse2 = {};
          Object.keys(tempUnitTrans).forEach(function(es) { reverse2[tempUnitTrans[es]] = es; });
          var oldES = (reverse2[oldName] || oldName);
          delete tempUnitTrans[oldES];
          if (newEN && newEN !== newES) { tempUnitTrans[newES] = newEN; }

          panel.remove();
          list.querySelectorAll(".mgr-item-view").forEach(function(r){ r.classList.remove("mgr-item-selected"); });
          renderUnitMgrList();
          toast(lang === "es" ? "Unidad actualizada" : "Unit updated");
        });
      });
    });

    list.querySelectorAll(".mgr-del").forEach(function(btn) {
      btn.addEventListener("click", function() {
        eliminarTempUnit(parseInt(btn.dataset.delidx, 10));
      });
    });
  }

  function eliminarTempUnit(idx) {
    var u         = tempUnits[idx];
    var affected  = ps().filter(function(p) { return p.unidad === u; });
    var count     = affected.length;
    var otherUnits = tempUnits.filter(function(x, i) { return i !== idx; });

    if (count === 0) {
      openGC({
        icon: "🗑️", title: tr("gcDelUnitTitle"),
        msg1: tr("gcDelMsg1Unit"), name: '"' + escapeHTML(displayUnit(u)) + '"?',
        msg2: tr("gcDelMsg2NoUse"),
        confirmLabel: tr("delConfirm"), cancelLabel: tr("cancel"),
        onConfirm: function() {
          var trans   = tempUnitTrans;
          var reverse = {};
          Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
          if (trans[u])   { delete trans[u]; }
          if (reverse[u]) { delete trans[reverse[u]]; }
          tempUnits.splice(idx, 1);
          renderUnitMgrList();
        }
      });
      return;
    }

    if (otherUnits.length === 0) {
      toast(lang === "es" ? "No puedes eliminar la única unidad" : "Cannot delete the only unit");
      return;
    }

    var existing = document.querySelector(".unit-del-confirm");
    if (existing) { existing.remove(); }

    var panel = document.createElement("div");
    panel.className = "mgr-edit-panel unit-del-confirm";
    var titleEl   = lang === "es" ? "⚠️ Eliminar unidad" : "⚠️ Delete unit";
    var msgEl     = lang === "es"
      ? count + " producto(s) serán reasignados a:"
      : count + " product(s) will be reassigned to:";
    var lblCancel = lang === "es" ? "Cancelar" : "Cancel";
    var lblDel    = lang === "es" ? "🗑️ Eliminar" : "🗑️ Delete";

    var opts = otherUnits.map(function(x) {
      return "<option value=\"" + escapeHTML(x) + "\">" + escapeHTML(displayUnit(x)) + "</option>";
    }).join("");

    panel.innerHTML =
      "<div class=\"mgr-edit-panel-title\" style=\"color:var(--red)\">" + titleEl + "</div>" +
      "<div style=\"font-size:0.85rem;color:var(--text);margin-bottom:0.4rem\">" + msgEl + "</div>" +
      "<select id=\"unitDelDest\" style=\"width:100%;font-size:16px;padding:0.5rem;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);box-sizing:border-box\">" + opts + "</select>" +
      "<div class=\"mgr-edit-actions\" style=\"margin-top:0.75rem\">" +
        "<button class=\"mgr-edit-cancel unit-del-cancel\">" + lblCancel + "</button>" +
        "<button class=\"mgr-save-btn unit-del-confirm-btn\" style=\"background:var(--red);border-color:var(--red)\">" + lblDel + "</button>" +
      "</div>";

    var list = document.getElementById("unitManagerList");
    list.parentNode.insertBefore(panel, list.nextSibling);

    panel.querySelector(".unit-del-cancel").addEventListener("click", function() { panel.remove(); });

    panel.querySelector(".unit-del-confirm-btn").addEventListener("click", function() {
      var dest = document.getElementById("unitDelDest").value;
      ps().forEach(function(p) { if (p.unidad === u) { p.unidad = dest; } });
      var trans   = tempUnitTrans;
      var reverse = {};
      Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
      if (trans[u])   { delete trans[u]; }
      if (reverse[u]) { delete trans[reverse[u]]; }
      tempUnits.splice(idx, 1);
      panel.remove();
      renderUnitMgrList();
      toast((lang === "es" ? count + " productos reasignados a " : count + " products reassigned to ") + displayUnit(dest));
    });
  }

  function agregarUnidad() {
    var nameES = document.getElementById("unitNewNameES").value.trim();
    var nameEN = document.getElementById("unitNewNameEN").value.trim();
    var nameActive = lang === "es" ? nameES : nameEN;
    if (!nameActive) {
      document.getElementById(lang === "es" ? "unitNewNameES" : "unitNewNameEN").focus();
      return;
    }
    if (!nameES) { nameES = nameEN; }
    if (!nameEN) { nameEN = nameES; }

    /* Always store Spanish as primary key */
    var primaryKey = nameES;

    var exists = tempUnits.some(function(u) { return u.toLowerCase() === primaryKey.toLowerCase(); });
    if (exists) { toast(tr("toastUnitExists")); return; }

    tempUnits.push(primaryKey);
    if (nameES !== nameEN) {
      tempUnitTrans[nameES] = nameEN; /* always ES → EN */
    }
    document.getElementById("unitNewNameES").value = "";
    document.getElementById("unitNewNameEN").value = "";
    renderUnitMgrList();
    document.getElementById(lang === "es" ? "unitNewNameES" : "unitNewNameEN").focus();
  }

  function guardarUnidades() {
    /* Changes are committed per-row via the ✓ button */
    var seen = {};
    tempUnits = tempUnits.filter(function(u) {
      var k = u.toLowerCase();
      if (seen[k]) { return false; }
      seen[k] = true; return true;
    });
    if (!tempUnits.length) { toast(tr("toastMinOne")); return; }
    var old = us().slice();
    ps().forEach(function(p) {
      if (tempUnits.indexOf(p.unidad) < 0) {
        var i = old.indexOf(p.unidad);
        p.unidad = (i >= 0 && tempUnits[i]) ? tempUnits[i] : tempUnits[0];
      }
    });
    S().unidades = tempUnits;
    unitTransCache[activeInv] = tempUnitTrans;
    save(); /* unified atomic save — no separate saveUnitTransFB needed */
    render(); closeUnitMgr(); toast(tr("toastUnitUpdated"));
  }
  window.openUnitMgr    = openUnitMgr; window.closeUnitMgr  = closeUnitMgr;
  window.agregarUnidad  = agregarUnidad; window.guardarUnidades = guardarUnidades;

  /* ===== PRINT / PDF ===== */
  var PCSS = "body{font-family:Arial,sans-serif;color:#111;background:#fff;padding:2cm;}" +
    ".pp-header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #111;padding-bottom:0.8rem;margin-bottom:0.6rem;}" +
    ".pp-logo-title{font-size:22pt;font-weight:900;}" +
    ".pp-logo-sub{font-size:7pt;color:#666;text-transform:uppercase;margin-top:3px;}" +
    ".pp-inv-type{font-size:8pt;font-weight:700;margin-top:5px;text-transform:uppercase;}" +
    ".pp-meta{text-align:right;font-size:8pt;color:#555;line-height:1.7;}" +
    ".pp-summary{display:flex;gap:2rem;padding:0.4rem 0 0.6rem;font-size:8pt;color:#555;border-bottom:1px solid #ddd;margin-bottom:0.6rem;}" +
    ".pp-summary strong{color:#222;}" +
    ".pp-table{width:100%;border-collapse:collapse;font-size:9pt;}" +
    ".pp-table thead{background:#f0f0f0;}" +
    ".pp-table th{padding:5px 8px;font-size:7pt;color:#444;text-transform:uppercase;border-bottom:2px solid #999;font-weight:600;text-align:left;}" +
    ".pp-table td{padding:5px 8px;border-bottom:1px solid #e0e0e0;color:#111;}" +
    ".pp-table tr:last-child td{border-bottom:2px solid #999;}" +
    ".pp-table tr:nth-child(even) td{background:#fafafa;}" +
    ".pp-badge{font-size:7pt;padding:2px 4px;border:1px solid #ccc;color:#444;}" +
    ".pp-ok{color:#1a6e3a;font-weight:700;}" +
    ".pp-warn{color:#8a6000;font-weight:700;}" +
    ".pp-danger{color:#b02020;font-weight:700;}" +
    ".pp-footer{display:flex;justify-content:space-between;margin-top:1rem;font-size:7pt;color:#999;border-top:1px solid #ddd;padding-top:0.5rem;}";

  function getReportFilters() {
    return {
      content: document.getElementById("reportFilter").value  || "todos",
      subcat:  document.getElementById("reportSubcat").value  || "todos",
      cat:     document.getElementById("reportCat").value     || "todos"
    };
  }

  function updateReportCatSelect() {
    var subcatVal = document.getElementById("reportSubcat").value || "todos";
    var catSel    = document.getElementById("reportCat");
    var allProds  = ps();
    var filtered  = subcatVal === "todos"
      ? allProds
      : allProds.filter(function(p){ return p.subcategoria === subcatVal; });

    var cats = [];
    cs().forEach(function(c) {
      if (filtered.some(function(p){ return p.categoria === c; })) { cats.push(c); }
    });

    var h = "<option value=\"todos\">" + tr("rCatAll") + "</option>";
    cats.forEach(function(c) {
      var icon = catIcon(c);
      h += "<option value=\"" + escapeHTML(c) + "\">" + (icon ? icon + " " : "") + escapeHTML(c) + "</option>";
    });
    catSel.innerHTML = h;
  }

  function refreshReport() {
    updateReportCatSelect();
    var filters = getReportFilters();
    document.getElementById("previewPage").innerHTML = buildReport(filters);
  }

  function abrirVistaPrevia() {
    /* Rebuild subcat options in current language */
    var reportSubcat = document.getElementById("reportSubcat");
    if (reportSubcat) {
      var sh = "<option value=\"todos\">" + tr("rSubcatAll") + "</option>";
      SUBCATS.forEach(function(s) {
        sh += "<option value=\"" + s.id + "\">" + s.iconES + " " + (lang === "es" ? s.labelES : s.labelEN) + "</option>";
      });
      reportSubcat.innerHTML = sh;
    }
    /* Reset cat options */
    var reportCat = document.getElementById("reportCat");
    if (reportCat) {
      reportCat.innerHTML = "<option value=\"todos\">" + tr("rCatAll") + "</option>";
    }
    document.getElementById("reportFilter").value = "todos";
    document.getElementById("reportSubcat").value = "todos";
    updateReportCatSelect();
    document.getElementById("previewPage").innerHTML = buildReport({ content:"todos", subcat:"todos", cat:"todos" });
    document.getElementById("printPreviewOverlay").classList.add("open");
  }

  function cerrarVistaPrevia() { document.getElementById("printPreviewOverlay").classList.remove("open"); }
  /* printPreviewOverlay: NO cierra al hacer clic en el fondo — usar X */

  function imprimirDesdePrevia() {
    var pd = document.getElementById("printDoc");
    pd.innerHTML = "<style>" + PCSS + "</style>" + buildReport(getReportFilters());
    window.print();
    setTimeout(function(){ pd.innerHTML = ""; }, 1500);
  }

  function descargarPDF() {
    var filters = getReportFilters();
    var loc     = lang === "es" ? "es-MX" : "en-US";
    var fecha   = now.toLocaleDateString(loc,{day:"2-digit",month:"long",year:"numeric"}).replace(/\s/g,"_");
    var key     = activeInv === "a" ? "MP" : "PT";
    var sufijo  = filters.content === "bajo" ? "_BajoStock" : "";
    if (filters.subcat !== "todos") { sufijo += "_" + filters.subcat; }
    if (filters.cat    !== "todos") { sufijo += "_" + filters.cat; }
    var html = "<!DOCTYPE html><html lang=\"" + lang + "\"><head><meta charset=\"UTF-8\">" +
      "<title>Afghan Kabob &amp; Grill - " + (activeInv === "a" ? tr("invA") : tr("invB")) + "</title>" +
      "<style>" + PCSS + "</style></head><body>" + buildReport(filters) + "</body></html>";
    var blob = new Blob([html], { type:"text/html;charset=utf-8" });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement("a");
    a.href = url; a.download = "Inventario_" + key + sufijo + "_" + fecha + ".html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
    toast(tr("toastPDF"));
  }

  function buildReport(filters) {
    if (typeof filters === "string") { filters = { content: filters, subcat: "todos", cat: "todos" }; }
    var content = filters.content || "todos";
    var subcat  = filters.subcat  || "todos";
    var cat     = filters.cat     || "todos";

    /* Apply all filters */
    var allSorted = ps().slice().sort(function(a,b){
      var r = a.categoria.localeCompare(b.categoria);
      return r !== 0 ? r : a.nombre.localeCompare(b.nombre);
    });

    var sorted = allSorted.filter(function(x) {
      var matchSubcat  = subcat  === "todos" || x.subcategoria === subcat;
      var matchCat     = cat     === "todos" || x.categoria    === cat;
      var matchContent = content === "todos" || x.cantidad < x.minimo;
      return matchSubcat && matchCat && matchContent;
    });

    /* Build filter label for report header */
    var filterParts = [];
    if (subcat !== "todos") {
      var s = SUBCATS.find(function(x){ return x.id === subcat; });
      if (s) { filterParts.push(lang === "es" ? s.labelES : s.labelEN); }
    }
    if (cat !== "todos") { filterParts.push(cat); }
    if (content === "bajo") { filterParts.push(lang === "es" ? "Solo bajo stock / agotados" : "Low stock & out of stock"); }
    var filterLabel = filterParts.join(" · ");

    var total = sorted.length;
    var low   = sorted.filter(function(x){ return x.cantidad > 0 && x.cantidad < x.minimo; }).length;
    var out   = sorted.filter(function(x){ return x.cantidad === 0; }).length;
    var loc   = lang === "es" ? "es-MX" : "en-US";
    var fecha = now.toLocaleDateString(loc,{day:"2-digit",month:"long",year:"numeric"});
    var hora  = now.toLocaleTimeString(loc,{hour:"2-digit",minute:"2-digit"});
    var invName  = activeInv === "a" ? tr("invA") : tr("invB");
    var invColor = activeInv === "a" ? "#1a4a8a" : "#27845a";
    var thP  = lang === "es" ? "Producto"   : "Product";
    var thC  = lang === "es" ? "Categoria"  : "Category";
    var thD  = lang === "es" ? "Diferencia" : "Difference";
    var thU  = lang === "es" ? "Unidad"     : "Unit";
    var thSt = lang === "es" ? "Estado"     : "Status";

    var rows = "";
    sorted.forEach(function(x) {
      var st       = stockStatus(x);
      var stL      = {ok:tr("ppNormal"), warn:tr("ppLow"), danger:tr("ppOut")}[st];
      var stC      = {ok:"pp-ok", warn:"pp-warn", danger:"pp-danger"}[st];
      var diff     = x.cantidad - x.minimo;
      var diffSign = diff > 0 ? "+" : "";
      var diffStyle = diff > 0 ? "color:#1a6e3a;font-weight:700;"
        : diff === 0 ? "color:#555;" : "color:#b02020;font-weight:700;";
      rows += "<tr>";
      rows += "<td><strong>" + escapeHTML(displayName(x)) + "</strong></td>";
      rows += "<td><span class=\"pp-badge\">" + escapeHTML(displayCat(x.categoria)) + "</span></td>";
      rows += "<td><strong>" + x.cantidad + "</strong></td>";
      rows += "<td style=\"" + diffStyle + "\">" + diffSign + diff + "</td>";
      rows += "<td>" + escapeHTML(displayUnit(x.unidad)) + "</td>";
      rows += "<td class=\"" + stC + "\">" + stL + "</td>";
      rows += "</tr>";
    });

    var emptyMsg = sorted.length === 0
      ? "<tr><td colspan=\"6\" style=\"text-align:center;padding:1.5rem;color:#888;\">" +
        (lang === "es" ? "No hay productos con estos filtros." : "No products match these filters.") + "</td></tr>"
      : rows;

    return "<div class=\"pp-header\"><div>" +
      "<div class=\"pp-logo-title\">Afghan Kabob &amp; Grill</div>" +
      "<div class=\"pp-logo-sub\">" + tr("reportTitle") + "</div>" +
      (filterLabel ? "<div class=\"pp-filter-label\">" + escapeHTML(filterLabel) + "</div>" : "") +
      "<div class=\"pp-inv-type\" style=\"color:" + invColor + "\">" + invName + "</div></div>" +
      "<div class=\"pp-meta\">" + tr("reportDate") + " " + fecha + "<br>" + tr("reportTime") + " " + hora + "</div></div>" +
      "<div class=\"pp-summary\">" +
      "<span>" + tr("reportTotal") + " <strong>" + total + "</strong></span>" +
      "<span>" + tr("reportLow")   + " <strong>" + low   + "</strong></span>" +
      "<span>" + tr("reportOut")   + " <strong>" + out   + "</strong></span></div>" +
      "<div class=\"pp-table-wrap\"><table class=\"pp-table\"><thead><tr>" +
      "<th>" + thP + "</th><th>" + thC + "</th><th>Stock</th><th>" + thD + "</th><th>" + thU + "</th><th>" + thSt + "</th>" +
      "</tr></thead><tbody>" + emptyMsg + "</tbody></table></div>" +
      "<div class=\"pp-footer\"><span>Afghan Kabob &amp; Grill &middot; " + invName + "</span><span>" + tr("ppLegend") + "</span></div>";
  }
  window.abrirVistaPrevia=abrirVistaPrevia; window.cerrarVistaPrevia=cerrarVistaPrevia;
  window.imprimirDesdePrevia=imprimirDesdePrevia; window.descargarPDF=descargarPDF;

  /* Wire report filter changes */
  var reportFilter = document.getElementById("reportFilter");
  var reportSubcat = document.getElementById("reportSubcat");
  var reportCat    = document.getElementById("reportCat");
  if (reportFilter) { reportFilter.addEventListener("change", refreshReport); }
  if (reportSubcat) { reportSubcat.addEventListener("change", refreshReport); }
  if (reportCat)    { reportCat.addEventListener("change",    function() { document.getElementById("previewPage").innerHTML = buildReport(getReportFilters()); }); }

  /* ===== TOAST ===== */
  var toastTimer;
  function toast(msg) {
    var el=document.getElementById("toast");
    el.textContent=msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){el.classList.remove("show");},3000);
  }

  /* ===== CONTEXT MENU ===== */
  function openCtxMenu(btn) {
    var menu = document.getElementById("ctx-" + btn.dataset.id);
    document.querySelectorAll(".ctx-menu.open").forEach(function(m) {
      if (m !== menu) { m.classList.remove("open"); }
    });
    if (!menu) { return; }
    var wasOpen = menu.classList.contains("open");
    menu.classList.toggle("open");
    if (!wasOpen) {
      var rect       = btn.getBoundingClientRect();
      var menuH      = menu.offsetHeight || 140;
      var spaceBelow = window.innerHeight - rect.bottom - 8;
      var spaceAbove = rect.top - 8;
      if (spaceBelow < menuH && spaceAbove > spaceBelow) { menu.classList.add("ctx-menu-up"); }
      else { menu.classList.remove("ctx-menu-up"); }
    }
  }

  /* iOS: touchend on document for ctx buttons not caught by direct listeners */
  document.addEventListener("touchend", function(e) {
    var btn = e.target.closest("button[data-action='ctx']");
    if (!btn) { return; }
    e.preventDefault();
    openCtxMenu(btn);
  }, { passive: false });

  document.addEventListener("click", function(e) {
    /* Close context menus on outside click */
    if (!e.target.closest(".ctx-wrap")) {
      document.querySelectorAll(".ctx-menu.open").forEach(function(m){ m.classList.remove("open"); });
    }

    var btn = e.target.closest("button[data-action]");
    if (!btn) { return; }
    var id     = parseInt(btn.dataset.id, 10);
    var action = btn.dataset.action;

    /* Context menu toggle */
    if (action === "ctx") {
      e.stopPropagation();
      openCtxMenu(btn);
      return;
    }

    /* Info panel */
    if (action === "info") {
      document.querySelectorAll(".ctx-menu.open").forEach(function(m){ m.classList.remove("open"); });
      var p2 = ps().find(function(x){ return x.id === id; });
      if (!p2) { return; }
      var loc  = lang==="es"?"es-MX":"en-US";
      var when = p2.updatedAt
        ? new Date(p2.updatedAt).toLocaleString(loc,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})
        : (lang==="es"?"Sin registro":"No record");
      var who  = p2.updatedBy || (lang==="es"?"Sistema":"System");
      openGC({
        icon:"ℹ️",
        title: lang==="es"?"Última actualización":"Last update",
        msg1: displayName(p2),
        name: "🕐 "+when,
        msg2: "👤 "+(lang==="es"?"Usuario":"User")+": "+who,
        confirmLabel: lang==="es"?"Cerrar":"Close",
        onConfirm: function() {}
      });
      return;
    }

    if (action === "edit") { editarProducto(id); }
    if (action === "adj")  { openAdj(id); }
    if (action === "del")  { abrirDelModal(id); }
  });

  /* ===== FORCE LIGHT MODE via JS (backup for browsers ignoring CSS) ===== */
  function forceLightMode() {
    var isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.style.colorScheme = "light";
      document.body.style.background  = "#eef2ee";
      document.body.style.color       = "#1a231a";
    }
  }
  forceLightMode();
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", forceLightMode);
  }

  /* Diagnostic: check localStorage is working and data persists */
  console.log("[Inventario] Origen: " + window.location.origin + " | Puerto: " + window.location.port);
  console.log("[Inventario] localStorage OK:", (function() {
    try { localStorage.setItem("_t","1"); localStorage.removeItem("_t"); return true; }
    catch(e) { return false; }
  })());

  document.getElementById("tabA").className="inv-tab"+(activeInv==="a"?" active-a":"");
  document.getElementById("tabB").className="inv-tab"+(activeInv==="b"?" active-b":"");

  /* Wire up all buttons (onclick removed from HTML for validation compliance) */
  function wire(id, fn) {
    var el = document.getElementById(id);
    if (el) { el.addEventListener("click", fn); }
  }

  /* Header */
  wire("btnLang",  toggleLang);
  wire("btnPrint", abrirVistaPrevia);

  /* Inventory tabs */
  wire("tabA", function() { switchInventory("a"); });
  wire("tabB", function() { switchInventory("b"); });

  /* Stats filter cards */
  wire("cardTotal", function() { setStatusFilter("todos"); });
  wire("cardLow",   function() { setStatusFilter("warn"); });
  wire("cardOut",   function() { setStatusFilter("danger"); });

  /* Keyboard support for stat cards (role=button) */
  ["cardTotal","cardLow","cardOut"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
      });
    }
  });

  /* Toolbar */
  wire("btnAgregar", function() { openModal(); });
  wire("btnCatMgr",  openCatMgr);
  wire("btnUnitMgr", openUnitMgr);

  /* Product modal */
  wire("btnCloseAdj",  closeAdj);
  wire("btnAdjCancel", closeAdj);
  wire("btnAdjConfirm", confirmarAjuste);
  wire("tabEntrada", function() { setAdjMode("entrada"); });
  wire("tabSalida",  function() { setAdjMode("salida"); });
  wire("tabFijar",   function() { setAdjMode("directo"); });
  document.getElementById("adjQty").addEventListener("input", updatePreview);
  wire("btnCloseModal", closeModal);
  wire("btnModalCancel", closeModal);
  wire("btnModalSave",   guardarProducto);

  /* Adjust stock modal */

  /* Delete modal */
  wire("btnDelCancel",  closeDelModal);
  wire("btnDelConfirm", confirmarEliminar);

  /* Category manager */
  wire("btnCloseCatMgr", closeCatMgr);
  wire("btnCatCancel",   closeCatMgr);
  wire("btnCatSave",     guardarCategorias);
  wire("btnAgregarCat",  agregarCategoria);
  document.getElementById("catNewNameES").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { agregarCategoria(); }
  });
  document.getElementById("catNewNameEN").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { agregarCategoria(); }
  });

  /* Unit manager */
  wire("btnCloseUnitMgr", closeUnitMgr);
  wire("btnUnitCancel",   closeUnitMgr);
  wire("btnUnitSave",     guardarUnidades);
  wire("btnAgregarUnit",  agregarUnidad);
  document.getElementById("unitNewNameES").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { agregarUnidad(); }
  });
  document.getElementById("unitNewNameEN").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { agregarUnidad(); }
  });

  /* Generic confirm */
  wire("gcBtnCancel",  closeGC);

  /* Print preview */
  wire("hPreviewClose", cerrarVistaPrevia);
  wire("hPreviewPDF",   descargarPDF);
  wire("hPreviewPrint", imprimirDesdePrevia);
  document.getElementById("reportFilter").addEventListener("change", function() {
    document.getElementById("previewPage").innerHTML = buildReport(this.value);
  });

  /* Search */
  /* Search with debounce — avoids re-rendering on every keystroke */
  var searchTimer;
  document.getElementById("searchInput").addEventListener("input", function() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 150);
  });

  /* Table sort headers — delegated since th has no id for sort direction */
  document.getElementById("thNombre").addEventListener("click",   function(){ sortBy("nombre"); });
  document.getElementById("thCategoria").addEventListener("click", function(){ sortBy("categoria"); });
  document.getElementById("thCantidad").addEventListener("click",  function(){ sortBy("cantidad"); });
  document.getElementById("thMinimo").addEventListener("click",    function(){ sortBy("minimo"); });

  /* ===== HISTORIAL DE AUDITORÍA ===== */
  var historialOpen = false;
  var historialFilter = "todos";

  function openHistorial() {
    historialOpen = true;
    document.getElementById("historialPanel").classList.add("open");
    document.getElementById("historialBackdrop").classList.remove("hidden-initially");
    document.getElementById("historialBackdrop").style.display = "";
    loadHistorial();
  }
  function closeHistorial() {
    historialOpen = false;
    document.getElementById("historialPanel").classList.remove("open");
    document.getElementById("historialBackdrop").classList.add("hidden-initially");
    document.getElementById("historialBackdrop").style.display = "none";
  }

  function loadHistorial() {
    var list = document.getElementById("historialList");
    list.innerHTML = "<div class='hist-loading'>Cargando...</div>";
    db.ref("historial").orderByChild("ts").limitToLast(200).once("value").then(function(snap) {
      var entries = [];
      snap.forEach(function(child) { entries.push(child.val()); });
      entries.reverse();
      renderHistorialList(entries);
    }).catch(function() {
      list.innerHTML = "<div class='hist-empty'>Error al cargar el historial</div>";
    });
  }

  function renderHistorialList(entries) {
    var list = document.getElementById("historialList");
    var isAdmin = currentUser && currentUser.role === "admin";
    var filtered = entries.filter(function(e) {
      if (historialFilter === "todos")   { return true; }
      if (historialFilter === "stock")   { return e.accion && (e.accion.indexOf("Entrada") >= 0 || e.accion.indexOf("Salida") >= 0 || e.accion.indexOf("Ajuste") >= 0); }
      if (historialFilter === "edicion") { return e.accion && (e.accion.indexOf("Editado") >= 0 || e.accion.indexOf("Agregado") >= 0 || e.accion.indexOf("Eliminado") >= 0); }
      return true;
    });
    if (!isAdmin) {
      var cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(function(e) { return e.ts >= cutoff; });
    }
    if (!filtered.length) {
      list.innerHTML = "<div class='hist-empty'>Sin registros</div>";
      return;
    }
    var h = "";
    var lastDate = "";
    filtered.forEach(function(e) {
      var d = new Date(e.ts);
      var loc = lang === "es" ? "es-MX" : "en-US";
      var dateStr = d.toLocaleDateString(loc, { weekday:"long", day:"numeric", month:"long" });
      var timeStr = d.toLocaleTimeString(loc, { hour:"2-digit", minute:"2-digit" });
      if (dateStr !== lastDate) {
        h += "<div class='hist-date-sep'>" + escapeHTML(dateStr) + "</div>";
        lastDate = dateStr;
      }
      var accionClass = "hist-accion-default";
      if (e.accion) {
        if (e.accion.indexOf("Entrada") >= 0)  { accionClass = "hist-accion-entrada"; }
        else if (e.accion.indexOf("Salida") >= 0)   { accionClass = "hist-accion-salida"; }
        else if (e.accion.indexOf("Eliminado") >= 0) { accionClass = "hist-accion-del"; }
        else if (e.accion.indexOf("Agregado") >= 0)  { accionClass = "hist-accion-add"; }
        else if (e.accion.indexOf("Ajuste") >= 0)    { accionClass = "hist-accion-adj"; }
      }
      h += "<div class='hist-entry'>";
      h += "<div class='hist-entry-left'>";
      h += "<span class='hist-accion " + accionClass + "'>" + escapeHTML(e.accion || "") + "</span>";
      h += "<span class='hist-detalles'>" + escapeHTML(e.detalles || "") + "</span>";
      h += "<span class='hist-inv-badge'>" + escapeHTML(e.inv || "") + "</span>";
      h += "</div>";
      h += "<div class='hist-entry-right'>";
      h += "<span class='hist-usuario'>" + escapeHTML(e.usuario || "") + "</span>";
      h += "<span class='hist-time'>" + escapeHTML(timeStr) + "</span>";
      h += "</div></div>";
    });
    if (isAdmin) {
      h += "<div class='hist-export-row'><button class='hist-export-btn' id='btnExportHistorial'>⬇ Exportar CSV</button></div>";
    }
    list.innerHTML = h;
    if (isAdmin) {
      var eb = document.getElementById("btnExportHistorial");
      if (eb) { eb.addEventListener("click", function() { exportHistorialCSV(entries); }); }
    }
  }

  function exportHistorialCSV(entries) {
    var rows = ["Fecha,Hora,Usuario,Inventario,Accion,Detalles"];
    entries.forEach(function(e) {
      var d = new Date(e.ts);
      var loc = lang === "es" ? "es-MX" : "en-US";
      var row = [
        d.toLocaleDateString(loc),
        d.toLocaleTimeString(loc, { hour:"2-digit", minute:"2-digit" }),
        e.usuario||"", e.inv||"", e.accion||"", e.detalles||""
      ].map(function(v) { return '"' + String(v).replace(/"/g,'""') + '"'; }).join(",");
      rows.push(row);
    });
    var blob = new Blob([rows.join("\n")], { type:"text/csv;charset=utf-8;" });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement("a"); a.href=url;
    a.download = "historial_afghankabob_" + new Date().toISOString().slice(0,10) + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 3000);
  }

  var btnExtendSession = document.getElementById("btnExtendSession");
  if (btnExtendSession) {
    btnExtendSession.addEventListener("click", function() {
      resetInactivityTimer();
    });
  }

  var btnHistorial = document.getElementById("btnHistorial");
  if (btnHistorial) { btnHistorial.addEventListener("click", openHistorial); }

  /* Use document-level delegation for all modal close buttons and historial filters */
  document.addEventListener("click", function(e) {
    if (e.target.closest("#btnCloseHistorial")) { closeHistorial(); }
    if (e.target.id === "historialBackdrop")    { closeHistorial(); }
    if (e.target.closest("#btnCloseAdmin"))     { closeAdminPanel(); }
    if (e.target.closest("#btnCloseChpass"))    { closeChpass(); }
    if (e.target.closest("#btnChpassCancel"))   { closeChpass(); }
    if (e.target.closest("#btnChpassSave"))     { saveChpass(); }
    if (e.target.closest("#btnNewUserCancel"))  { showAdminTab("usuarios"); }
    if (e.target.closest("#btnCreateUser"))     { createUser(); }
    /* adminOverlay and chpassOverlay: NO cierran al hacer clic en el fondo */

    /* Historial filter buttons */
    var filterBtn = e.target.closest(".hist-filter-btn");
    if (filterBtn) {
      historialFilter = filterBtn.dataset.filter;
      document.querySelectorAll(".hist-filter-btn").forEach(function(b) {
        b.classList.toggle("active", b.dataset.filter === historialFilter);
      });
      loadHistorial();
    }

    /* Admin tabs */
    var adminTab = e.target.closest(".admin-tab");
    if (adminTab && adminTab.dataset.tab) { showAdminTab(adminTab.dataset.tab); }
  });

  applyLang();

  /* Auth module calls listenFirebase() after successful login */

})();