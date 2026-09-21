import type { PluginClientContext } from "@getpaseo/plugin/client";

export default function contribute(client: PluginClientContext) {
  // 浅色端：正文用 base00，页面背景 base3
  client.addTheme({
    id: "light",
    name: "Solarized Light",
    appearance: "light",
    colors: {
      background: "#fdf6e3", // base3   页面背景
      foreground: "#657b83", // base00  正文
      raised: "#eee8d5", // base2   次要凸起层
      control: "#eee8d5", // base2   控件背景
      border: "#e6e0cd", // 自定义（介于 base2/base3）：用户气泡背景，气泡文字对比 3.4:1
      accent: "#cb4b16", // orange  强调色
      mutedForeground: "#839496", // base0   次要文字
      ring: "#586e75", // base01  焦点环
    },
  });

  // 深色端：正文用 base0（base00 在深底上仅 3.4:1，不达正文标准）
  client.addTheme({
    id: "dark",
    name: "Solarized Dark",
    appearance: "dark",
    colors: {
      background: "#002b36", // base03  页面背景
      foreground: "#839496", // base0   正文
      raised: "#073642", // base02  次要凸起层
      control: "#073642", // base02  控件背景
      border: "#073642", // base02  用户气泡背景，气泡文字对比 4.1:1
      accent: "#2aa198", // cyan    强调色（深底上 4.8:1；orange 仅 3.3:1 不可用）
      mutedForeground: "#586e75", // base01  次要文字
      ring: "#93a1a1", // base1   焦点环
    },
  });

  return () => {};
}
