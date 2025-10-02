import { getConnectBaseViteConfig } from "@powerhousedao/builder-tools";
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from "vite";
import phConfig from "./powerhouse.config.json" with { type: "json" };
import { getConfig } from "@powerhousedao/config/node";

const powerhouseConfig = getConfig();

export default defineConfig(({ mode }) => {
  const projectRootPath = process.cwd();
  const env = loadEnv(mode, projectRootPath);
  const baseConnectViteConfig = getConnectBaseViteConfig({
    dirname: import.meta.dirname,
    env,
    powerhouseConfig,
  });

  const additionalViteConfig: UserConfig = {
    // add your own vite config here
  };

  const config = mergeConfig(baseConnectViteConfig, additionalViteConfig);

  return config;
});
