// Engineering demos for the typing editor. These are stack examples, not client theme source.

export const snippets = [
  {
    name: "useTheme.ts",
    language: "TypeScript",
    token: "ts",
    icon: "typescript",
    code: `type Theme = "dark" | "light";

export function useTheme(initial: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(initial);

  function toggle() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return { theme, toggle };
}
`,
  },
  {
    name: "page.tsx",
    language: "Next.js",
    token: "tsx",
    icon: "next",
    code: `export default async function Page() {
  const profile = await getProfile();

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{profile.role}</p>
    </main>
  );
}
`,
  },
  {
    name: "tools.py",
    language: "Python",
    token: "python",
    icon: "code",
    code: `def normalize_handle(title: str) -> str:
    parts = [part for part in title.lower().split() if part]
    return "-".join(parts)


def chunked(items: list[str], size: int) -> list[list[str]]:
    return [items[index : index + size] for index in range(0, len(items), size)]
`,
  },
  {
    name: "views.py",
    language: "Django",
    token: "python",
    icon: "api",
    code: `from rest_framework.response import Response
from rest_framework.views import APIView

class ThemeStatusView(APIView):
    def get(self, request, theme_id: int):
        payload = {"id": theme_id, "status": "ready"}
        return Response(payload)
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
  "presets": [{ "name": "Product hero" }]
}
{% endschema %}
`,
  },
  {
    name: "index.html",
    language: "HTML",
    token: "html",
    icon: "html",
    code: `<section class="product-hero">
  <h1>Product title</h1>
  <p class="product-hero__price">Price</p>
  <button type="submit" name="add">Add to cart</button>
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

.product-hero__price {
  color: #f97316;
  font-weight: 600;
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
  const body = new FormData(form);
  await fetch("/cart/add.js", { method: "POST", body });
  document.dispatchEvent(new CustomEvent("cart:refresh"));
});
`,
  },
  {
    name: "product.json",
    language: "JSON",
    token: "json",
    icon: "json",
    code: `{
  "sections": {
    "main": { "type": "28-product-hero" }
  },
  "order": ["main"]
}
`,
  },
];
