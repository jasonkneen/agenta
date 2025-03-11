// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const CATEGORY_UTILITIES: any = {
  type: "category",
  collapsed: false,
  collapsible: false,
  className: "sidebar-section-title",
};

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      label: "Getting Started",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "getting-started" }],
    },
    {
      label: "Prompt Management",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "prompt-management" },
              {type: "category",
                collapsed: true,
                collapsible: true,
                label: "Tutorials",
                items: [ "tutorials/sdk/manage-prompts-with-SDK"]}],
    },
    ,
    {
      label: "Custom Workflows",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "custom-workflows" }
              ],
    },
    {
      label: "Evaluation",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "evaluation" },
              {type: "category",
                collapsed: true,
                collapsible: true,
                label: "Tutorials",
                items: [ "tutorials/sdk/evaluate-with-SDK"]}],
    },
    {
      label: "Observability",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "observability" }],
    },
    {
      label: "Concepts",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "concepts" }],
    },
    {
      label: "Misc",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "misc" }],
    },
    {
      label: "Self-host",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "self-host" }],
    },

  ],
  guidesSidebar: [
    {
      label: "Cookbooks",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "tutorials/cookbooks" }],
    },
    {
      label: "SDK",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "tutorials/sdk" }],
    },
  ],
  refrenceSidebar: [
    {
      label: "Python SDK",
      ...CATEGORY_UTILITIES,
      items: [{ type: "autogenerated", dirName: "reference/sdk" }],
    },
    {
      label: "API Reference",
      ...CATEGORY_UTILITIES,
      link: {
        type: "generated-index",
        title: "APIs",
        description: "This is a sample server Agenta.io server.",
        slug: "/reference/api/category",
      },
      // @ts-ignore
      items: require("./docs/reference/api/sidebar.js"),
    },
  ],
};

export default sidebars;
