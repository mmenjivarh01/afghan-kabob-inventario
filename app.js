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
      gcDelMsg2Use:"Los productos afectados seran reasignados. Esta accion no se puede deshacer."
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
      gcDelMsg2Use:"Affected products will be reassigned. This action cannot be undone."
    }
  };

  var lang = localStorage.getItem("inv_lang") || "es";
  function tr(k) { return (T[lang] && T[lang][k]) ? T[lang][k] : k; }

  /* ===== DATA ===== */
  var activeInv = localStorage.getItem("inv_active") || "a";

  /* Datos predeterminados en ESPAÑOL */
  var DEFAULTS_ES = {
    a: {
      productos: [
        {id:1,nombre:"Pechuga de pollo",  categoria:"Carnes",         cantidad:8, minimo:5, unidad:"kg"},
        {id:2,nombre:"Res molida",         categoria:"Carnes",         cantidad:3, minimo:4, unidad:"kg"},
        {id:3,nombre:"Jitomate",           categoria:"Verduras",       cantidad:12,minimo:6, unidad:"kg"},
        {id:4,nombre:"Cebolla blanca",     categoria:"Verduras",       cantidad:5, minimo:3, unidad:"kg"},
        {id:5,nombre:"Queso manchego",     categoria:"Lacteos",        cantidad:2, minimo:3, unidad:"kg"},
        {id:6,nombre:"Leche entera",       categoria:"Lacteos",        cantidad:0, minimo:6, unidad:"L"},
        {id:7,nombre:"Arroz blanco",       categoria:"Granos",         cantidad:15,minimo:10,unidad:"kg"},
        {id:8,nombre:"Frijol negro",       categoria:"Granos",         cantidad:7, minimo:5, unidad:"kg"},
        {id:9,nombre:"Aceite vegetal",     categoria:"Otros",          cantidad:4, minimo:3, unidad:"L"}
      ],
      categorias:["Carnes","Verduras","Lacteos","Bebidas","Granos","Otros"],
      unidades:  ["kg","g","L","ml","piezas","cajas","bolsas"]
    },
    b: {
      productos: [
        {id:1,nombre:"Caldo de pollo",    categoria:"Sopas",          cantidad:20,minimo:10,unidad:"L"},
        {id:2,nombre:"Salsa roja",         categoria:"Salsas",         cantidad:5, minimo:8, unidad:"L"},
        {id:3,nombre:"Pan de mesa",        categoria:"Panaderia",      cantidad:0, minimo:12,unidad:"piezas"},
        {id:4,nombre:"Tortillas maiz",     categoria:"Panaderia",      cantidad:50,minimo:30,unidad:"piezas"},
        {id:5,nombre:"Agua embotellada",   categoria:"Bebidas",        cantidad:48,minimo:24,unidad:"piezas"}
      ],
      categorias:["Sopas","Salsas","Panaderia","Bebidas","Platos fuertes","Postres"],
      unidades:  ["piezas","L","kg","porciones","cajas","bolsas"]
    }
  };

  /* Datos predeterminados en INGLES */
  var DEFAULTS_EN = {
    a: {
      productos: [
        {id:1,nombre:"Chicken breast",    categoria:"Meats",          cantidad:8, minimo:5, unidad:"kg"},
        {id:2,nombre:"Ground beef",        categoria:"Meats",          cantidad:3, minimo:4, unidad:"kg"},
        {id:3,nombre:"Tomato",             categoria:"Vegetables",     cantidad:12,minimo:6, unidad:"kg"},
        {id:4,nombre:"White onion",        categoria:"Vegetables",     cantidad:5, minimo:3, unidad:"kg"},
        {id:5,nombre:"Manchego cheese",    categoria:"Dairy",          cantidad:2, minimo:3, unidad:"kg"},
        {id:6,nombre:"Whole milk",         categoria:"Dairy",          cantidad:0, minimo:6, unidad:"L"},
        {id:7,nombre:"White rice",         categoria:"Grains",         cantidad:15,minimo:10,unidad:"kg"},
        {id:8,nombre:"Black beans",        categoria:"Grains",         cantidad:7, minimo:5, unidad:"kg"},
        {id:9,nombre:"Vegetable oil",      categoria:"Other",          cantidad:4, minimo:3, unidad:"L"}
      ],
      categorias:["Meats","Vegetables","Dairy","Beverages","Grains","Other"],
      unidades:  ["kg","g","L","ml","pieces","boxes","bags"]
    },
    b: {
      productos: [
        {id:1,nombre:"Chicken broth",     categoria:"Soups",          cantidad:20,minimo:10,unidad:"L"},
        {id:2,nombre:"Red sauce",          categoria:"Sauces",         cantidad:5, minimo:8, unidad:"L"},
        {id:3,nombre:"Table bread",        categoria:"Bakery",         cantidad:0, minimo:12,unidad:"pieces"},
        {id:4,nombre:"Corn tortillas",     categoria:"Bakery",         cantidad:50,minimo:30,unidad:"pieces"},
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
    if (filterCat !== "todos" && cs().indexOf(filterCat) < 0) {
      filterCat = "todos";
    }
  }

  /* ===== FIREBASE DATABASE REFERENCE ===== */
  if (!window.firebase || !window.firebase.database) {
    console.error("[Inventario] Firebase no cargo correctamente. Verifica tu conexion a internet.");
    document.getElementById("loadingText").textContent =
      "Error: no se pudo conectar con Firebase. Verifica tu conexion.";
    document.getElementById("loadingText").style.color = "#c0392b";
    return; /* Stop execution of the IIFE */
  }

  var db;
  try {
    db = firebase.database();
  } catch(e) {
    console.error("[Inventario] Error al inicializar Firebase:", e);
    document.getElementById("loadingText").textContent =
      "Error al inicializar la base de datos. Recarga la pagina.";
    document.getElementById("loadingText").style.color = "#c0392b";
    return;
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

    /* Convert productos array to object: { "id_1": {...}, "id_2": {...} } */
    var prodsObj = {};
    if (state[inv].productos.length === 0) {
      prodsObj["__empty__"] = true; /* marker so node is not deleted by Firebase */
    } else {
      state[inv].productos.forEach(function(p) {
        prodsObj["id_" + p.id] = p;
      });
    }

    /* Convert categorias array to object: { "0": "Carnes", "1": "Verduras" } */
    var catsObj = {};
    state[inv].categorias.forEach(function(c, i) { catsObj["c" + i] = c; });

    /* Convert unidades array to object: { "0": "kg", "1": "L" } */
    var unitsObj = {};
    state[inv].unidades.forEach(function(u, i) { unitsObj["u" + i] = u; });

    dbRef(inv, "productos").set(prodsObj).catch(function(e) {
      console.error("[Inventario] Error guardando productos:", e);
      toast("Error al guardar. Verifica tu conexion.");
    });
    dbRef(inv, "categorias").set(catsObj).catch(function(e) {
      console.error("[Inventario] Error guardando categorias:", e);
    });
    dbRef(inv, "unidades").set(unitsObj).catch(function(e) {
      console.error("[Inventario] Error guardando unidades:", e);
    });
  }

  /* Save cat/unit translations to Firebase */
  function saveCatTransFB(inv, map) {
    if (!db) { return; }
    db.ref("inventario/" + inv + "/cattrans").set(map).catch(function(e) {
      console.error("[Inventario] Error guardando traducciones de categorias:", e);
    });
  }
  function saveUnitTransFB(inv, map) {
    if (!db) { return; }
    db.ref("inventario/" + inv + "/unittrans").set(map).catch(function(e) {
      console.error("[Inventario] Error guardando traducciones de unidades:", e);
    });
  }

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
        render();
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
          def.categorias.forEach(function(c, i) { catsObj["c" + i] = c; });
          var unitsObj = {};
          def.unidades.forEach(function(u, i)   { unitsObj["u" + i] = u; });
          db.ref("inventario/" + inv).set({
            productos:  prodsObj,
            categorias: catsObj,
            unidades:   unitsObj,
            cattrans:   {},
            unittrans:  {}
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

        if (!loaded[inv]) {
          loaded[inv] = true;
          checkAllLoaded();
        } else {
          if (inv === activeInv) {
            if (filterCat !== "todos" && cs().indexOf(filterCat) < 0) { filterCat = "todos"; }
            render();
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

  var state = { a: loadState("a"), b: loadState("b") };
  function S()  { return state[activeInv]; }
  function ps() { return S().productos; }
  function cs() { return S().categorias; }
  function us() { return S().unidades; }
  function save() { saveState(activeInv); }
  function nextId() {
    var ids = ps().map(function(p){return p.id;});
    return ids.length ? Math.max.apply(null,ids)+1 : 1;
  }

  var filterCat="todos", filterStatus="todos", sortField=null, sortAsc=true;
  var adjId=null, adjMode="entrada", pendingDel=null;

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
    activeInv=inv; filterCat="todos"; filterStatus="todos"; sortField=null;
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
    if (rAll) { rAll.textContent = lang==="es" ? "Todos los productos" : "All products"; }
    if (rLow) { rLow.textContent = lang==="es" ? "Solo bajo stock / agotados" : "Low stock / out of stock only"; }
    /* Update aria-labels that contain translatable text */
    var btnPrint = document.getElementById("btnPrint");
    if (btnPrint) { btnPrint.setAttribute("aria-label", tr("btnPrint")); }
    var loc = lang==="es"?"es-MX":"en-US";
    document.getElementById("headerDate").textContent =
      now.toLocaleDateString(loc,{weekday:"long",day:"numeric",month:"long",year:"numeric"});
    renderFilterBtns();
    render();
  }
  function toggleLang() {
    lang = lang==="es"?"en":"es";
    localStorage.setItem("inv_lang",lang);
    translateDefaultData();
    translateUserCats();
    translateUserUnits();
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

  /* ===== FILTER BUTTONS ===== */
  function renderFilterBtns() {
    var wrap = document.getElementById("filterBtns");
    var h = "<button class=\"filter-btn"+(filterCat==="todos"?" active":"")+"\" data-cat=\"todos\">"+tr("allFilter")+"</button>";
    cs().forEach(function(c) {
      h += "<button class=\"filter-btn"+(filterCat===c?" active":"")+"\" data-cat=\""+c+"\">"+c+"</button>";
    });
    wrap.innerHTML = h;
    wrap.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        filterCat=btn.dataset.cat; filterStatus="todos";
        renderFilterBtns(); render();
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

  /* ===== RENDER ===== */
  function getList() {
    var q = document.getElementById("searchInput").value.toLowerCase();
    var list = ps().filter(function(p) {
      var st=stockStatus(p);
      return (filterCat==="todos"||p.categoria===filterCat) &&
             (filterStatus==="todos"||st===filterStatus) &&
             p.nombre.toLowerCase().indexOf(q)>=0;
    });
    if (sortField) {
      list = list.slice().sort(function(a,b) {
        var av=a[sortField], bv=b[sortField];
        if (typeof av==="string"){av=av.toLowerCase();bv=bv.toLowerCase();}
        return sortAsc?(av>bv?1:-1):(av<bv?1:-1);
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
      var adj = lang==="es" ? "Ajustar" : "Adjust";
      var diff      = p.cantidad - p.minimo;
      var diffSign  = diff > 0 ? "+" : "";
      var diffClass = diff > 0 ? "ok-color" : diff === 0 ? "" : "danger-color";
      h+="<tr class=\"draggable-row\">";
      h+="<td class=\"drag-handle\" title=\""+(lang==="es"?"Arrastrar para reordenar":"Drag to reorder")+"\">&#8597;</td>";
      h+="<td><strong>"+escapeHTML(p.nombre)+"</strong></td>";
      h+="<td><span class=\"cat-badge\" style=\""+catStyle(p.categoria)+"\">"+escapeHTML(p.categoria)+"</span></td>";
      h+="<td><div class=\"stock-cell\">";
      h+="<div class=\"bar-bg\"><div class=\"bar-fill\" style=\"width:"+pct+"%;background:"+barClr(st)+"\"></div></div>";
      h+="<span class=\"stock-num "+st+"-color\">"+escapeHTML(p.cantidad)+"</span>";
      h+="<button class=\"btn-adj\" data-id=\""+p.id+"\" data-action=\"adj\" aria-label=\"Ajustar stock\">+/- "+adj+"</button>";
      h+="</div></td>";
      h+="<td class=\"mono-cell\">"+escapeHTML(p.minimo)+"</td>";
      h+="<td class=\"mono-cell diff-cell "+diffClass+"\">"+diffSign+diff+"</td>";
      h+="<td class=\"mono-cell small-cell\">"+escapeHTML(p.unidad)+"</td>";
      h+="<td>"+statusEl(st)+"</td>";
      h+="<td><button class=\"action-btn\" data-id=\""+p.id+"\" data-action=\"edit\" aria-label=\"Editar\">&#9998;</button>";
      h+="<button class=\"action-btn del\" data-id=\""+p.id+"\" data-action=\"del\" aria-label=\"Eliminar\">&#10005;</button></td>";
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
      var adj  = lang==="es" ? "Ajustar stock" : "Adjust stock";
      var diff = p.cantidad - p.minimo;
      var diffSign  = diff > 0 ? "+" : "";
      var diffClass = diff > 0 ? "ok-color" : diff === 0 ? "" : "danger-color";
      h+="<div class=\"inv-card\">";
      h+="<div class=\"card-header\">";
      h+="<div>";
      h+="<div class=\"card-name\">"+escapeHTML(p.nombre)+"</div>";
      h+="<span class=\"cat-badge\" style=\""+catStyle(p.categoria)+";margin-top:0.3rem\">"+escapeHTML(p.categoria)+"</span>";
      h+="</div>";
      h+="<div style=\"display:flex;align-items:center;gap:0.5rem;\">";
      h+=statusEl(st);
      h+="<span class=\"drag-handle-card\" title=\""+(lang==="es"?"Arrastrar":"Drag")+"\">&#8597;</span>";
      h+="</div></div>";
      h+="<div class=\"card-body\">";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblS+"</span><span class=\"card-field-value "+st+"-color\">"+p.cantidad+" "+p.unidad+"</span></div>";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblM+"</span><span class=\"card-field-value\" style=\"color:var(--muted)\">"+p.minimo+" "+p.unidad+"</span></div>";
      h+="<div class=\"card-field\"><span class=\"card-field-label\">"+lblDiff+"</span><span class=\"card-field-value "+diffClass+"\">"+diffSign+diff+" "+p.unidad+"</span></div>";
      h+="</div>";
      h+="<div class=\"card-actions\">";
      h+="<button class=\"card-btn-adj\" data-id=\""+p.id+"\" data-action=\"adj\">"+adj+"</button>";
      h+="<button class=\"card-btn-icon\" data-id=\""+p.id+"\" data-action=\"edit\" aria-label=\"Editar\">&#9998;</button>";
      h+="<button class=\"card-btn-icon del\" data-id=\""+p.id+"\" data-action=\"del\" aria-label=\"Eliminar\">&#10005;</button>";
      h+="</div></div>";
    });
    cl.innerHTML=h;
    initCardDragDrop();
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
  document.getElementById("modalOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){closeModal();}});

  function guardarProducto() {
    var nombreES  = document.getElementById("fNombreES").value.trim();
    var nombreEN  = document.getElementById("fNombreEN").value.trim();
    var categoria = document.getElementById("fCategoria").value;
    var unidad    = document.getElementById("fUnidad").value;
    var cantidad  = parseFloat(document.getElementById("fCantidad").value);
    var minimo    = parseFloat(document.getElementById("fMinimo").value);

    /* At least the current language name is required */
    var nombreActual = lang==="es" ? nombreES : nombreEN;
    if (!nombreActual || isNaN(cantidad) || isNaN(minimo)) { toast(tr("toastFields")); return; }

    /* If only one language was filled, use it for both as fallback */
    if (!nombreES) { nombreES = nombreEN; }
    if (!nombreEN) { nombreEN = nombreES; }

    /* The displayed name is always the one matching current language */
    var nombre = lang==="es" ? nombreES : nombreEN;

    var id = document.getElementById("editId").value;
    if (id) {
      var idx = S().productos.findIndex(function(p){return p.id==id;});
      S().productos[idx] = {
        id:parseInt(id,10), nombre:nombre,
        nombreES:nombreES, nombreEN:nombreEN,
        categoria:categoria, unidad:unidad, cantidad:cantidad, minimo:minimo
      };
      toast(tr("toastUpdated"));
    } else {
      S().productos.push({
        id:nextId(), nombre:nombre,
        nombreES:nombreES, nombreEN:nombreEN,
        categoria:categoria, unidad:unidad, cantidad:cantidad, minimo:minimo
      });
      toast(tr("toastAdded"));
    }
    save(); closeModal(); render();
  }
  function editarProducto(id) { openModal(ps().find(function(x){return x.id===id;})); }
  window.openModal=openModal; window.closeModal=closeModal;
  window.guardarProducto=guardarProducto; window.editarProducto=editarProducto;

  /* ===== DELETE MODAL ===== */
  function abrirDelModal(id) {
    pendingDel=id;
    var p=ps().find(function(x){return x.id===id;});
    document.getElementById("delProductName").textContent = '"'+escapeHTML(p.nombre)+'"?';
    document.getElementById("delOverlay").classList.add("open");
  }
  function closeDelModal() { document.getElementById("delOverlay").classList.remove("open"); pendingDel=null; }
  function confirmarEliminar() {
    if (pendingDel===null) { return; }
    var p=ps().find(function(x){return x.id===pendingDel;});
    S().productos=S().productos.filter(function(x){return x.id!==pendingDel;});
    save(); render(); closeDelModal();
    toast('"'+escapeHTML(p.nombre)+'" '+tr("toastDeleted"));
  }
  document.getElementById("delOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){closeDelModal();}});
  window.abrirDelModal=abrirDelModal; window.closeDelModal=closeDelModal; window.confirmarEliminar=confirmarEliminar;

  /* ===== ADJUST STOCK ===== */
  function openAdj(id) {
    adjId=id; adjMode="entrada";
    var p=ps().find(function(x){return x.id===id;});
    document.getElementById("adjName").textContent = escapeHTML(p.nombre);
    document.getElementById("adjCurrent").textContent = tr("adjCurrent")+" "+escapeHTML(p.cantidad)+" "+escapeHTML(p.unidad);
    document.getElementById("adjQty").value="";
    document.getElementById("adjPreview").textContent=tr("adjPrompt");
    setAdjMode("entrada");
    document.getElementById("adjOverlay").classList.add("open");
    setTimeout(function(){document.getElementById("adjQty").focus();},150);
  }
  function closeAdj() { document.getElementById("adjOverlay").classList.remove("open"); }
  document.getElementById("adjOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){closeAdj();}});
  function setAdjMode(mode) {
    adjMode=mode;
    document.querySelectorAll(".adj-tab").forEach(function(t){t.classList.toggle("active",t.dataset.mode===mode);});
    var lbl={entrada:tr("adjLabelIn"),salida:tr("adjLabelOut"),directo:tr("adjLabelSet")};
    document.getElementById("adjLabel").textContent=lbl[mode];
    document.getElementById("adjQty").value="";
    updatePreview();
  }
  function updatePreview() {
    var p=ps().find(function(x){return x.id===adjId;});
    var val=document.getElementById("adjQty").value;
    var qty=parseFloat(val);
    var el=document.getElementById("adjPreview");
    if (!val||isNaN(qty)) { el.textContent=tr("adjPrompt"); return; }
    var nuevo;
    if (adjMode==="entrada") { nuevo=p.cantidad+qty; }
    else if (adjMode==="salida") { nuevo=p.cantidad-qty; }
    else { nuevo=qty; }
    if (nuevo<0) { el.textContent=tr("adjNegErr"); return; }
    el.innerHTML=p.cantidad+" "+p.unidad+" &rarr; <span>"+Math.round(nuevo*100)/100+" "+p.unidad+"</span>";
  }
  function confirmarAjuste() {
    var p=ps().find(function(x){return x.id===adjId;});
    var qty=parseFloat(document.getElementById("adjQty").value);
    if (isNaN(qty)) { toast(tr("toastInvalid")); return; }
    var nuevo;
    if (adjMode==="entrada") { nuevo=p.cantidad+qty; }
    else if (adjMode==="salida") { nuevo=p.cantidad-qty; }
    else { nuevo=qty; }
    if (nuevo<0) { toast(tr("toastNegStock")); return; }
    p.cantidad=Math.round(nuevo*100)/100;
    save(); render(); closeAdj();
    toast('"'+escapeHTML(p.nombre)+'": '+escapeHTML(p.cantidad)+" "+escapeHTML(p.unidad));
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
  document.getElementById("gcOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){closeGC();}});
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
  function loadCatTrans(inv)  { return catTransCache[inv]  || {}; }

  /* On language switch, apply user-category translations */
  function translateUserCats() {
    ["a","b"].forEach(function(inv) {
      var trans = loadCatTrans(inv);
      if (!Object.keys(trans).length) { return; }

      /* Build reverse map */
      var reverse = {};
      Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

      state[inv].categorias = state[inv].categorias.map(function(c) {
        if (lang === "en" && trans[c])    { return trans[c]; } /* ES->EN */
        if (lang === "es" && reverse[c])  { return reverse[c]; } /* EN->ES */
        return c;
      });

      /* Update product categories too */
      state[inv].productos.forEach(function(p) {
        if (lang === "en" && trans[p.categoria])   { p.categoria = trans[p.categoria]; }
        if (lang === "es" && reverse[p.categoria]) { p.categoria = reverse[p.categoria]; }
      });

      saveState(inv);
    });
    if (filterCat !== "todos" && cs().indexOf(filterCat) < 0) { filterCat = "todos"; }
  }

  function openCatMgr() {
    tempCats = cs().slice();
    tempCatTrans = loadCatTrans(activeInv);
    renderCatMgrList();
    document.getElementById("catNewNameES").value = "";
    document.getElementById("catNewNameEN").value = "";
    document.getElementById("catMgrOverlay").classList.add("open");
    setTimeout(function() {
      document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
    }, 150);
  }
  function closeCatMgr() { document.getElementById("catMgrOverlay").classList.remove("open"); }
  document.getElementById("catMgrOverlay").addEventListener("click", function(e) {
    if (e.target === e.currentTarget) { closeCatMgr(); }
  });

  function renderCatMgrList() {
    var list = document.getElementById("catManagerList");
    if (!tempCats.length) {
      list.innerHTML = "<div style=\"text-align:center;color:var(--muted);padding:1rem 0\">" + tr("noCats") + "</div>";
      return;
    }
    /* Build reverse map to show both names */
    var trans   = tempCatTrans;
    var reverse = {};
    Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });

    var h = "";
    for (var i = 0; i < tempCats.length; i++) {
      var p    = PAL[i % PAL.length];
      var c    = tempCats[i];
      /* Figure out the other-language name for display */
      var nameES = lang === "es" ? c : (reverse[c] || c);
      var nameEN = lang === "en" ? c : (trans[c]   || c);
      var otherLabel = lang === "es"
        ? (trans[c]   ? " / " + trans[c]   : "")
        : (reverse[c] ? " / " + reverse[c] : "");

      h += "<div class=\"mgr-item\">";
      h += "<div class=\"mgr-dot\" style=\"background:" + p.color + "\"></div>";
      h += "<input class=\"mgr-input\" type=\"text\" value=\"" + escapeHTML(c) + "\" data-idx=\"" + i + "\">";
      h += "<span class=\"mgr-other-lang\">" + escapeHTML(otherLabel) + "</span>";
      h += "<button class=\"mgr-del\" data-delidx=\"" + i + "\">&#10005;</button>";
      h += "</div>";
    }
    list.innerHTML = h;
    list.querySelectorAll(".mgr-input").forEach(function(inp) {
      inp.addEventListener("change", function() {
        var idx = parseInt(inp.dataset.idx, 10);
        var v   = inp.value.trim();
        if (v) { tempCats[idx] = v; }
      });
    });
    list.querySelectorAll(".mgr-del").forEach(function(btn) {
      btn.addEventListener("click", function() {
        eliminarTempCat(parseInt(btn.dataset.delidx, 10));
      });
    });
  }

  function eliminarTempCat(idx) {
    var cat   = tempCats[idx];
    var inUse = ps().some(function(p) { return p.categoria === cat; });
    var first = "";
    for (var i = 0; i < tempCats.length; i++) { if (i !== idx) { first = tempCats[i]; break; } }
    openGC({
      icon: "!", title: tr("gcDelCatTitle"),
      msg1: tr("gcDelMsg1Cat"), name: '"' + escapeHTML(cat) + '"?',
      msg2: inUse ? tr("gcDelMsg2Use") : tr("gcDelMsg2NoUse"),
      confirmLabel: tr("delConfirm"), cancelLabel: tr("cancel"),
      onConfirm: function() {
        /* Remove from translation map too */
        var trans   = tempCatTrans;
        var reverse = {};
        Object.keys(trans).forEach(function(es) { reverse[trans[es]] = es; });
        if (trans[cat])   { delete trans[cat]; }
        if (reverse[cat]) { delete trans[reverse[cat]]; }
        tempCats.splice(idx, 1);
        renderCatMgrList();
      }
    });
  }

  function agregarCategoria() {
    var nameES = document.getElementById("catNewNameES").value.trim();
    var nameEN = document.getElementById("catNewNameEN").value.trim();
    /* At least the active language name is required */
    var nameActive = lang === "es" ? nameES : nameEN;
    if (!nameActive) {
      document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
      return;
    }
    /* Use the other as fallback if not filled */
    if (!nameES) { nameES = nameEN; }
    if (!nameEN) { nameEN = nameES; }

    /* Check for duplicates */
    var exists = tempCats.some(function(c) { return c.toLowerCase() === nameActive.toLowerCase(); });
    if (exists) { toast(tr("toastCatExists")); return; }

    /* Store the active-language name in the list and save translation */
    tempCats.push(nameActive);
    if (nameES !== nameEN) {
      tempCatTrans[nameES] = nameEN; /* always store as ES->EN */
    }
    document.getElementById("catNewNameES").value = "";
    document.getElementById("catNewNameEN").value = "";
    renderCatMgrList();
    document.getElementById(lang === "es" ? "catNewNameES" : "catNewNameEN").focus();
  }

  function guardarCategorias() {
    document.querySelectorAll("#catManagerList .mgr-input").forEach(function(inp) {
      var i = parseInt(inp.dataset.idx, 10);
      var v = inp.value.trim();
      if (v) { tempCats[i] = v; }
    });
    var seen = {};
    tempCats = tempCats.filter(function(c) {
      var k = c.toLowerCase();
      if (seen[k]) { return false; }
      seen[k] = true; return true;
    });
    if (!tempCats.length) { toast(tr("toastMinOne")); return; }
    var old = cs().slice();
    ps().forEach(function(p) {
      if (tempCats.indexOf(p.categoria) < 0) {
        var i = old.indexOf(p.categoria);
        p.categoria = (i >= 0 && tempCats[i]) ? tempCats[i] : tempCats[0];
      }
    });
    S().categorias = tempCats;
    catTransCache[activeInv] = tempCatTrans;
    saveCatTransFB(activeInv, tempCatTrans);
    save();
    if (filterCat !== "todos" && S().categorias.indexOf(filterCat) < 0) { filterCat = "todos"; }
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

      saveState(inv);
    });
  }

  function openUnitMgr() {
    tempUnits     = us().slice();
    tempUnitTrans = loadUnitTrans(activeInv);
    renderUnitMgrList();
    document.getElementById("unitNewNameES").value = "";
    document.getElementById("unitNewNameEN").value = "";
    document.getElementById("unitMgrOverlay").classList.add("open");
    setTimeout(function() {
      document.getElementById(lang === "es" ? "unitNewNameES" : "unitNewNameEN").focus();
    }, 150);
  }
  function closeUnitMgr() { document.getElementById("unitMgrOverlay").classList.remove("open"); }
  document.getElementById("unitMgrOverlay").addEventListener("click", function(e) {
    if (e.target === e.currentTarget) { closeUnitMgr(); }
  });

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
      var otherLabel = lang === "es"
        ? (trans[u]   ? " / " + trans[u]   : "")
        : (reverse[u] ? " / " + reverse[u] : "");
      h += "<div class=\"mgr-item\">";
      h += "<div class=\"mgr-dot\" style=\"background:var(--gold)\"></div>";
      h += "<input class=\"mgr-input\" type=\"text\" value=\"" + escapeHTML(u) + "\" data-idx=\"" + i + "\">";
      h += "<span class=\"mgr-other-lang\">" + escapeHTML(otherLabel) + "</span>";
      h += "<button class=\"mgr-del\" data-delidx=\"" + i + "\">&#10005;</button>";
      h += "</div>";
    }
    list.innerHTML = h;
    list.querySelectorAll(".mgr-input").forEach(function(inp) {
      inp.addEventListener("change", function() {
        var idx = parseInt(inp.dataset.idx, 10);
        var v   = inp.value.trim();
        if (v) { tempUnits[idx] = v; }
      });
    });
    list.querySelectorAll(".mgr-del").forEach(function(btn) {
      btn.addEventListener("click", function() {
        eliminarTempUnit(parseInt(btn.dataset.delidx, 10));
      });
    });
  }

  function eliminarTempUnit(idx) {
    var u     = tempUnits[idx];
    var inUse = ps().some(function(p) { return p.unidad === u; });
    var first = "";
    for (var i = 0; i < tempUnits.length; i++) { if (i !== idx) { first = tempUnits[i]; break; } }
    openGC({
      icon: "!", title: tr("gcDelUnitTitle"),
      msg1: tr("gcDelMsg1Unit"), name: '"' + escapeHTML(u) + '"?',
      msg2: inUse ? tr("gcDelMsg2Use") : tr("gcDelMsg2NoUse"),
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

    var exists = tempUnits.some(function(u) { return u.toLowerCase() === nameActive.toLowerCase(); });
    if (exists) { toast(tr("toastUnitExists")); return; }

    tempUnits.push(nameActive);
    if (nameES !== nameEN) {
      tempUnitTrans[nameES] = nameEN;
    }
    document.getElementById("unitNewNameES").value = "";
    document.getElementById("unitNewNameEN").value = "";
    renderUnitMgrList();
    document.getElementById(lang === "es" ? "unitNewNameES" : "unitNewNameEN").focus();
  }

  function guardarUnidades() {
    document.querySelectorAll("#unitManagerList .mgr-input").forEach(function(inp) {
      var i = parseInt(inp.dataset.idx, 10);
      var v = inp.value.trim();
      if (v) { tempUnits[i] = v; }
    });
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
    saveUnitTransFB(activeInv, tempUnitTrans);
    save();
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

  function buildReport(filtro) {
    filtro = filtro || "todos";
    var allSorted = ps().slice().sort(function(a,b){
      var r=a.categoria.localeCompare(b.categoria);
      return r!==0?r:a.nombre.localeCompare(b.nombre);
    });
    var sorted = filtro === "bajo"
      ? allSorted.filter(function(x) { return x.cantidad < x.minimo; })
      : allSorted;

    var total = sorted.length;
    var low   = sorted.filter(function(x){return x.cantidad>0&&x.cantidad<x.minimo;}).length;
    var out   = sorted.filter(function(x){return x.cantidad===0;}).length;
    var loc=lang==="es"?"es-MX":"en-US";
    var fecha=now.toLocaleDateString(loc,{day:"2-digit",month:"long",year:"numeric"});
    var hora=now.toLocaleTimeString(loc,{hour:"2-digit",minute:"2-digit"});
    var invName=activeInv==="a"?tr("invA"):tr("invB");
    var invColor=activeInv==="a"?"#1a4a8a":"#27845a";
    var thP  = lang==="es" ? "Producto"    : "Product";
    var thC  = lang==="es" ? "Categoria"   : "Category";
    var thD  = lang==="es" ? "Diferencia"  : "Difference";
    var thU  = lang==="es" ? "Unidad"      : "Unit";
    var thSt = lang==="es" ? "Estado"      : "Status";
    var rows = "";
    sorted.forEach(function(x) {
      var st   = stockStatus(x);
      var stL  = {ok:tr("ppNormal"), warn:tr("ppLow"), danger:tr("ppOut")}[st];
      var stC  = {ok:"pp-ok", warn:"pp-warn", danger:"pp-danger"}[st];
      var diff = x.cantidad - x.minimo;
      var diffSign  = diff > 0 ? "+" : "";
      var diffStyle = diff > 0
        ? "color:#1a6e3a;font-weight:700;"
        : diff === 0
          ? "color:#555;"
          : "color:#b02020;font-weight:700;";
      rows += "<tr>";
      rows += "<td><strong>" + x.nombre + "</strong></td>";
      rows += "<td><span class=\"pp-badge\">" + x.categoria + "</span></td>";
      rows += "<td><strong>" + x.cantidad + "</strong></td>";
      rows += "<td style=\"" + diffStyle + "\">" + diffSign + diff + "</td>";
      rows += "<td>" + x.unidad + "</td>";
      rows += "<td class=\"" + stC + "\">" + stL + "</td>";
      rows += "</tr>";
    });

    var filterLabel = filtro === "bajo"
      ? (lang === "es" ? "Solo bajo stock y agotados" : "Low stock & out of stock only")
      : "";

    var emptyMsg = sorted.length === 0
      ? "<tr><td colspan=\"6\" style=\"text-align:center;padding:1.5rem;color:#888;\">"
        + (lang === "es" ? "No hay productos bajo stock." : "No products below minimum stock.")
        + "</td></tr>"
      : rows;

    return "<div class=\"pp-header\"><div>"+
      "<div class=\"pp-logo-title\">Afghan Kabob &amp; Grill</div>"+
      "<div class=\"pp-logo-sub\">"+tr("reportTitle")+"</div>"+
      (filterLabel ? "<div class=\"pp-filter-label\">"+filterLabel+"</div>" : "")+
      "<div class=\"pp-inv-type\" style=\"color:"+invColor+"\">"+invName+"</div></div>"+
      "<div class=\"pp-meta\">"+tr("reportDate")+" "+fecha+"<br>"+tr("reportTime")+" "+hora+"</div></div>"+
      "<div class=\"pp-summary\">"+
      "<span>"+tr("reportTotal")+" <strong>"+total+"</strong></span>"+
      "<span>"+tr("reportLow")+" <strong>"+low+"</strong></span>"+
      "<span>"+tr("reportOut")+" <strong>"+out+"</strong></span></div>"+
      "<table class=\"pp-table\"><thead><tr>"+
      "<th>"+thP+"</th><th>"+thC+"</th><th>Stock</th><th>"+thD+"</th><th>"+thU+"</th><th>"+thSt+"</th>"+
      "</tr></thead><tbody>"+emptyMsg+"</tbody></table>"+
      "<div class=\"pp-footer\"><span>Afghan Kabob &amp; Grill &middot; "+invName+"</span><span>"+tr("ppLegend")+"</span></div>";
  }

  function getReportFilter() {
    var sel = document.getElementById("reportFilter");
    return sel ? sel.value : "todos";
  }

  function abrirVistaPrevia() {
    document.getElementById("reportFilter").value = "todos";
    document.getElementById("previewPage").innerHTML = buildReport("todos");
    document.getElementById("printPreviewOverlay").classList.add("open");
  }
  function cerrarVistaPrevia() { document.getElementById("printPreviewOverlay").classList.remove("open"); }
  document.getElementById("printPreviewOverlay").addEventListener("click",function(e){if(e.target===e.currentTarget){cerrarVistaPrevia();}});
  function imprimirDesdePrevia() {
    var pd = document.getElementById("printDoc");
    pd.innerHTML = "<style>"+PCSS+"</style>"+buildReport(getReportFilter());
    window.print();
    setTimeout(function(){pd.innerHTML="";},1500);
  }
  function descargarPDF() {
    var filtro = getReportFilter();
    var loc    = lang==="es"?"es-MX":"en-US";
    var fecha  = now.toLocaleDateString(loc,{day:"2-digit",month:"long",year:"numeric"}).replace(/\s/g,"_");
    var key    = activeInv==="a"?"MP":"PT";
    var sufijo = filtro==="bajo"?"_BajoStock":"";
    var html   = "<!DOCTYPE html><html lang=\""+lang+"\"><head><meta charset=\"UTF-8\">"+
      "<title>Afghan Kabob &amp; Grill - "+(activeInv==="a"?tr("invA"):tr("invB"))+"</title>"+
      "<style>"+PCSS+"</style></head><body>"+buildReport(filtro)+"</body></html>";
    var blob = new Blob([html],{type:"text/html;charset=utf-8"});
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement("a");
    a.href = url; a.download = "Inventario_"+key+sufijo+"_"+fecha+".html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(url);},5000);
    toast(tr("toastPDF"));
  }
  window.abrirVistaPrevia=abrirVistaPrevia; window.cerrarVistaPrevia=cerrarVistaPrevia;
  window.imprimirDesdePrevia=imprimirDesdePrevia; window.descargarPDF=descargarPDF;

  /* ===== TOAST ===== */
  var toastTimer;
  function toast(msg) {
    var el=document.getElementById("toast");
    el.textContent=msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){el.classList.remove("show");},3000);
  }

  /* ===== EVENT DELEGATION for dynamic table/card buttons ===== */
  document.addEventListener("click", function(e) {
    var btn = e.target.closest("button[data-action]");
    if (!btn) { return; }
    var id     = parseInt(btn.dataset.id, 10);
    var action = btn.dataset.action;
    if (action === "edit") { editarProducto(id); }
    if (action === "del")  { abrirDelModal(id); }
    if (action === "adj")  { openAdj(id); }
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
  wire("btnCloseModal", closeModal);
  wire("btnModalCancel", closeModal);
  wire("btnModalSave",   guardarProducto);

  /* Adjust stock modal */
  wire("btnCloseAdj",  closeAdj);
  wire("btnAdjCancel", closeAdj);
  wire("btnAdjConfirm", confirmarAjuste);
  wire("tabEntrada", function() { setAdjMode("entrada"); });
  wire("tabSalida",  function() { setAdjMode("salida"); });
  wire("tabFijar",   function() { setAdjMode("directo"); });
  document.getElementById("adjQty").addEventListener("input", updatePreview);

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

  applyLang();

  /* Connect to Firebase — loads shared data and listens for real-time updates */
  listenFirebase();

})();