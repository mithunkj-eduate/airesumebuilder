import { forwardRef } from "react";
import { TEMPLATES } from "../../data/defaults.js";

// ─── Resume Preview ───────────────────────────────────────────────────────────
// Renders an ATS-friendly single-column layout using the selected template.
// Uses only inline styles so html2canvas captures it accurately.
const ResumePreview = forwardRef(function ResumePreview(
  { data, templateKey },
  ref,
) {
  const t = TEMPLATES[templateKey] || TEMPLATES.minimalist;
  const p = data.personal_info || {};

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        fontFamily: t.fontFamily,
        fontSize: "12px",
        lineHeight: "1.55",
        color: "#222222",
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        boxShadow: "0 4px 40px rgba(0,0,0,0.12)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: t.headerBg,
          padding: t.headerPad,
          borderBottom: t.headerBorderBottom,
        }}
      >
        <h1
          style={{
            fontSize: t.nameSize,
            fontWeight: t.nameWeight,
            color: t.headerText,
            letterSpacing: t.nameLetterSpacing,
            margin: "0 0 10px 0",
            lineHeight: 1.1,
          }}
        >
          {p.name || "Your Name"}
        </h1>

        {/* Contact row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px 20px",
            fontSize: t.contactSize,
            color: t.contactColor,
          }}
        >
          {p.phone && <span>{p.phone}</span>}
          {p.email && <span>{p.email}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.portfolio && <span>{p.portfolio}</span>}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div style={{ padding: t.bodyPad }}>
        {/* Summary */}
        {data.summary && (
          <Section title="Professional Summary" t={t}>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.65",
                color: "#333",
                margin: 0,
              }}
            >
              {data.summary}
            </p>
          </Section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <Section title="Experience" t={t}>
            {data.experience.map((exp, i) => (
              <ExperienceItem
                key={exp.id || i}
                exp={exp}
                isLast={i === data.experience.length - 1}
              />
            ))}
          </Section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <Section title="Education" t={t}>
            {data.education.map((ed, i) => (
              <EducationItem key={ed.id || i} ed={ed} />
            ))}
          </Section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <Section title="Technical Skills" t={t} isLast>
            <p
              style={{
                fontSize: "11.5px",
                color: "#333",
                margin: 0,
                lineHeight: "1.9",
              }}
            >
              {data.skills.join("  •  ")}
            </p>
          </Section>
        )}
      </div>
    </div>
  );
});

export default ResumePreview;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, t, children, isLast = false }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "18px" }}>
      <div style={t.sectionTitleStyle}>{title}</div>
      {children}
    </div>
  );
}

function ExperienceItem({ exp, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={{ fontWeight: "700", fontSize: "12.5px", color: "#111" }}>
          {exp.job_title || "Job Title"}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "#666",
            whiteSpace: "nowrap",
            marginLeft: "8px",
          }}
        >
          {exp.duration}
        </span>
      </div>
      <div style={{ fontSize: "12px", color: "#444", marginBottom: "5px" }}>
        {exp.company}
        {exp.location ? ` — ${exp.location}` : ""}
      </div>
      {exp.bullet_points?.length > 0 && (
        <ul style={{ paddingLeft: "17px", margin: 0 }}>
          {exp.bullet_points.filter(Boolean).map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: "11.5px",
                color: "#333",
                marginBottom: "2px",
                lineHeight: "1.55",
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EducationItem({ ed }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      <div>
        <div style={{ fontWeight: "700", fontSize: "12.5px", color: "#111" }}>
          {ed.degree}
        </div>
        <div style={{ fontSize: "11.5px", color: "#555" }}>
          {ed.school}
          {ed.location ? `, ${ed.location}` : ""}
        </div>
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#666",
          whiteSpace: "nowrap",
          marginLeft: "8px",
        }}
      >
        {ed.duration}
      </div>
    </div>
  );
}
