// Short, realistic Online Store 2.0 examples for the typing editor.
// They illustrate a product-hero section. They are not a claim about one store's private theme.

export const snippets = [
  {
    name: "index.html",
    language: "HTML",
    token: "html",
    icon: "html",
    code: `<section class="product-hero">
  <div class="product-hero__media">
    <img src="hero.jpg" alt="Product photo">
  </div>
  <div class="product-hero__info">
    <h1>Product title</h1>
    <p class="product-hero__price">Price</p>
    <button type="submit" name="add">Add to cart</button>
  </div>
</section>
`,
  },
  {
    name: "styles.css",
    language: "CSS",
    token: "css",
    icon: "css",
    code: `.product-hero {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.product-hero__media {
  flex: 1 1 52%;
}

.product-hero__price {
  color: #f97316;
  font-weight: 600;
}

.product-hero button[name="add"] {
  min-height: 44px;
  border: 0;
  border-radius: 999px;
  background: #111113;
  color: #ffffff;
}
`,
  },
  {
    name: "main.js",
    language: "JavaScript",
    token: "js",
    icon: "javascript",
    code: `const form = document.querySelector("[data-product-form]");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector("[name='add']");
  button.textContent = "Adding";

  await fetch("/cart/add.js", {
    method: "POST",
    body: new FormData(form),
  });

  button.textContent = "Added";
  document.dispatchEvent(new CustomEvent("cart:refresh"));
});
`,
  },
  {
    name: "28-product-hero.liquid",
    language: "Liquid",
    token: "liquid",
    icon: "liquid",
    code: `<section id="ProductHero-{{ section.id }}" class="product-hero">
  <h1>{{ product.title }}</h1>
  <p>{{ product.price | money }}</p>
  {% form 'product', product %}
    <button type="submit" name="add">Add to cart</button>
  {% endform %}
</section>

{% schema %}
{
  "name": "Product hero",
  "blocks": [
    { "type": "headline" },
    { "type": "price" },
    { "type": "buy_buttons" }
  ],
  "presets": [{ "name": "Product hero" }]
}
{% endschema %}
`,
  },
  {
    name: "product.json",
    language: "JSON",
    token: "json",
    icon: "json",
    code: `{
  "sections": {
    "main": {
      "type": "28-product-hero",
      "blocks": {
        "title": { "type": "headline" },
        "price": { "type": "price" },
        "buy": { "type": "buy_buttons" }
      },
      "block_order": ["title", "price", "buy"]
    }
  },
  "order": ["main"]
}
`,
  },
];
