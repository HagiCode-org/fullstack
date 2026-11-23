import type { LearningPath, ResolvedStep } from './types.ts';

// The only list of learning paths. Every course, lesson and group a path names must exist in the course registry (integrity.ts).
export const learningPaths: readonly LearningPath[] = [
  {
    id: 'quick-start',
    title: {
      'en-US': 'Quick start',
      'zh-CN': '快速上手',
      'zh-Hant': '快速上手',
      'ja-JP': 'クイックスタート',
      'ko-KR': '빠른 시작',
      'de-DE': 'Schnellstart',
      'fr-FR': 'Démarrage rapide',
      'es-ES': 'Inicio rápido',
      'pt-BR': 'Início rápido',
      'ru-RU': 'Быстрый старт',
    },
    summary: {
      'en-US': 'Stop after these five courses and you have a finished website that anyone can open on the internet.',
      'zh-CN': '只学到这里,就能拿到一个公开的网站。',
      'zh-Hant': '只學到這裡,就能拿到一個公開的網站。',
      'ja-JP': 'ここまで学べば、誰でもインターネットで開ける完成したウェブサイトが手に入ります。',
      'ko-KR': '여기까지만 배우면 누구나 인터넷에서 열어볼 수 있는 완성된 웹사이트가 생깁니다.',
      'de-DE': 'Wer bis hierhin lernt, hat eine fertige Website, die jeder im Internet aufrufen kann.',
      'fr-FR': "Si vous vous arrêtez là, vous avez un site web terminé que n'importe qui peut ouvrir sur Internet.",
      'es-ES': 'Si te detienes aquí, tendrás un sitio web terminado que cualquiera puede abrir en internet.',
      'pt-BR': 'Se você parar aqui, terá um site pronto que qualquer pessoa pode abrir na internet.',
      'ru-RU': 'Если пройти до этого места, у вас будет готовый сайт, который любой может открыть в интернете.',
    },
    demo: false,
    steps: [
      { kind: 'course', id: 'docker-for-beginners', courseId: 'docker-for-beginners' },
      { kind: 'course', id: 'github-desktop-and-github', courseId: 'github-desktop-and-github' },
      { kind: 'course', id: 'build-with-ai', courseId: 'build-with-ai' },
      { kind: 'course', id: 'first-website', courseId: 'first-website' },
      { kind: 'course', id: 'publish-your-website', courseId: 'publish-your-website' },
    ],
  },
  {
    id: 'build-apps',
    title: {
      'en-US': 'Build apps',
      'zh-CN': '做出应用',
      'zh-Hant': '做出應用',
      'ja-JP': 'アプリを作る',
      'ko-KR': '앱 만들기',
      'de-DE': 'Apps bauen',
      'fr-FR': 'Créer des applications',
      'es-ES': 'Crear aplicaciones',
      'pt-BR': 'Criar aplicativos',
      'ru-RU': 'Создание приложений',
    },
    summary: {
      'en-US': 'Everything in Quick start, then a web app, an app with a database, AI features, GitHub collaboration and the capstone project.',
      'zh-CN': '快速上手的全部课程,再加上 Web 应用、带数据库的应用、AI 功能、GitHub 协作和毕业项目。',
      'zh-Hant': '快速上手的全部課程,再加上 Web 應用、帶資料庫的應用、AI 功能、GitHub 協作和畢業專案。',
      'ja-JP': 'クイックスタートの全コースに加えて、Web アプリ、データベースのあるアプリ、AI 機能、GitHub 協働、卒業プロジェクト。',
      'ko-KR': '빠른 시작의 모든 과정에 웹 앱, 데이터베이스가 있는 앱, AI 기능, GitHub 협업, 졸업 프로젝트를 더합니다.',
      'de-DE': 'Alles aus Schnellstart, dazu eine Web-App, eine App mit Datenbank, KI-Funktionen, GitHub-Zusammenarbeit und das Abschlussprojekt.',
      'fr-FR': "Tout le contenu de Démarrage rapide, puis une application web, une application avec base de données, des fonctions d'IA, la collaboration GitHub et le projet final.",
      'es-ES': 'Todo lo de Inicio rápido, después una aplicación web, una aplicación con base de datos, funciones de IA, colaboración en GitHub y el proyecto final.',
      'pt-BR': 'Tudo de Início rápido, depois um aplicativo web, um aplicativo com banco de dados, recursos de IA, colaboração no GitHub e o projeto final.',
      'ru-RU': 'Всё из «Быстрого старта», затем веб-приложение, приложение с базой данных, функции ИИ, совместная работа в GitHub и итоговый проект.',
    },
    demo: false,
    steps: [
      { kind: 'course', id: 'docker-for-beginners', courseId: 'docker-for-beginners' },
      { kind: 'course', id: 'github-desktop-and-github', courseId: 'github-desktop-and-github' },
      { kind: 'course', id: 'build-with-ai', courseId: 'build-with-ai' },
      { kind: 'course', id: 'first-website', courseId: 'first-website' },
      { kind: 'course', id: 'publish-your-website', courseId: 'publish-your-website' },
      { kind: 'course', id: 'first-web-app', courseId: 'first-web-app' },
      { kind: 'course', id: 'app-with-data', courseId: 'app-with-data' },
      { kind: 'course', id: 'add-ai-features', courseId: 'add-ai-features' },
      { kind: 'course', id: 'github-collaboration', courseId: 'github-collaboration' },
      { kind: 'course', id: 'capstone-project', courseId: 'capstone-project' },
    ],
  },
  {
    id: 'electives',
    title: {
      'en-US': 'Electives',
      'zh-CN': '进阶选修',
      'zh-Hant': '進階選修',
      'ja-JP': '発展選択',
      'ko-KR': '심화 선택',
      'de-DE': 'Wahlfächer',
      'fr-FR': 'Options avancées',
      'es-ES': 'Electivas avanzadas',
      'pt-BR': 'Eletivas avançadas',
      'ru-RU': 'Углублённые факультативы',
    },
    summary: {
      'en-US': 'Optional courses and lessons, in no particular order, to take when you need them.',
      'zh-CN': '不分先后,按需选学的选修课程和课时。',
      'zh-Hant': '不分先後,按需選學的選修課程和課時。',
      'ja-JP': '順序は問わず、必要なときに選んで学ぶ選択コースと課時です。',
      'ko-KR': '순서에 관계없이 필요할 때 골라 배우는 선택 과정과 강의입니다.',
      'de-DE': 'Optionale Kurse und Lektionen in beliebiger Reihenfolge, wenn Sie sie brauchen.',
      'fr-FR': "Cours et leçons facultatifs, dans l'ordre que vous voulez, à suivre selon vos besoins.",
      'es-ES': 'Cursos y lecciones opcionales, en el orden que quieras, para cuando los necesites.',
      'pt-BR': 'Cursos e lições opcionais, em qualquer ordem, para quando você precisar.',
      'ru-RU': 'Необязательные курсы и уроки, в любом порядке, — берите то, что нужно.',
    },
    demo: false,
    steps: [
      { kind: 'course', id: 'docker-self-hosted-apps', courseId: 'docker-self-hosted-apps' },
      { kind: 'course', id: 'another-language', courseId: 'another-language' },
      { kind: 'group', id: 'publish-advanced', courseId: 'publish-your-website', groupId: 'publish-advanced' },
      { kind: 'lesson', id: 'issues-forks-and-open-source', courseId: 'github-collaboration', lessonId: 'issues-forks-and-open-source' },
      { kind: 'lesson', id: 'team-collaboration', courseId: 'capstone-project', lessonId: 'team-collaboration' },
    ],
  },
];

export function getLearningPath(id: string, list: readonly LearningPath[] = learningPaths): LearningPath | undefined {
  return list.find((path) => path.id === id);
}

// Every course the path can lead to, in path order: a course, lesson or group step's course, then each option of a choice step.
// Options keep their declared order, and a course listed twice keeps only its first position.
export function pathCourseIds(path: LearningPath): string[] {
  const ids = path.steps.flatMap((step) => (step.kind === 'choice' ? step.options.map((option) => option.courseId) : [step.courseId]));
  return [...new Set(ids)];
}

// One entry per step, in declared order. A course, lesson or group step always resolves to its course. A choice step resolves
// to the chosen course only when it is one of the step's options; otherwise it stays open (null). Never a default.
export function resolvePath(path: LearningPath, choices: Readonly<Record<string, string>>): ResolvedStep[] {
  return path.steps.map((step) => {
    if (step.kind !== 'choice') return { step, courseId: step.courseId };
    const chosen = choices[step.id];
    const isOption = step.options.some((option) => option.courseId === chosen);
    return { step, courseId: isOption ? chosen : null };
  });
}
