/*
  Benz Golfs site config.
  This is the only file you need to edit to turn on checkout, intake, booking,
  the waitlist and the contact links. Every value is empty by default.
  A buy button with an empty link renders disabled with the label "Coming soon".
*/
window.BENZ_CONFIG = {

  /* ---------- Stripe Payment Links ---------- */
  /* Create each link in the Stripe dashboard. Set the link's success URL to
     https://benzgolfs.netlify.app/thanks/?product=<slug> using the slug shown
     next to each key. */
  STRIPE_LINK_BREAKDOWN: "",        /* $39 one-time.        slug: breakdown */
  STRIPE_LINK_DEMO: "",             /* $89 one-time.        slug: demo      */
  STRIPE_LINK_ZOOM_30: "",          /* $65 live lesson.     slug: zoom30    */
  STRIPE_LINK_ZOOM_60: "",          /* $110 live lesson.    slug: zoom60    */
  STRIPE_LINK_DRIVE_STANDARD: "",   /* $59/mo subscription. slug: standard  */
  STRIPE_LINK_DRIVE_PREMIUM: "",    /* $99/mo subscription. slug: premium   */

  /* The Drive membership buttons stay disabled until this is true,
     even if the two Drive links above are filled in. */
  DRIVE_OPEN: false,

  /* ---------- Forms and booking ---------- */
  TALLY_INTAKE_FORM_ID: "",         /* Tally form ID for the swing intake form (the part after tally.so/r/) */
  TALLY_WAITLIST_FORM_ID: "",       /* Optional. Leave empty to use the built-in Netlify Forms waitlist on /drive/ */
  CALENDLY_URL: "",                 /* Full Calendly scheduling URL, e.g. https://calendly.com/yourname/lesson */

  /* ---------- Contact ---------- */
  INSTAGRAM_URL: "",                /* e.g. https://www.instagram.com/yourhandle/ */
  CONTACT_EMAIL: ""                 /* e.g. jakob@example.com */
};
