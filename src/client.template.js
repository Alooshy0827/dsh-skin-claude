// Compiled by scripts/build.mjs. DSH owns theme preference and persistence.
window.__ModuleLoader__.load({
  id: "dsh-skin-claude",
  factory: () => {
    const tokens = /* TOKEN_OVERRIDES */ {};
    const css = /* SKIN_CSS */ "";
    const styleId = "dsh-claude-skin-style";
    const attribute = "data-dsh-claude-skin";

    return {
      inject: ["theme"],
      apply(ctx) {
        if (typeof ctx?.theme?.overrideTokens !== "function" || typeof ctx?.effect !== "function") return;

        ctx.effect(() => {
          const body = document.body;
          if (!document.head || !body || document.getElementById(styleId)) return;

          const previousAttribute = body.getAttribute(attribute);
          const style = document.createElement("style");
          let revokeTokens;
          let disposed = false;

          const dispose = () => {
            if (disposed) return;
            disposed = true;
            style.remove();
            if (previousAttribute === null) body.removeAttribute(attribute);
            else body.setAttribute(attribute, previousAttribute);
            if (typeof revokeTokens === "function") revokeTokens();
          };

          try {
            // The DSH facade requires both arguments and owns this layer's scope.
            revokeTokens = ctx.theme.overrideTokens("dsh-skin-claude", tokens);
            style.id = styleId;
            style.textContent = css;
            document.head.appendChild(style);
            body.setAttribute(attribute, "__SKIN_VERSION__");
          } catch (error) {
            dispose();
            console.warn("[dsh-skin-claude] Could not apply skin; native appearance restored.", error);
          }

          return dispose;
        }, "dsh-skin-claude: appearance");
      },
    };
  },
});
