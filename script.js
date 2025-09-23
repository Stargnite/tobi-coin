// Example: copy contract address
document.addEventListener("DOMContentLoaded", () => {
  const copyCA = document.getElementById("copyCA");
  const copyCA2 = document.getElementById("copyCA2");
  const copyRef = document.getElementById("copyRef");

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  }

  if (copyCA) copyCA.addEventListener("click", () => copyText("TBA"));
  if (copyCA2) copyCA2.addEventListener("click", () => copyText("TBA"));
  if (copyRef)
    copyRef.addEventListener("click", () => copyText(window.location.href));

  // Mount Jupiter / 1inch widgets (placeholder for actual integration)
  document.getElementById("mountJup")?.addEventListener("click", () => {
    document.getElementById("jupWrap").innerHTML =
      "<p>Jupiter widget mounted.</p>";
  });

  document.getElementById("mountInch")?.addEventListener("click", () => {
    document.getElementById("inchWrap").innerHTML =
      "<p>1inch widget mounted.</p>";
  });
});

// Load HTML includes
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to fetch ${file}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<p style="color:red">Error loading ${file}</p>`;
      console.error(err);
    }
  });
});


// (function () {
//   const c = document.getElementById("arrival");
//   const ctx = c.getContext("2d");
//   let W, H;
//   function fit() {
//     W = c.width = innerWidth;
//     H = c.height = innerHeight;
//   }
//   fit();
//   addEventListener("resize", fit, { passive: true });
//   const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
//   const skyline = Array.from({ length: 24 }, (_, i) => ({
//     x: (i / 24) * W,
//     w: (W / 24) * 0.9,
//     h: H * 0.18 + Math.random() * H * 0.12,
//   }));
//   const ufos = Array.from({ length: 5 }, () => ({
//     x: Math.random() * W,
//     y: 100 - Math.random() * 200,
//     s: 0.7 + Math.random() * 0.8,
//     vy: 0.3 + Math.random() * 0.4,
//     t: Math.random() * 6,
//   }));
//   let t = 0;
//   function drawSky() {
//     const g = ctx.createLinearGradient(0, 0, 0, H);
//     g.addColorStop(0, "#071224");
//     g.addColorStop(0.5, "#0B1B34");
//     g.addColorStop(1, "#0A1830");
//     ctx.fillStyle = g;
//     ctx.fillRect(0, 0, W, H);
//     // horizon glow
//     const hg = ctx.createRadialGradient(
//       W / 2,
//       H * 1.05,
//       20,
//       W / 2,
//       H * 1.05,
//       H * 0.8
//     );
//     hg.addColorStop(0, "rgba(63,231,255,.18)");
//     hg.addColorStop(1, "rgba(63,231,255,0)");
//     ctx.fillStyle = hg;
//     ctx.beginPath();
//     ctx.arc(W / 2, H * 1.05, H * 0.8, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   function drawSkyline() {
//     ctx.fillStyle = "rgba(255,255,255,.06)";
//     skyline.forEach((b) => {
//       ctx.fillRect(b.x, H - b.h, b.w, b.h);
//       // windows
//       ctx.fillStyle = "rgba(255,255,255,.05)";
//       for (let y = H - b.h + 10; y < H - 10; y += 16) {
//         for (let x = b.x + 6; x < b.x + b.w - 6; x += 18) {
//           if ((x + y) % 3 === 0) {
//             ctx.fillRect(x, y, 3, 6);
//           }
//         }
//       }
//       ctx.fillStyle = "rgba(255,255,255,.06)";
//     });
//     // ground line
//     // ctx.fillStyle = "rgba(255,255,255,.08)";
//     // ctx.fillRect(0, H * 0.82, W, 2);
//   }
//   function drawUFO(u) {
//     // saucer
//     ctx.save();
//     ctx.translate(u.x, u.y);
//     const w = 80 * u.s,
//       h = 18 * u.s;
//     ctx.globalAlpha = 0.95;
//     let g = ctx.createLinearGradient(-w, 0, w, 0);
//     g.addColorStop(0, "#3FE7FF");
//     g.addColorStop(1, "#B7FF3C");
//     ctx.fillStyle = g;
//     ctx.beginPath();
//     ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.fillStyle = "#102B4E";
//     ctx.beginPath();
//     ctx.arc(0, -h * 0.8, 12 * u.s, 0, Math.PI * 2);
//     ctx.fill();
//     // lights
//     ctx.fillStyle = "#FF5BC8";
//     for (let i = -2; i <= 2; i++) {
//       ctx.beginPath();
//       ctx.arc(i * w * 0.25, 0, 3.2 * u.s, 0, Math.PI * 2);
//       ctx.fill();
//     }
//     // beam
//     const beamH = Math.max(0, H * 0.82 - u.y - h * 0.5);
//     const bg = ctx.createLinearGradient(0, 0, 0, beamH);
//     bg.addColorStop(0, "rgba(63,231,255,.35)");
//     bg.addColorStop(1, "rgba(183,255,60,.02)");
//     ctx.fillStyle = bg;
//     ctx.beginPath();
//     ctx.moveTo(-w * 0.25, h * 0.6);
//     ctx.lineTo(w * 0.25, h * 0.6);
//     ctx.lineTo(w * 0.6, beamH);
//     ctx.lineTo(-w * 0.6, beamH);
//     ctx.closePath();
//     ctx.fill();
//     ctx.restore();
//   }
//   function loop() {
//     if (reduce) {
//       ctx.clearRect(0, 0, W, H);
//       return;
//     }
//     t += 0.008;
//     drawSky();
//     drawSkyline();
//     ufos.forEach((u) => {
//       u.t += 0.01;
//       u.x += Math.sin(u.t) * 0.6;
//       u.y += u.vy;
//       if (u.y > H * 0.65) (u.y = -80), (u.x = Math.random() * W); // recycle
//       drawUFO(u);
//     });
//     requestAnimationFrame(loop);
//   }
//   requestAnimationFrame(loop);
// })();


(function () {
  const c = document.getElementById("arrival");
  const ctx = c.getContext("2d");
  let W, H;
  function fit() {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  }
  fit();
  addEventListener("resize", fit, { passive: true });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const skyline = Array.from({ length: 24 }, (_, i) => ({
    x: (i / 24) * W,
    w: (W / 24) * 0.9,
    h: H * 0.18 + Math.random() * H * 0.12,
  }));
  const ufos = Array.from({ length: 5 }, () => ({
    x: Math.random() * W,
    y: 100 - Math.random() * 200,
    s: 0.7 + Math.random() * 0.8,
    vy: 0.3 + Math.random() * 0.4,
    t: Math.random() * 6,
  }));
  let t = 0;
  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#071224");
    g.addColorStop(0.5, "#0B1B34");
    g.addColorStop(1, "#0A1830");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // horizon glow
    const hg = ctx.createRadialGradient(
      W / 2,
      H * 1.05,
      20,
      W / 2,
      H * 1.05,
      H * 0.8
    );
    hg.addColorStop(0, "rgba(63,231,255,.18)");
    hg.addColorStop(1, "rgba(63,231,255,0)");
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(W / 2, H * 1.05, H * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawSkyline() {
    ctx.fillStyle = "rgba(255,255,255,.06)";
    skyline.forEach((b) => {
      ctx.fillRect(b.x, H - b.h, b.w, b.h);
      // windows
      ctx.fillStyle = "rgba(255,255,255,.05)";
      for (let y = H - b.h + 10; y < H - 10; y += 16) {
        for (let x = b.x + 6; x < b.x + b.w - 6; x += 18) {
          if ((x + y) % 3 === 0) {
            ctx.fillRect(x, y, 3, 6);
          }
        }
      }
      ctx.fillStyle = "rgba(255,255,255,.06)";
    });
    // ground line
    // ctx.fillStyle = "rgba(255,255,255,.08)";
    // ctx.fillRect(0, H * 0.82, W, 2);
  }
  function drawUFO(u) {
    // saucer
    ctx.save();
    ctx.translate(u.x, u.y);
    const w = 80 * u.s,
      h = 18 * u.s;
    ctx.globalAlpha = 0.95;
    let g = ctx.createLinearGradient(-w, 0, w, 0);
    g.addColorStop(0, "#3FE7FF");
    g.addColorStop(1, "#B7FF3C");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#102B4E";
    ctx.beginPath();
    ctx.arc(0, -h * 0.8, 12 * u.s, 0, Math.PI * 2);
    ctx.fill();
    // lights
    ctx.fillStyle = "#FF5BC8";
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.arc(i * w * 0.25, 0, 3.2 * u.s, 0, Math.PI * 2);
      ctx.fill();
    }
    // beam
    const beamH = Math.max(0, H * 0.82 - u.y - h * 0.5);
    const bg = ctx.createLinearGradient(0, 0, 0, beamH);
    bg.addColorStop(0, "rgba(63,231,255,.35)");
    bg.addColorStop(1, "rgba(183,255,60,.02)");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.moveTo(-w * 0.25, h * 0.6);
    ctx.lineTo(w * 0.25, h * 0.6);
    ctx.lineTo(w * 0.6, beamH);
    ctx.lineTo(-w * 0.6, beamH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function loop() {
    if (reduce) {
      ctx.clearRect(0, 0, W, H);
      return;
    }
    t += 0.008;
    drawSky();
    drawSkyline();
    ufos.forEach((u) => {
      u.t += 0.01;
      u.x += Math.sin(u.t) * 0.6;
      u.y += u.vy;
      if (u.y > H * 0.65) (u.y = -80), (u.x = Math.random() * W); // recycle
      drawUFO(u);
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();