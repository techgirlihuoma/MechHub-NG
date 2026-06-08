// ─── SANITY CONFIG ───────────────────────────────────────────
const PROJECT_ID = 'w3fjwa6d'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`

// ─── CORE FETCH ──────────────────────────────────────────────
async function sanityFetch(query) {
  const encodedQuery = encodeURIComponent(query)
  const url = `${BASE_URL}?query=${encodedQuery}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// ─── IMAGE URL BUILDER ───────────────────────────────────────
function imageUrl(source) {
  if (!source || !source.asset) return null
  const ref = source.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
}

// ─── GET URL PARAM ───────────────────────────────────────────
function getParam(key) {
  const params = new URLSearchParams(window.location.search)
  return params.get(key)
}

// ─── SITE SETTINGS ───────────────────────────────────────────
async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubtext,
    goalStatement,
    quizCtaTitle,
    quizCtaSubtext,
    announcementBar,
    whyThisContent,
    "lessonSidebar": lessonSidebar[] {
      type,
      isActive,
      title,
      content,
      buttonLabel,
      buttonUrl,
      buttonStyle,
      platform,
      adImageUrl,
      "adImageUpload": adImageUpload.asset->url,
      adLinkUrl
    }
  }`
  return await sanityFetch(query)
}

// ─── CAREERS ─────────────────────────────────────────────────
async function getAllCareers() {
  const query = `*[_type == "career"] | order(title asc) {
    _id,
    title,
    slug,
    emoji,
    sector,
    tag,
    shortDescription
  }`
  return await sanityFetch(query)
}

async function getCareer(slug) {
  const query = `*[_type == "career" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    emoji,
    sector,
    tag,
    shortDescription,
    whatYouDo,
    dayToDay,
    whereYouWork,
    salaryRange,
    videoUrl,
    "learningPath": learningPath[]-> {
      _id,
      title,
      slug,
      pillar,
      level,
      description,
      comingSoon
    },
    "relatedProjects": relatedProjects[]-> {
      _id,
      title,
      slug,
      tier,
      emoji,
      estimatedCost,
      description
    }
  }`
  return await sanityFetch(query)
}

// ─── COURSES ─────────────────────────────────────────────────
async function getAllCourses() {
  const query = `*[_type == "course"] | order(pillar asc, level asc) {
    _id,
    title,
    slug,
    pillar,
    level,
    description,
    duration,
    thumbnail,
    comingSoon
  }`
  return await sanityFetch(query)
}

async function getCourse(slug) {
  const query = `*[_type == "course" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    pillar,
    level,
    description,
    overview,
    duration,
    prerequisites,
    thumbnail,
    comingSoon,
    "modules": modules[] {
      title,
      description,
      "lessons": lessons[]-> {
        _id,
        title,
        slug,
        lessonNumber,
        duration,
        freePreview
      }
    }
  }`
  return await sanityFetch(query)
}

// ─── LESSONS ─────────────────────────────────────────────────
async function getLesson(slug) {
  const query = `*[_type == "lesson" && slug.current == "${slug}"][0] {
    _id,
    _createdAt,
    title,
    slug,
    videoUrl,
    content,
    quiz,
    duration,
    freePreview
  }`
  return await sanityFetch(query)
}

// ─── PROJECTS ────────────────────────────────────────────────
async function getAllProjects() {
  const query = `*[_type == "project"] | order(tier asc) {
    _id,
    title,
    slug,
    tier,
    emoji,
    description,
    estimatedCost,
    skills,
    thumbnail
  }`
  return await sanityFetch(query)
}

async function getProject(slug) {
  const query = `*[_type == "project" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    tier,
    emoji,
    description,
    overview,
    videoUrl,
    estimatedCost,
    skills,
    components,
    steps,
    thumbnail,
    "relatedCourses": relatedCourses[]-> {
      _id,
      title,
      slug,
      pillar,
      level
    }
  }`
  return await sanityFetch(query)
}

// ─── RESOURCES ───────────────────────────────────────────────
async function getAllResources() {
  const query = `*[_type == "resource"] | order(type asc, title asc) {
    _id,
    title,
    slug,
    type,
    badge,
    description,
    link,
    pillar,
    free,
    recommended
  }`
  return await sanityFetch(query)
}

// ─── FAQ ─────────────────────────────────────────────────────
async function getAllFaqs() {
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`
  return await sanityFetch(query)
}

// ─── COMMUNITY BUILDS ────────────────────────────────────────
async function getAllBuilds() {
  const query = `*[_type == "communityBuild" && approved == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    authorName,
    authorInitials,
    authorSchool,
    authorLevel,
    tier,
    description,
    photos,
    publishedAt
  }`
  return await sanityFetch(query)
}

async function getBuild(slug) {
  const query = `*[_type == "communityBuild" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    authorName,
    authorInitials,
    authorSchool,
    authorLevel,
    tier,
    description,
    fullPost,
    photos,
    videoUrl,
    lessonsLearned,
    challenges,
    costBreakdown,
    skills,
    publishedAt,
    "relatedProject": relatedProject-> {
      title,
      slug,
      tier,
      emoji
    }
  }`
  return await sanityFetch(query)
}
