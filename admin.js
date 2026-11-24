
const $ = id => document.getElementById(id);

let rows = [];

function show(data) {
  rows = data;

  $("status").textContent =
    `Jami qatnashchilar: ${rows.length}`;

  const tbody = $("results").querySelector("tbody");
  tbody.innerHTML = "";

  rows.slice().reverse().forEach(r => {
    const tr = document.createElement("tr");

    [
      r.name,
      `${r.score}/15`,
      `${r.percent}%`,
      `${Math.floor((r.duration_seconds || 0) / 60)}:${String((r.duration_seconds || 0) % 60).padStart(2, "0")}`,
      new Date(r.created_at).toLocaleString("uz-UZ")
    ].forEach(v => {
      const td = document.createElement("td");

      td.textContent = v;
      td.style.padding = "12px 8px";
      td.style.borderBottom = "1px solid #59402d";

      tr.append(td);
    });

    tbody.append(tr);
  });
}

$("csv").onclick = () => {
  const head = [
    "Ism-familiya",
    "Ball",
    "Foiz",
    "Davomiylik (soniya)",
    "Yakunlangan vaqt"
  ];

  const data = rows.map(r => [
    r.name,
    r.score,
    r.percent,
    r.duration_seconds,
    r.created_at
  ]);

  const csv = [head, ...data]
    .map(row =>
      row.map(v =>
        '"' + String(v ?? "").replaceAll('"', '""') + '"'
      ).join(",")
    )
    .join("\n");

  const a = document.createElement("a");

  a.href = URL.createObjectURL(
    new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8"
    })
  );

  a.download = "huquqchiuz-imtihon-natijalari.csv";
  a.click();

  URL.revokeObjectURL(a.href);
};

async function load() {
  try {
    const r = await fetch("/api/admin");
    const d = await r.json();

    if (!r.ok) {
      throw new Error(d.error || "Xatolik");
    }

    show(d.rows || []);

  } catch (e) {
    $("status").textContent =
      "Natijalarni yuklab bo‘lmadi: " + e.message;
  }
}

load();
