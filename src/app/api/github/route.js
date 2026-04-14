import { NextResponse } from "next/server";

const USERNAME = "tiedsandi";
const GH = "https://api.github.com";

const LANG_COLOR = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4f5d95",
  Go: "#00add8",
  Python: "#3572A5",
  CSS: "#563d7c",
  Vue: "#41b883",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  Shell: "#89e051",
};

export const revalidate = 3600;

async function fetchPinnedRepos(token) {
  const query = `{
    user(login: "${USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage { name color }
            stargazerCount
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.user?.pinnedItems?.nodes ?? null;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers = {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const [reposRes, contribRes] = await Promise.all([
      fetch(`${GH}/users/${USERNAME}/repos?sort=pushed&per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { next: { revalidate: 3600 } },
      ),
    ]);

    const repos = reposRes.ok ? await reposRes.json() : [];
    const contribData = contribRes.ok ? await contribRes.json() : null;

    // Aggregate language usage across repos
    const langCounts = {};
    (Array.isArray(repos) ? repos : []).forEach((r) => {
      if (r.language && !r.fork) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });
    const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / langTotal) * 100),
        color: LANG_COLOR[name] || "#666",
      }));

    // Pinned repos via GraphQL (if token available), fallback to top-star repos
    let pinned = [];
    if (token) {
      const pinnedNodes = await fetchPinnedRepos(token);
      if (pinnedNodes?.length) {
        pinned = pinnedNodes.slice(0, 4).map((r) => ({
          name: r.name,
          description: r.description || "",
          language: r.primaryLanguage?.name || "",
          stars: r.stargazerCount,
          color:
            r.primaryLanguage?.color ||
            LANG_COLOR[r.primaryLanguage?.name] ||
            "#666",
          url: r.url,
        }));
      }
    }

    // Fallback: top repos by stars if GraphQL failed or no token
    if (!pinned.length) {
      pinned = (Array.isArray(repos) ? repos : [])
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          description: r.description || "",
          language: r.language || "",
          stars: r.stargazers_count,
          color: LANG_COLOR[r.language] || "#666",
          url: r.html_url,
        }));
    }

    const contributions = contribData?.contributions ?? [];

    return NextResponse.json({
      username: USERNAME,
      total_repos: (Array.isArray(repos) ? repos : []).filter((r) => !r.fork)
        .length,
      languages,
      pinned,
      contributions,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
