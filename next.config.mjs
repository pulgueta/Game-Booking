import FilterWarningsPlugin from 'webpack-filter-warnings-plugin'

import './envs.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    webpack: (config) => {
        config.ignoreWarnings = [
            { module: /node_modules\/typeorm\/util\/ImportUtils\.js/ },
            { module: /node_modules\/typeorm\/util\/DirectoryExportedClassesLoader\.js/ },
            { module: /node_modules\/typeorm\/platform\/PlatformTools\.js/ },
            { module: /node_modules\/typeorm\/connection\/ConnectionOptionsReader\.js/ },
            { module: /node_modules\/app-root-path\/lib\/app-root-path\.js/ },
        ];

        config.plugins = [
            ...config.plugins,
            new FilterWarningsPlugin({
                exclude: [
                    /aws-crt/,
                    /mongodb/,
                    /encoding/,
                    /mssql/,
                    /mysql/,
                    /mysql2/,
                    /oracledb/,
                    /pg/,
                    /pg-native/,
                    /pg-query-stream/,
                    /react-native-sqlite-storage/,
                    /redis/,
                    /sqlite3/,
                    /sql.js/,
                    /typeorm-aurora-data-api-driver/,
                    /hdb-pool/,
                    /spanner/,
                    /hana-client/,
                ],
            }),
        ];

        return config
    },
    experimental: {
        typedRoutes: true,
        serverComponentsExternalPackages: ['typeorm']
    }
};

export default nextConfig;
