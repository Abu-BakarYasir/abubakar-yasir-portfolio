import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Abu Bakar Yasir — Full-Stack & AI Engineer";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14100b",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* aurora blobs */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -180,
            left: -140,
            background: "radial-gradient(circle, #e8a73c 0%, transparent 60%)",
            opacity: 0.5,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            bottom: -220,
            right: -160,
            background: "radial-gradient(circle, #c0603a 0%, transparent 60%)",
            opacity: 0.5,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e8a73c",
            fontWeight: 600,
          }}
        >
          Full-Stack &amp; AI Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 700,
            color: "#f5f7ff",
            letterSpacing: -4,
            lineHeight: 1.05,
            marginTop: 18,
          }}
        >
          Abu Bakar Yasir
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9ba6c4",
            marginTop: 26,
            maxWidth: 900,
          }}
        >
          RAG pipelines · multi-agent LLM systems · multi-tenant SaaS — shipped end-to-end.
        </div>
      </div>
    ),
    size,
  );
}
