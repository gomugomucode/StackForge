export interface EcosystemRelease {
  technology: string;
  version: string;
  releaseDate: string;
  whatsNew: string[];
  breakingChanges: string[];
  deprecatedAPIs: string[];
  migrationGuideUrl: string;
  affectedLessonSlugs: string[];
}

export class ReleaseIntelligenceService {
  public static async getLatestReleases(): Promise<EcosystemRelease[]> {
    return [
      {
        technology: "react",
        version: "19.0.0",
        releaseDate: "2026-05-15",
        whatsNew: ["React Server Components native support", "use Action hook", "useOptimistic Hook", "Asset Loading Support"],
        breakingChanges: ["ReactDOM.render deprecated in favor of createRoot", "defaultProps removed for function components"],
        deprecatedAPIs: ["findDOMNode", "componentWillReceiveProps"],
        migrationGuideUrl: "https://react.dev/blog/2026/05/15/react-19-upgrade-guide",
        affectedLessonSlugs: ["react-fiber-reconciliation", "react-hooks-and-state", "react-server-components-architecture"],
      },
      {
        technology: "nextjs",
        version: "15.0.0",
        releaseDate: "2026-06-01",
        whatsNew: ["Partial Prerendering (PPR) Default", "React 19 support", "Async Request APIs (cookies, headers)", "Turbopack for Production"],
        breakingChanges: ["cookies() and headers() are now asynchronous Promises"],
        deprecatedAPIs: ["getInitialProps in App Router"],
        migrationGuideUrl: "https://nextjs.org/docs/app/building-your-application/upgrading/version-15",
        affectedLessonSlugs: ["nextjs-app-router-architecture", "nextjs-caching-and-performance"],
      },
    ];
  }
}
