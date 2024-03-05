# ElifTech-Progect
## Запуск на локальнiй машинi

1. скопiювати репозиторiй локально
2. у файлi /ElifTech-Progect/client/src/shared/constants/host.ts вставити та зберегти наступний текст:

export const host = 'http://localhost:3001';
export const clientHost = 'http://localhost:3000';
// export const host = 'https://eliftech-server-691q.onrender.com';
// export const clientHost = 'https://elif-client.onrender.com';

3. вiдкрити два термiнали, в одному переходимо до ElifTech-Progect/client в iншому до ElifTech-Progect/server
4. запускаемо дану команду у цих термыналах 'npm install'
5. далi для запуску клiєнту у термiналi з клiєнтом запускаємо команду 'npm start' для серверу 'node app.js'