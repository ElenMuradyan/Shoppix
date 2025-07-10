import nativewindPreset from "nativewind/preset";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  darkMode: 'media', 
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
