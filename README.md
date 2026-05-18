# NetStream

Потоковый сервис для просмотра видео через WebTorrent. Клиентская часть для [net-stream-electron](https://github.com/RebikHub/net-stream-electron)

## Возможности

- 🔍 Поиск фильмов и сериалов
- 📡 Server-Sent Events (SSE) для real-time обновлений
- 🌐 P2P стриминг через WebTorrent
- 🎬 HLS видео плеер
- 💾 Торрент файлы и магнет-ссылки

## Архитектура

```
src/
├── pages/          # Страницы (home, stream, torrent, tv)
├── components/     # UI компоненты
├── services/       # API, SSE, WebTorrent
│   ├── api.ts      # REST API
│   ├── sse-hook/   # Server-Sent Events
│   └── web-torrent/# WebTorrent интеграция
└── routes/         # Роутинг
```

## Технологии

- React 18
- TypeScript
- Vite
- WebTorrent
- SSE (Server-Sent Events)

## Запуск

```bash
npm install
npm run dev
```
