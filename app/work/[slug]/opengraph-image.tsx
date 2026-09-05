import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const color = project?.color ?? "#00ff88";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#05060c",
          color: "#e7e9f0",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          position: "relative",
          overflow: "hidden",
          padding: 64,
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div
            style={{
              flex: 1,
              background: `radial-gradient(520px circle at 75% 20%, ${color}1f, transparent 65%)`,
            }}
          />
          <div
            style={{
              flex: 1,
              background:
                "radial-gradient(380px circle at 15% 85%, rgba(0,217,255,0.1), transparent 65%)",
            }}
          />
        </div>

        <div
          style={{
            color: "#8a90a4",
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "flex",
            gap: 14,
          }}
        >
          <span style={{ color }}>
            ~/work/{slug}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div style={{ fontSize: 34, color: "#00d9ff", letterSpacing: "0.3em" }}>
            _&gt; case-study
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 1000,
              color,
            }}
          >
            {project?.title ?? "Unknown"}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#8a90a4",
              lineHeight: 1.5,
              maxWidth: 900,
            }}
          >
            {project?.blurb ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            color: "#e7e9f0",
            fontSize: 24,
          }}
        >
          {project?.tags.map((t) => (
            <div
              key={t}
              style={{
                border: "1px solid rgba(231,233,240,0.25)",
                borderRadius: 999,
                padding: "8px 22px",
                fontSize: 22,
                color: "#e7e9f0",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}