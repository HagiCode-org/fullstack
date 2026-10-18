import type { Course } from '../types.ts';

// Demo course: a flat outline with two lessons and no group. Titles are in all ten locales.
export const demoSampler: Course = {
  id: 'demo-sampler',
  demo: true,
  title: {
    'en-US': 'Quick Sampler (Demo)',
    'zh-CN': '快速入门（示例）',
    'zh-Hant': '快速入門（示例）',
    'ja-JP': 'クイックサンプラー（デモ）',
    'ko-KR': '빠른 맛보기 (데모)',
    'de-DE': 'Schnelleinstieg (Demo)',
    'fr-FR': 'Aperçu rapide (démo)',
    'es-ES': 'Muestra rápida (demo)',
    'pt-BR': 'Amostra rápida (demonstração)',
    'ru-RU': 'Быстрый обзор (демо)',
  },
  outline: [
    {
      kind: 'lesson',
      id: 'first-steps',
      title: {
        'en-US': 'First steps',
        'zh-CN': '第一步',
        'zh-Hant': '第一步',
        'ja-JP': 'はじめの一歩',
        'ko-KR': '첫걸음',
        'de-DE': 'Erste Schritte',
        'fr-FR': 'Premiers pas',
        'es-ES': 'Primeros pasos',
        'pt-BR': 'Primeiros passos',
        'ru-RU': 'Первые шаги',
      },
    },
    {
      kind: 'lesson',
      id: 'next-steps',
      title: {
        'en-US': 'Next steps',
        'zh-CN': '下一步',
        'zh-Hant': '下一步',
        'ja-JP': '次のステップ',
        'ko-KR': '다음 단계',
        'de-DE': 'Nächste Schritte',
        'fr-FR': 'Et ensuite',
        'es-ES': 'Próximos pasos',
        'pt-BR': 'Próximos passos',
        'ru-RU': 'Что дальше',
      },
    },
  ],
};
