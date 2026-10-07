// quiz.js — career quiz: 8 questions, scored per track, result links to a career page
// Uses: common.js (esc, icon via shell.js)

// ── QUIZ DATA ──────────────────────────────────────────────
const QUESTIONS = [
    {
      text: "You have a free Saturday and access to a basic workshop. What do you actually want to do?",
      options: [
        { text: "Sketch and prototype a product idea I've had in my head", tracks: { product: 3, mechanical: 2 } },
        { text: "Wire up a circuit and see if I can make something move", tracks: { electronics: 3, embedded: 1 } },
        { text: "Write a program that automates something annoying in my life", tracks: { embedded: 3, programming: 2 } },
        { text: "Tear apart a broken device to understand how it works", tracks: { electronics: 2, embedded: 2, mechanical: 1 } }
      ]
    },
    {
      text: "A robot isn't working. Which part of debugging frustrates you most?",
      options: [
        { text: "The mechanical joints are binding — tolerances are off", tracks: { mechanical: 3, product: 1 } },
        { text: "The sensor is giving noisy, unreliable readings", tracks: { electronics: 3, embedded: 1 } },
        { text: "The code logic is wrong and the behaviour is unpredictable", tracks: { embedded: 3, programming: 2 } },
        { text: "I enjoy all of it honestly — the hunt is the fun part", tracks: { robotics: 3, automation: 2 } }
      ]
    },
    {
      text: "Which YouTube rabbit hole have you actually fallen into before?",
      options: [
        { text: "How things are manufactured — CNC, injection moulding, factory lines", tracks: { mechanical: 3, automation: 2, product: 1 } },
        { text: "How electronics work — circuits, oscilloscopes, PCB builds", tracks: { electronics: 3, embedded: 1 } },
        { text: "How software controls hardware — firmware, Arduino, coding projects", tracks: { embedded: 3, programming: 2 } },
        { text: "How autonomous systems work — drones, self-driving, robots", tracks: { robotics: 3, drone: 2 } }
      ]
    },
    {
      text: "Pick the project that genuinely excites you most right now:",
      options: [
        { text: "Designing a product that solves a real Nigerian problem and getting it manufactured", tracks: { product: 3, mechanical: 2 } },
        { text: "Building a circuit board from scratch and having it work first time", tracks: { electronics: 3, embedded: 1 } },
        { text: "Writing code that makes a physical machine do something impressive", tracks: { embedded: 3, robotics: 1 } },
        { text: "Building a drone or robot that moves and makes decisions on its own", tracks: { robotics: 3, drone: 3 } }
      ]
    },
    {
      text: "Which subject did you find most interesting, even if you didn't admit it?",
      options: [
        { text: "Technical Drawing / Engineering Drawing", tracks: { mechanical: 3, product: 2 } },
        { text: "Physics — especially electricity and magnetism", tracks: { electronics: 3, embedded: 1 } },
        { text: "Computer Science / any programming you touched", tracks: { embedded: 3, programming: 3 } },
        { text: "Further Maths — control systems, vectors, differential equations", tracks: { robotics: 2, automation: 2, drone: 2 } }
      ]
    },
    {
      text: "You're at a tech expo. Which booth do you spend the most time at?",
      options: [
        { text: "A startup showing a beautifully designed physical product", tracks: { product: 3, mechanical: 2 } },
        { text: "An electronics company demonstrating custom PCB hardware", tracks: { electronics: 3, embedded: 1 } },
        { text: "A dev shop showing embedded software running on real devices", tracks: { embedded: 3, programming: 1 } },
        { text: "A robotics team demoing an autonomous machine", tracks: { robotics: 3, automation: 2 } }
      ]
    },
    {
      text: "Which problem in Nigeria do you most want to work on?",
      options: [
        { text: "Manufacturing — Nigeria imports too much, we should build our own products", tracks: { product: 3, mechanical: 2, automation: 1 } },
        { text: "Energy and infrastructure — power, sensors, smart monitoring", tracks: { electronics: 3, automation: 2 } },
        { text: "Tech hardware — Nigerian devices, IoT, embedded fintech", tracks: { embedded: 3, electronics: 1 } },
        { text: "Agriculture and logistics — drones, automation, smart farming", tracks: { drone: 3, automation: 2, robotics: 1 } }
      ]
    },
    {
      text: "Be honest — when you imagine yourself at work in 10 years, what does it look like?",
      options: [
        { text: "A design studio — physical prototypes around me, CAD on screen", tracks: { product: 3, mechanical: 2 } },
        { text: "A lab bench — oscilloscope, soldering iron, PCB layouts", tracks: { electronics: 3, embedded: 1 } },
        { text: "Multiple screens — code, hardware debugger, logic analyser", tracks: { embedded: 3, programming: 2 } },
        { text: "A field or large facility — machines operating, systems running", tracks: { automation: 3, robotics: 2, drone: 1 } }
      ]
    }
  ]

  // ── TRACK PROFILES ────────────────────────────────────────
const TRACKS = {
    product: {
      title: "Product Design Engineer",
      icon: "box",
      sector: "Consumer Products · Hardware Startups · Medical",
      tagline: "A builder who thinks in products and won't be satisfied until it's manufactured and in someone's hands.",
      analysis: "You are fundamentally drawn to making things that exist in the physical world and solve real problems. Your answers point consistently toward design, prototyping, and manufacturability. You think about the end user before you think about the circuit or the code — that's a product designer's instinct.",
      courses: [
        { title: "Product Design", slug: "product-design", level: "beginner" },
        { title: "3D Modeling (CAD)", slug: "3d-modeling-cad", level: "beginner" },
        { title: "Electronics for Beginners", slug: "electronics-for-beginners", level: "beginner" },
        { title: "Arduino Programming", slug: "arduino-programming-for-beginners", level: "beginner" }
      ],
      firstProject: { title: "RFID Access Control", tier: "intermediate", reason: "Has a physical enclosure, electronics, and firmware — all three pillars. Looks like a product, not a school experiment." },
      careerSlug: "product-design-engineer"
    },
    electronics: {
      title: "Electronics Engineer",
      icon: "chip",
      sector: "Hardware · IoT · Energy · Telecoms",
      tagline: "You want to understand every electron. Circuits make sense to you in a way other people find mysterious.",
      analysis: "Your instincts are firmly in the electronics domain. You're drawn to the physical layer — components, signals, power, PCBs. You probably already own a multimeter or have wanted one. The code and mechanical side will come, but electrons are where you feel at home.",
      courses: [
        { title: "Electronics for Beginners", slug: "electronics-for-beginners", level: "beginner" },
        { title: "Sensors", slug: "sensors", level: "beginner" },
        { title: "Actuators", slug: "actuators", level: "intermediate" },
        { title: "PCB Design Fundamentals", slug: "pcb-design-fundamentals", level: "intermediate" }
      ],
      firstProject: { title: "Temperature Display", tier: "beginner", reason: "Clean sensor-to-display pipeline. Teaches you signal reading, display driving, and basic circuit assembly in one build." },
      careerSlug: "embedded-systems-dev"
    },
    embedded: {
      title: "Embedded Systems Developer",
      icon: "code",
      sector: "Tech · Automotive · Medical · Fintech",
      tagline: "You want to write code that controls real things. Software that runs on silicon, not servers.",
      analysis: "You're drawn to the intersection of software and hardware — firmware, microcontrollers, real-time systems. You probably find pure software boring because nothing physically happens. You want the LED to blink, the motor to spin, the sensor to respond. That's embedded engineering.",
      courses: [
        { title: "Arduino Programming", slug: "arduino-programming-for-beginners", level: "beginner" },
        { title: "Electronics for Beginners", slug: "electronics-for-beginners", level: "beginner" },
        { title: "Sensors", slug: "sensors", level: "beginner" },
        { title: "Vibe Coding", slug: "vibe-coding-yes-its-real", level: "intermediate" }
      ],
      firstProject: { title: "PIR Motion Alarm", tier: "beginner", reason: "Sensor input, digital output, real-world response. Simple but teaches the full embedded loop — read, decide, act." },
      careerSlug: "embedded-systems-dev"
    },
    robotics: {
      title: "Robotics Engineer",
      icon: "robot",
      sector: "Manufacturing · Defense · Research · Agriculture",
      tagline: "You want to build machines that move intelligently. Autonomous systems that do things humans can't or won't.",
      analysis: "You're drawn to the full stack — mechanical structure, electronics, and software working together to create something that moves and makes decisions. Robotics requires all three pillars at once. Your instincts suggest you're ready for that complexity.",
      courses: [
        { title: "Arduino Programming", slug: "arduino-programming-for-beginners", level: "beginner" },
        { title: "Sensors", slug: "sensors", level: "beginner" },
        { title: "Actuators", slug: "actuators", level: "intermediate" },
        { title: "ROS for Beginners", slug: "ros-for-beginners", level: "advanced" }
      ],
      firstProject: { title: "Line-Following Robot", tier: "intermediate", reason: "Three sensors, two motors, PID tuning. Teaches control theory better than any lecture and gives you a working autonomous machine." },
      careerSlug: "robotics-engineer"
    },
    automation: {
      title: "Automation Engineer",
      icon: "chart",
      sector: "FMCG · Oil & Gas · Power · Pharma",
      tagline: "You want to make systems work without human intervention. Factories, processes, infrastructure — all running themselves.",
      analysis: "You think in systems, not components. You're less interested in building a single device and more interested in making an entire process smarter and more reliable. That's the automation engineer's mindset — and Nigerian industry desperately needs it.",
      courses: [
        { title: "Electronics for Beginners", slug: "electronics-for-beginners", level: "beginner" },
        { title: "Sensors", slug: "sensors", level: "beginner" },
        { title: "Actuators", slug: "actuators", level: "intermediate" },
        { title: "Arduino Programming", slug: "arduino-programming-for-beginners", level: "beginner" }
      ],
      firstProject: { title: "Colour Sorting Machine", tier: "advanced", reason: "Sensor input, decision logic, mechanical actuation — a mini production line. Exactly what automation engineers design at scale." },
      careerSlug: "automation-engineer"
    },
    drone: {
      title: "UAV / Drone Engineer",
      icon: "rocket",
      sector: "Agriculture · Logistics · Survey · Defense",
      tagline: "You want to build machines that fly and think. Aerial systems that solve real problems from above.",
      analysis: "Your answers point toward autonomous aerial systems — drones, UAVs, and the intersection of aerodynamics, electronics, and flight software. This is one of the fastest growing engineering fields in Nigeria right now, especially in agriculture and logistics.",
      courses: [
        { title: "Electronics for Beginners", slug: "electronics-for-beginners", level: "beginner" },
        { title: "Arduino Programming", slug: "arduino-programming-for-beginners", level: "beginner" },
        { title: "Sensors", slug: "sensors", level: "beginner" },
        { title: "Dynamics", slug: "dynamics", level: "intermediate" }
      ],
      firstProject: { title: "Line-Following Robot", tier: "intermediate", reason: "Before you fly, learn to control motion on the ground. PID tuning on a line follower is the same skill used in flight controllers." },
      careerSlug: "uav-drone-engineer"
    },
    mechanical: {
      title: "Mechanical Design Engineer",
      icon: "gear",
      sector: "Manufacturing · Construction · Automotive · Energy",
      tagline: "You understand forces, shapes, and structures. You see the physical world as something to be designed and optimised.",
      analysis: "Your instincts are rooted in the physical and structural side of engineering. You think about how things are built, why they hold together, and how to make them better. Mechanical engineering is the foundation that everything else sits on.",
      courses: [
        { title: "Product Design", slug: "product-design", level: "beginner" },
        { title: "3D Modeling (CAD)", slug: "3d-modeling-cad", level: "beginner" },
        { title: "Statics", slug: "statics", level: "intermediate" },
        { title: "Mechanisms", slug: "mechanisms", level: "intermediate" }
      ],
      firstProject: { title: "2-DOF Servo Arm", tier: "intermediate", reason: "Mechanical linkages, joint design, and motion control in one build. CAD it first, then print or cut it." },
      careerSlug: "product-design-engineer"
    }
  }


// ── STATE ──────────────────────────────────────────────────
const SCORE_KEYS = ['product', 'electronics', 'embedded', 'robotics', 'automation', 'drone', 'mechanical', 'programming']
let current = 0
let scores = {}
let locked = false
const $ = id => document.getElementById(id)

function show(screen) {
  ;['intro', 'question', 'result'].forEach(s => { $('screen-' + s).hidden = s !== screen })
  window.scrollTo({ top: 0 })
}

function startQuiz() {
  current = 0
  locked = false
  scores = Object.fromEntries(SCORE_KEYS.map(k => [k, 0]))
  $('q-total').textContent = QUESTIONS.length
  show('question')
  showQuestion()
}

function showQuestion() {
  const q = QUESTIONS[current]
  $('q-current').textContent = current + 1
  $('q-text').textContent = q.text
  $('progress-bar').style.width = (current / QUESTIONS.length * 100) + '%'
  $('q-options').innerHTML = q.options.map((o, i) => `
    <button type="button" class="qz-opt" onclick="selectOption(${i})">
      <span class="k">${String.fromCharCode(65 + i)}</span><span>${esc(o.text)}</span>
    </button>`).join('')
  locked = false
}

function selectOption(i) {
  if (locked) return
  locked = true
  const picked = QUESTIONS[current].options[i]
  Object.entries(picked.tracks).forEach(([t, pts]) => { if (t in scores) scores[t] += pts })
  document.querySelectorAll('#q-options .qz-opt').forEach((b, bi) => {
    b.disabled = true
    if (bi === i) b.classList.add('picked')
  })
  setTimeout(() => {
    current++
    current < QUESTIONS.length ? showQuestion() : showResult()
  }, 380)
}

function showResult() {
  show('result')
  $('progress-bar').style.width = '100%'
  const ranked = Object.entries(scores).filter(([t]) => TRACKS[t]).sort((a, b) => b[1] - a[1])
  const top = ranked[0][0]
  const p = TRACKS[top]
  const max = ranked[0][1] || 1

  $('result-title').textContent = p.title
  $('result-tagline').textContent = p.tagline
  $('result-analysis').textContent = p.analysis
  $('result-track-icon').innerHTML = icon(p.icon)
  $('result-track').textContent = p.title
  $('result-sector').textContent = p.sector
  $('result-career-link').href = `career.html?slug=${encodeURIComponent(p.careerSlug)}`

  $('result-scores').innerHTML = ranked.slice(0, 5).map(([t, s]) => `
    <div class="result-bar">
      <span>${esc(TRACKS[t].title)}</span>
      <span class="bar"><i style="width:${Math.round(s / max * 100)}%;${t === top ? '' : 'background:var(--line-strong)'}"></i></span>
      <b>${s}</b>
    </div>`).join('')

  $('result-courses').innerHTML = p.courses.map((c, i) => `
    <a class="row-link" href="course.html?slug=${encodeURIComponent(c.slug)}">
      <div class="lead"><span class="path-n" style="position:static">${i + 1}</span>
        <div><b>${esc(c.title)}</b><span class="badge badge-${esc(c.level)}">${esc(c.level)}</span></div></div>
      <span class="go">${icon('arrow-right')}</span>
    </a>`).join('')

  const fp = p.firstProject
  $('result-project').innerHTML = `
    <h3 style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${esc(fp.title)} <span class="badge badge-${esc(fp.tier)}">${esc(fp.tier)}</span></h3>
    <p style="margin:8px 0 14px">${esc(fp.reason)}</p>
    <a class="link-more" href="projects.html#${esc(fp.tier)}">Browse ${esc(fp.tier)} projects ${icon('arrow-right')}</a>`
}

function restartQuiz() { show('intro') }
