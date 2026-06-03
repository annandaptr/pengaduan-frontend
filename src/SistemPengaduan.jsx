import { useState } from "react";

const steps = ["Pilih Jenis", "Data Diri", "Isi Pengaduan", "Upload Dokumen", "Konfirmasi"];

const jenisPengaduan = [
  {
    id: "akta",
    icon: "📄",
    title: "Akta Kelahiran",
    desc: "Perbaikan data pada akta kelahiran",
    color: "#1a6b4a",
  },
  {
    id: "kk",
    icon: "🏠",
    title: "Kartu Keluarga",
    desc: "Perubahan atau perbaikan data KK",
    color: "#1a4b6b",
  },
  {
    id: "ktp",
    icon: "🪪",
    title: "KTP",
    desc: "Perbaikan data Kartu Tanda Penduduk",
    color: "#6b1a4b",
  },
];

const statusData = [
  { id: "PDG-2024-001", jenis: "Akta Kelahiran", status: "Diproses", tanggal: "28 Mei 2024", color: "#f59e0b" },
  { id: "PDG-2024-002", jenis: "KTP", status: "Selesai", tanggal: "15 Mei 2024", color: "#10b981" },
  { id: "PDG-2024-003", jenis: "Kartu Keluarga", status: "Menunggu", tanggal: "30 Mei 2024", color: "#6366f1" },
];

export default function SistemPengaduan() {
  const [page, setPage] = useState("beranda"); // beranda | form | status | sukses
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ nama: "", nik: "", telp: "", email: "", deskripsi: "", file: null });
  const [nomorPengaduan, setNomorPengaduan] = useState("");

  const handleSubmit = () => {
    const nomor = "PDG-" + Date.now().toString().slice(-6);
    setNomorPengaduan(nomor);
    setPage("sukses");
  };

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚖️</span>
            <div>
              <div style={styles.logoTitle}>LAPOR DESA</div>
              <div style={styles.logoSub}>Sistem Pengaduan Dokumen Kependudukan</div>
            </div>
          </div>
          <nav style={styles.nav}>
            <button style={page === "beranda" ? styles.navActive : styles.navBtn} onClick={() => setPage("beranda")}>Beranda</button>
            <button style={page === "form" ? styles.navActive : styles.navBtn} onClick={() => { setPage("form"); setStep(0); setSelected(null); }}>Buat Pengaduan</button>
            <button style={page === "status" ? styles.navActive : styles.navBtn} onClick={() => setPage("status")}>Cek Status</button>
          </nav>
        </div>
      </header>

      <main style={styles.main}>

        {/* ======== BERANDA ======== */}
        {page === "beranda" && (
          <div>
            {/* Hero */}
            <section style={styles.hero}>
              <div style={styles.heroContent}>
                <div style={styles.heroBadge}>🏛️ Layanan Publik Digital</div>
                <h1 style={styles.heroTitle}>Pengaduan Dokumen<br /><span style={styles.heroAccent}>Kependudukan Online</span></h1>
                <p style={styles.heroDesc}>Sampaikan pengaduan perbaikan Akta Kelahiran, Kartu Keluarga, dan KTP dengan mudah, cepat, dan transparan.</p>
                <div style={styles.heroBtns}>
                  <button style={styles.btnPrimary} onClick={() => { setPage("form"); setStep(0); setSelected(null); }}>
                    Buat Pengaduan Sekarang →
                  </button>
                  <button style={styles.btnOutline} onClick={() => setPage("status")}>
                    Cek Status Pengaduan
                  </button>
                </div>
              </div>
              <div style={styles.heroVisual}>
                <div style={styles.heroCard}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#1e293b" }}>Mudah & Cepat</div>
                  <div style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>Proses pengaduan 100% online tanpa antri</div>
                </div>
              </div>
            </section>

            {/* Jenis Layanan */}
            <section style={styles.section}>
              <div style={styles.sectionLabel}>Jenis Layanan</div>
              <h2 style={styles.sectionTitle}>Apa yang bisa kami bantu?</h2>
              <div style={styles.cardGrid}>
                {jenisPengaduan.map((j) => (
                  <div key={j.id} style={{ ...styles.layananCard, borderTop: `4px solid ${j.color}` }}
                    onClick={() => { setSelected(j.id); setPage("form"); setStep(1); }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{j.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "#1e293b", marginBottom: 6 }}>{j.title}</div>
                    <div style={{ color: "#64748b", fontSize: 14 }}>{j.desc}</div>
                    <div style={{ marginTop: 16, color: j.color, fontWeight: 600, fontSize: 13 }}>Buat Pengaduan →</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section style={styles.statsBar}>
              {[["1.240+", "Pengaduan Masuk"], ["98%", "Terselesaikan"], ["3 Hari", "Rata-rata Proses"], ["24/7", "Layanan Online"]].map(([num, label]) => (
                <div key={label} style={styles.statItem}>
                  <div style={styles.statNum}>{num}</div>
                  <div style={styles.statLabel}>{label}</div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ======== FORM PENGADUAN ======== */}
        {page === "form" && (
          <div style={styles.formPage}>
            <div style={styles.formContainer}>
              <h2 style={styles.formTitle}>Buat Pengaduan Baru</h2>

              {/* Stepper */}
              <div style={styles.stepper}>
                {steps.map((s, i) => (
                  <div key={s} style={styles.stepItem}>
                    <div style={{ ...styles.stepCircle, background: i <= step ? "#1a6b4a" : "#e2e8f0", color: i <= step ? "#fff" : "#94a3b8" }}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <div style={{ ...styles.stepLabel, color: i <= step ? "#1a6b4a" : "#94a3b8" }}>{s}</div>
                    {i < steps.length - 1 && <div style={{ ...styles.stepLine, background: i < step ? "#1a6b4a" : "#e2e8f0" }} />}
                  </div>
                ))}
              </div>

              {/* Step 0 - Pilih Jenis */}
              {step === 0 && (
                <div>
                  <p style={styles.stepDesc}>Pilih jenis dokumen yang ingin Anda adukan:</p>
                  <div style={styles.cardGrid}>
                    {jenisPengaduan.map((j) => (
                      <div key={j.id}
                        style={{ ...styles.selectCard, border: selected === j.id ? `2px solid ${j.color}` : "2px solid #e2e8f0", background: selected === j.id ? `${j.color}10` : "#fff" }}
                        onClick={() => setSelected(j.id)}>
                        <div style={{ fontSize: 36 }}>{j.icon}</div>
                        <div style={{ fontWeight: 700, marginTop: 8, color: "#1e293b" }}>{j.title}</div>
                        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{j.desc}</div>
                        {selected === j.id && <div style={{ marginTop: 8, color: j.color, fontWeight: 700 }}>✓ Dipilih</div>}
                      </div>
                    ))}
                  </div>
                  <div style={styles.formNav}>
                    <div />
                    <button style={selected ? styles.btnPrimary : styles.btnDisabled} disabled={!selected} onClick={() => setStep(1)}>
                      Lanjut →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1 - Data Diri */}
              {step === 1 && (
                <div>
                  <p style={styles.stepDesc}>Isi data diri Anda dengan benar:</p>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nama Lengkap *</label>
                      <input style={styles.input} placeholder="Sesuai KTP" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>NIK *</label>
                      <input style={styles.input} placeholder="16 digit NIK" value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} maxLength={16} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nomor HP *</label>
                      <input style={styles.input} placeholder="08xxxxxxxxxx" value={form.telp} onChange={e => setForm({ ...form, telp: e.target.value })} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email</label>
                      <input style={styles.input} placeholder="email@contoh.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div style={styles.formNav}>
                    <button style={styles.btnOutline} onClick={() => setStep(0)}>← Kembali</button>
                    <button style={form.nama && form.nik && form.telp ? styles.btnPrimary : styles.btnDisabled}
                      disabled={!form.nama || !form.nik || !form.telp} onClick={() => setStep(2)}>
                      Lanjut →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 - Isi Pengaduan */}
              {step === 2 && (
                <div>
                  <p style={styles.stepDesc}>Jelaskan masalah yang Anda alami:</p>
                  <div style={styles.infoBanner}>
                    <span>📌</span>
                    <span>Jenis pengaduan: <strong>{jenisPengaduan.find(j => j.id === selected)?.title}</strong></span>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Deskripsi Masalah *</label>
                    <textarea style={styles.textarea} rows={5}
                      placeholder="Contoh: Nama saya tertulis salah di akta kelahiran, seharusnya 'Ahmad' bukan 'Achmad'..."
                      value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} />
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{form.deskripsi.length}/500 karakter</div>
                  </div>
                  <div style={styles.formNav}>
                    <button style={styles.btnOutline} onClick={() => setStep(1)}>← Kembali</button>
                    <button style={form.deskripsi.length > 10 ? styles.btnPrimary : styles.btnDisabled}
                      disabled={form.deskripsi.length <= 10} onClick={() => setStep(3)}>
                      Lanjut →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 - Upload Dokumen */}
              {step === 3 && (
                <div>
                  <p style={styles.stepDesc}>Upload dokumen pendukung (opsional):</p>
                  <div style={styles.uploadBox} onClick={() => document.getElementById("fileInput").click()}>
                    <input id="fileInput" type="file" style={{ display: "none" }} accept=".pdf,.jpg,.png"
                      onChange={e => setForm({ ...form, file: e.target.files[0] })} />
                    {form.file ? (
                      <div>
                        <div style={{ fontSize: 32 }}>✅</div>
                        <div style={{ fontWeight: 600, color: "#1a6b4a", marginTop: 8 }}>{form.file.name}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>Klik untuk ganti file</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 40 }}>📁</div>
                        <div style={{ fontWeight: 600, color: "#475569", marginTop: 8 }}>Klik untuk upload dokumen</div>
                        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>PDF, JPG, PNG — maks 5MB</div>
                      </div>
                    )}
                  </div>
                  <div style={styles.formNav}>
                    <button style={styles.btnOutline} onClick={() => setStep(2)}>← Kembali</button>
                    <button style={styles.btnPrimary} onClick={() => setStep(4)}>Lanjut →</button>
                  </div>
                </div>
              )}

              {/* Step 4 - Konfirmasi */}
              {step === 4 && (
                <div>
                  <p style={styles.stepDesc}>Periksa kembali data Anda sebelum mengirim:</p>
                  <div style={styles.reviewBox}>
                    {[
                      ["Jenis Pengaduan", jenisPengaduan.find(j => j.id === selected)?.title],
                      ["Nama Lengkap", form.nama],
                      ["NIK", form.nik],
                      ["Nomor HP", form.telp],
                      ["Email", form.email || "-"],
                      ["Deskripsi", form.deskripsi],
                      ["Dokumen", form.file?.name || "Tidak ada"],
                    ].map(([key, val]) => (
                      <div key={key} style={styles.reviewRow}>
                        <div style={styles.reviewKey}>{key}</div>
                        <div style={styles.reviewVal}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={styles.formNav}>
                    <button style={styles.btnOutline} onClick={() => setStep(3)}>← Kembali</button>
                    <button style={styles.btnSubmit} onClick={handleSubmit}>
                      📨 Kirim Pengaduan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======== CEK STATUS ======== */}
        {page === "status" && (
          <div style={styles.formPage}>
            <div style={styles.formContainer}>
              <h2 style={styles.formTitle}>Cek Status Pengaduan</h2>
              <p style={styles.stepDesc}>Pantau perkembangan pengaduan Anda secara real-time.</p>

              <div style={styles.searchBox}>
                <input style={{ ...styles.input, flex: 1 }} placeholder="Masukkan nomor pengaduan (contoh: PDG-240001)" />
                <button style={styles.btnPrimary}>🔍 Cari</button>
              </div>

              <div style={{ marginTop: 32 }}>
                <div style={{ fontWeight: 700, color: "#475569", marginBottom: 16, fontSize: 14 }}>RIWAYAT PENGADUAN ANDA</div>
                {statusData.map((d) => (
                  <div key={d.id} style={styles.statusCard}>
                    <div style={styles.statusLeft}>
                      <div style={styles.statusId}>{d.id}</div>
                      <div style={styles.statusJenis}>{d.jenis}</div>
                      <div style={styles.statusTanggal}>📅 {d.tanggal}</div>
                    </div>
                    <div style={{ ...styles.statusBadge, background: d.color + "20", color: d.color, border: `1px solid ${d.color}40` }}>
                      {d.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== SUKSES ======== */}
        {page === "sukses" && (
          <div style={styles.formPage}>
            <div style={{ ...styles.formContainer, textAlign: "center" }}>
              <div style={styles.successIcon}>✅</div>
              <h2 style={styles.successTitle}>Pengaduan Berhasil Dikirim!</h2>
              <p style={styles.stepDesc}>Pengaduan Anda telah kami terima dan akan segera diproses oleh petugas.</p>
              <div style={styles.nomorBox}>
                <div style={{ color: "#64748b", fontSize: 14 }}>Nomor Pengaduan Anda</div>
                <div style={styles.nomorText}>{nomorPengaduan}</div>
                <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>Simpan nomor ini untuk memantau status pengaduan</div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
                <button style={styles.btnPrimary} onClick={() => setPage("status")}>📋 Cek Status</button>
                <button style={styles.btnOutline} onClick={() => { setPage("beranda"); setStep(0); setSelected(null); setForm({ nama: "", nik: "", telp: "", email: "", deskripsi: "", file: null }); }}>
                  🏠 Kembali ke Beranda
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>⚖️ <strong>LAPOR DESA</strong> — Sistem Pengaduan Dokumen Kependudukan</span>
          <span style={{ color: "#94a3b8" }}>© 2024 Dinas Kependudukan dan Pencatatan Sipil</span>
        </div>
      </footer>
    </div>
  );
}

// ============ STYLES ============
const styles = {
  root: { fontFamily: "'Georgia', serif", background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { background: "#fff", borderBottom: "2px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  headerInner: { maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 32 },
  logoTitle: { fontWeight: 800, fontSize: 20, color: "#1a6b4a", letterSpacing: -0.5 },
  logoSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  nav: { display: "flex", gap: 8 },
  navBtn: { padding: "8px 16px", border: "none", background: "transparent", cursor: "pointer", color: "#64748b", fontSize: 14, fontFamily: "inherit", borderRadius: 8, transition: "all 0.2s" },
  navActive: { padding: "8px 16px", border: "none", background: "#1a6b4a", cursor: "pointer", color: "#fff", fontSize: 14, fontFamily: "inherit", borderRadius: 8, fontWeight: 600 },
  main: { flex: 1 },

  // Hero
  hero: { maxWidth: 1100, margin: "0 auto", padding: "60px 24px", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" },
  heroContent: { flex: 1, minWidth: 280 },
  heroBadge: { display: "inline-block", background: "#dcfce7", color: "#166534", padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 16 },
  heroTitle: { fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.15, margin: "0 0 16px" },
  heroAccent: { color: "#1a6b4a" },
  heroDesc: { color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 28, maxWidth: 480 },
  heroBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
  heroVisual: { flex: "0 0 240px" },
  heroCard: { background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", textAlign: "center" },

  // Section
  section: { maxWidth: 1100, margin: "0 auto", padding: "40px 24px" },
  sectionLabel: { color: "#1a6b4a", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 },
  sectionTitle: { fontSize: 28, fontWeight: 800, color: "#1e293b", marginBottom: 28, marginTop: 0 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 },
  layananCard: { background: "#fff", borderRadius: 16, padding: 28, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" },

  // Stats
  statsBar: { background: "#1a6b4a", padding: "40px 24px", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" },
  statItem: { textAlign: "center" },
  statNum: { fontSize: 32, fontWeight: 800, color: "#fff" },
  statLabel: { fontSize: 13, color: "#86efac", marginTop: 4 },

  // Form Page
  formPage: { maxWidth: 780, margin: "40px auto", padding: "0 24px 40px" },
  formContainer: { background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" },
  formTitle: { fontSize: 26, fontWeight: 800, color: "#1e293b", marginTop: 0, marginBottom: 24 },

  // Stepper
  stepper: { display: "flex", alignItems: "flex-start", marginBottom: 36, overflowX: "auto", paddingBottom: 8 },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", position: "relative", flex: 1, minWidth: 60 },
  stepCircle: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, zIndex: 1 },
  stepLabel: { fontSize: 11, marginTop: 6, textAlign: "center", fontWeight: 600 },
  stepLine: { position: "absolute", top: 16, left: "50%", width: "100%", height: 2, zIndex: 0 },

  stepDesc: { color: "#64748b", marginBottom: 20, marginTop: 0 },
  selectCard: { borderRadius: 14, padding: 24, cursor: "pointer", textAlign: "center", transition: "all 0.2s" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  formGroup: { display: "flex", flexDirection: "column", gap: 6, gridColumn: "span 1" },
  label: { fontWeight: 600, fontSize: 14, color: "#374151" },
  input: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "border 0.2s" },
  textarea: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", resize: "vertical" },
  infoBanner: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", marginBottom: 20, fontSize: 14, color: "#166534" },
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: 16, padding: "48px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#f8fafc" },
  reviewBox: { border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 8 },
  reviewRow: { display: "flex", padding: "12px 16px", borderBottom: "1px solid #f1f5f9" },
  reviewKey: { fontWeight: 600, color: "#64748b", fontSize: 14, width: 160, flexShrink: 0 },
  reviewVal: { color: "#1e293b", fontSize: 14, wordBreak: "break-word" },
  formNav: { display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 },

  // Buttons
  btnPrimary: { padding: "11px 24px", background: "#1a6b4a", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnOutline: { padding: "11px 24px", background: "transparent", color: "#1a6b4a", border: "2px solid #1a6b4a", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnDisabled: { padding: "11px 24px", background: "#e2e8f0", color: "#94a3b8", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "not-allowed", fontFamily: "inherit" },
  btnSubmit: { padding: "11px 28px", background: "#1a6b4a", color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },

  // Status
  searchBox: { display: "flex", gap: 12, alignItems: "center" },
  statusCard: { background: "#f8fafc", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, border: "1px solid #e2e8f0" },
  statusLeft: {},
  statusId: { fontWeight: 700, color: "#1e293b", fontSize: 15 },
  statusJenis: { color: "#64748b", fontSize: 14, marginTop: 2 },
  statusTanggal: { color: "#94a3b8", fontSize: 13, marginTop: 4 },
  statusBadge: { padding: "6px 14px", borderRadius: 100, fontWeight: 700, fontSize: 13 },

  // Sukses
  successIcon: { fontSize: 64, marginBottom: 16 },
  successTitle: { fontSize: 28, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" },
  nomorBox: { background: "#f0fdf4", border: "2px solid #bbf7d0", borderRadius: 16, padding: "24px 32px", display: "inline-block", marginTop: 16 },
  nomorText: { fontSize: 28, fontWeight: 800, color: "#1a6b4a", letterSpacing: 2, marginTop: 8 },

  // Footer
  footer: { background: "#1e293b", padding: "20px 24px", marginTop: "auto" },
  footerInner: { maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 13, color: "#cbd5e1" },
};