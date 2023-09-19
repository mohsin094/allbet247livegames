import app from '#components/App'

app.init();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

process.on('uncaughtException', (reason) => {
  console.log('uncaughtException at:', reason.stack || reason);
});