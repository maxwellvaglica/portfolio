import { ImageResponse } from "next/og";
import { PROJECTS } from "@/app/data";

export const alt = "Project — Maxwell Vaglica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOG({
  params,
}: {
  params: { id: string };
}) {
  const project = PROJECTS.find((p) => p.id === params.id);
  const name = project?.name ?? "Project";
  const description = project?.description ?? "";
  const tech = project?.details?.technologies?.slice(0, 5) ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "linear-gradient(135deg, #09090B 0%, #18181B 50%, #1e1b4b 100%)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "#FAFAFA",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#A1A1AA",
          fontSize: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: "#818CF8",
            }}
          />
          maxvaglica.com / projects
        </div>
        <div>{project?.category ?? ""}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "1050px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#A1A1AA",
            lineHeight: 1.4,
            maxWidth: "1050px",
          }}
        >
          {description.length > 220
            ? description.slice(0, 218) + "…"
            : description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {tech.map((t) => (
            <div
              key={t}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(63, 63, 70, 0.6)",
                border: "1px solid rgba(82, 82, 91, 0.6)",
                color: "#D4D4D8",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ color: "#A1A1AA" }}>by Maxwell Vaglica</div>
      </div>
    </div>,
    { ...size },
  );
}
