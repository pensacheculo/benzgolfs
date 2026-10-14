/*
  Benz Golfs shared behaviour. Reads window.BENZ_CONFIG (from /config.js) and:
    1. Wires every buy button (data-product) to its Stripe Payment Link,
       or disables it with the label "Coming soon" when the link is empty.
    2. Wires Instagram and Contact links (data-link).
  Load /config.js before this file.
*/
(function () {
  var cfg = window.BENZ_CONFIG || {};

  var PRODUCTS = {
    breakdown: { key: "STRIPE_LINK_BREAKDOWN" },
    demo:      { key: "STRIPE_LINK_DEMO" },
    zoom30:    { key: "STRIPE_LINK_ZOOM_30" },
    zoom60:    { key: "STRIPE_LINK_ZOOM_60" },
    standard:  { key: "STRIPE_LINK_DRIVE_STANDARD", drive: true },
    premium:   { key: "STRIPE_LINK_DRIVE_PREMIUM", drive: true }
  };

  function val(key) {
    var v = cfg[key];
    return (typeof v === "string") ? v.trim() : "";
  }

  function disable(el, label) {
    el.removeAttribute("href");
    el.classList.add("is-disabled");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("tabindex", "-1");
    if (label) el.textContent = label;
  }

  function enable(el, href) {
    el.setAttribute("href", href);
    el.classList.remove("is-disabled");
    el.removeAttribute("aria-disabled");
    el.removeAttribute("tabindex");
  }

  /* Buy buttons */
  var buttons = document.querySelectorAll("[data-product]");
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];
    var product = PRODUCTS[btn.getAttribute("data-product")];
    if (!product) { disable(btn, "Coming soon"); continue; }
    var link = val(product.key);
    var open = product.drive ? cfg.DRIVE_OPEN === true : true;
    if (link && open) {
      enable(btn, link);
    } else {
      disable(btn, "Coming soon");
    }
  }

  /* Instagram and Contact links */
  var links = document.querySelectorAll("[data-link]");
  for (var j = 0; j < links.length; j++) {
    var a = links[j];
    var kind = a.getAttribute("data-link");
    var href = "";
    if (kind === "instagram") {
      href = val("INSTAGRAM_URL");
      if (href) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    } else if (kind === "contact") {
      var email = val("CONTACT_EMAIL");
      href = email ? "mailto:" + email : "";
    }
    if (href) {
      enable(a, href);
      if (a.hasAttribute("data-link-text") && kind === "contact") a.textContent = email;
    } else {
      disable(a, a.getAttribute("data-fallback") || null);
    }
  }
})();
