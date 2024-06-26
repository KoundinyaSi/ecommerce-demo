import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontWeight: {
      "semibold": "600",
      "extra-semibold":"500"
    },
    extend: {
      fontFamily: {
        interSans: ['Inter'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
