import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Krish — Cinematographer & Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div
            style={{
              flex: 1,
              background:
                "radial-gradient(420px circle at 18% 20%, rgba(0,217,255,0.16), transparent 65%)",
            }}
          />
          <div
            style={{
              flex: 1,
              background:
                "radial-gradient(420px circle at 80% 78%, rgba(0,255,136,0.14), transparent 65%)",
            }}
          />
          <div
            style={{
              flex: 1,
              background:
                "radial-gradient(340px circle at 70% 15%, rgba(255,0,255,0.1), transparent 65%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 40,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#8a90a4",
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#00ff88" }}>~/krish</span>
          <span>· cinematographer · frontend dev</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "#ff00ff", fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
            &gt;
          </span>
          <span style={{ color: "#e7e9f0", fontSize: 132, fontWeight: 700, lineHeight: 1.1 }}>
            K_
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingLeft: 64,
            paddingBottom: 40,
          }}
        >
          <div style={{ fontSize: 26, color: "#00d9ff", letterSpacing: "0.35em" }}>
            _&gt; ./work-in-progress.sh
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            KRISH
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 28,
              color: "#8a90a4",
              letterSpacing: "0.15em",
              fontStyle: "italic",
            }}
          >
            code is my second camera
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}