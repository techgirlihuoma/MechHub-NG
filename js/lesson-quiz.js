// lesson-quiz.html — answer every question, submit, see score (70% to pass)
// Uses: sanity.js (getLesson, getCourse, getParam), common.js helpers

const PASS_MARK = 70
let quizData = []
let answers = {}          // question index -> chosen option index
let submitted = false
let lessonSlug = '', courseSlug = '', nextLessonSlug = null

async function findNextLesson(current, course) {
  if (!course) return null
  const c = await getCourse(course)
  if (!c || !c.modules) return null
  const all = []
  c.modules.forEach(m => (m.lessons || []).forEach(l => all.push(l)))
  const i = all.findIndex(l => l.slug.current === current)
  return i >= 0 && i < all.length - 1 ? all[i + 1] : null
}

const lessonHref = () => `lesson.html?slug=${encodeURIComponent(lessonSlug)}${courseSlug ? '&course=' + encodeURIComponent(courseSlug) : ''}`

function correctIndex(q) {
  return (q.options || []).findIndex(o => String(o).trim() === String(q.correctAnswer).trim())
}

function updateProgress() {
  const n = Object.keys(answers).length
  document.getElementById('qz-count').textContent = `${n} of ${quizData.length} answered`
  document.getElementById('qz-fill').style.width = (n / quizData.length * 100) + '%'
  document.getElementById('quiz-submit').disabled = n < quizData.length
}

function pick(qi, oi) {
  if (submitted) return
  answers[qi] = oi
  document.querySelectorAll(`#q-${qi} .qz-opt`).forEach((b, i) => b.classList.toggle('picked', i === oi))
  updateProgress()
}

function renderQuestions() {
  document.getElementById('quiz-questions').innerHTML = quizData.map((q, qi) => `
    <div class="qz-card" id="q-${qi}" style="margin-bottom:18px">
      <div class="eyebrow" style="margin-bottom:8px">Question ${qi + 1}</div>
      <h2 class="qz-q">${esc(q.question)}</h2>
      <div class="qz-opts">
        ${(q.options || []).map((opt, oi) => `
          <button type="button" class="qz-opt" onclick="pick(${qi}, ${oi})">
            <span class="k">${String.fromCharCode(65 + oi)}</span><span>${esc(opt)}</span>
          </button>`).join('')}
      </div>
      <div class="qz-explain" hidden></div>
    </div>`).join('')
}

function submitQuiz() {
  if (submitted || Object.keys(answers).length < quizData.length) return
  submitted = true
  let score = 0

  quizData.forEach((q, qi) => {
    const right = correctIndex(q)
    const mine = answers[qi]
    if (mine === right) score++
    const card = document.getElementById('q-' + qi)
    card.querySelectorAll('.qz-opt').forEach((b, i) => {
      b.disabled = true
      b.classList.remove('picked')
      if (i === right) b.classList.add('correct')
      else if (i === mine) b.classList.add('wrong')
    })
    const exp = card.querySelector('.qz-explain')
    if (q.explanation) { exp.textContent = q.explanation; exp.hidden = false }
  })

  const total = quizData.length
  const pct = Math.round(score / total * 100)
  const passed = pct >= PASS_MARK
  document.getElementById('quiz-submit-bar').hidden = true

  const res = document.getElementById('quiz-result')
  res.hidden = false
  res.innerHTML = `
    <div class="qz-card qz-score">
      <div class="qz-ring" style="--pct:${pct};--ring:${passed ? 'var(--beginner-fg)' : 'var(--accent)'}"><span>${pct}%</span></div>
      <h2>${score} of ${total} correct</h2>
      <p>${passed ? 'Well done. You can move on to the next lesson.' : `Review the lesson and try again. You need ${PASS_MARK}% to pass.`}</p>
      <div class="btns">
        ${passed
          ? (nextLessonSlug
              ? `<a class="btn btn-primary" href="lesson.html?slug=${encodeURIComponent(nextLessonSlug)}&course=${encodeURIComponent(courseSlug)}">Next lesson ${icon('arrow-right')}</a>`
              : `<a class="btn btn-primary" href="${courseSlug ? 'course.html?slug=' + encodeURIComponent(courseSlug) : 'courses.html'}">Complete course ${icon('check')}</a>`)
          : `<a class="btn btn-outline" href="${lessonHref()}">${icon('arrow-left')} Back to lesson</a>
             <button class="btn btn-primary" type="button" onclick="retakeQuiz()">${icon('refresh')} Retake quiz</button>`}
      </div>
    </div>`
  res.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function retakeQuiz() {
  answers = {}
  submitted = false
  document.getElementById('quiz-result').hidden = true
  document.getElementById('quiz-submit-bar').hidden = false
  renderQuestions()
  updateProgress()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function loadQuizPage() {
  const root = document.getElementById('quiz-content')
  lessonSlug = getParam('lesson')
  courseSlug = getParam('course') || ''
  if (!lessonSlug) { window.location.replace('courses.html'); return }

  const lesson = await getLesson(lessonSlug)
  if (!lesson || !lesson.quiz || !lesson.quiz.length) {
    root.innerHTML = stateBox('No quiz found for this lesson.', lessonHref(), 'Back to lesson')
    return
  }
  quizData = lesson.quiz
  const next = await findNextLesson(lessonSlug, courseSlug)
  nextLessonSlug = next ? next.slug.current : null
  document.title = `Quiz: ${lesson.title} — MechHub NG`

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Courses', href: 'courses.html' }, { label: 'Lesson', href: lessonHref() }, { label: 'Quiz' }])}
        <span class="eyebrow">Lesson quiz · ${quizData.length} question${quizData.length !== 1 ? 's' : ''}</span>
        <h1>${esc(lesson.title)}</h1>
        <p>Answer every question, then submit. You need ${PASS_MARK}% to pass.</p>
      </div>
    </section>
    <div class="wrap">
      <div class="qz-wrap">
        <div class="qz-top"><span id="qz-count"></span><span>${PASS_MARK}% to pass</span></div>
        <div class="qz-bar"><i id="qz-fill" style="width:0"></i></div>
        <div id="quiz-questions"></div>
        <div id="quiz-submit-bar" style="text-align:right">
          <button id="quiz-submit" class="btn btn-primary" type="button" onclick="submitQuiz()" disabled>Submit answers ${icon('arrow-right')}</button>
        </div>
        <div id="quiz-result" hidden></div>
      </div>
    </div>`
  renderQuestions()
  updateProgress()
}

loadQuizPage()
