import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maxwell Vaglica — Data & AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "linear-gradient(135deg, #09090B 0%, #18181B 50%, #052e2b 100%)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "#FAFAFA",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "22px",
          color: "#34D399",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "9999px",
            background: "#34D399",
          }}
        />
        maxvaglica.com
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: "92px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Maxwell Vaglica
        </div>
        <div
          style={{
            fontSize: "44px",
            fontWeight: 500,
            color: "#A1A1AA",
          }}
        >
          Data & AI/ML Engineer
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#71717A",
            maxWidth: "1000px",
            marginTop: "8px",
          }}
        >
          Production data pipelines, cloud apps, and agentic AI · M.S. CS,
          Georgia Tech
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          fontSize: "20px",
          color: "#D4D4D8",
        }}
      >
        {["Python", "PyTorch", "FastAPI", "GCP", "Agentic AI", "RAG"].map(
          (skill) => (
            <div
              key={skill}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                background: "rgba(63, 63, 70, 0.6)",
                border: "1px solid rgba(82, 82, 91, 0.6)",
              }}
            >
              {skill}
            </div>
          ),
        )}
      </div>
    </div>,
    { ...size },
  );
}
