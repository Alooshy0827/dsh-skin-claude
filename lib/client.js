// Compiled by scripts/build.mjs. DSH owns theme preference and persistence.
window.__ModuleLoader__.load({
  id: "dsh-skin-claude",
  factory: () => {
    const tokens = {
  "--dsw-alias-bg-base": {
    "light": "#faf9f5",
    "dark": "#262624"
  },
  "--dsw-alias-bg-layer-1": {
    "light": "#f5f3ed",
    "dark": "#2c2b28"
  },
  "--dsw-alias-bg-layer-2": {
    "light": "#fdfcf9",
    "dark": "#30302d"
  },
  "--dsw-alias-bg-layer-3": {
    "light": "#eeece4",
    "dark": "#383733"
  },
  "--dsw-alias-bg-document-preview": {
    "light": "#f0eee6",
    "dark": "#242421"
  },
  "--dsw-alias-bg-module-platform": {
    "light": "#f0eee6",
    "dark": "#30302d"
  },
  "--dsw-alias-bg-multi-select": {
    "light": "#eee3da",
    "dark": "#46372f"
  },
  "--dsw-alias-bg-overlay": {
    "light": "#e8e5dc",
    "dark": "#3a3833"
  },
  "--dsw-alias-border-l1": {
    "light": "#3d392914",
    "dark": "#e8e6dc14"
  },
  "--dsw-alias-border-l2": {
    "light": "#3d392929",
    "dark": "#e8e6dc29"
  },
  "--dsw-alias-border-l2-darkmode-thin": {
    "light": "#3d392929",
    "dark": "#e8e6dc20"
  },
  "--dsw-alias-border-l3": {
    "light": "#3d392938",
    "dark": "#e8e6dc38"
  },
  "--dsw-alias-border-l4": {
    "light": "#3d39294d",
    "dark": "#e8e6dc4d"
  },
  "--dsw-alias-brand-primary": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-alias-brand-primary-invert": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-alias-brand-text": {
    "light": "#97482f",
    "dark": "#e3a88f"
  },
  "--dsw-alias-brand-primary-new-colorprimary-new-color": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-alias-button-elevated-fill": {
    "light": "#fdfcf9",
    "dark": "#383733"
  },
  "--dsw-alias-button-floating-fill": {
    "light": "#fdfcf9",
    "dark": "#30302d"
  },
  "--dsw-alias-button-floating-hover": {
    "light": "#eeece4",
    "dark": "#3b3934"
  },
  "--dsw-alias-button-info-fill": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-alias-button-info-hover": {
    "light": "#97482f",
    "dark": "#e2a58b"
  },
  "--dsw-alias-button-primary-hover": {
    "light": "#97482f",
    "dark": "#e2a58b"
  },
  "--dsw-alias-button-primary-dimmed": {
    "light": "#e2d4c9",
    "dark": "#55443a"
  },
  "--dsw-alias-button-ghost-active-border": {
    "light": "#c18b74",
    "dark": "#b9856d"
  },
  "--dsw-alias-button-ghost-active-fill": {
    "light": "#f0dfd5",
    "dark": "#42332c"
  },
  "--dsw-alias-button-ghost-active-hover": {
    "light": "#e8d2c5",
    "dark": "#503d32"
  },
  "--dsw-alias-interactive-bg-active": {
    "light": "#3d392914",
    "dark": "#e8e6dc14"
  },
  "--dsw-alias-interactive-bg-hover": {
    "light": "#3d39290a",
    "dark": "#e8e6dc0c"
  },
  "--dsw-alias-interactive-bg-hover-accent": {
    "light": "#c964421a",
    "dark": "#d98c6e24"
  },
  "--dsw-alias-interactive-bg-hover-solid": {
    "light": "#eeece4",
    "dark": "#3b3934"
  },
  "--dsw-alias-label-primary": {
    "light": "#3d3929",
    "dark": "#e8e6dc"
  },
  "--dsw-alias-label-primary-bluish": {
    "light": "#3d3929",
    "dark": "#e8e6dc"
  },
  "--dsw-alias-label-primary-dimmed": {
    "light": "#4f4b3e",
    "dark": "#d6d3c8"
  },
  "--dsw-alias-label-secondary": {
    "light": "#625e51",
    "dark": "#bdb9ad"
  },
  "--dsw-alias-label-tertiary": {
    "light": "#716b5e",
    "dark": "#aaa598"
  },
  "--dsw-alias-label-caption": {
    "light": "#757063",
    "dark": "#aaa598"
  },
  "--dsw-alias-label-dimmed": {
    "light": "#a8a294",
    "dark": "#6b675e"
  },
  "--dsw-alias-label-primary-foreground": {
    "light": "#faf9f5",
    "dark": "#261f1b"
  },
  "--dsw-alias-label-primary-inverted": {
    "light": "#faf9f5",
    "dark": "#262624"
  },
  "--dsw-alias-label-document-preview": {
    "light": "#625e51",
    "dark": "#bdb9ad"
  },
  "--dsw-alias-label-deep-diving": {
    "light": "#97482f",
    "dark": "#e3a88f"
  },
  "--dsw-alias-link": {
    "light": "#97482f",
    "dark": "#e3a88f"
  },
  "--dsw-alias-state-business-primary": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-alias-state-business-tertiary": {
    "light": "#f0dfd5",
    "dark": "#42332c"
  },
  "--dsw-alias-markdown-code-block": {
    "light": "#f0eee6",
    "dark": "#21211f"
  },
  "--dsw-alias-markdown-code-block-banner": {
    "light": "#e9e6dc",
    "dark": "#2c2b28"
  },
  "--dsw-alias-markdown-inline-code": {
    "light": "#eeece4",
    "dark": "#36342f"
  },
  "--dsw-alias-markdown-citation": {
    "light": "#e9e6dc",
    "dark": "#3d3931"
  },
  "--dsw-alias-markdown-code-segment-selected": {
    "light": "#fdfcf9",
    "dark": "#3d3931"
  },
  "--dsw-alias-markdown-code-segment-unselected": {
    "light": "#e9e6dc",
    "dark": "#21211f"
  },
  "--dsw-alias-markdown-placeholder": {
    "light": "#eeece4",
    "dark": "#30302d"
  },
  "--dsw-alias-markdown-tag": {
    "light": "#eeece4",
    "dark": "#36342f"
  },
  "--dsw-alias-menu-group-header-fill": {
    "light": "#f5f3edf5",
    "dark": "#30302df5"
  },
  "--dsw-alias-menu-icon": {
    "light": "#4f4b3e",
    "dark": "#d6d3c8"
  },
  "--dsw-alias-scrollbar-bg-l1": {
    "light": "#c8c2b5",
    "dark": "#57544c"
  },
  "--dsw-alias-scrollbar-bg-l2": {
    "light": "#c8c2b5",
    "dark": "#625e54"
  },
  "--dsw-alias-scrollbar-hover-l1": {
    "light": "#a39c8e",
    "dark": "#817a6e"
  },
  "--dsw-alias-scrollbar-hover-l2": {
    "light": "#a39c8e",
    "dark": "#817a6e"
  },
  "--dsw-alias-switch-thumb": {
    "light": "#fdfcf9",
    "dark": "#e8e6dc"
  },
  "--dsw-alias-toast-bg": {
    "light": "#3d3929",
    "dark": "#3d3931"
  },
  "--dsw-alias-toast-label": {
    "light": "#faf9f5",
    "dark": "#e8e6dc"
  },
  "--dsw-alias-tooltip-bg": {
    "light": "#3d3929",
    "dark": "#3d3931"
  },
  "--dsw-specific-bubble": {
    "light": "#eeece4",
    "dark": "#383630"
  },
  "--dsw-specific-bubble-highlight": {
    "light": "#e8d2c5",
    "dark": "#503d32"
  },
  "--dsw-specific-input-major": {
    "light": "#fdfcf9",
    "dark": "#30302d"
  },
  "--dsw-specific-login-input": {
    "light": "#f5f3ed",
    "dark": "#2c2b28"
  },
  "--dsw-specific-selector": {
    "light": "#eeece4",
    "dark": "#3b3934"
  },
  "--dsw-specific-sidebar-fill": {
    "light": "#f0eee6",
    "dark": "#201f1c"
  },
  "--dsw-specific-sidebar-nav-item-active": {
    "light": "#e6e3d8",
    "dark": "#39362f"
  },
  "--dsw-specific-sidebar-nav-item-active-accent": {
    "light": "#edddd2",
    "dark": "#42332c"
  },
  "--dsw-specific-sidebar-nav-item-hover": {
    "light": "#e9e6dc",
    "dark": "#2f2d28"
  },
  "--dsw-specific-tip": {
    "light": "#eeece4",
    "dark": "#36342f"
  },
  "--dsw-specific-menu": {
    "light": "#fdfcf9f5",
    "dark": "#30302df5"
  },
  "--dsw-menu-surface-fill": {
    "light": "#fdfcf9f5",
    "dark": "#30302df5"
  },
  "--dsw-alias-settings-card-fill": {
    "light": "#f5f3ed",
    "dark": "#2c2b28"
  },
  "--dsw-alias-settings-card-stroke": {
    "light": "#3d39291f",
    "dark": "#e8e6dc24"
  },
  "--dsw-focus-ring-color": {
    "light": "#ae5639",
    "dark": "#d98c6e"
  },
  "--dsw-radius-xs": {
    "light": "4px",
    "dark": "4px"
  },
  "--dsw-radius-sm": {
    "light": "6px",
    "dark": "6px"
  },
  "--dsw-radius-md": {
    "light": "8px",
    "dark": "8px"
  },
  "--dsw-radius-lg": {
    "light": "12px",
    "dark": "12px"
  },
  "--dsw-radius-xl": {
    "light": "16px",
    "dark": "16px"
  },
  "--dsw-radius-panel": {
    "light": "16px",
    "dark": "16px"
  },
  "--dsw-corner-shape": {
    "light": "round",
    "dark": "round"
  },
  "--dsw-shadow-lv1": {
    "light": "0 1px 3px #3d39290a",
    "dark": "0 1px 3px #00000014"
  },
  "--dsw-shadow-lv1-blur": {
    "light": "0 2px 8px #3d39290a",
    "dark": "0 2px 8px #00000014"
  },
  "--dsw-shadow-lv2": {
    "light": "0 4px 16px #3d392912",
    "dark": "0 4px 16px #00000026"
  },
  "--dsw-shadow-lv3": {
    "light": "0 8px 32px #3d39291a",
    "dark": "0 8px 32px #00000033"
  },
  "--dsw-font-family-brand": {
    "light": "Georgia, \"Times New Roman\", \"Songti SC\", \"Noto Serif CJK SC\", serif",
    "dark": "Georgia, \"Times New Roman\", \"Songti SC\", \"Noto Serif CJK SC\", serif"
  }
};
    const css = "/* Component selectors are verified against DSH 0.2.1-rc.5.\n   All rules are opt-in and disappear with the plugin. Host geometry stays native. */\nbody[data-dsh-claude-skin] {\n  --dsh-claude-accent: #c96442;\n  --dsh-claude-accent-text: #97482f;\n  --dsh-claude-accent-soft: #f0dfd5;\n  --dsh-claude-focus: #b75c3d;\n  --dsh-claude-shadow: 0 2px 8px #3d39290a, 0 0 0 1px #3d392924;\n  --dsh-claude-focus-shadow: 0 2px 10px #3d39290a, 0 0 0 1px #b75c3d99;\n}\n\nbody[data-dsh-claude-skin][data-ds-dark-theme] {\n  --dsh-claude-accent: #d98c6e;\n  --dsh-claude-accent-text: #e3a88f;\n  --dsh-claude-accent-soft: #42332c;\n  --dsh-claude-focus: #d98c6e;\n  --dsh-claude-shadow: 0 2px 8px #00000012, 0 0 0 1px #e8e6dc24;\n  --dsh-claude-focus-shadow: 0 2px 10px #00000012, 0 0 0 1px #d98c6e99;\n}\n\n/* An opaque paper rail replaces the platform's violet material. */\nbody[data-dsh-claude-skin] .PIRFFq_sidebarCol {\n  background: var(--dsw-specific-sidebar-fill) !important;\n  box-shadow: inset -1px 0 var(--dsw-alias-border-l1);\n}\n\nbody[data-dsh-claude-skin] .kB3qhq_root { background: transparent; }\n\nbody[data-dsh-claude-skin] .kB3qhq_newSession {\n  background: var(--dsw-alias-bg-layer-1);\n  border-color: var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-md);\n  color: var(--dsw-alias-label-primary);\n  box-shadow: 0 1px 2px #3d392906;\n}\n\nbody[data-dsh-claude-skin] .kB3qhq_newSession:hover {\n  background: var(--dsh-claude-accent-soft);\n  border-color: var(--dsh-claude-accent);\n}\n\nbody[data-dsh-claude-skin] .kB3qhq_newSessionContent > svg {\n  color: var(--dsh-claude-accent-text);\n}\n\nbody[data-dsh-claude-skin] .kB3qhq_panelActive {\n  background: var(--dsw-specific-sidebar-nav-item-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n/* Editorial type is reserved for the welcome headline. User font settings win. */\nbody[data-dsh-claude-skin] ._8tPydW_headline {\n  font-family: var(--dsh-font-family-text, var(--dsw-font-family-brand));\n  font-weight: 400;\n  letter-spacing: -.02em;\n}\n\nbody[data-dsh-claude-skin] :is(._8tPydW_fish, .kB3qhq_brandMark) {\n  color: var(--dsh-claude-accent);\n}\n\nbody[data-dsh-claude-skin] ._8tPydW_previewBadge {\n  background: var(--dsh-claude-accent-soft);\n  border-color: transparent;\n  color: var(--dsh-claude-accent-text);\n}\n\nbody[data-dsh-claude-skin] .JZLxKW_card {\n  box-shadow: var(--dsh-claude-shadow);\n}\n\nbody[data-dsh-claude-skin] .JZLxKW_card:focus-within {\n  box-shadow: var(--dsh-claude-focus-shadow);\n}\n\n/* Native send geometry, disabled/stop behavior and keyboard handling are retained. */\nbody[data-dsh-claude-skin] .JZLxKW_primary {\n  color: var(--dsw-alias-label-primary-foreground);\n  border-radius: var(--dsw-radius-md);\n}\n\nbody[data-dsh-claude-skin] a {\n  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);\n  text-underline-offset: 3px;\n}\n\nbody[data-dsh-claude-skin] ::selection {\n  background: var(--dsh-claude-accent-soft);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  body[data-dsh-claude-skin] :is(.kB3qhq_newSession, .kB3qhq_panelRow, .JZLxKW_card, .JZLxKW_primary) {\n    transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-claude-skin] :is(.kB3qhq_newSession, .kB3qhq_panelRow, .JZLxKW_card, .JZLxKW_primary) {\n    transition: none;\n  }\n}\n";
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
            body.setAttribute(attribute, "0.1.0");
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
