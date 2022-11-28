type TemplateProps = {
  filesToCopy: string[];
  scripts: { [K: string]: string };
  dependencies: string[];
  devDependencies: string[];
  constants: { [K: string]: string };
};

export const templateConfigs = {
  'vite-react': {
    constants: {
      siteName: '',
      apiUrl: '',
    },

    filesToCopy: [
      'src',
      '_templates',
      `\.babel-plugin-macrosrc.json`,
      `\.eslintrc.json`,
      `\.prettierrc`,
      'tsconfig.json',
      'vite.config.ts',
    ],

    scripts: {
      serve: 'tsc && vite build && vite preview',
      mnc: 'hygen component mantine --name',
      nc: 'hygen component new --name',
      np: 'hygen page new --name',
      tsc: 'tsc',
      lint: 'eslint ./src/**/*.{ts,tsx}',
      'lint:fix': "eslint --fix 'src/**/*.{ts,tsx}'",
    },

    dependencies: [
      '@emotion/react',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome',
      '@mantine/core',
      '@mantine/form',
      '@mantine/hooks',
      '@reduxjs/toolkit',
      '@tanstack/react-query',
      'axios',
      'js-cookie',
      'react-redux',
      'react-router-dom',
    ],

    devDependencies: [
      '@types/js-cookie',
      '@types/node',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'babel-plugin-macros',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-simple-import-sort',
      'prettier',
    ],
  } as TemplateProps,
};
