import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css"


export const decorators = [
  (Story, context) => {
    useEffect(() => {
      const isDark = context.globals.theme === 'dark';
      const root = document.documentElement;

      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }, [context.globals.theme]);

    return <Story />;
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Select light or dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
};

export default preview;