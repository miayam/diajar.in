import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [presetWind4()],
  preflights: [
    {
      getCSS: () => `
        *::-webkit-scrollbar {
          width: 3px;
          height: 5px;
        }

        *::-webkit-scrollbar-track {
          border-radius: 100vh;
          background: #f7f4ed;
        }

        *::-webkit-scrollbar-thumb {
          background: #323232;
          border-radius: 100vh;
          border: 1px solid #323232;
        }

        *:-webkit-scrollbar-thumb:hover {
          background: #c0a0b9;
        }
      `,
    },
  ],
});
