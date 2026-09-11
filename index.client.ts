import type { PluginClientContext } from "@getpaseo/plugin/client";

export default function contribute(client: PluginClientContext) {
  client.addTheme({
    id: "solarized-light",
    name: "Solarized Light",
    appearance: "light",
    colors: {
      background: "#fdf6e3",
      foreground: "#657b83",
      raised: "#eee8d5",
      control: "#eee8d5",
      border: "#e6e0cd",
      accent: "#cb4b16",
      mutedForeground: "#839496",
      ring: "#586e75",
    },
  });
  return () => {};
}
