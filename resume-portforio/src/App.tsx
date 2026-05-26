import { useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import './index.css';

const App = () => {
  // 1. เพิ่ม Type <HTMLDivElement> ให้กับ useRef
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Custom Cursor & Hover Logic
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    // 2. กำหนด Type ให้ requestRef เป็น number
    let requestRef: number;

    // 3. กำหนด Type ให้ event เป็น MouseEvent
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      requestRef = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animateCursor);

    // Hover effects for a and button tags
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2.5)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
    };
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    const interactables = document.querySelectorAll('a, button');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
        }
      });
    }, { threshold: 0.08 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Cursors */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      {/* Navigation */}
      <nav>
        <a className="nav-logo" href="#hero">LY_</a>
        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="nav-gh" href="https://github.com/Littihai" target="_blank" rel="noreferrer">⌥ GitHub</a>
      </nav>

      {/* Hero Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg"></div>
        <div className="glow g1"></div>
        <div className="glow g2"></div>
        <div id="hero">
          <div className="hero-inner">
            <div>
              <div className="eyebrow fu">FULL STACK DEVELOPER · MID-LEVEL</div>
              <h1 className="hero-name fu d1">LITTI<em>CHAI</em><br />YORACH</h1>
              <p className="hero-sub fu d2">
                <strong>System & Web Developer</strong> เชี่ยวชาญ ASP.NET MVC + SQL Server<br />
                สร้างระบบองค์กรที่ซับซ้อน — workflow automation, database optimization, clean architecture
              </p>
              <div className="cta-row fu d3">
                <a href="#projects" className="btn btn-p">→ ดูผลงาน</a>
                <a href="https://github.com/Littihai" target="_blank" rel="noreferrer" className="btn btn-g">⌥ GitHub</a>
                <a href="#contact" className="btn btn-g">ติดต่อ</a>
              </div>
              <div className="hero-stats fu d4">
                <div><div className="stat-n">20</div><div className="stat-l">Repositories</div></div>
                <div><div className="stat-n">5+</div><div className="stat-l">Projects</div></div>
                <div><div className="stat-n">Mid</div><div className="stat-l">Dev Level</div></div>
              </div>
            </div>
            
            <div className="hero-card fu d3">
              <div className="card-top">
                <div className="avatar">LY</div>
                <div className="card-name-wrap">
                  <div className="card-name">Littichai Yorach</div>
                  <div className="card-role"><span className="status-dot"></span>AVAILABLE · RITZ-PRIME</div>
                </div>
              </div>
              <div className="card-tags">
                <span className="ctag">ASP.NET MVC</span>
                <span className="ctag">.NET Core</span>
                <span className="ctag">C#</span>
                <span className="ctag g">React</span>
                <span className="ctag g">TypeScript</span>
                <span className="ctag p">SQL Server</span>
                <span className="ctag p">Stored Proc</span>
                <span className="ctag y">Windows App</span>
                <span className="ctag">REST API</span>
                <span className="ctag">JWT/OAuth</span>
              </div>
              <hr className="card-hr" />
              <div className="card-meta">
                <div className="cm">📍 Thailand</div>
                <div className="cm">🎓 <span>Santapol College</span></div>
                <div className="cm">✉️ menmry@gmail.com</div>
                <div className="cm">💼 <span>littichai_y@ts-engineering.com</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="wrap" id="projects">
        <div className="sec-label">03 — GITHUB PROJECTS</div>
        <h2 className="sec-title">SELECTED WORK</h2>
        <div className="proj-grid">
          
          <div className="proj-card featured reveal">
            <span className="proj-badge badge-featured">★ Featured Project</span>
            <div className="proj-num">01</div>
            <div className="proj-title">CIC_APPROVE — Enterprise Approval Workflow</div>
            <div className="proj-stack">
              <span className="stag p">ASP.NET MVC</span>
              <span className="stag p">C#</span>
              <span className="stag p">SQL Server</span>
              <span className="stag">Automated Email</span>
              <span className="stag">File Handling</span>
              <span className="stag">Role-Based Security</span>
            </div>
            <ul className="proj-bullets">
              <li>ออกแบบระบบ status-driven approval หลายขั้นตอน (Multi-Level Approval Workflow)</li>
              <li>พัฒนาระบบ automated email routing แจ้งเตือนตามสถานะการอนุมัติ</li>
              <li>สร้าง secure file handling สำหรับจัดการเอกสารแนบในกระบวนการอนุมัติ</li>
              <li>ออกแบบ Role-Based Security และ optimized SQL backend</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang"><span className="lang-dot" style={{ background: '#178600' }}></span>C#</div>
              <a href="https://github.com/Littihai" target="_blank" rel="noreferrer" className="proj-link">github.com/Littihai →</a>
            </div>
          </div>

          <div className="proj-card reveal">
            <span className="proj-badge badge-enterprise">Enterprise</span>
            <div className="proj-num">02</div>
            <div className="proj-title">IEM-FORECAST — EDI Forecast Automation</div>
            <div className="proj-stack">
              <span className="stag">C#</span>
              <span className="stag">Windows App</span>
              <span className="stag">SQL Server Job</span>
              <span className="stag y">PowerShell</span>
              <span className="stag y">Task Scheduler</span>
              <span className="stag">EDI</span>
            </div>
            <ul className="proj-bullets">
              <li>พัฒนา Windows Application ด้วย C# สำหรับระบบ EDI Forecast</li>
              <li>สร้าง SQL Server Job + Task Scheduler เพื่อ automate กระบวนการ</li>
              <li>เขียน PowerShell script เชื่อมต่อและรัน SQL Job บน remote server (psexec)</li>
              <li>ระบบทำงานอัตโนมัติแบบ scheduled โดยไม่ต้องมีคนดูแล</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang"><span className="lang-dot" style={{ background: '#178600' }}></span>C# 100%</div>
              <a href="https://github.com/Littihai/IEM-FORECAST" target="_blank" rel="noreferrer" className="proj-link">ดู repo →</a>
            </div>
          </div>

          <div className="proj-card reveal">
            <span className="proj-badge badge-frontend">Frontend</span>
            <div className="proj-num">03</div>
            <div className="proj-title">Modal-VMI — Vendor Managed Inventory UI</div>
            <div className="proj-stack">
              <span className="stag g">JavaScript</span>
              <span className="stag g">HTML5</span>
              <span className="stag g">CSS3</span>
              <span className="stag">Modal UI</span>
              <span className="stag">VMI System</span>
            </div>
            <ul className="proj-bullets">
              <li>พัฒนา Modal component สำหรับระบบ VMI (Vendor Managed Inventory)</li>
              <li>ออกแบบ UI/UX ที่ใช้งานง่ายสำหรับจัดการข้อมูล Vendor</li>
              <li>เขียน JavaScript สำหรับ dynamic interaction และ form handling</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang">
                <span className="lang-dot" style={{ background: '#f1e05a' }}></span>JS 59.5%
                <span className="lang-dot" style={{ background: '#e34c26', marginLeft: '6px' }}></span>HTML 40.4%
              </div>
              <a href="https://github.com/Littihai/Modal-VMI" target="_blank" rel="noreferrer" className="proj-link">ดู repo →</a>
            </div>
          </div>

          <div className="proj-card reveal">
            <span className="proj-badge badge-winapp">Windows App</span>
            <div className="proj-num">04</div>
            <div className="proj-title">WinApp — C# Windows Application</div>
            <div className="proj-stack">
              <span className="stag y">C#</span>
              <span className="stag y">Windows Forms</span>
              <span className="stag y">.NET</span>
            </div>
            <ul className="proj-bullets">
              <li>พัฒนา Windows Desktop Application ด้วย C# และ .NET</li>
              <li>ออกแบบ UI สำหรับการใช้งานบน Windows environment</li>
              <li>ส่วนหนึ่งของ stack การพัฒนาระบบ automation ภายในองค์กร</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang"><span className="lang-dot" style={{ background: '#178600' }}></span>C# 100%</div>
              <a href="https://github.com/Littihai/WinApp" target="_blank" rel="noreferrer" className="proj-link">ดู repo →</a>
            </div>
          </div>

          <div className="proj-card reveal">
            <span className="proj-badge badge-enterprise">Enterprise</span>
            <div className="proj-num">05</div>
            <div className="proj-title">PR / PO / RFQ Procurement System</div>
            <div className="proj-stack">
              <span className="stag">.NET Core</span>
              <span className="stag">SQL Server</span>
              <span className="stag p">Stored Procedure</span>
              <span className="stag">IPagedList</span>
              <span className="stag">Query Optimization</span>
            </div>
            <ul className="proj-bullets">
              <li>พัฒนา Search & Filter ข้อมูล PR, PO และ RFQ ภายในองค์กร</li>
              <li>เขียน Complex SQL Query + Stored Procedure ดึงข้อมูลซับซ้อน</li>
              <li>Query Optimization และ Pagination ด้วย IPagedList</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang"><span className="lang-dot" style={{ background: '#178600' }}></span>C# / ASP.NET</div>
              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Private Repo</span>
            </div>
          </div>

          <div className="proj-card reveal">
            <span className="proj-badge badge-enterprise">Enterprise</span>
            <div className="proj-num">06</div>
            <div className="proj-title">User Management + Auth System</div>
            <div className="proj-stack">
              <span className="stag">ASP.NET MVC</span>
              <span className="stag g">React</span>
              <span className="stag g">Bootstrap 5</span>
              <span className="stag">Google Login</span>
              <span className="stag p">JWT/OAuth</span>
              <span className="stag">AJAX/Select2</span>
            </div>
            <ul className="proj-bullets">
              <li>พัฒนาระบบ CRUD จัดการข้อมูลพนักงานและผู้ใช้งานในองค์กร</li>
              <li>Implement Google Login และระบบ Authentication ครบวงจร</li>
              <li>UI ด้วย Bootstrap 5 + ระบบค้นหา AJAX + Select2</li>
            </ul>
            <div className="proj-footer">
              <div className="proj-lang"><span className="lang-dot" style={{ background: '#178600' }}></span>C# / React</div>
              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Private Repo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="wrap" id="skills" style={{ paddingTop: '2rem' }}>
        <div className="sec-label">04 — SKILLS</div>
        <h2 className="sec-title">TECH STACK</h2>
        <div className="skills-grid">
          <div className="sk-card reveal">
            <div className="sk-icon">[ BACKEND ]</div>
            <div className="sk-title">Backend</div>
            <ul className="sk-list">
              <li>ASP.NET MVC</li>
              <li>.NET Core / C#</li>
              <li>REST API Development</li>
              <li>Entity Framework & LINQ</li>
              <li>JWT / OAuth / Google Login</li>
            </ul>
          </div>
          <div className="sk-card reveal">
            <div className="sk-icon">[ FRONTEND ]</div>
            <div className="sk-title">Frontend</div>
            <ul className="sk-list">
              <li>React & TypeScript</li>
              <li>Bootstrap 5</li>
              <li>Razor View Engine</li>
              <li>AJAX & Select2</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="sk-card reveal">
            <div className="sk-icon">[ DATABASE ]</div>
            <div className="sk-title">Database</div>
            <ul className="sk-list">
              <li>SQL Server</li>
              <li>Stored Procedure</li>
              <li>Query Optimization</li>
              <li>CTE & Complex Query</li>
              <li>MongoDB (พื้นฐาน)</li>
            </ul>
          </div>
          <div className="sk-card reveal">
            <div className="sk-icon">[ TOOLS ]</div>
            <div className="sk-title">Tools & Automation</div>
            <ul className="sk-list">
              <li>Git / GitHub</li>
              <li>Visual Studio / VS Code</li>
              <li>Postman</li>
              <li>PowerShell / Task Scheduler</li>
              <li>SQL Server Agent Jobs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="wrap" id="about" style={{ paddingTop: '2rem' }}>
        <div className="sec-label">05 — ABOUT</div>
        <h2 className="sec-title">MY JOURNEY</h2>
        <div className="about-grid">
          <div>
            <div className="timeline">
              <div className="tl-item reveal">
                <div className="tl-dot"></div>
                <div className="tl-year">2561 — ปัจจุบัน</div>
                <div className="tl-title">วิทยาลัยสันตพล</div>
                <div className="tl-sub">ปริญญาตรี — วิทยาศาสตร์และเทคโนโลยี</div>
                <div className="tl-text">ศึกษาและพัฒนาทักษะ Web + System Development ตลอด 3 ปี จนสามารถพัฒนาระบบองค์กรจริงได้</div>
              </div>
              <div className="tl-item reveal">
                <div className="tl-dot"></div>
                <div className="tl-year">ปีที่ 1</div>
                <div className="tl-title">เริ่มต้นด้วย PHP & Web</div>
                <div className="tl-sub">Buy Zone Market Website</div>
                <div className="tl-text">สร้างเว็บไซต์ซื้อขายด้วย PHP ฝึกทักษะ Dynamic Website และฐานข้อมูลเบื้องต้น</div>
              </div>
              <div className="tl-item reveal">
                <div className="tl-dot"></div>
                <div className="tl-year">ปีที่ 2</div>
                <div className="tl-title">C# + React + Windows App</div>
                <div className="tl-sub">WinApp / CSV Data Form</div>
                <div className="tl-text">ขยายสู่ C#, Windows Application และ React สร้างระบบ form และ automation เบื้องต้น</div>
              </div>
              <div className="tl-item reveal">
                <div className="tl-dot"></div>
                <div className="tl-year">ปีที่ 3</div>
                <div className="tl-title">Full Enterprise Stack</div>
                <div className="tl-sub">CIC_APPROVE / IEM-FORECAST / PR-PO-RFQ</div>
                <div className="tl-text">พัฒนาระบบองค์กรจริงที่ซับซ้อน ครบตั้งแต่ DB design, API, Automation ถึง UI</div>
              </div>
            </div>
          </div>
          <div>
            <p className="about-text">ผมคือ <strong style={{ color: 'var(--text)' }}>System & Web Developer</strong> ที่เชี่ยวชาญ ASP.NET MVC + SQL Server มุ่งเน้นสร้างระบบองค์กรที่ scalable และ maintainable ด้วย workflow automation และ database optimization</p>
            <p className="about-text">มีประสบการณ์กับระบบที่ใช้งานจริงในองค์กร เช่น ระบบ approval หลายขั้นตอน, EDI automation, ระบบจัดซื้อ และ User Management ที่ผ่านการ optimize แล้ว</p>
            <p className="about-text">นอกจาก Web ยังพัฒนา <strong style={{ color: 'var(--text)' }}>Windows Application</strong> และ <strong style={{ color: 'var(--text)' }}>PowerShell Automation</strong> เพื่อ automate งาน server-side ด้วย</p>
            <div className="stat-cards">
              <div className="scard"><div className="scard-n" style={{ color: 'var(--accent)' }}>20+</div><div className="scard-l">GitHub Repos</div></div>
              <div className="scard"><div className="scard-n" style={{ color: 'var(--accent3)' }}>Full</div><div className="scard-l">Stack Coverage</div></div>
              <div className="scard"><div className="scard-n" style={{ color: '#a78bfa' }}>Mid</div><div className="scard-l">Dev Level</div></div>
              <div className="scard"><div className="scard-n" style={{ color: 'var(--warn)' }}>B.Sc.</div><div className="scard-l">Degree In Progress</div></div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div id="contact">
        <div className="contact-inner">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '1rem' }}>06 — CONTACT</div>
          <div className="contact-title">LET'S BUILD<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>SOMETHING</em></div>
          <p className="contact-sub">พร้อมรับโอกาสใหม่ ไม่ว่าจะเป็น Full Time, ฝึกงาน หรือ Freelance project</p>
          <div className="contact-links">
            <a className="clink" href="tel:0650471329">📞 065-0471329</a>
            <a className="clink" href="mailto:menmry@gmail.com">✉️ menmry@gmail.com</a>
            <a className="clink" href="mailto:littichai_y@ts-engineering.com">🏢 ts-engineering</a>
            <a className="clink" href="#">💬 LINE: 2643mry</a>
            <a className="clink" href="https://github.com/Littihai" target="_blank" rel="noreferrer">⌥ GitHub: Littihai</a>
          </div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
      <footer>© 2025 Littichai Yorach (RITZ-PRIME) · Full Stack Developer · github.com/Littihai</footer>
    </>
  );
};


export default App;