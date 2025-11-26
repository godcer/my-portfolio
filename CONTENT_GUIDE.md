# Portfolio Content Management Guide

## 📋 Overview

Your portfolio is now **100% data-driven**! All content is managed through JSON files in the `/data` folder. You can update any section without touching HTML, CSS, or JavaScript.

---

## 🚀 Quick Start: How to Update Content

### 1️⃣ **Update About Section**
**File:** `data/about.json`

```json
{
  "intro": "I'm <strong>Your Name</strong>, a...",
  "highlights": [
    {
      "title": "Your Strength",
      "description": "Description here"
    }
  ],
  "tags": ["Tag 1", "Tag 2", "Tag 3"],
  "philosophy": "Your philosophy statement"
}
```

### 2️⃣ **Add New Experience**
**File:** `data/experience.json`

Add a new object to the array:
```json
{
  "title": "Security Analyst",
  "company": "ABC Corp • 2025",
  "chip": "50+ Audits",
  "colorClass": "blue"
}
```

**Available colors:** `red`, `blue`, `green`

### 3️⃣ **Add New Skill**
**File:** `data/skills.json`

Add a new object:
```json
{
  "icon": "🔐",
  "name": "Cryptography",
  "detail": "AES & RSA",
  "orbitSize": "250px",
  "delay": "7.2s"
}
```

**Tips:**
- Use emojis for icons
- Vary `orbitSize` between 200px-280px
- Stagger `delay` by ~1.2s increments

### 4️⃣ **Add New Certificate**
**File:** `data/certificates.json`

```json
{
  "issuer": "CompTIA",
  "issuedDate": "2025",
  "title": "Security+",
  "subtitle": "Network Security Fundamentals",
  "buttonText": "View Credential",
  "cardClass": "four"
}
```

**Card classes:** `one`, `two`, `three`, `four`, etc. (determines stacking order)

### 5️⃣ **Add New Education**
**File:** `data/education.json`

```json
{
  "degree": "M.Sc Cybersecurity",
  "institution": "University of ABC — 2026",
  "description": "Advanced threat hunting, malware reverse engineering.",
  "coverText": "Master's<br>Degree"
}
```

### 6️⃣ **Add New Project**
**File:** `data/projects.json`

```json
{
  "title": "Secure Chat App",
  "description": "End-to-end encrypted messaging with PFS.",
  "buttonText": "View Project",
  "link": "https://github.com/..."
}
```

---

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML (minimal, loads components)
├── data/                   # 📝 EDIT THESE FILES TO UPDATE CONTENT
│   ├── about.json
│   ├── experience.json
│   ├── skills.json
│   ├── certificates.json
│   ├── education.json
│   └── projects.json
├── components/             # Component renderers (don't edit)
│   ├── AboutPanel.js
│   ├── ExperienceCard.js
│   ├── SkillOrb.js
│   ├── CertificateCard.js
│   ├── EducationPillar.js
│   └── ProjectCard.js
├── js/
│   ├── content-renderer.js # Main orchestrator (don't edit)
│   ├── project-tilt.js     # 3D tilt effect
│   └── ...                 # Other effects
└── css/                    # Styles (don't edit)
```

---

## ✅ What's Preserved

All premium effects remain **100% intact**:
- ✨ 3D tilt on project cards
- 🌟 Glare effects
- 🎨 Glassmorphism
- 🌌 Cosmic background
- 💫 Orbit animations
- ⚡ Hover effects
- 🎭 Parallax
- 🔮 Neon borders & glows

---

## 🔧 Troubleshooting

### Content not showing?
1. Check browser console (F12) for errors
2. Verify JSON syntax is valid (use JSONLint.com)
3. Make sure file paths are correct
4. Hard refresh (Ctrl+Shift+R)

### Effects not working?
- The content-renderer automatically re-initializes all effects
- Check console for "✅" success messages
- Verify all script tags are in index.html

---

## 🎯 Best Practices

1. **Always validate JSON** before saving (use a JSON validator)
2. **Keep backups** of your JSON files
3. **Test locally** before deploying
4. **Use consistent formatting** for readability
5. **Don't modify** component files unless you know what you're doing

---

## 📝 Example Workflow

**Adding a new skill:**

1. Open `data/skills.json`
2. Add new object at the end of the array:
   ```json
   {
     "icon": "🛡️",
     "name": "Incident Response",
     "detail": "NIST Framework",
     "orbitSize": "230px",
     "delay": "8.4s"
   }
   ```
3. Save file
4. Refresh browser
5. ✅ New skill appears in orbit!

---

## 🚨 Important Notes

- **HTML allowed:** The `intro` field in `about.json` supports HTML tags (e.g., `<strong>`, `<em>`)
- **Line breaks:** Use `<br>` in `coverText` for education cards
- **Special characters:** Escape quotes in JSON strings with `\"`
- **Arrays:** Don't forget commas between objects (but not after the last one)

---

## 💡 Need Help?

Each component file (`components/*.js`) has detailed comments explaining:
- What data it expects
- How to add new items
- Available options
- Examples

Just open the relevant component file and read the top comment block!

---

**🎉 That's it! You can now update your entire portfolio by editing JSON files only.**
